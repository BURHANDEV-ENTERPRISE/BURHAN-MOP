<h1 align="center">BURHAN-MOP</h1>

<p align="center">
  <strong>MemoryOfPlanet portable AI MemoryCore for Claude, Codex / ChatGPT, Gemini, and Antigravity.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/burhan-mop">
    <img src="https://img.shields.io/npm/v/burhan-mop?style=for-the-badge&label=npm" alt="npm version">
  </a>
  <a href="https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP">
    <img src="https://img.shields.io/badge/GitHub-BURHAN--MOP-181717?style=for-the-badge&logo=github" alt="GitHub repository">
  </a>
  <img src="https://img.shields.io/badge/Node-%3E%3D20-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node 20+">
  <img src="https://img.shields.io/badge/License-UNLICENSED-lightgrey?style=for-the-badge" alt="License">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude-ready-5A45FF?style=flat-square" alt="Claude ready">
  <img src="https://img.shields.io/badge/Codex-ready-111111?style=flat-square" alt="Codex ready">
  <img src="https://img.shields.io/badge/Gemini-ready-4285F4?style=flat-square" alt="Gemini ready">
  <img src="https://img.shields.io/badge/Antigravity-ready-00A67E?style=flat-square" alt="Antigravity ready">
  <img src="https://img.shields.io/badge/MOP_Workflow-BMAD_inspired-FFB000?style=flat-square" alt="MOP workflow">
</p>

<div align="center">

| English | Bahasa Melayu |
| --- | --- |
| Portable memory, agent routing, workflow gates, artifacts, autosycn, and deploy setup for AI coding workspaces. | Memory portable, routing agent, workflow gate, artifact, autosycn, dan setup deploy untuk workspace coding AI. |
| Install into any project root with `npx burhan-mop install`. | Pasang ke root mana-mana projek dengan `npx burhan-mop install`. |
| Built for multi-provider use, not Claude-only. | Dibina untuk banyak provider, bukan Claude sahaja. |

</div>

---

## Table of Contents

