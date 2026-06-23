<h1 align="center">MOP Flow</h1>

<p align="center">
  <strong>MOP portable AI MemoryCore untuk Claude, Codex / ChatGPT, Gemini, dan Antigravity.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/mop-flow">
    <img src="https://img.shields.io/badge/V1.4.4-cb3837?style=for-the-badge&label=NPM" alt="npm version">
  </a>
  <a href="https://github.com/BURHANDEV-ENTERPRISE/mop-flow">
    <img src="https://img.shields.io/badge/GitHub-BURHAN--MOP-181717?style=for-the-badge&logo=github" alt="GitHub repository">
  </a>
  <img src="https://img.shields.io/badge/Node-%3E%3D20-1FAE4B?style=for-the-badge&logo=node.js&logoColor=white" alt="Node 20+">
  <img src="https://img.shields.io/badge/License-UNLICENSED-9CA3AF?style=for-the-badge" alt="License">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude-ready-5A45FF?style=flat-square" alt="Claude ready">
  <img src="https://img.shields.io/badge/Codex-ready-111111?style=flat-square" alt="Codex ready">
  <img src="https://img.shields.io/badge/Gemini-ready-4285F4?style=flat-square" alt="Gemini ready">
  <img src="https://img.shields.io/badge/Antigravity-ready-00A67E?style=flat-square" alt="Antigravity ready">
  <img src="https://img.shields.io/badge/MOP_Flow-provider_neutral-00A67E?style=flat-square" alt="MOP Flow">
  <img src="https://img.shields.io/badge/MOP_Workflow-BMAD_inspired-FFB000?style=flat-square" alt="MOP workflow">
</p>

<p align="center">
  <a href="./README.md">English</a>
  |
  <strong>Bahasa Melayu</strong>
</p>

---

## Apa Itu MOP Flow?

MOP Flow ialah **MOP (Memory of Planet) core** yang portable untuk workspace
coding AI. Ia bagi semua AI provider sumber kebenaran yang sama: memory project,
peraturan agent, workflow gate, folder artifact, autosycn, dan setup deploy.

Maksudnya mudah: pasang sekali, kemudian Claude, Codex / ChatGPT, Gemini, dan
Antigravity boleh masuk project yang sama dengan context yang sama.

## MOP Flow

MOP Flow ialah layer orchestration dan skill bridge yang neutral provider untuk
MOP. Ia pastikan brand dan rules MOP berada di atas upstream runtime
Ruflo / Claude Flow, jadi Claude, Codex, Gemini, dan Antigravity nampak skill
inventory dan MCP runtime surface yang sama.

```bash
npx mop-flow
```

Roadmap improvement aktif ada di `.MOP/flow/ROADMAP.md`.

## Install

Jalankan ini dalam terminal anda untuk membuka Dashboard TUI interaktif:

```bash
npx mop-flow
```

TUI interaktif akan membenarkan anda untuk Install, Update, Delete, atau menyemak Status MOP Flow terus dalam projek anda tanpa perlu mengingati arahan (commands) yang kompleks.

Selepas install, buka AI coding chat dalam project itu dan jalankan:

```text
/mop-setup
```

## Apa Yang Dipasang

| Path | Fungsi |
| --- | --- |
| `.MOP/` | State, protocol, script, workflow config, dan template artifact MOP. |
| `AGENTS.md` | Arahan neutral untuk Codex / ChatGPT coding agents. |
| `CLAUDE.md` | Entry point dan rules untuk Claude Code. |
| `GEMINI.md` | Entry point untuk Gemini CLI. |
| `.agents/` | Agent dan skill yang sesuai untuk Antigravity. |
| `.codex/`, `.gemini/`, `.claude/` | Config dan skill surface ikut provider. |

## Fungsi Utama

| Fungsi | Apa dia buat |
| --- | --- |
| Auth Gate | First action mesti setup/login. AI tidak terus bekerja sebelum gate lulus. |
| Agent Router | 32 ejen khusus tersedia via `.MOP/STATE.json`. Pilih satu primary agent dan tambah support agent bila perlu. |
| Party Mode | Tunjuk perbincangan agent-to-agent untuk keputusan multi-role. |
| MOP Flow | Skill bridge dan MCP runtime wrapper neutral provider untuk Claude, Codex, Gemini, dan Antigravity. |
| Brain Link Service | Link project ke MOP Agent, daftar lokal, dan hidupkan relay background. |
| MOP Workflow | Flow inspirasi BMAD 10-Fasa dari idea sampai release dengan readiness gate. |
| Artifacts | Simpan plan, spec, review, dan release notes dalam `.MOP/artifacts/`. |
| Autosync | Commit dan push guna identiti user sebenar, bukan identiti AI tool. |
| Auto Deploy | Setup optional untuk GitHub, Docker, dan Vercel. |

## Flow Sesi Pertama

```text
1. AI baca .MOP/STATE.json
2. Jika belum setup, AI suruh jalankan /mop-setup
3. Setup tanya nama project, owner, codename, password, mode, bahasa, dan GitHub
4. Selepas login, setiap task lalu Agent Router
5. Task kompleks guna MOP Workflow dan readiness gate sebelum coding
```

## Command Berguna

```bash
npx mop-flow
```

Helper dalam project:

```bash
node .MOP/scripts/mop-core.mjs status
node .MOP/scripts/mop-core.mjs validate
node .MOP/scripts/mop-flow.mjs status
node .MOP/scripts/mop-flow.mjs link <https://agent/v1/api/link/key>
node .MOP/scripts/mop-flow.mjs service install --start
node .MOP/scripts/mop-flow.mjs service list
node .MOP/scripts/mop-workflow.mjs help --actor <codename> --task "<task>"
node .MOP/scripts/mop-autosycn.mjs run --actor <codename> --reason "<apa berubah>"
node .MOP/scripts/mop-mcp.mjs start  # Native Model Context Protocol (MCP) server
```

## Relay Brain Background

`mop-flow link` simpan token private dalam `.MOP/link.json` dan daftar project
ke registry service lokal pada PC itu. Jalankan ini sekali sahaja pada setiap PC
supaya semua relay project berdaftar auto hidup bila Windows start atau bila
Linux user session start:

```bash
npx mop-flow service install --start
```

Selepas itu, setiap project yang anda link dari PC sama akan dipickup oleh
service. Guna `npx mop-flow service list` untuk lihat project berdaftar.
Registry service tidak simpan token; setiap project kekalkan token sendiri dalam
`.MOP/link.json` yang gitignored.

`npx mop-flow` juga ada menu Control Center ringkas: Install, Update, Doctor,
Status, Link, Delete, Skills, dan Exit. Action Link ialah all-in-one: paste URL
Brain, link project, kemudian install/start background relay service secara
automatik.

## Workflow Team

Dalam team mode, kerja akan push ke branch user dulu:

```text
dev/<codename> -> BURHAN-MOP review -> main
```

BURHAN-MOP bertindak sebagai merge guardian. Ia semak branch, validate state,
dan merge hanya bila workflow selamat.

## Release

| Item | Nilai |
| --- | --- |
| npm package | [`mop-flow`](https://www.npmjs.com/package/mop-flow) |
| command | `npx mop-flow install` |
| legacy alias | `npx burhan-mop install` |
| GitHub release | [`v1.4.4`](https://github.com/BURHANDEV-ENTERPRISE/mop-flow/releases/tag/v1.4.4) |
| Node | `>=20` |

## Links

- npm: https://www.npmjs.com/package/mop-flow
- GitHub: https://github.com/BURHANDEV-ENTERPRISE/mop-flow
- English README: [README.md](./README.md)
