# Project Overview

Sports Command Center is a static sports calendar app for deciding what is worth watching, what is coming up this week, and which weekends should be kept free for sports. It focuses on major sporting events across many sports, with shared calendar workflows for two people.

Travel planning remains available as a secondary event detail, but the primary product goal is watch planning: must-watch identification, personal preferences, Weekend Score, World Cup tracking, and a shared hosted event database.

# Current Version

Version 0.16.2

# Completed Features

- Dashboard, calendar, and weekend planner views.
- Dashboard hides events whose dates have already passed.
- Weekend planner hides events whose dates have already passed.
- Calendar can still show past events when browsing historical months.
- Add, edit, and delete events through a local modal form.
- Event fields for sport, competition, date, time, timezone, importance, status, venue, location, TV/streaming, notes, personalization, and optional trip planning.
- Dark, light, and system theme support.
- Favorite settings for sports, competitions, teams, drivers, and athletes.
- Personal importance scoring and friend interest scoring.
- Preference-aware event priority and Weekend Score logic.
- Quick dashboard filters for today, this week, this month, World Cup, favorites, must-watch, racing, and soccer.
- Dashboard sections for Today / Next 24 Hours, This Week, World Cup / Active Tournaments, Next Major Event, Keep-Free Weekends, Watchlist, optional trip candidates, sports covered, and matching events.
- JSON import/export for sharing event databases.
- Import preview showing added, replaced, and unchanged events.
- Google Calendar-compatible `.ics` export for high-priority filtered events and selected weekends.
- Hosted `events.json` update flow that merges events into local storage by stable `id`.
- In-app hosted update status showing update source, auto-update state, last check, last success, and merge counts.
- Automated event metadata support: `source`, `sourceId`, `sourceUrl`, `sourceUpdatedAt`, `lastVerifiedAt`, `isAutoImported`, `dataStatus`, `stage`, `round`, `group`, `homeTeam`, `awayTeam`, `participants`, `resultStatus`, and `score`.
- GitHub Actions workflow for scheduled/manual event updates.
- `scripts/update-events.mjs` to fetch, normalize, merge, and write hosted events.
- World Cup 2026 source adapter that imports all 104 FIFA World Cup matches from OpenFootball's public no-key JSON feed.
- Event validation script covering required fields, stable IDs, duplicate IDs, optional metadata, and imported source metadata.
- Static hosting compatibility for GitHub Pages.
- GitHub repository connection is active and working.

# In Progress

- Verifying the Version 0.16.0 visual refresh and automated update workflow.
- Continuing to tune the Sports Command Center dashboard for real watch-planning use.
- Preparing GitHub Pages as the primary deployment path.

# Planned Features

- Publish and verify the GitHub Pages version.
- Add a clear GitHub Pages setup guide once the chosen publishing folder is final.
- Improve World Cup source handling if a more complete no-key or secret-backed source becomes available.
- Improve Weekend Score and watch priority after real use.
- Add canonical team, driver, league, and competition IDs or suggestions.
- Add more flexible calendar exports, such as selected events or all filtered events.
- Add PWA installability for phone home-screen use.
- Future optional integrations: Google Calendar sync, shared login/accounts, notifications, map view, ticket tracking, and travel estimates.

# Architecture

- Frontend: plain HTML, CSS, and JavaScript.
- Browser storage: `localStorage` for user events and settings.
- Hosted data source: static `events.json`.
- Deployment direction: GitHub Pages/static hosting.
- Automation direction: GitHub Actions periodically runs `scripts/update-events.mjs`, validates `events.json`, and commits only when event data changes.
- Source strategy: use no-key public structured sources first, configurable secret-backed APIs later, and manual committed JSON as fallback.
- API key rule: no API secrets are placed in browser JavaScript.
- Merge rule: hosted updates merge by stable event `id`; user-created local events are not deleted by automated updates.

# File Structure

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
  scripts/
    update-events.mjs
  sources/
    normalize-event.mjs
    world-cup-2026.mjs
  outputs/
    sports-weekend-planner/
      .nojekyll
      index.html
      styles.css
      app.js
      events.json
  work/
    local-static-server.cjs
    validate-events.cjs
```

# Known Issues

- The app does not yet have a shared backend; each browser has its own local database.
- Hosted updates add or replace events but intentionally do not delete local user-created events.
- OpenFootball is a practical no-key source, but it is not guaranteed to be a complete live official feed for TV data, delays, or every late schedule change.
- TV/streaming data is `TBD` for imported World Cup matches unless a source provides it.
- Favorite matching still uses text matching rather than canonical team or competition IDs.
- No automated browser test suite exists yet.
- GitHub Pages publishing settings still need to be finalized in the repository UI.
- PWA installability is planned but not implemented.

# Recent Changes

- Updated to Version 0.16.0.
- Rebranded UI language toward Sports Command Center.
- Added a more energetic scoreboard/stadium-light visual direction.
- Added dashboard quick filters and new dashboard planning sections.
- Added automated event metadata fields to the browser event model.
- Added GitHub Actions event update workflow.
- Added modular event source adapters.
- Added full FIFA World Cup 2026 match import with 104 matches.
- Updated `events.json` to include 107 hosted events total.
- Improved validation for stable IDs, duplicate detection, metadata fields, and auto-imported source fields.
- Updated hosted update UX with last checked, last success, merge counts, source, and auto-update state.
- Removed Vercel as the active deployment plan in favor of GitHub Pages/static hosting.
- Added a closer visual fidelity pass based on the Sports Command Center concept screenshot: denser sidebar, icon navigation, six scoreboard stat tiles, header update card, World Cup flag tiles, and table-style All Events list.
- Completed Version 0.16.2 as a tighter visual fidelity pass using the generated Sports Command Center screenshot as the approved visual target.
- Reduced header height, tightened dashboard spacing, compacted panel rows, added broadcast-style channel badges, improved Must-Watch and Watchlist rows, and expanded the All Events table with teams/participants plus sort/export controls.
- Hid the optional Trip Candidates and Sports Covered dashboard panels from the main concept layout so the Dashboard matches the approved two-row panel grid more closely.
- Intentional differences from the concept: stadium lights, SCC shield, sport icons, flags, and channel labels are built with CSS, emoji, and styled text rather than external image assets or copyrighted broadcast logos.

# Next Recommended Steps

1. Enable GitHub Pages for the repository and decide whether it should publish from the project root or `outputs/sports-weekend-planner`.
2. Run the GitHub Action manually once from the Actions tab and confirm it produces no duplicate World Cup events.
3. Playtest the refreshed Dashboard, quick chips, Calendar, Weekends, and hosted update button on desktop and phone widths.
4. Tune World Cup priority rules and Weekend Score after seeing real usage.
5. Start the PWA milestone when the web version feels stable enough to install on a phone.
