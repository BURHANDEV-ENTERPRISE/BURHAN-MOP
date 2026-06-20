<h1 align="center">MOP Flow</h1>

<p align="center">
  <strong>MOP portable AI MemoryCore for Claude, Codex / ChatGPT, Gemini, and Antigravity.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/mop-flow">
    <img src="https://img.shields.io/badge/V1.1.1-cb3837?style=for-the-badge&label=NPM" alt="npm version">
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
  <img src="https://img.shields.io/badge/MOP_Flow-provider_neutral-00A67E?style=flat-square" alt="MOP Flow">
  <img src="https://img.shields.io/badge/MOP_Workflow-BMAD_inspired-FFB000?style=flat-square" alt="MOP workflow">
</p>

<p align="center">
  <strong>English</strong>
  |
  <a href="./README.bm.md">Bahasa Melayu</a>
</p>

---

## What Is MOP Flow?

MOP Flow is a portable **MOP (Memory of Planet) core** for AI coding workspaces.
It gives every supported AI provider the same project memory, agent rules,
workflow gates, artifact folders, autosycn flow, and deployment setup.

The goal is simple: install once, then Claude, Codex / ChatGPT, Gemini, and
Antigravity can enter the same project with the same source of truth.

## MOP Flow

MOP Flow is the provider-neutral orchestration and skill bridge for MOP. It
keeps the MOP brand and rules above upstream Ruflo / Claude Flow
runtime compatibility, so Claude, Codex, Gemini, and Antigravity can see the
same skill inventory and MCP runtime surface.

```bash
npx mop-flow
```

The active improvement roadmap lives in `.MOP/flow/ROADMAP.md`.

## Install

Run this inside your terminal to launch the interactive Dashboard:

```bash
npx mop-flow
```

The interactive TUI will allow you to Install, Update, Delete, or check the Status of MOP Flow in your project directly without needing to remember complex commands.

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
| Agent Router | 32 specialized agents available via `.MOP/STATE.json`. Picks one primary agent and adds support agents only when useful. |
| Party Mode | Shows visible agent-to-agent discussion for multi-role decisions. |
| MOP Flow | Provider-neutral skill bridge and MCP runtime wrapper across Claude, Codex, Gemini, and Antigravity. |
| MOP Workflow | BMAD-inspired 10-phase flow from idea to release with readiness gates. |
| Artifacts | Keeps plans, specs, reviews, and release notes under `.MOP/artifacts/`. |
| Autosync | Commits and pushes as the real user, not as the AI tool identity. |
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
npx mop-flow
```

Local project helpers:

```bash
node .MOP/scripts/mop-core.mjs status
node .MOP/scripts/mop-core.mjs validate
node .MOP/scripts/mop-flow.mjs status
node .MOP/scripts/mop-workflow.mjs help --actor <codename> --task "<task>"
node .MOP/scripts/mop-autosycn.mjs run --actor <codename> --reason "<what changed>"
node .MOP/scripts/mop-mcp.mjs start  # Native Model Context Protocol (MCP) server
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
| npm package | [`mop-flow`](https://www.npmjs.com/package/mop-flow) |
| latest command | `npx mop-flow install` |
| legacy alias | `npx burhan-mop install` |
| GitHub release | [`v1.1.1`](https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP/releases/tag/v1.1.1) |
| Node | `>=20` |

## Links

- npm: https://www.npmjs.com/package/mop-flow
- GitHub: https://github.com/BURHANDEV-ENTERPRISE/BURHAN-MOP
- Bahasa Melayu README: [README.bm.md](./README.bm.md)