- [English](#english)
  - [What is BURHAN-MOP?](#what-is-burhan-mop)
  - [Quick Start](#quick-start)
  - [Setup Wizard](#setup-wizard)
  - [Daily Usage](#daily-usage)
  - [Agents and Party Mode](#agents-and-party-mode)
  - [MOP Workflow](#mop-workflow)
  - [Artifacts](#artifacts)
  - [Autosycn](#autosycn)
  - [Auto Deploy](#auto-deploy)
  - [CLI Reference](#cli-reference)
  - [Provider Support](#provider-support)
  - [Publishing to npm](#publishing-to-npm)
  - [Troubleshooting](#troubleshooting)
- [Bahasa Melayu](#bahasa-melayu)
  - [Apa itu BURHAN-MOP?](#apa-itu-burhan-mop)
  - [Mula Cepat](#mula-cepat)
  - [Setup Wizard](#setup-wizard-bm)
  - [Cara Guna Harian](#cara-guna-harian)
  - [Agent dan Party Mode](#agent-dan-party-mode)
  - [MOP Workflow](#mop-workflow-bm)
  - [Artifacts](#artifacts-bm)
  - [Autosycn](#autosycn-bm)
  - [Auto Deploy](#auto-deploy-bm)
  - [Rujukan CLI](#rujukan-cli)
  - [Sokongan Provider](#sokongan-provider)
  - [Publish ke npm](#publish-ke-npm)
  - [Troubleshooting BM](#troubleshooting-bm)

---

# English

## What is BURHAN-MOP?

BURHAN-MOP is a portable MemoryOfPlanet core for AI-assisted software projects.
It gives AI coding agents a shared project memory, an authentication gate, named
agent identities, workflow stages, artifact output, autosync rules, and
deployment setup guidance.

The goal is simple: when an AI enters a workspace, it should understand who is
working, which project state is true, which agent should lead, what should be
planned before coding, and how work should be saved.

### Core Promise

| Area | What BURHAN-MOP provides |
| --- | --- |
| Memory | Durable `.memoryofplanet/STATE.json` plus protocol instructions. |
| Security | First-action authentication gate with scrypt password verification. |
| Agents | Named agents with ownership rules and task routing. |
| Workflow | BMAD-inspired MOP workflow from idea to release. |
| Artifacts | Organized outputs under `.memoryofplanet/artifacts/<category>/<slug>/<type>.md`. |
| Git | Identity-safe `autosycn` flow using real user Git identity. |
| Deploy | Opt-in auto-deploy setup for GitHub, Docker, and Vercel. |
| Providers | Claude, Codex / ChatGPT coding agents, Gemini CLI, and Antigravity entrypoints. |

## Quick Start

### Install from npm

BURHAN-MOP is published on npm as
[`burhan-mop`](https://www.npmjs.com/package/burhan-mop). Run this from the
project root where you want to install the MemoryOfPlanet core:

```bash
npx burhan-mop install
```

Install into another folder:

```bash
npx burhan-mop install --target "C:\path\to\project"
```

Overwrite existing BURHAN-MOP files:

```bash
npx burhan-mop install --force
```

### Install from GitHub source

Use the GitHub source install only for development builds or as a fallback when
you specifically want the repository version instead of the npm release:

```bash
npx --yes github:BURHANDEV-ENTERPRISE/BURHAN-MOP install
```

### Verify the install

```bash
npx burhan-mop doctor
```

Or locally inside the project:

```bash
node .memoryofplanet/scripts/burhan-mop.mjs doctor
```

## Setup Wizard

After installing the core into a project, start a new AI chat inside that
workspace. The first instruction is always to read `.memoryofplanet/STATE.json`.

If `initialized` is `false`, the AI must only run setup.

The setup wizard asks, in order:

1. Project name, defaulting to the current folder name.
2. Owner display name.
3. Owner codename.
4. Password.
5. Project mode: `solo` or `team`.
6. Conversation language.
7. Coding/adventure language.
8. GitHub project link.
9. GitHub username.
10. Git commit email.
11. Team join mode, if team mode is selected.
12. Whether to activate auto deploy now or later.

CLI setup example:

```bash
node .memoryofplanet/scripts/mop-core.mjs setup ^
  --project-name "My Project" ^
  --name "MoonWiRaja" ^
  --codename moon ^
  --password "your-password" ^
  --mode team ^
  --conversation-language "Melayu" ^
  --coding-language "English" ^
  --git-email "168633207+MoonWIRaja@users.noreply.github.com" ^
  --git-name "MoonWiRaja" ^
  --github-username "MoonWIRaja" ^
  --github-url "https://github.com/owner/repo.git" ^
  --join-mode owner-approved
```

## Daily Usage

### First action in every new session

The AI must read:

```text
.memoryofplanet/STATE.json
```

Then it follows:

```text
.memoryofplanet/PROTOCOL.md
```

If the core is initialized and no member is active, the AI asks only:

```text
Codename dan password.
```

No file inspection, answering, planning, or coding should happen before the
authentication gate passes.

### After login

The AI must route the task to a primary agent:

```bash
node .memoryofplanet/scripts/mop-core.mjs agent route --actor <codename> --task "<user task>"
```

If an agent role is needed for the first time, the user names that agent:

```bash
node .memoryofplanet/scripts/mop-core.mjs agent activate --actor <codename> --role architect --title "System Architect" --name "Nimo"
```

## Agents and Party Mode

BURHAN-MOP treats agents as named identities, not just anonymous roles.

### Agent ownership

| Rule | Meaning |
| --- | --- |
| Same name | Shared agent consciousness across members in team mode. |
| Different name | Different agent, even if the role is the same. |
| Owners | `agentRoster[].owners` decides who can use the agent. |
| Active agent | Every real conversation or action should run through an active named agent. |

### Router behavior

The router chooses one primary agent. It may recommend any number of support
agents when the task truly needs them.

Examples:

| User task | Primary agent | Possible support agents |
| --- | --- | --- |
| Build a new system | `architect` | `planner`, `researcher`, `prompt`, `coder`, `reviewer` |
| Design animated UI | `frontend` or `design` | `ux`, `accessibility`, `performance` |
| Review security | `security` | `reviewer`, `tester`, `architect` |
| Publish package | `deploy` or `github` | `devops`, `reviewer`, `memory` |

### Party Mode format

When several agents should reason together, BURHAN-MOP shows:

```text
PARTY MODE

agent: Nimo (architect) to agent: Pixel (frontend)

          What browser constraints affect this scroll animation?

agent: Pixel (frontend) to agent: Nimo (architect)

          We need frame-based scroll mapping, reduced-motion fallback, and asset preloading.
```

## MOP Workflow

MOP Workflow is BMAD-inspired, but adapted for MemoryOfPlanet and multi-agent
use.

```text
idea -> brief -> prd -> ux-spec -> architecture -> story -> readiness -> implementation -> review -> release
```

Use the workflow helper:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs help --actor <codename> --task "what should we do next?"
```

It returns:

- suggested phase
- lead agent role
- support or party roles
- next artifact type
- readiness gate requirement
- next command

Before coding:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs gate readiness --actor <codename> --task "<task>"
```

For risky or important work:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs review adversarial --actor <codename> --target "<plan or file>"
```

## Artifacts

Artifacts keep planning output organized and prevent root clutter.

Output layout:

```text
.memoryofplanet/artifacts/<category>/<artifact-slug>/<type>.md
```

Default categories:

| Category | Artifact types |
| --- | --- |
| `plan` | `product-brief`, `prd`, `story` |
| `design` | `ux-spec` |
| `architecture` | `architecture` |
| `readiness` | `readiness-report` |
| `implementation` | `implementation-notes` |
| `review` | `review`, `adversarial-review` |
| `release` | `release-notes`, `handoff` |
| `decisions` | `decision-log` |

Create an artifact:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs artifact create --actor moon --type prd --title "Portfolio System"
```

Preview without writing:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs artifact create --actor moon --type prd --title "Portfolio System" --dry-run
```

## Project Root Policy

BURHAN-MOP tells AI agents that the workspace root is the project root.

Agents should not create a wrapper folder such as:

```text
portfolio/
my-app/
<project-name>/
```

Then build inside it, unless the user explicitly asks for a monorepo or
multiple apps.

Correct top-level folders include:

```text
src/
app/
pages/
components/
public/
assets/
tests/
docs/
config/
scripts/
```

## Autosycn

`autosycn` is the intentional project spelling for the autosync skill.

It saves memory, commits with the real user identity, pushes to the correct
branch, and lets BURHAN-MOP review merges.

### Solo mode

| Action | Branch |
| --- | --- |
| Work | `main` |
| Push | `main` |
| Merge | Not needed |

### Team mode

| Action | Branch |
| --- | --- |
| Main trunk | `main` |
| User work | `dev/<codename>` |
| Review and merge | BURHAN-MOP checks and merges to `main` |

### Required user Git identity

```bash
node .memoryofplanet/scripts/mop-core.mjs member git-identity --actor moon --name "MoonWiRaja" --email "168633207+MoonWIRaja@users.noreply.github.com" --github-username "MoonWIRaja"
```

### Initialize autosycn

```bash
node .memoryofplanet/scripts/mop-autosycn.mjs init --actor moon --url "https://github.com/owner/repo.git"
```

### Before work

```bash
node .memoryofplanet/scripts/mop-autosycn.mjs preflight --actor moon
```

### After changes

```bash
node .memoryofplanet/scripts/mop-autosycn.mjs run --actor moon --reason "Implemented feature"
```

Important: GitHub commit attribution comes from the commit email. GitHub push
actor comes from the credential or SSH key used by `git push`.

## Auto Deploy

Auto deploy is available, but opt-in.

Supported providers:

| Provider | Purpose |
| --- | --- |
| GitHub | GitHub Pages or GitHub Actions deploy flow. |
| Docker | Dockerfile and compose-based deployment. |
| Vercel | Vercel project linking and deploy settings. |

The AI must ask:

```text
Nak aktifkan auto deploy sekarang? Pilih provider: GitHub, Docker, Vercel.
```

If the user says later or no, the AI replies:

```text
Okey, nanti kalau nak deploy beri tahu saya. Saya setup auto deploy.
```

## CLI Reference

### Package installer

```bash
npx burhan-mop install
npx burhan-mop install --target "C:\path\to\project"
npx burhan-mop install --force
npx burhan-mop doctor
npx burhan-mop package
```

### Core

```bash
node .memoryofplanet/scripts/mop-core.mjs status
node .memoryofplanet/scripts/mop-core.mjs validate
node .memoryofplanet/scripts/mop-core.mjs login --codename moon --password "<password>"
node .memoryofplanet/scripts/mop-core.mjs agent route --actor moon --task "<task>"
node .memoryofplanet/scripts/mop-core.mjs agent list
```

### Workflow

```bash
node .memoryofplanet/scripts/mop-workflow.mjs status --actor moon
node .memoryofplanet/scripts/mop-workflow.mjs help --actor moon --task "<task>"
node .memoryofplanet/scripts/mop-workflow.mjs artifact create --actor moon --type prd --title "Title"
node .memoryofplanet/scripts/mop-workflow.mjs gate readiness --actor moon --task "<task>"
node .memoryofplanet/scripts/mop-workflow.mjs review adversarial --actor moon --target "<target>"
```

## Provider Support

| Provider | Entry point |
| --- | --- |
| Codex / ChatGPT coding agents | `AGENTS.md`, `.codex/config.toml` |
| Claude Code | `CLAUDE.md`, `.claude/settings.json`, `.claude/skills/` |
| Gemini CLI | `GEMINI.md`, `.gemini/settings.json` |
| Antigravity | `.agents/AGENTS.md`, `.agents/skills/` |
| MCP-compatible clients | `.mcp.json` |

## Publishing to npm

Current public package:

| Field | Value |
| --- | --- |
| Package | [`burhan-mop`](https://www.npmjs.com/package/burhan-mop) |
| Current release | `0.1.0` |
| Install command | `npx burhan-mop install` |

npm versions are immutable. Before publishing the next release, update
`package.json` to a new version such as `0.1.1`, `0.2.0`, or `1.0.0`.

### Local publish flow

```bash
npm login --auth-type=web
npm whoami
npm run validate
npm run doctor
npm run pack:dry
npm publish
```

If npm requires a 2FA code, publish with:

```bash
npm publish --otp=123456
```

After publish:

```bash
npm view burhan-mop version
npx --yes burhan-mop package
npx --yes burhan-mop install --target "C:\path\to\empty-test-folder"
```

### GitHub Actions publish flow

This repository includes:

```text
.github/workflows/npm-publish.yml
```

Recommended secure setup:

1. Open the npm package settings after the first publish.
2. Configure trusted publishing for GitHub Actions.
3. Use repository `BURHANDEV-ENTERPRISE/BURHAN-MOP`.
4. Use workflow `.github/workflows/npm-publish.yml`.
5. Run the workflow manually with `dry_run: true`.
6. Run again with `dry_run: false` when ready.

The workflow checks whether the current `package.json` version already exists on
npm. If it does, the publish step is skipped so GitHub releases do not fail just
because a version was published manually first.

Alternative setup:

1. Create an npm granular access token with publish permission.
2. Add it to GitHub repository secrets as `NPM_TOKEN`.
3. Run the `Publish to npm` workflow.

## Troubleshooting

<details>
  <summary>npm publish says ENEEDAUTH</summary>

You are not logged in to npm on this machine. Run:

```bash
npm login --auth-type=web
npm whoami
```

Then publish again.
</details>

<details>
  <summary>npx burhan-mop install does not work</summary>

First confirm the public package is visible:

```bash
npm view burhan-mop version
```

Then run the install again:

```bash
npx --yes burhan-mop install
```

If npm registry access is unavailable but you need to test the repository
directly, use the GitHub source fallback:

```bash
npx --yes github:BURHANDEV-ENTERPRISE/BURHAN-MOP install
```
</details>

<details>
  <summary>GitHub shows AI or bot as the pusher</summary>

Fix the GitHub credential used by `git push`. The commit author comes from
Git email, but the push actor comes from GitHub CLI, Git Credential Manager, or
SSH key authentication.
</details>

<details>
  <summary>CodeQL says no source code was seen</summary>

Keep the visible `bin/` entrypoints. They allow CodeQL default setup to detect
JavaScript source while the full implementation stays under `.memoryofplanet/`.
</details>

## Official npm References

- [Creating and publishing unscoped public packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages/)
- [Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers/)
- [Accessing npm using two-factor authentication](https://docs.npmjs.com/accessing-npm-using-2fa/)

---

# Bahasa Melayu

## Apa itu BURHAN-MOP?

BURHAN-MOP ialah MemoryOfPlanet core yang portable untuk projek software yang
dibantu AI. Ia memberi AI coding agent satu memory project yang konsisten,
auth gate, identiti agent bernama, workflow stage, artifact output, autosycn,
dan panduan setup deploy.

Matlamat dia mudah: bila AI masuk workspace, AI perlu tahu siapa user aktif,
state project mana yang benar, agent mana patut lead, apa perlu dirancang
sebelum coding, dan bagaimana kerja perlu disimpan.

### Janji Utama

| Bahagian | Apa BURHAN-MOP buat |
| --- | --- |
| Memory | State tahan lama dalam `.memoryofplanet/STATE.json` dan protocol rasmi. |
| Security | First-action authentication gate dengan scrypt password verification. |
| Agents | Agent bernama, ownership rule, dan routing ikut task. |
| Workflow | MOP workflow yang diinspirasi BMAD dari idea sampai release. |
| Artifacts | Output tersusun dalam `.memoryofplanet/artifacts/<category>/<slug>/<type>.md`. |
| Git | `autosycn` yang commit guna identiti Git user sebenar. |
| Deploy | Auto-deploy opt-in untuk GitHub, Docker, dan Vercel. |
| Providers | Claude, Codex / ChatGPT coding agents, Gemini CLI, dan Antigravity. |

## Mula Cepat

### Install dari npm

BURHAN-MOP sudah dipublish ke npm sebagai
[`burhan-mop`](https://www.npmjs.com/package/burhan-mop). Jalankan dari root
project yang mahu dipasang MemoryOfPlanet core:

```bash
npx burhan-mop install
```

Install ke folder lain:

```bash
npx burhan-mop install --target "C:\path\to\project"
```

Paksa overwrite fail sedia ada:

```bash
npx burhan-mop install --force
```

### Install dari GitHub source

Guna install dari GitHub hanya untuk development build atau fallback bila mahu
uji versi terus daripada repo, bukan release npm:

```bash
npx --yes github:BURHANDEV-ENTERPRISE/BURHAN-MOP install
```

### Semak install

```bash
npx burhan-mop doctor
```

Atau secara local dalam project:

```bash
node .memoryofplanet/scripts/burhan-mop.mjs doctor
```

## Setup Wizard BM

Selepas install core ke dalam project, buka chat AI baru dalam workspace itu.
Arahan pertama AI ialah baca `.memoryofplanet/STATE.json`.

Jika `initialized` ialah `false`, AI hanya boleh jalankan setup.

Setup wizard akan tanya ikut urutan ini:

1. Nama project, default ikut nama folder semasa.
2. Nama paparan owner.
3. Codename owner.
4. Password.
5. Mode project: `solo` atau `team`.
6. Bahasa perbualan.
7. Bahasa coding/adventure.
8. Link GitHub project.
9. Username GitHub.
10. Git commit email.
11. Join mode jika pilih team mode.
12. Sama ada nak aktifkan auto deploy sekarang atau nanti.

Contoh setup CLI:

```bash
node .memoryofplanet/scripts/mop-core.mjs setup ^
  --project-name "My Project" ^
  --name "MoonWiRaja" ^
  --codename moon ^
  --password "your-password" ^
  --mode team ^
  --conversation-language "Melayu" ^
  --coding-language "English" ^
  --git-email "168633207+MoonWIRaja@users.noreply.github.com" ^
  --git-name "MoonWiRaja" ^
  --github-username "MoonWIRaja" ^
  --github-url "https://github.com/owner/repo.git" ^
  --join-mode owner-approved
```

## Cara Guna Harian

### First action setiap chat baru

AI mesti baca:

```text
.memoryofplanet/STATE.json
```

Kemudian ikut:

```text
.memoryofplanet/PROTOCOL.md
```

Jika core sudah setup tetapi tiada active member, AI hanya tanya:

```text
Codename dan password.
```

AI tidak patut jawab soalan, baca file lain, buat plan, atau coding sebelum
auth gate lulus.

### Selepas login

AI mesti route task kepada primary agent:

```bash
node .memoryofplanet/scripts/mop-core.mjs agent route --actor <codename> --task "<task user>"
```

Jika role agent belum ada nama, user perlu beri nama:

```bash
node .memoryofplanet/scripts/mop-core.mjs agent activate --actor <codename> --role architect --title "System Architect" --name "Nimo"
```

## Agent dan Party Mode

BURHAN-MOP anggap agent sebagai identiti bernama, bukan role kosong.

### Agent ownership

| Rule | Maksud |
| --- | --- |
| Nama sama | Consciousness agent dikongsi antara member dalam team mode. |
| Nama berbeza | Agent berbeza, walaupun role sama. |
| Owners | `agentRoster[].owners` tentukan siapa boleh guna agent itu. |
| Active agent | Setiap conversation atau action sebenar patut guna active named agent. |

### Router behavior

Router pilih satu primary agent. Ia boleh cadang banyak support agent jika task
memang perlukan kepakaran ramai agent.

Contoh:

| Task user | Primary agent | Support agent mungkin |
| --- | --- | --- |
| Bina system baru | `architect` | `planner`, `researcher`, `prompt`, `coder`, `reviewer` |
| Design UI animation | `frontend` atau `design` | `ux`, `accessibility`, `performance` |
| Review security | `security` | `reviewer`, `tester`, `architect` |
| Publish package | `deploy` atau `github` | `devops`, `reviewer`, `memory` |

### Format Party Mode

Bila beberapa agent perlu berbincang, BURHAN-MOP akan tunjuk:

```text
PARTY MODE

agent: Nimo (architect) to agent: Pixel (frontend)

          Apa constraint browser untuk scroll animation ini?

agent: Pixel (frontend) to agent: Nimo (architect)

          Kita perlukan frame-based scroll mapping, reduced-motion fallback, dan asset preloading.
```

## MOP Workflow BM

MOP Workflow diinspirasi BMAD, tetapi disesuaikan untuk MemoryOfPlanet dan
multi-agent.

```text
idea -> brief -> prd -> ux-spec -> architecture -> story -> readiness -> implementation -> review -> release
```

Guna workflow helper:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs help --actor <codename> --task "lepas ni buat apa?"
```

Ia akan pulangkan:

- suggested phase
- lead agent role
- support atau party roles
- next artifact type
- readiness gate requirement
- next command

Sebelum coding:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs gate readiness --actor <codename> --task "<task>"
```

Untuk kerja penting atau risky:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs review adversarial --actor <codename> --target "<plan atau file>"
```

## Artifacts BM

Artifacts menyimpan output planning supaya tidak bersepah di root.

Layout output:

```text
.memoryofplanet/artifacts/<category>/<artifact-slug>/<type>.md
```

Kategori default:

| Category | Artifact types |
| --- | --- |
| `plan` | `product-brief`, `prd`, `story` |
| `design` | `ux-spec` |
| `architecture` | `architecture` |
| `readiness` | `readiness-report` |
| `implementation` | `implementation-notes` |
| `review` | `review`, `adversarial-review` |
| `release` | `release-notes`, `handoff` |
| `decisions` | `decision-log` |

Buat artifact:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs artifact create --actor moon --type prd --title "Portfolio System"
```

Preview tanpa tulis file:

```bash
node .memoryofplanet/scripts/mop-workflow.mjs artifact create --actor moon --type prd --title "Portfolio System" --dry-run
```

## Project Root Policy BM

BURHAN-MOP beritahu AI agent bahawa workspace root ialah project root.

Agent tidak patut buat wrapper folder seperti:

```text
portfolio/
my-app/
<project-name>/
```

Kemudian bina dalam folder itu, kecuali user memang minta monorepo atau banyak
app.

Folder top-level yang betul:

```text
src/
app/
pages/
components/
public/
assets/
tests/
docs/
config/
scripts/
```

## Autosycn BM

`autosycn` ialah ejaan project yang disengajakan untuk skill autosync.

Ia save memory, commit guna identiti user sebenar, push ke branch yang betul,
dan biarkan BURHAN-MOP review merge.

### Solo mode

| Action | Branch |
| --- | --- |
| Kerja | `main` |
| Push | `main` |
| Merge | Tidak perlu |

### Team mode

| Action | Branch |
| --- | --- |
| Main trunk | `main` |
| Kerja user | `dev/<codename>` |
| Review dan merge | BURHAN-MOP check dan merge ke `main` |

### Identiti Git user wajib

```bash
node .memoryofplanet/scripts/mop-core.mjs member git-identity --actor moon --name "MoonWiRaja" --email "168633207+MoonWIRaja@users.noreply.github.com" --github-username "MoonWIRaja"
```

### Initialize autosycn

```bash
node .memoryofplanet/scripts/mop-autosycn.mjs init --actor moon --url "https://github.com/owner/repo.git"
```

### Sebelum kerja

```bash
node .memoryofplanet/scripts/mop-autosycn.mjs preflight --actor moon
```

### Selepas perubahan

```bash
node .memoryofplanet/scripts/mop-autosycn.mjs run --actor moon --reason "Implemented feature"
```

Penting: GitHub commit attribution datang daripada commit email. GitHub push
actor datang daripada credential atau SSH key yang digunakan oleh `git push`.

## Auto Deploy BM

Auto deploy tersedia, tetapi opt-in.

Provider yang disokong:

| Provider | Tujuan |
| --- | --- |
| GitHub | GitHub Pages atau GitHub Actions deploy flow. |
| Docker | Dockerfile dan deployment berasaskan compose. |
| Vercel | Link project Vercel dan deploy settings. |

AI mesti tanya:

```text
Nak aktifkan auto deploy sekarang? Pilih provider: GitHub, Docker, Vercel.
```

Jika user jawab nanti atau tidak, AI jawab:

```text
Okey, nanti kalau nak deploy beri tahu saya. Saya setup auto deploy.
```

## Rujukan CLI

### Package installer

```bash
npx burhan-mop install
npx burhan-mop install --target "C:\path\to\project"
npx burhan-mop install --force
npx burhan-mop doctor
npx burhan-mop package
```

### Core

```bash
node .memoryofplanet/scripts/mop-core.mjs status
node .memoryofplanet/scripts/mop-core.mjs validate
node .memoryofplanet/scripts/mop-core.mjs login --codename moon --password "<password>"
node .memoryofplanet/scripts/mop-core.mjs agent route --actor moon --task "<task>"
node .memoryofplanet/scripts/mop-core.mjs agent list
```

### Workflow

```bash
node .memoryofplanet/scripts/mop-workflow.mjs status --actor moon
node .memoryofplanet/scripts/mop-workflow.mjs help --actor moon --task "<task>"
node .memoryofplanet/scripts/mop-workflow.mjs artifact create --actor moon --type prd --title "Title"
node .memoryofplanet/scripts/mop-workflow.mjs gate readiness --actor moon --task "<task>"
node .memoryofplanet/scripts/mop-workflow.mjs review adversarial --actor moon --target "<target>"
```

## Sokongan Provider

| Provider | Entry point |
| --- | --- |
| Codex / ChatGPT coding agents | `AGENTS.md`, `.codex/config.toml` |
| Claude Code | `CLAUDE.md`, `.claude/settings.json`, `.claude/skills/` |
| Gemini CLI | `GEMINI.md`, `.gemini/settings.json` |
| Antigravity | `.agents/AGENTS.md`, `.agents/skills/` |
| MCP-compatible clients | `.mcp.json` |

## Publish ke npm

Package public semasa:

| Field | Nilai |
| --- | --- |
| Package | [`burhan-mop`](https://www.npmjs.com/package/burhan-mop) |
| Release semasa | `0.1.0` |
| Command install | `npx burhan-mop install` |

Versi npm tidak boleh dipublish semula dengan nombor yang sama. Sebelum release
seterusnya, ubah `package.json` kepada versi baru seperti `0.1.1`, `0.2.0`,
atau `1.0.0`.

### Local publish flow

```bash
npm login --auth-type=web
npm whoami
npm run validate
npm run doctor
npm run pack:dry
npm publish
```

Jika npm minta kod 2FA, publish dengan:

```bash
npm publish --otp=123456
```

Selepas publish:

```bash
npm view burhan-mop version
npx --yes burhan-mop package
npx --yes burhan-mop install --target "C:\path\to\empty-test-folder"
```

### GitHub Actions publish flow

Repo ini ada:

```text
.github/workflows/npm-publish.yml
```

Setup secure yang disarankan:

1. Buka npm package settings selepas first publish.
2. Configure trusted publishing untuk GitHub Actions.
3. Guna repository `BURHANDEV-ENTERPRISE/BURHAN-MOP`.
4. Guna workflow `.github/workflows/npm-publish.yml`.
5. Run workflow manual dengan `dry_run: true`.
6. Run lagi dengan `dry_run: false` bila ready.

Workflow akan semak sama ada versi dalam `package.json` sudah wujud di npm. Jika
sudah wujud, step publish akan diskip supaya GitHub release tidak gagal hanya
kerana versi itu sudah dipublish manual terlebih dahulu.

Setup alternatif:

1. Buat npm granular access token dengan publish permission.
2. Simpan dalam GitHub repository secrets sebagai `NPM_TOKEN`.
3. Run workflow `Publish to npm`.

## Troubleshooting BM

<details>
  <summary>npm publish keluar ENEEDAUTH</summary>

Mesin belum login npm. Jalankan:

```bash
npm login --auth-type=web
npm whoami
```

Kemudian publish semula.
</details>

<details>
  <summary>npx burhan-mop install tidak jalan</summary>

Semak dulu package public boleh dicapai:

```bash
npm view burhan-mop version
```

Kemudian run install semula:

```bash
npx --yes burhan-mop install
```

Jika npm registry tidak boleh dicapai tetapi perlu test repo terus, guna fallback
GitHub source:

```bash
npx --yes github:BURHANDEV-ENTERPRISE/BURHAN-MOP install
```
</details>

<details>
  <summary>GitHub tunjuk AI atau bot sebagai pusher</summary>

Betulkan GitHub credential yang digunakan oleh `git push`. Commit author datang
daripada Git email, tetapi push actor datang daripada GitHub CLI, Git
Credential Manager, atau SSH key.
</details>

<details>
  <summary>CodeQL kata no source code was seen</summary>

Kekalkan visible `bin/` entrypoints. Ia membantu CodeQL default setup detect
JavaScript source sementara implementation penuh masih berada dalam
`.memoryofplanet/`.
</details>

## Rujukan Rasmi npm

- [Creating and publishing unscoped public packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages/)
- [Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers/)
- [Accessing npm using two-factor authentication](https://docs.npmjs.com/accessing-npm-using-2fa/)
