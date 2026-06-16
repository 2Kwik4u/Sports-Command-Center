# Sports Command Center

## Overview

Sports Command Center is a static web app for tracking major sports events, deciding what is worth watching, and identifying weekends that should be kept free for sports. It is built for people who want a shared sports calendar with a friend without drowning in every game from every league.

## Vision

The long-term goal is a personalized sports command center that answers what to watch today, what to watch this week, which weekends matter, and which major events are coming up. Travel planning remains secondary.

## Current Features

- Dashboard, calendar, and weekend planner views.
- Today / Next 24 Hours, This Week, Keep-Free Weekends, World Cup / Active Tournaments, Must-Watch Events, Watchlist, and All Events dashboard sections.
- Compact dashboard panels with capped event lists and `+ X more` rows.
- Dashboard quick chips for Today, This Week, This Month, World Cup, Favorites, Must-watch, Racing, and Soccer.
- All Events table pagination for filtered lists longer than 10 rows.
- Automatic hiding of past events from Dashboard and Weekends.
- Manual add/edit/delete event workflow.
- Dedicated Settings view for dark/light/system themes, favorite sports/competitions/teams/drivers, and update preferences.
- Event priority, personal importance, friend interest, must-watch detection, and Weekend Score.
- Compact event rows display in the preferred/default timezone where possible, using ET by default.
- JSON import/export with import preview.
- Google Calendar-compatible `.ics` export.
- Hosted `events.json` update flow.
- Visible hosted update status in the app.
- GitHub Actions-based event update pipeline.
- Full FIFA World Cup 2026 import from a no-key public structured source.
- Verified future 2026 racing schedule import for NASCAR Cup, NASCAR O'Reilly, NASCAR Trucks, Formula 1, IndyCar, MotoGP, and IMSA WeatherTech.
- Generated `data/logo-registry.json` for sport, league, team, channel, and flag lookup.
- TheSportsDB league/team artwork support through the Node update script.
- FlagCDN country flags for World Cup matchup tiles.
- Local channel identifier SVGs and sport fallback marks.
- Local FIFA World Cup 2026 mark for World Cup event cards and rows.
- Selective curated major-event windows beyond soccer.

## Planned Features

- GitHub Pages deployment verification.
- PWA installability for phone home-screen use.
- Additional event source adapters.
- More flexible calendar export options.
- Stronger favorite/team/competition matching.
- Browser smoke tests.

## Technology Stack

- Frontend: plain HTML, CSS, and JavaScript.
- Backend: none for the browser app.
- Storage: browser `localStorage`.
- Hosted shared data: static `events.json`.
- Logo registry: static `data/logo-registry.json`.
- Automation: GitHub Actions plus Node scripts.
- Deployment target: GitHub Pages/static hosting.

The browser app does not require API secrets. Future authenticated sources should run through GitHub Actions secrets, not client-side JavaScript.

## Project Structure

```text
i-want-to-build-a-web/
  .github/workflows/update-events.yml
  index.html
  styles.css
  app.js
  assets/logos/README.md
  data/logo-registry.json
  events.json
  DATA_SOURCES.md
  README.md
  ROADMAP.md
  PROJECT_STATUS.md
  CHANGELOG.md
  scripts/update-events.mjs
  sources/logo-registry.mjs
  sources/major-events.mjs
  sources/racing-2026.mjs
  sources/thesportsdb.mjs
  sources/normalize-event.mjs
  sources/world-cup-2026.mjs
  sources/schedules/2026/
  work/local-static-server.cjs
  work/validate-events.cjs
```

## Installation

No package install is required.

Run locally with the included static server:

```bash
node work/local-static-server.cjs
```

Then open:

```text
http://localhost:8000
```

## Usage

1. Open the app.
2. Use Dashboard to decide what to watch soon and which weekends matter.
3. Use Calendar for month browsing.
4. Use Weekends to compare Friday-Sunday clusters.
5. Use Add Event or click an event card to edit local events.
6. Use filters and quick chips to narrow the planning view.
7. Use Check for Event Updates to merge hosted `events.json` updates into local storage.
8. Use JSON export/import to share a local calendar with a friend.
9. Use Google Calendar export for high-priority events or selected weekends.

