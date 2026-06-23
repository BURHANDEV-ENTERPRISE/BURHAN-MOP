# Changelog

## 1.4.2 - Background Brain Relay

- Added `mop-flow service` for per-machine background relay management.
- `mop-flow link` now registers linked projects into a local service registry.
- Added Windows Startup autostart and Linux systemd user autostart.
- Added TUI Control Center actions for Link, Relay, Service, and Pixel Office GUI.
- Added `--menu-json` for non-interactive menu verification.
- Kept link tokens private in each project's gitignored `.MOP/link.json`; the service registry stores only paths and public relay metadata.
- Added smoke coverage for the service registry and token-safety behavior.

## 1.4.1 - Package Metadata Cleanup

- Updated repository references to `BURHANDEV-ENTERPRISE/mop-flow`.
- Kept npm release checks and smoke tests green before publishing.
