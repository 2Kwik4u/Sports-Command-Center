# AGENTS.md

## Mandatory Startup Instructions

Before making any changes in this repository, read this `AGENTS.md` file fully.

Then inspect the relevant source-of-truth project files for the task, especially:

* `README.md`
* `PROJECT_STATUS.md`
* `CHANGELOG.md`
* `ROADMAP.md`
* `DATA_SOURCES.md`
* `index.html`
* `styles.css`
* `app.js`
* `events.json`
* `scripts/update-events.mjs`
* relevant files under `sources/`

Follow `AGENTS.md` for architecture, product direction, validation, source/data rules, visual direction, and documentation/versioning requirements.

If any user request conflicts with `AGENTS.md`, pause and explain the conflict before proceeding.

Guidance for AI agents and automation tools working on Eric's Sports Command Center app.

## Canonical Project Root

The active Sports Command Center repository lives here:

```text
C:\Users\tookw\Documents\Codex\2026-05-29\Eric's Labs\i-want-to-build-a-web
```

Always use this folder as the project root before reading, editing, validating, committing, or pushing.

The previous path below is intentionally maintained only as a pointer folder so older Codex sessions know where to go:

```text
C:\Users\tookw\Documents\Codex\2026-05-29\i-want-to-build-a-web
```

If a shell opens somewhere unexpected, run `git rev-parse --show-toplevel` and switch to the canonical root before making changes. Do not edit the pointer folder or archived stale copies.

## Project Identity

Sports Command Center is a static sports watch-planning app. Its primary job is to help answer:

- What should I watch today?
- What should I watch this week?
- Which weekends should I keep free?
- What major events are coming up?
- Which World Cup, racing, playoff, tournament, and championship events matter?

Travel planning exists, but it is secondary. Do not let travel, ticketing, betting, or generic calendar features pull the app away from sports watch-planning.

## Source of Truth

Before making changes, inspect the relevant repo files. For broad context, start with:

- `README.md`
- `PROJECT_STATUS.md`
- `CHANGELOG.md`
- `ROADMAP.md`
- `DATA_SOURCES.md`

For implementation work, inspect the relevant app files:

- `index.html`
- `styles.css`
- `app.js`
- `events.json`
- `scripts/update-events.mjs`
- `sources/`
- `sources/schedules/`
- `data/logo-registry.json`
- `assets/logos/`
- `work/validate-events.cjs`
- `work/local-static-server.cjs`

Do not rely on memory if the repo documents or source files disagree.

## Architecture Guardrails

Preserve the current architecture unless Eric explicitly asks otherwise.

- Keep the app GitHub Pages/static-hosting friendly.
- Keep the frontend plain HTML, CSS, and JavaScript.
- Keep browser data in `localStorage`.
- Keep hosted event updates based on committed static `events.json`.
- Keep GitHub Actions as the update automation path.
- Do not add Vercel, backend services, databases, user accounts, real-time sync, betting/odds, ticket scraping, or notifications unless Eric explicitly asks for that specific direction.
- Do not put API secrets in browser JavaScript.
- Future authenticated or secret-backed sources must run through GitHub Actions secrets or another non-browser automation path.

## Product Priorities

Near-term work should generally favor:

1. GitHub Pages/static deployment reliability.
2. Dashboard, Calendar, Weekends, Events, Watchlist, and Settings usability.
3. Channel/logo normalization and graceful fallbacks.
4. Controlled major-event coverage expansion.
5. Personalization for favorite teams, drivers, leagues, competitions, and sports.
6. Better must-watch detection and Weekend Score logic.
7. Shared export/import/update workflows.
8. PWA installability only after the web version is stable enough.

Avoid broad rewrites. Ship focused, useful improvements.

## Visual Direction

Maintain the Sports Command Center visual identity:

- Dark premium sports broadcast dashboard.
- SCC crest and stadium banner.
- Cyan/blue broadcast energy.
- Section accent colors.
- Compact panels.
- Dense scoreboard/control-room feel.
- Real sports identity where practical.
- Local logo assets and safe fallbacks.
- Clean, readable event rows/cards.

Avoid generic SaaS styling, plain tables with no sports identity, toy-like bright colors, or muddy green/olive styling.

When polishing UI, prefer appending clearly labeled CSS sections near the existing visual polish blocks instead of rewriting large older areas unless cleanup is part of the requested task.

## Data and Source Rules

Sports Command Center uses controlled, documented sources only.

