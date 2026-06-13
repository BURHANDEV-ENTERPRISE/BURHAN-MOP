#!/usr/bin/env node
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

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

const target = mkdtempSync(join(tmpdir(), 'mop-smoke-'));

try {
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

  run('node', ['.MOP/scripts/mop-core.mjs', 'validate']);
  console.log('MOP smoke tests OK.');
} finally {
  const tempRoot = tmpdir().replaceAll('\\', '/').toLowerCase();
  const targetPath = target.replaceAll('\\', '/').toLowerCase();
  if (targetPath.startsWith(tempRoot) && targetPath.includes('/mop-smoke-')) {
    rmSync(target, { recursive: true, force: true });
  }
}
