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
