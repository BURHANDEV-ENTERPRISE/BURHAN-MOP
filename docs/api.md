# MOP Flow API & Command Reference

This document provides a comprehensive command-line reference for MOP Flow utilities, parameters, and output specifications.

---

## 🎛️ MOP Flow Entrypoint (`mop-flow.mjs`)

`mop-flow` coordinates provider bridges, packages, and manifest tasks.

```bash
# Display interactive TUI dashboard (default)
node .MOP/scripts/mop-flow.mjs tui

# Verify current provider and skill mapping
node .MOP/scripts/mop-flow.mjs status [--json]

# List supported AI providers and their configuration files
node .MOP/scripts/mop-flow.mjs providers [--json]

# List all discovered portable (.agents/skills) and native (.claude/skills) skills
node .MOP/scripts/mop-flow.mjs skills list [--json]

# Print the loaded skill-manifest.json
node .MOP/scripts/mop-flow.mjs manifest print [--json]

# Re-scan folders and rebuild the skill-manifest.json
node .MOP/scripts/mop-flow.mjs manifest refresh [--json]
```

---

## 🧠 Core Memory & Session Engine (`mop-core.mjs`)

Manages members, passwords, agent routing, and the 3-tier memory engine.

### System Commands
```bash
# Print general project and active session information
node .MOP/scripts/mop-core.mjs status

# Perform a schema check on STATE.json and environment assets
node .MOP/scripts/mop-core.mjs validate

# Run setup wizard (solo/team mode initialization)
node .MOP/scripts/mop-core.mjs setup --project-name NAME --name DISPLAY --codename CODE --password PASS --mode solo|team --conversation-language LANG --coding-language LANG [--git-email github-noreply|EMAIL] [--git-name NAME] [--github-username USER] [--github-url URL]

# Authenticate session
node .MOP/scripts/mop-core.mjs login --codename CODE --password PASS
```

### Agent / Persona Commands
```bash
# Activate/Register a new agent inside the roster
node .MOP/scripts/mop-core.mjs agent activate --actor CODE --role ROLE --title TITLE --name NAME

# Assign the active agent for the current actor session
node .MOP/scripts/mop-core.mjs agent use --actor CODE --name NAME

# Print the active agent details for the current actor session
node .MOP/scripts/mop-core.mjs agent current --actor CODE

# Enforce that a specific agent is active before proceeding
node .MOP/scripts/mop-core.mjs agent require --actor CODE [--role ROLE] [--title TITLE]

# Route a prompt to the best agent persona matching the context
node .MOP/scripts/mop-core.mjs agent route --actor CODE --task "task text"

# List all available agent personas
node .MOP/scripts/mop-core.mjs agent list
```

### Memory Commands
```bash
# Add a new episodic transaction
node .MOP/scripts/mop-core.mjs memory add --actor CODE --kind conversation --summary "Description"

# Retrieve contextual memory brief for current session tasks
node .MOP/scripts/mop-core.mjs memory brief --actor CODE [--month YYYY-MM] [--query TEXT] [--role ROLE]

# Perform ranked semantic BM25 keyword search across working, episodic, and facts memory
node .MOP/scripts/mop-core.mjs memory search --actor CODE --query TEXT [--role ROLE] [--limit N]

# Restore workspace session brief
node .MOP/scripts/mop-core.mjs memory restore --actor CODE
```

---

## ⚙️ Workflow Engine (`mop-workflow.mjs`)

Enforces the 10-phase BMAD progression lifecycle and artifact readiness verification.

```bash
# Print current workflow phase and diagnostic metrics
node .MOP/scripts/mop-workflow.mjs status [--actor CODE] [--task TEXT] [--profile NAME]

# Determine and propose the next sequence phase based on user task input
node .MOP/scripts/mop-workflow.mjs help --actor CODE --task "task description" [--profile NAME]
node .MOP/scripts/mop-workflow.mjs next --actor CODE --task "task description" [--profile NAME]

# Force set the current phase
node .MOP/scripts/mop-workflow.mjs phase set --actor CODE --phase phase_id

# Generate a markdown document from standard blueprint templates
node .MOP/scripts/mop-workflow.mjs artifact create --actor CODE --type TYPE --title "Title" [--category plan] [--dry-run]
# Standard types: prd, architecture, story, qa, release-notes, handoff, adversarial-review

# Perform pre-execution quality gates (check artifact staleness, correct agent activation)
node .MOP/scripts/mop-workflow.mjs gate readiness --actor CODE --task "task description" [--artifact path] [--profile NAME]

# Prompt critical standard checklist to challenge design decisions
node .MOP/scripts/mop-workflow.mjs review adversarial --actor CODE --target "description/filepath" [--write]

# Show merged workflow configuration policies
node .MOP/scripts/mop-workflow.mjs config show [--actor CODE]

# Detect skipped workflow phases by comparing history against sequence order
node .MOP/scripts/mop-workflow.mjs drift check --actor CODE [--profile NAME]
```

---

## ⛓️ Federation Utility (`mop-federation.mjs`)

Audits the shared ledger and controls synchronization.

```bash
# Link target paths into the local network
node .MOP/scripts/mop-federation.mjs join --actor CODE --target "path"

# List joined workspaces
node .MOP/scripts/mop-federation.mjs status

# Cryptographically verify the SHA-256 hash-chain of the shared ledger
node .MOP/scripts/mop-federation.mjs verify

# Push changes to central git repository branch
node .MOP/scripts/mop-federation.mjs push [--remote NAME] [--branch NAME]
```
