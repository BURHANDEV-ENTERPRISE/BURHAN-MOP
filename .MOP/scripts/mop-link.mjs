#!/usr/bin/env node
/**
 * mop-flow → gateway link handshake (v1).
 *
 * Posts the project manifest + roster + one-time pairing key to the gateway's
 * consolidated endpoint:
 *
 *   POST <gateway>/v1/api/link/flow
 *     { pairingKey, manifest:{ name, linkedBy }, roster:[{ codename, passwordHash? }] }
 *   → { projectLinkId, memberToken, channel, realtimeToken, expiresIn }
 *
 * The result is written to .MOP/link.json (gitignored — holds the memberToken
 * secret + short-lived Realtime JWT). On reconnect we re-use the stored
 * projectLinkId + memberToken to refresh just the JWT.
 *
 * This is the HANDSHAKE only — the live snapshot/tool transport over Supabase
 * Realtime is wired separately.
 *
 *   node .MOP/scripts/mop-link.mjs --key ABCD-EFGH [--gateway URL] [--name N] [--codename C]
 *   node .MOP/scripts/mop-link.mjs --reconnect [--gateway URL]
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync, chmodSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { platform } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const scriptCoreDir = resolve(here, '..'); // .MOP next to this script (package/scaffold copy)

/**
 * Resolve the project's `.MOP/` directory.
 *
 * `npx mop-flow link` may run the script from the npm cache / node_modules, so a
 * script-relative `.MOP` would point at the package, not the user's project.
 * Prefer the `.MOP/` of the project the user is standing in: walk up from CWD
 * looking for a real STATE.json, and only fall back to the script-relative copy.
 */
function resolveCoreDir() {
  let dir = process.cwd();
  for (let i = 0; i < 12; i++) {
    if (existsSync(join(dir, '.MOP', 'STATE.json'))) return join(dir, '.MOP');
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return scriptCoreDir;
}

const coreDir = resolveCoreDir(); // .MOP
const rootDir = resolve(coreDir, '..'); // project root
const statePath = join(coreDir, 'STATE.json');
const linkPath = join(coreDir, 'link.json');

const DEFAULT_GATEWAY = 'https://mop-gateway.burhan.my';
const LINK_SCHEMA = '1.0';

function readJson(path, fallback = {}) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return fallback;
  }
}

function gatewayBase(args) {
  return String(args.gateway || process.env.GATEWAY_URL || DEFAULT_GATEWAY).replace(/\/+$/, '');
}

/** Build the roster ([{ codename, passwordHash? }]) from STATE.members, incl. the linker. */
function buildRoster(state, linkedBy) {
  const seen = new Set();
  const roster = [];
  const members = state.members && typeof state.members === 'object' ? state.members : {};
  for (const [codename, info] of Object.entries(members)) {
    const cn = String((info && info.codename) || codename).trim();
    if (!cn || seen.has(cn)) continue;
    seen.add(cn);
    const entry = { codename: cn };
    const hash = info && (info.passwordHash || info.password_hash);
    if (hash) entry.passwordHash = hash;
    roster.push(entry);
  }
  if (linkedBy && !seen.has(linkedBy)) roster.push({ codename: linkedBy });
  return roster;
}

function writeLinkFile(link) {
  mkdirSync(dirname(linkPath), { recursive: true });
  const tmp = `${linkPath}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(link, null, 2)}\n`, 'utf8');
  renameSync(tmp, linkPath); // atomic
  try {
    chmodSync(linkPath, 0o600); // best-effort POSIX perms; no-op on Windows
  } catch {
    /* gitignored regardless */
  }
}

async function postLink(base, body) {
  let res;
  try {
    res = await fetch(`${base}/v1/api/link/flow`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new Error(`gateway_unreachable: ${base} (${err.message})`);
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`link_flow_failed:${res.status}:${text}`);
  }
  return res.json();
}

