#!/usr/bin/env node
import * as readline from 'node:readline';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const coreDir = resolve(here, '..');
const packageRoot = resolve(coreDir, '..');
const cwd = process.cwd();

function readPackageVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
    return pkg.version;
  } catch {
    return 'Unknown';
  }
}

function readInstalledVersion() {
  if (!existsSync(join(cwd, '.MOP'))) return null;
  try {
    return readFileSync(join(cwd, '.MOP', 'VERSION.txt'), 'utf8').trim();
  } catch {
    return '< 0.2.0';
  }
}

let packageVersion = readPackageVersion();
let installedVersion = readInstalledVersion();
let selectedIndex = 0;
let busy = false;

const colorEnabled = process.stdout.isTTY && !process.env.NO_COLOR;
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  bgCyan: '\x1b[46m',
  black: '\x1b[30m'
};

function paint(name, value) {
  if (!colorEnabled) return value;
  return `${colors[name]}${value}${colors.reset}`;
}

const actions = [
  {
    id: 'install',
    group: 'Project Core',
    label: 'Install MOP Core',
    description: 'Copy MOP files into this project.',
    bin: 'installer',
    args: ['install'],
    show: () => !installedVersion
  },
  {
    id: 'update',
    group: 'Project Core',
    label: 'Update MOP Core',
    description: 'Refresh scripts and configs while preserving project state.',
    bin: 'installer',
    args: ['install', '--force'],
    show: () => Boolean(installedVersion && installedVersion !== packageVersion)
  },
  {
    id: 'doctor',
    group: 'Project Core',
    label: 'Doctor Check',
    description: 'Run workspace health checks.',
    bin: 'installer',
    args: ['doctor']
  },
  {
    id: 'status',
    group: 'Project Core',
    label: 'Flow Status',
    description: 'Show provider bridge and skill status.',
    bin: 'flow',
    args: ['status']
  },
  {
    id: 'link',
    group: 'Brain Link',
    label: 'Link To Brain',
    description: 'Paste an Add Project URL and register this project.',
    bin: 'flow',
    args: async () => {
      const url = await askLine('Paste Brain link URL');
      return url ? ['link', url] : null;
    },
    show: () => Boolean(installedVersion)
  },
  {
    id: 'relay-once',
    group: 'Brain Link',
    label: 'Push Snapshot Once',
    description: 'Send one project snapshot without staying connected.',
    bin: 'flow',
    args: ['relay', '--once'],
    show: () => Boolean(installedVersion)
  },
  {
    id: 'service-install',
    group: 'Brain Link',
    label: 'Install Background Relay',
    description: 'Autostart all registered project relays on this PC.',
    bin: 'flow',
    args: ['service', 'install', '--start']
  },
  {
    id: 'service-list',
    group: 'Brain Link',
    label: 'Relay Service List',
    description: 'Show registered projects and autostart status.',
    bin: 'flow',
    args: ['service', 'list']
  },
  {
    id: 'skills',
    group: 'Tools',
    label: 'Skills List',
    description: 'List portable and runtime-bridged skills.',
    bin: 'flow',
    args: ['skills', 'list']
  },
  {
    id: 'delete',
    group: 'Danger Zone',
    label: 'Delete MOP Core',
    description: 'Remove installed MOP files from this project.',
    bin: 'installer',
    args: ['delete'],
    show: () => Boolean(installedVersion)
  },
  {
    id: 'exit',
    group: 'Danger Zone',
    label: 'Exit',
    description: 'Close this menu.',
    bin: null,
    args: []
  }
];

function selectedAction() {
  return visibleActions()[selectedIndex];
}

function isDisabled(action) {
  return typeof action.disabled === 'function' && action.disabled();
}

function visibleActions() {
  return actions.filter((action) => typeof action.show !== 'function' || action.show());
}

function refreshState() {
  packageVersion = readPackageVersion();
  installedVersion = readInstalledVersion();
}

function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[0f');
}

