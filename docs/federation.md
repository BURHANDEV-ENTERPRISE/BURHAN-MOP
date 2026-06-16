# MOP Federation & Privacy Safeguards

MOP Flow features a decentralized memory federation system that allows multiple projects or team members to synchronize a shared, audited activity ledger. To ensure security and compliance, the federation pipeline enforces automated PII (Personally Identifiable Information) scrubbing and cryptographic hash-chaining.

---

## 🔒 PII Scrubber

Before any log or memory entry is written to the shared ledger, it is processed by the `piiScrub` filter. This utility identifies and redacts five categories of sensitive data using rigorous regex matching:

1. **Emails**: Replaced with `[EMAIL_REDACTED]`
2. **Malaysian Phone Numbers**: Replaced with `[PHONE_REDACTED]` (matches mobile, landline, and prefixes)
3. **API Keys / Access Tokens**: Replaced with `[API_KEY_REDACTED]` (matches standard formats like OpenAI `sk-...`, Google `AIzaSy...`, GitHub `ghp_...`, and generic hex hashes)
4. **Malaysian IC (Identity Card) Numbers**: Replaced with `[IC_REDACTED]` (matches dashed and numeric formats)
5. **Credit Cards**: Replaced with `[CREDIT_CARD_REDACTED]` (matches 13 to 16-digit card sequences)

When `federation.enabled` is set to `true` in state configuration, all memory entries added via `memoryAdd` automatically go through this scrubbing flow before propagation.

---

## 🔗 Hash-Chained Shared Ledger

All shared activity is logged to `.MOP/memory/shared-ledger/ledger.jsonl`. Each entry in this ledger contains a cryptographic hash linking it to the previous entry, establishing a tamper-evident audit trail.

### Hash Structure
For every entry, the hash is calculated as:
```javascript
sha256(JSON.stringify({
  at: entry.at,
  actor: entry.actor,
  kind: entry.kind,
  summary: entry.summary,
  prev: prevHash
}))
```

This prevents retroactive tampering or editing of the ledger, keeping chronological tracking honest.

---

## 🚀 Federation Commands

### Join a Federation Network
Link the current workspace with another MOP project's shared space.
```bash
node .MOP/scripts/mop-federation.mjs join --actor <codename> --target "<other-project-path>"
```

### View Federation Status
List all joined networks and active federation paths.
```bash
node .MOP/scripts/mop-federation.mjs status
```

### Verify Ledger Integrity
Validate the hash-chain link-by-link to verify if the ledger has been modified or corrupted.
```bash
node .MOP/scripts/mop-federation.mjs verify
```
*Output format (JSON)*:
```json
{
  "ok": true,
  "verified": true,
  "totalEntries": 42,
  "errors": []
}
```

### Push Shared Ledger to Git Remote
Commit and push the shared ledger files to a remote repository branch.
```bash
node .MOP/scripts/mop-federation.mjs push [--remote <remote-name>] [--branch <branch-name>]
```
*   `--remote`: Git remote target (defaults to `origin`)
*   `--branch`: Target sync branch (defaults to `mop-shared`)
