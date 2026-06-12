<h1 align="center">BURHAN-MOP</h1>

<p align="center">
  <strong>MOP portable AI MemoryCore for Claude, Codex / ChatGPT, Gemini, and Antigravity.</strong>
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
  <strong>English</strong>
  |
  <a href="./README.bm.md">Bahasa Melayu</a>
</p>

---

## What Is BURHAN-MOP?

BURHAN-MOP is a portable **MOP (Memory of Planet) core** for AI coding workspaces.
It gives every supported AI provider the same project memory, agent rules,
workflow gates, artifact folders, autosycn flow, and deployment setup.

The goal is simple: install once, then Claude, Codex / ChatGPT, Gemini, and
Antigravity can enter the same project with the same source of truth.

## Install

Run this inside the project root:

```bash
npx burhan-mop install
npx burhan-mop doctor
```

Install into another folder:

```bash
npx burhan-mop install --target "C:\path\to\project"
```

Overwrite an existing MOP install:

```bash
npx burhan-mop install --force
```

The installer shows a clean terminal UI by default. For automation, use JSON:

```bash
npx burhan-mop install --json
npx burhan-mop doctor --json
```

After install, open your AI coding chat in that project and run:

```text
/mop-setup
```

## What Gets Installed

| Path | Purpose |
| --- | --- |
| `.MOP/` | MOP state, protocol, scripts, workflow config, and artifact templates. |
| `AGENTS.md` | Provider-neutral instructions for Codex / ChatGPT coding agents. |
| `CLAUDE.md` | Claude Code entrypoint and behavior rules. |
| `GEMINI.md` | Gemini CLI entrypoint. |
| `.agents/` | Antigravity-compatible agents and skills. |
| `.codex/`, `.gemini/`, `.claude/` | Provider-specific config and skill surfaces. |

## Core Features

| Feature | What it does |
| --- | --- |
| Auth Gate | First action is always setup/login. No work starts before the gate passes. |
| Agent Router | Picks one primary agent and adds support agents only when useful. |
| Party Mode | Shows visible agent-to-agent discussion for multi-role decisions. |
| MOP Workflow | BMAD-inspired flow from idea to release with readiness checks. |
| Artifacts | Keeps plans, specs, reviews, and release notes under `.MOP/artifacts/`. |
| Autosycn | Commits and pushes as the real user, not as the AI tool identity. |
| Auto Deploy | Optional setup path for GitHub, Docker, and Vercel. |

## First Session Flow

```text
1. AI reads .MOP/STATE.json
2. If not initialized, AI asks you to run /mop-setup
3. Setup asks for project name, owner, codename, password, mode, language, and GitHub info
4. After login, every task goes through the Agent Router
5. Complex tasks use MOP Workflow and readiness gates before coding
```

## Useful Commands

```bash
npx burhan-mop install
npx burhan-mop doctor
npx burhan-mop package
```

Local project helpers:

```bash
node .MOP/scripts/mop-core.mjs status
node .MOP/scripts/mop-core.mjs validate
node .MOP/scripts/mop-workflow.mjs help --actor <codename> --task "<task>"
node .MOP/scripts/mop-autosycn.mjs run --actor <codename> --reason "<what changed>"
```

## Team Workflow

In team mode, work is pushed to a user branch first:

```text
dev/<codename> -> BURHAN-MOP review -> main
```

BURHAN-MOP acts as the merge guardian. It checks the branch, validates state,
and merges only when the workflow is safe.

## Release

| Item | Value |
| --- | --- |
| npm package | [`burhan-mop`](https://www.npmjs.com/package/burhan-mop) |
| latest command | `npx burhan-mop install` |
| GitHub release | [`v0.1.7`](https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP/releases/tag/v0.1.7) |
| Node | `>=20` |

## Links

- npm: https://www.npmjs.com/package/burhan-mop
- GitHub: https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP
- Bahasa Melayu README: [README.bm.md](./README.bm.md)