function visibleLength(value) {
  return String(value).replace(/\x1b\[[0-9;]*m/g, '').length;
}

function padRight(value, width) {
  const text = String(value);
  const len = visibleLength(text);
  return len >= width ? text : `${text}${' '.repeat(width - len)}`;
}

function line(width = 74) {
  return `+${'-'.repeat(width - 2)}+`;
}

function row(left = '', right = '', width = 74) {
  const bodyWidth = width - 4;
  const rightText = right ? ` ${right}` : '';
  const leftWidth = Math.max(0, bodyWidth - visibleLength(rightText));
  return `| ${padRight(left, leftWidth)}${rightText} |`;
}

function statusPill(label, value, color = 'green') {
  return `${paint('dim', label)} ${paint(color, value)}`;
}

function renderHeader() {
  const width = 70;
  console.log(paint('cyan', line(width)));
  console.log(row(paint('bold', 'MOP FLOW'), statusPill('Package', packageVersion, 'green'), width));
  console.log(row('MemoryCore + Brain Relay', installedVersion
    ? statusPill('Installed', installedVersion, installedVersion === packageVersion ? 'green' : 'yellow')
    : statusPill('Installed', 'Not installed', 'gray'), width));
  console.log(paint('cyan', line(width)));
  console.log('');
}

function renderMenu() {
  clearScreen();
  refreshState();
  const visible = visibleActions();
  if (selectedIndex >= visible.length) selectedIndex = Math.max(0, visible.length - 1);
  renderHeader();

  console.log(paint('dim', 'Up/Down: move   Enter: run   q: quit'));
  console.log('');

  let currentGroup = '';
  visible.forEach((action, index) => {
    if (action.group !== currentGroup) {
      currentGroup = action.group;
      if (index > 0) console.log('');
      console.log(paint('magenta', currentGroup));
    }

    const cursor = index === selectedIndex ? paint('cyan', '>') : ' ';
    const indexText = String(index + 1).padStart(2, '0');
    const label = index === selectedIndex
      ? paint('black', paint('bgCyan', paint('bold', ` ${action.label} `)))
      : action.label;
    console.log(` ${cursor} ${paint('dim', indexText)}  ${label}`);
  });

  console.log('');
  const action = selectedAction();
  console.log(paint('cyan', line(70)));
  console.log(row(paint('bold', action.label), action.group, 70));
  console.log(row(action.description, '', 70));
  console.log(paint('cyan', line(70)));
}

function resolveBin(kind) {
  if (kind === 'installer') return join(here, 'burhan-mop.mjs');
  if (kind === 'dashboard') return join(here, 'mop-dashboard.mjs');
  return join(here, 'mop-flow.mjs');
}

async function askLine(label) {
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.stdin.removeAllListeners('keypress');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolveAnswer) => {
    rl.question(`${paint('cyan', label)}: `, resolveAnswer);
  });
  rl.close();
  return answer.trim();
}

async function runAction(action) {
  if (action.id === 'exit') return exitTui();
  if (isDisabled(action) || busy) return;
  busy = true;

  clearScreen();
  console.log(paint('cyan', line()));
  console.log(row(paint('bold', action.label), action.group));
  console.log(row(action.description));
  console.log(paint('cyan', line()));
  console.log('');

  let args = typeof action.args === 'function' ? await action.args() : action.args;
  if (!args) {
    console.log(paint('yellow', 'Cancelled. Press Enter to return to menu...'));
    return waitForReturn();
  }

  const bin = resolveBin(action.bin);
  console.log(paint('cyan', `Running: mop-flow ${args.join(' ')}`));
  console.log(paint('gray', '-'.repeat(74)));
  const result = spawnSync('node', [bin, ...args], {
    cwd,
    stdio: 'inherit',
    windowsHide: false
  });
  console.log(paint('gray', '-'.repeat(74)));
  if (result.status === 0) console.log(paint('green', 'Task completed. Press Enter to return to menu...'));
  else console.log(paint('red', `Task exited with code ${result.status}. Press Enter to return to menu...`));
  waitForReturn();
}

function waitForReturn() {
  const returnListener = (str, key) => {
    if (key.name !== 'return') return;
    process.stdin.removeListener('keypress', returnListener);
    busy = false;
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.on('keypress', handleKeypress);
    renderMenu();
  };
  readline.emitKeypressEvents(process.stdin);
  process.stdin.on('keypress', returnListener);
}

function exitTui() {
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.stdin.removeListener('keypress', handleKeypress);
  console.log('Exiting MOP Flow.');
  process.exit(0);
}

function handleKeypress(str, key = {}) {
  if (busy) return;
  const visible = visibleActions();
  if (key.name === 'up') {
    selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : visible.length - 1;
    renderMenu();
  } else if (key.name === 'down') {
    selectedIndex = selectedIndex < visible.length - 1 ? selectedIndex + 1 : 0;
    renderMenu();
  } else if (key.name === 'return') {
    runAction(selectedAction());
  } else if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
    exitTui();
  }
}

export function startTui() {
  if (process.argv.includes('--menu-json')) {
    console.log(JSON.stringify({
      packageVersion,
      installedVersion,
      actions: visibleActions().map(({ id, group, label, description }) => ({ id, group, label, description }))
    }, null, 2));
    return;
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.log('MOP Flow Control Center requires an interactive terminal.');
    console.log('Use `npx mop-flow --menu-json` to inspect available actions.');
    return;
  }

  renderMenu();
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', handleKeypress);
}

if (resolve(process.argv[1] || '') === resolve(fileURLToPath(import.meta.url))) {
  startTui();
}
