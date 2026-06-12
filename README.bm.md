<h1 align="center">BURHAN-MOP</h1>

<p align="center">
  <strong>MOP portable AI MemoryCore untuk Claude, Codex / ChatGPT, Gemini, dan Antigravity.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/burhan-mop">
    <img src="https://img.shields.io/npm/v/burhan-mop?style=for-the-badge&label=NPM" alt="npm version">
  </a>
  <a href="https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP">
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
  <img src="https://img.shields.io/badge/MOP_Workflow-BMAD_inspired-FFB000?style=flat-square" alt="MOP workflow">
</p>

<p align="center">
  <a href="./README.md">English</a>
  |
  <strong>Bahasa Melayu</strong>
</p>

---

## Apa Itu BURHAN-MOP?

BURHAN-MOP ialah **MOP (Memory of Planet) core** yang portable untuk workspace
coding AI. Ia bagi semua AI provider sumber kebenaran yang sama: memory project,
peraturan agent, workflow gate, folder artifact, autosycn, dan setup deploy.

Maksudnya mudah: pasang sekali, kemudian Claude, Codex / ChatGPT, Gemini, dan
Antigravity boleh masuk project yang sama dengan context yang sama.

## Install

Jalankan dalam root project:

```bash
npx burhan-mop install
npx burhan-mop doctor
```

Install ke folder lain:

```bash
npx burhan-mop install --target "C:\path\to\project"
```

Paksa overwrite install sedia ada:

```bash
npx burhan-mop install --force
```

Installer akan tunjuk terminal UI yang kemas secara default. Untuk automation,
guna JSON:

```bash
npx burhan-mop install --json
npx burhan-mop doctor --json
```

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
| Agent Router | Pilih satu primary agent dan tambah support agent bila perlu. |
| Party Mode | Tunjuk perbincangan agent-to-agent untuk keputusan multi-role. |
| MOP Workflow | Flow inspirasi BMAD dari idea sampai release dengan readiness gate. |
| Artifacts | Simpan plan, spec, review, dan release notes dalam `.MOP/artifacts/`. |
| Autosycn | Commit dan push guna identiti user sebenar, bukan identiti AI tool. |
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
npx burhan-mop install
npx burhan-mop doctor
npx burhan-mop package
```

Helper dalam project:

```bash
node .MOP/scripts/mop-core.mjs status
node .MOP/scripts/mop-core.mjs validate
node .MOP/scripts/mop-workflow.mjs help --actor <codename> --task "<task>"
node .MOP/scripts/mop-autosycn.mjs run --actor <codename> --reason "<apa berubah>"
```

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
| npm package | [`burhan-mop`](https://www.npmjs.com/package/burhan-mop) |
| command latest | `npx burhan-mop install` |
| GitHub release | [`v0.1.8`](https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP/releases/tag/v0.1.8) |
| Node | `>=20` |

## Links

- npm: https://www.npmjs.com/package/burhan-mop
- GitHub: https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP
- English README: [README.md](./README.md)
