#!/usr/bin/env node
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const suiteFilter = (() => {
  const idx = process.argv.indexOf('--suite');
  return idx !== -1 ? process.argv[idx + 1] : 'all';
})();

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || process.cwd(),
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    const detail = `${result.stderr || result.stdout}`.trim();
    throw new Error(`${command} ${args.join(' ')} failed${detail ? `: ${detail}` : ''}`);
  }
  return (result.stdout || '').trim();
}

function parseJson(output) {
  try {
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`Expected JSON output: ${error.message}`);
  }
}

// ─── Suite 1: Core install, doctor, flow ─────────────────────────────────────
const target = mkdtempSync(join(tmpdir(), 'mop-smoke-'));

try {
  if (suiteFilter === 'all' || suiteFilter === 'core') {
    const packageJson = parseJson(readFileSync('package.json', 'utf8'));
    if (packageJson.name !== 'mop-flow') {
      throw new Error('package.json name must be mop-flow');
    }
    if (!packageJson.bin?.['mop-flow']) {
      throw new Error('package.json must expose mop-flow bin');
    }

    parseJson(run('node', ['.MOP/scripts/burhan-mop.mjs', 'install', '--target', target, '--json']));

    const statePath = join(target, '.MOP', 'STATE.json');
    const sentinel = '{"sentinel":"keep-me"}';
    writeFileSync(statePath, sentinel, 'utf8');

    parseJson(run('node', ['.MOP/scripts/burhan-mop.mjs', 'install', '--target', target, '--force', '--json']));
    const afterForce = readFileSync(statePath, 'utf8');
    if (afterForce !== sentinel) {
      throw new Error('install --force overwrote an existing .MOP/STATE.json');
    }

    const doctor = parseJson(run('node', ['.MOP/scripts/burhan-mop.mjs', 'doctor', '--json'], { cwd: target }));
    if (!doctor.ok) {
      throw new Error('doctor did not pass in smoke test target');
    }

    const flow = parseJson(run('node', ['.MOP/scripts/mop-flow.mjs', 'status', '--json'], { cwd: target }));
    if (flow.brand?.name !== 'MOP Flow') {
      throw new Error('mop-flow status did not report MOP Flow branding');
    }
    if (!flow.providers?.every((provider) => provider.mcpServer === 'mop-flow')) {
      throw new Error('mop-flow provider matrix is not using the mop-flow MCP server name');
    }
    if ((flow.skillCatalog?.bridgedCount || 0) < (flow.skillCatalog?.portableCount || 0)) {
      throw new Error('mop-flow bridged skill count is lower than portable skill count');
    }

    parseJson(run('node', ['.MOP/scripts/mop-flow.mjs', 'manifest', 'refresh', '--json'], { cwd: target }));
    run('node', ['.MOP/scripts/mop-core.mjs', 'validate']);
    console.log('[suite:core] OK');
  }

  // ─── Suite 2: Memory roundtrip + BM25 ───────────────────────────────────────
  if (suiteFilter === 'all' || suiteFilter === 'memory') {
    const memTarget = mkdtempSync(join(tmpdir(), 'mop-mem-'));
    try {
      // Install fresh MOP
      run('node', ['.MOP/scripts/burhan-mop.mjs', 'install', '--target', memTarget, '--json']);

      // Setup MOP in solo mode (no gh auth needed — override requireUserGitEmail via env not available, use test email)
      run('node', [join(memTarget, '.MOP/scripts/mop-core.mjs'), 'setup',
        '--project-name', 'smoke-mem-test',
        '--name', 'Smoke Tester',
        '--codename', 'smoketester',
        '--password', 'smoke12345',
        '--mode', 'solo',
        '--conversation-language', 'English',
        '--coding-language', 'English',
        '--git-email', 'smoke@test.local',
        '--git-name', 'Smoke Tester'
      ], { cwd: memTarget });

      // Login
      run('node', [join(memTarget, '.MOP/scripts/mop-core.mjs'), 'login',
        '--codename', 'smoketester',
        '--password', 'smoke12345'
      ], { cwd: memTarget });

      // Activate an agent
      run('node', [join(memTarget, '.MOP/scripts/mop-core.mjs'), 'agent', 'activate',
        '--actor', 'smoketester',
        '--role', 'core',
        '--title', 'Core Agent',
        '--name', 'Arif'
      ], { cwd: memTarget });

      // T2.1: memoryAdd roundtrip
      const addOut = parseJson(run('node', [join(memTarget, '.MOP/scripts/mop-core.mjs'), 'memory', 'add',
        '--actor', 'smoketester',
        '--kind', 'conversation',
        '--summary', 'smoke test BM25 index authentication flow'
      ], { cwd: memTarget }));
      if (!addOut.ok) throw new Error('T2.1: memory add failed');

      // T2.2: memoryBrief returns entry
      const briefOut = parseJson(run('node', [join(memTarget, '.MOP/scripts/mop-core.mjs'), 'memory', 'brief',
        '--actor', 'smoketester'
      ], { cwd: memTarget }));
      if (!briefOut.ok) throw new Error('T2.2: memory brief failed');
      if (!briefOut.memory?.recentEntries?.length) throw new Error('T2.2: memory brief returned no entries');

      // T2.3: BM25 index.json created
      if (!existsSync(join(memTarget, '.MOP/memory/index.json'))) {
        throw new Error('T2.3: BM25 index.json not created after memory add');
      }

      // T2.4: working.jsonl created (3-tier tier-1)
      if (!existsSync(join(memTarget, '.MOP/memory/working.jsonl'))) {
        throw new Error('T2.4: working.jsonl not created (3-tier tier 1)');
      }

      // T2.5: memoryBrief --query uses BM25 ranked tier
      const queryOut = parseJson(run('node', [join(memTarget, '.MOP/scripts/mop-core.mjs'), 'memory', 'brief',
        '--actor', 'smoketester',
        '--query', 'authentication'
      ], { cwd: memTarget }));
      if (!queryOut.ok) throw new Error('T2.5: memory brief --query failed');
      if (queryOut.memory?.tier !== 'bm25-ranked') {
        throw new Error(`T2.5: memory brief --query tier expected bm25-ranked, got ${queryOut.memory?.tier}`);
      }

      // T2.6: memory search command
      const searchOut = parseJson(run('node', [join(memTarget, '.MOP/scripts/mop-core.mjs'), 'memory', 'search',
        '--actor', 'smoketester',
        '--query', 'BM25 authentication'
      ], { cwd: memTarget }));
      if (!searchOut.ok) throw new Error('T2.6: memory search failed');

      console.log('[suite:memory] OK');
    } finally {
      rmSync(memTarget, { recursive: true, force: true });
    }
  }

  // ─── Suite 3: Workflow profiles, readiness, drift check ───────────────────
  if (suiteFilter === 'all' || suiteFilter === 'workflow') {
    const wfTarget = mkdtempSync(join(tmpdir(), 'mop-wf-'));
    try {
      // Install fresh MOP
      run('node', ['.MOP/scripts/burhan-mop.mjs', 'install', '--target', wfTarget, '--json']);

      // Setup MOP in solo mode
      run('node', [join(wfTarget, '.MOP/scripts/mop-core.mjs'), 'setup',
        '--project-name', 'smoke-wf-test',
        '--name', 'Smoke Tester',
        '--codename', 'smoketester',
        '--password', 'smoke12345',
        '--mode', 'solo',
        '--conversation-language', 'English',
        '--coding-language', 'English',
        '--git-email', 'smoke@test.local',
        '--git-name', 'Smoke Tester'
      ], { cwd: wfTarget });

      // Login
      run('node', [join(wfTarget, '.MOP/scripts/mop-core.mjs'), 'login',
        '--codename', 'smoketester',
        '--password', 'smoke12345'
      ], { cwd: wfTarget });

      // Activate agent
      run('node', [join(wfTarget, '.MOP/scripts/mop-core.mjs'), 'agent', 'activate',
        '--actor', 'smoketester',
        '--role', 'core',
        '--title', 'Core Agent',
        '--name', 'Arif'
      ], { cwd: wfTarget });

      // T3.1: status with profile returns profile and relatedDecisions
      const statusOut = parseJson(run('node', [join(wfTarget, '.MOP/scripts/mop-workflow.mjs'), 'status',
        '--actor', 'smoketester',
        '--profile', 'quick',
        '--task', 'create a new backend api endpoint'
      ], { cwd: wfTarget }));
      if (statusOut.profile !== 'quick') throw new Error('T3.1: status did not return profile');
      if (!Array.isArray(statusOut.relatedDecisions)) throw new Error('T3.1: status did not return relatedDecisions');

      // T3.2: help with profile quick skips ux-spec
      const helpOut = parseJson(run('node', [join(wfTarget, '.MOP/scripts/mop-workflow.mjs'), 'help',
        '--actor', 'smoketester',
        '--profile', 'quick',
        '--task', 'design UI screen animation'
      ], { cwd: wfTarget }));
      if (helpOut.phase === 'ux-spec') {
        throw new Error('T3.2: quick profile did not skip ux-spec phase');
      }

      // T3.3: readiness gate returns valid structure
      const readinessOut = parseJson(run('node', [join(wfTarget, '.MOP/scripts/mop-workflow.mjs'), 'gate', 'readiness',
        '--actor', 'smoketester',
        '--task', 'implement a login form',
        '--profile', 'quick'
      ], { cwd: wfTarget }));
      if (typeof readinessOut.status !== 'string') throw new Error('T3.3: readiness status not a string');
      if (typeof readinessOut.stale !== 'boolean') throw new Error('T3.3: readiness stale not a boolean');

      // T3.4: drift check returns valid structure
      const driftOut = parseJson(run('node', [join(wfTarget, '.MOP/scripts/mop-workflow.mjs'), 'drift', 'check',
        '--actor', 'smoketester'
      ], { cwd: wfTarget }));
      if (typeof driftOut.drifted !== 'boolean') throw new Error('T3.4: drift check drifted not a boolean');
      if (!Array.isArray(driftOut.skippedPhases)) throw new Error('T3.4: drift check skippedPhases not an array');

      // T3.5: freshness check
      const artOut = parseJson(run('node', [join(wfTarget, '.MOP/scripts/mop-workflow.mjs'), 'artifact', 'create',
        '--actor', 'smoketester',
        '--type', 'prd',
        '--title', 'Test PRD'
      ], { cwd: wfTarget }));
      if (!artOut.ok) throw new Error('T3.5: failed to create artifact');

      const freshReadiness = parseJson(run('node', [join(wfTarget, '.MOP/scripts/mop-workflow.mjs'), 'gate', 'readiness',
        '--actor', 'smoketester',
        '--task', 'implement the test login feature',
        '--artifact', artOut.path
      ], { cwd: wfTarget }));
      if (freshReadiness.stale !== false) {
        throw new Error('T3.5: expected fresh artifact to not be stale');
      }

      console.log('[suite:workflow] OK');
    } finally {
      rmSync(wfTarget, { recursive: true, force: true });
    }
  }

  // ─── Suite 4: Federation & PII Scrubber ────────────────────────────────────
  if (suiteFilter === 'all' || suiteFilter === 'federation') {
    const fedTarget = mkdtempSync(join(tmpdir(), 'mop-fed-'));
    try {
      // Install fresh MOP
      run('node', ['.MOP/scripts/burhan-mop.mjs', 'install', '--target', fedTarget, '--json']);

      // Setup MOP in solo mode
      run('node', [join(fedTarget, '.MOP/scripts/mop-core.mjs'), 'setup',
        '--project-name', 'smoke-fed-test',
        '--name', 'Smoke Tester',
        '--codename', 'smoketester',
        '--password', 'smoke12345',
        '--mode', 'solo',
        '--conversation-language', 'English',
        '--coding-language', 'English',
        '--git-email', 'smoke@test.local',
        '--git-name', 'Smoke Tester'
      ], { cwd: fedTarget });

      // Login
      run('node', [join(fedTarget, '.MOP/scripts/mop-core.mjs'), 'login',
        '--codename', 'smoketester',
        '--password', 'smoke12345'
      ], { cwd: fedTarget });

      // Activate agent
      run('node', [join(fedTarget, '.MOP/scripts/mop-core.mjs'), 'agent', 'activate',
        '--actor', 'smoketester',
        '--role', 'core',
        '--title', 'Core Agent',
        '--name', 'Arif'
      ], { cwd: fedTarget });

      // Enable federation in target's STATE.json
      const statePath = join(fedTarget, '.MOP', 'STATE.json');
      const state = JSON.parse(readFileSync(statePath, 'utf8'));
      state.federation = { enabled: true, directory: '.MOP/memory/shared-ledger' };
      writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');

      // T4.1: memoryAdd with federation enabled scrubs summary and writes to outbound shared ledger
      const testSummary = "Test email user@test.com and phone +6012-3456789 and API sk-1234567890123456789012345678901234567890 and IC 990101-14-5566 and card 1111-2222-3333-4444";
      const addOut = parseJson(run('node', [join(fedTarget, '.MOP/scripts/mop-core.mjs'), 'memory', 'add',
        '--actor', 'smoketester',
        '--kind', 'conversation',
        '--summary', testSummary
      ], { cwd: fedTarget }));

      if (!addOut.ok) throw new Error('T4.1: memory add failed');
      if (addOut.summary.includes('user@test.com') || addOut.summary.includes('+6012-3456789')) {
        throw new Error('T4.1: summary was not scrubbed in output');
      }

      // T4.2: shared-ledger file created and contains scrubbed entry with hash chain
      const ledgerPath = join(fedTarget, '.MOP/memory/shared-ledger/ledger.jsonl');
      if (!existsSync(ledgerPath)) {
        throw new Error('T4.2: shared-ledger ledger.jsonl file not created');
      }

      const ledgerLines = readFileSync(ledgerPath, 'utf8').split(/\r?\n/).filter(Boolean);
      if (ledgerLines.length === 0) {
        throw new Error('T4.2: shared-ledger ledger.jsonl is empty');
      }

      const ledgerEntry = JSON.parse(ledgerLines[0]);
      if (ledgerEntry.summary.includes('user@test.com')) {
        throw new Error('T4.2: shared ledger entry summary was not scrubbed');
      }
      if (!ledgerEntry.hash || !ledgerEntry.prev) {
        throw new Error('T4.2: shared ledger entry missing hash chain fields');
      }

      // T4.3: mop-federation verify verifies successfully
      const verifyOut = parseJson(run('node', [join(fedTarget, '.MOP/scripts/mop-federation.mjs'), 'verify'], { cwd: fedTarget }));
      if (!verifyOut.verified) {
        throw new Error('T4.3: federation verify failed to verify a clean chain');
      }

      // T4.4: tampered ledger is caught by verify
      const originalContent = readFileSync(ledgerPath, 'utf8');
      const tamperedContent = originalContent.replace('[EMAIL_REDACTED]', 'tampered@email.com');
      writeFileSync(ledgerPath, tamperedContent, 'utf8');

      const verifyTampered = parseJson(run('node', [join(fedTarget, '.MOP/scripts/mop-federation.mjs'), 'verify'], { cwd: fedTarget }));
      if (verifyTampered.verified !== false) {
        throw new Error('T4.4: federation verify failed to detect tampered ledger content');
      }

      console.log('[suite:federation] OK');
    } finally {
      rmSync(fedTarget, { recursive: true, force: true });
    }
  }

  if (suiteFilter === 'all') {
    console.log('MOP smoke tests OK.');
  }
} finally {
  const tempRoot = tmpdir().replaceAll('\\', '/').toLowerCase();
  const targetPath = target.replaceAll('\\', '/').toLowerCase();
  if (targetPath.startsWith(tempRoot) && targetPath.includes('/mop-smoke-')) {
    rmSync(target, { recursive: true, force: true });
  }
}