- Do not scrape Google Images, random search results, ticket sites, TV listings, or unofficial image hosts.
- Prefer controlled public structured sources, static verified JSON, and documented manual data.
- Do not invent TV/streaming data. Use `TBD` when reliable source data is unavailable.
- Treat imported event importance as base/default importance, not final watch priority.
- Imported events must use stable deterministic IDs.
- User-created local events must not be deleted by automated updates.
- Missing logos/data should degrade gracefully with sport marks, styled text badges, flag emoji, or compact fallbacks.
- If source coverage, source reliability, logos, or TV-data behavior changes, update `DATA_SOURCES.md`.

## Event Update Pipeline

The current update model is:

1. GitHub Actions runs `.github/workflows/update-events.yml`.
2. The workflow runs `node scripts/update-events.mjs`.
3. Source adapters normalize approved public or static data into the app schema.
4. Events merge into `events.json` by stable `id`.
5. Logo metadata is refreshed through controlled local/generated registry logic.
6. Validation runs with `node work/validate-events.cjs`.
7. The deployed static app fetches hosted `events.json` and merges updates into browser `localStorage`.

Do not break this flow.

When touching source adapters, static schedules, logo registry generation, imported event metadata, or `events.json`, run:

```bash
node scripts/update-events.mjs
node work/validate-events.cjs
```

When only touching UI, still run validation if practical:

```bash
node work/validate-events.cjs
```

## Local Development

No package install should be required for normal local use.

Run the local static server with:

```bash
node work/local-static-server.cjs
```

Then open:

```text
http://localhost:8000
```

For UI changes, smoke-test the affected views where practical:

- Dashboard
- Calendar
- Weekends
- Events
- Watchlist
- Settings
- Add/edit event modal
- Filters and quick chips
- Hosted update controls
- JSON import/export
- `.ics` export
- Mobile-width layout

## Documentation and Versioning

When beginning a versioned task, use Eric's requested target version, for example:

```text
Begin working on version 0.20.0.
```

For meaningful features, fixes, source/data changes, or visual releases, update the relevant documentation:

- `CHANGELOG.md`
- `PROJECT_STATUS.md`
- `README.md`
- `ROADMAP.md`
- `DATA_SOURCES.md` when source, logo, event coverage, reliability, or TV-data behavior changes
- `AGENTS.md` when repo workflow guidance changes

Keep documentation concise but specific. Mention changed files and behavior. Do not let docs drift from implementation.

If the root app files are mirrored into `outputs/sports-weekend-planner/`, keep that maintained copy synchronized when the same pattern is already being used in the repo.

## Feature Work Guidelines

### UI and Styling

- Preserve current behavior unless the task explicitly asks for behavior changes.
- Preserve localStorage settings and event data shape.
- Keep desktop dense and useful.
- Keep mobile readable and functional.
- Prefer small, focused styling changes over complete redesigns.
- Use existing design tokens where practical.
- Preserve dark theme first, but do not break light theme.

### Event Data

- Use deterministic IDs for imports.
- Do not overwrite or delete user-created local events.
- Do not import every regular-season game by default; SCC is not meant to be a complete all-games database.
- Prioritize finals, championships, playoffs, major races, golf/tennis majors, tournament weekends, and favorite-relevant future expansion.
- Keep `TBD` when time, TV, or streaming data is not verified.

### Logos and Channels

- Prefer local repo assets and generated `data/logo-registry.json`.
- Normalize channel names and aliases before adding one-off display hacks.
- Missing logos are acceptable if the fallback is clean.
- Preserve manual logo registry entries marked with `manual: true` or `source: "manual"`.

### Scoring and Personalization

- Imported importance is only the base.
- Watch priority should account for personal favorites, friend interest, event importance, tournament/championship context, conflicts, and timing where practical.
- Be careful with Weekend Score changes; explain the logic and preserve existing behavior unless improving it is the task.

## Things to Ask Eric Before Doing

Ask before making changes that would:

- Add a backend, accounts, database, or real-time sync.
- Add notifications.
- Add betting, odds, ticket tracking, hotel/flight estimates, or travel-budget features.
- Add large new data providers or secret-backed APIs.
- Change deployment away from GitHub Pages/static hosting.
- Split `app.js` into modules as a broad refactor.
- Redesign the entire UI instead of a targeted view/component.
- Change event schema in a way that could break existing localStorage data.

## Completion Checklist

Before finishing a task, summarize:

- What changed.
- Which files changed.
- What behavior was preserved.
- What validation or smoke testing was run.
- Any known limitations or follow-up recommendations.

For data/source changes, explicitly state whether `node scripts/update-events.mjs` and `node work/validate-events.cjs` passed.

For UI changes, explicitly state which views were visually checked when possible.

## Core Principle

Sports Command Center should feel less like a generic calendar and more like a personal sports control room. Every feature should help Eric and a friend quickly decide what is worth watching, what is coming up, and which weekends deserve attention.