## Automated Event Updates

The current automation model is:

1. GitHub Actions runs `.github/workflows/update-events.yml`.
2. The workflow runs `node scripts/update-events.mjs`.
3. The script fetches approved public structured event data.
4. Source adapters normalize events into the app schema.
5. The logo registry refreshes from controlled sources.
6. Events are decorated with optional logo and tournament metadata.
7. Events merge into `events.json` by stable `id`.
8. Validation runs with `node work/validate-events.cjs`.
9. GitHub commits changed data files only when needed.
10. The deployed static app fetches hosted `events.json` and merges updates into each user's local storage.

User-created local events are not deleted by automated updates.

## World Cup Import

Sports Command Center includes a source adapter for FIFA World Cup 2026:

- Adapter: `sources/world-cup-2026.mjs`
- Source: `https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json`
- Imported events: 104 matches
- Metadata: source, sourceId, round, group, home/away teams, participants, result status, and score when available

If TV/streaming data is not provided by the source, the app uses `TBD` and does not invent it.

## Racing Schedule Import

Version 0.19.0 adds verified future 2026 racing schedules:

- NASCAR Cup Series: 20 events.
- NASCAR O'Reilly Auto Parts Series: 16 events.
- NASCAR Craftsman Truck Series: 13 events.
- Formula 1: 15 events.
- IndyCar: 9 events.
- MotoGP: 14 events.
- IMSA WeatherTech SportsCar Championship: 6 events.

The source files live in `sources/schedules/2026/` and are normalized by `sources/racing-2026.mjs`. TV/streaming and start times remain `TBD` when reliable source data is not available.

## Data and Logo Sources

Version 0.19.0 uses `DATA_SOURCES.md` as the source audit. Current sources include OpenFootball for World Cup matches, verified static racing schedules, curated major-event windows for selective multi-sport coverage, TheSportsDB for league/team artwork, FlagCDN for country flags, and local repo assets for channel identifiers and sport fallbacks.

TheSportsDB calls happen only in `scripts/update-events.mjs`. The browser remains static and does not contain API secrets.

## Validation

Run:

```bash
node work/validate-events.cjs
```

Validation checks JSON parsing, top-level event array, required event fields, stable IDs, duplicate IDs, optional metadata types, and source/sourceId for auto-imported events.

## GitHub Action

To trigger updates manually:

1. Open the GitHub repository.
2. Go to Actions.
3. Choose `Update sports events`.
4. Select `Run workflow`.

The workflow also runs on a schedule. It is intentionally safe for static hosting because it only updates committed JSON.

## Current Status

Current version: `0.19.3`

The project is a usable static prototype with a command-center dashboard, hosted event updates, a real sports visual/data foundation, expanded racing coverage, and polished stat tile icons. Version 0.19.3 keeps the static GitHub Pages-friendly architecture.

## Roadmap

`ROADMAP.md` is the authoritative future-planning document.

## Security and Privacy

- Events and settings are stored in the browser using `localStorage`.
- There are no accounts or shared backend yet.
- Exported JSON can contain personal notes and should be shared thoughtfully.
- API keys must not be placed in browser JavaScript.
- Future authenticated data sources should use GitHub Actions secrets.

## Known Limitations

- No shared backend or real-time sync.
- Hosted updates do not delete local user-created events.
- OpenFootball is useful but not guaranteed to be an official live schedule source.
- Imported World Cup TV data is `TBD` unless provided by a source.
- Some imported racing start times and TV/streaming values are `TBD` when official or verified source data is not available.
- Curated major-event windows should be confirmed before making travel, ticket, or broadcast decisions.
- TheSportsDB free-tier rate limits can temporarily prevent logo refreshes; the updater preserves the existing registry when that happens.
- Channel SVGs are controlled local identifiers, not scraped official broadcast logos.
- Timezone display conversion is intentionally conservative and focused on known timezone labels and UTC offsets used by the current event data.
- No automated browser test suite yet.
- PWA installability is planned but not implemented.

## Development Philosophy

This project prioritizes:

- Shipping useful functionality before advanced features.
- Manual data management before risky automation.
- Reliable static hosting before complex backend systems.
- Clear watch-planning value before travel-planning expansion.
