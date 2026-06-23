# Changelog

## 1.4.4 - TUI Navigation Fix

- Fixed duplicate keypress listeners after returning from TUI actions such as Status.
- Menu navigation now moves one item at a time instead of jumping after repeated actions.
- Disabled menu items remain visible and selectable, while Enter stays blocked for those actions.
- Updated README release references to `v1.4.4`.

## 1.4.3 - TUI Link Flow

- Updated the TUI menu to the fixed set: Install, Update, Doctor, Status, Link, Delete, Skills, and Exit.
- Install remains visible but disabled when MOP is already installed.
- Update remains visible but disabled when the installed version is already current.
- Link is now all-in-one in the TUI: paste the Brain URL, link the project, then install/start the background relay automatically.
- Removed standalone Relay and Service entries from the TUI menu.
- Updated README release references to `v1.4.3`.

## 1.4.2 - Background Brain Relay

- Added `mop-flow service` for per-machine background relay management.
- `mop-flow link` now registers linked projects into a local service registry.
- Added Windows Startup autostart and Linux systemd user autostart.
- Added compact TUI Control Center actions for Link, Relay, and Service.
- Added `--menu-json` for non-interactive menu verification.
- Kept link tokens private in each project's gitignored `.MOP/link.json`; the service registry stores only paths and public relay metadata.
- Added smoke coverage for the service registry and token-safety behavior.

## 1.4.1 - Package Metadata Cleanup

- Updated repository references to `BURHANDEV-ENTERPRISE/mop-flow`.
- Kept npm release checks and smoke tests green before publishing.
