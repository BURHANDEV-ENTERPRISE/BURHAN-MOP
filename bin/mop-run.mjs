#!/usr/bin/env node
// bin/mop-run.mjs — cross-platform command runner untuk MOP hooks
// Guna ini dalam semua hook: node bin/mop-run.mjs <script> [...args]
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const [,, scriptPath, ...args] = process.argv;
const resolved = resolve(scriptPath);
if (!existsSync(resolved)) {
  console.error(`[mop-run] Script tidak dijumpai: ${resolved}`);
  process.exit(0); // exit 0 supaya hook tak halang git operation
}
const result = spawnSync(process.execPath, [resolved, ...args], {
  stdio: 'inherit',
  env: { ...process.env }
});
process.exit(result.status ?? 0);