export async function runLink(args = {}) {
  const asJson = args.json === true || args.format === 'json';
  const base = gatewayBase(args);

  try {
    // ── Reconnect: refresh the channel JWT from the stored link ────────────────
    if (args.reconnect) {
      if (!existsSync(linkPath)) throw new Error('not_linked: run `mop-flow link --key <pairingKey>` first');
      const prev = readJson(linkPath);
      if (!prev.projectLinkId || !prev.memberToken) {
        throw new Error('link_file_incomplete: missing projectLinkId or memberToken');
      }
      const out = await postLink(base, {
        projectLinkId: prev.projectLinkId,
        memberToken: prev.memberToken,
      });
      const link = {
        ...prev,
        gatewayUrl: base,
        channel: out.channel,
        realtimeUrl: out.realtimeUrl ?? prev.realtimeUrl ?? null,
        realtimeToken: out.realtimeToken,
        expiresIn: out.expiresIn,
        reconnectedAt: new Date().toISOString(),
      };
      writeLinkFile(link);
      return report(link, asJson, 'reconnected');
    }

    // ── First link: consume a one-time pairing key ─────────────────────────────
    const key = typeof args.key === 'string' ? args.key.trim() : '';
    if (!key) throw new Error('usage: mop-flow link --key <pairingKey> [--gateway URL] [--name N] [--codename C]');

    const state = readJson(statePath);
    const name = String(args.name || state.projectName || 'project');
    const linkedBy = String(args.codename || state.activeMember || state.ownerCodename || '').trim() || undefined;
    const roster = buildRoster(state, linkedBy);

    const out = await postLink(base, {
      pairingKey: key,
      manifest: { name, linkedBy, platform: platform(), mopFlow: state.mopFlow?.version ?? null },
      roster,
    });

    const link = {
      schemaVersion: LINK_SCHEMA,
      gatewayUrl: base,
      projectLinkId: out.projectLinkId,
      channel: out.channel,
      realtimeUrl: out.realtimeUrl ?? null,
      memberToken: out.memberToken ?? null,
      realtimeToken: out.realtimeToken,
      expiresIn: out.expiresIn,
      linkedBy: linkedBy ?? null,
      linkedAt: new Date().toISOString(),
      lastSyncAt: null,
    };
    writeLinkFile(link);
    return report(link, asJson, 'linked');
  } catch (err) {
    if (asJson) {
      console.log(JSON.stringify({ ok: false, error: err.message }, null, 2));
    } else {
      console.error(`✗ ${err.message}`);
    }
    process.exitCode = 1;
  }
}

function report(link, asJson, verb) {
  if (asJson) {
    // Never echo the secret memberToken / full JWT in JSON output.
    const { memberToken, realtimeToken, ...safe } = link;
    console.log(JSON.stringify({ ok: true, verb, link: { ...safe, hasMemberToken: !!memberToken } }, null, 2));
    return;
  }
  console.log(`🔗 ${verb}: ${link.projectLinkId} @ ${link.gatewayUrl}`);
  console.log(`   channel: ${link.channel}`);
  if (link.linkedBy) console.log(`   linkedBy: ${link.linkedBy}`);
  console.log(`   realtime JWT: ${String(link.realtimeToken).slice(0, 24)}… (expires in ${link.expiresIn}s)`);
  console.log(`   saved: .MOP/link.json (gitignored)`);
}

// Allow direct invocation: node .MOP/scripts/mop-link.mjs --key ...
if (resolve(process.argv[1] || '') === resolve(fileURLToPath(import.meta.url))) {
  const args = { _: [] };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith('--')) {
      args._.push(item);
      continue;
    }
    const [key, inline] = item.slice(2).split('=', 2);
    if (inline !== undefined) {
      args[key] = inline;
    } else if (!argv[i + 1] || argv[i + 1].startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = argv[(i += 1)];
    }
  }
  runLink(args);
}
