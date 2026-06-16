# Sports Command Center Logo Assets

Version 0.18.0 formalized the controlled local logo system.

Recommended folders:

- `channels/` for TV and streaming marks.
- `leagues/` for league, competition, and series marks.
- `teams/` for club, national team, driver, or participant marks.
- `flags/` for national flags.
- `fallbacks/` for safe generic marks.

The generated registry lives at `data/logo-registry.json`. It can reference provider-returned artwork URLs from controlled APIs such as TheSportsDB, country flags from FlagCDN, and local files in this folder.

The app is designed to fall back to styled text badges, sport marks, or flag emoji when an asset is missing or fails to load.

Add only assets you have permission to use. To preserve a manually curated registry entry during automated updates, set `manual: true` or `source: "manual"` on that entry in `data/logo-registry.json`.
