# Sports Command Center

## Overview

Sports Command Center is a static web app for tracking major sports events, deciding what is worth watching, and identifying weekends that should be kept free for sports. It is built for people who want a shared sports calendar with a friend without drowning in every game from every league.

## Vision

The long-term goal is a personalized sports command center that answers what to watch today, what to watch this week, which weekends matter, and which major events are coming up. Travel planning remains secondary.

## Current Features

- Dashboard, calendar, and weekend planner views.
- Today / Next 24 Hours, This Week, World Cup / Active Tournaments, Next Major Event, Keep-Free Weekends, Watchlist, Sports Covered, and matching event dashboard sections.
- Dashboard quick chips for Today, This Week, This Month, World Cup, Favorites, Must-watch, Racing, and Soccer.
- Automatic hiding of past events from Dashboard and Weekends.
- Manual add/edit/delete event workflow.
- Local settings, dark/light/system themes, favorite sports/competitions/teams/drivers, and update preferences.
- Event priority, personal importance, friend interest, must-watch detection, and Weekend Score.
- JSON import/export with import preview.
- Google Calendar-compatible `.ics` export.
- Hosted `events.json` update flow.
- Visible hosted update status in the app.
- GitHub Actions-based event update pipeline.
- Full FIFA World Cup 2026 import from a no-key public structured source.

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
  events.json
  README.md
  ROADMAP.md
  PROJECT_STATUS.md
  CHANGELOG.md
  scripts/update-events.mjs
  sources/normalize-event.mjs
  sources/world-cup-2026.mjs
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
5. Events merge into `events.json` by stable `id`.
6. Validation runs with `node work/validate-events.cjs`.
7. GitHub commits `events.json` only if it changed.
8. The deployed static app fetches hosted `events.json` and merges updates into each user's local storage.

User-created local events are not deleted by automated updates.

## World Cup Import

Version 0.16.0 includes a source adapter for FIFA World Cup 2026:

- Adapter: `sources/world-cup-2026.mjs`
- Source: `https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json`
- Imported events: 104 matches
- Metadata: source, sourceId, round, group, home/away teams, participants, result status, and score when available

If TV/streaming data is not provided by the source, the app uses `TBD` and does not invent it.

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

Current version: `0.16.0`

The project is a usable static prototype with a refreshed Sports Command Center dashboard and a first automated event update pipeline. It is not yet a full 1.0 because GitHub Pages publishing, mobile playtesting, and PWA installability still need to be finished.

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
- No automated browser test suite yet.
- PWA installability is planned but not implemented.

## Development Philosophy

This project prioritizes:

- Shipping useful functionality before advanced features.
- Manual data management before risky automation.
- Reliable static hosting before complex backend systems.
- Clear watch-planning value before travel-planning expansion.
