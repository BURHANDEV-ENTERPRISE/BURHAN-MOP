#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, '..', '..');

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith('--')) {
      out._.push(item);
      continue;
    }
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      out[key] = true;
    } else {
      out[key] = next;
      i += 1;
    }
  }
  return out;
}

function copyPath(source, target, force = false) {
  if (!existsSync(source)) return { source, target, status: 'missing-source' };
  if (existsSync(target) && !force) return { source, target, status: 'skipped-existing' };
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true, force: true });
  return { source, target, status: 'installed' };
}

function install(args) {
  const targetRoot = resolve(String(args.target || process.cwd()));
  const force = args.force === true;
  const entries = [
    'AGENTS.md',
    'CLAUDE.md',
    'GEMINI.md',
    '.memoryofplanet',
    '.agents',
    '.claude',
    '.claude-flow',
    '.codex',
    '.gemini',
    '.mcp.json'
  ];
  const results = entries.map((entry) => copyPath(
    join(packageRoot, entry),
    join(targetRoot, entry),
    force
  ));
  console.log(JSON.stringify({
    ok: true,
    command: 'npx burhan-mop install',
    target: targetRoot,
    force,
    results,
    next: [
      'Run /mop-setup in the target project.',
      'For team mode, initialize autosycn after setup.',
      'Use: node .memoryofplanet/scripts/mop-workflow.mjs help --actor <codename> --task "lepas ni buat apa?"'
    ]
  }, null, 2));
}

function doctor() {
  const required = [
    'AGENTS.md',
    'CLAUDE.md',
    'GEMINI.md',
    '.memoryofplanet/STATE.json',
    '.memoryofplanet/PROTOCOL.md',
    '.memoryofplanet/scripts/mop-core.mjs',
    '.memoryofplanet/scripts/mop-workflow.mjs',
    '.agents/skills/mop-help/SKILL.md'
  ];
  const results = required.map((entry) => {
    const path = join(process.cwd(), entry);
    return {
      entry,
      exists: existsSync(path),
      type: existsSync(path) ? (statSync(path).isDirectory() ? 'dir' : 'file') : 'missing'
    };
  });
  console.log(JSON.stringify({
    ok: results.every((item) => item.exists),
    cwd: process.cwd(),
    results
  }, null, 2));
}

function listPackage() {
  console.log(JSON.stringify({
    packageRoot,
    entries: readdirSync(packageRoot, { withFileTypes: true }).map((item) => ({
      name: item.name,
      type: item.isDirectory() ? 'dir' : 'file'
    }))
  }, null, 2));
}

function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);
  if (command === 'install') return install(args);
  if (command === 'doctor') return doctor(args);
  if (command === 'package') return listPackage();
  console.log(`Usage:
  npx burhan-mop install [--target PATH] [--force]
  npx burhan-mop doctor
  npx burhan-mop package`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
