# Project Overview

Sports Command Center is a static sports calendar app for deciding what is worth watching, what is coming up this week, and which weekends should be kept free for sports. It focuses on major sporting events across many sports, with shared calendar workflows for two people.

Travel planning remains available as a secondary event detail, but the primary product goal is watch planning: must-watch identification, personal preferences, Weekend Score, World Cup tracking, and a shared hosted event database.

# Current Version

Version 0.20.0

# Completed Features

- Dashboard, calendar, and weekend planner views.
- Calendar view opens on the current real month by default, while still allowing Previous/Next historical browsing.
- Calendar view now uses the SCC broadcast-dashboard visual system: dark navy/charcoal day cells, cyan-blue framing, compact event chips, current-day emphasis, and priority-event highlighting.
- Dashboard hides events whose dates have already passed.
- Weekend planner hides events whose dates have already passed.
- Calendar can still show past events when browsing historical months.
- Add, edit, and delete events through a local modal form.
- Event fields for sport, competition, date, time, timezone, importance, status, venue, location, TV/streaming, notes, personalization, and optional trip planning.
- Dark, light, and system theme support.
- Settings live in a dedicated Settings view instead of occupying the sidebar.
- Favorite settings for sports, competitions, teams, drivers, and athletes.
- Personal importance scoring and friend interest scoring.
- Preference-aware event priority and Weekend Score logic.
- Quick dashboard filters for today, this week, this month, World Cup, favorites, must-watch, racing, and soccer.
- All Events dashboard table pagination for filtered lists longer than 10 rows.
- Dashboard sections for Today / Next 24 Hours, This Week, Keep-Free Weekends, World Cup / Active Tournaments, Must-Watch Events, Watchlist, and All Events.
- Compact dashboard panels cap Today, This Week, Keep-Free Weekends, Must-Watch Events, Watchlist, and World Cup tiles so the first screen stays dense.
- Compact event rows display times in the preferred/default timezone where possible, using ET by default.
- JSON import/export for sharing event databases.
- Import preview showing added, replaced, and unchanged events.
- Google Calendar-compatible `.ics` export for high-priority filtered events and selected weekends.
- Hosted `events.json` update flow that merges events into local storage by stable `id`.
- In-app hosted update status showing update source, auto-update state, last check, last success, and merge counts.
- Automated event metadata support: `source`, `sourceId`, `sourceUrl`, `sourceUpdatedAt`, `lastVerifiedAt`, `isAutoImported`, `dataStatus`, `stage`, `round`, `group`, `homeTeam`, `awayTeam`, `participants`, `resultStatus`, and `score`.
- GitHub Actions workflow for scheduled/manual event updates.
- `scripts/update-events.mjs` to fetch, normalize, merge, and write hosted events.
- World Cup 2026 source adapter that imports all 104 FIFA World Cup matches from OpenFootball's public no-key JSON feed.
- Full future 2026 racing schedule import for NASCAR Cup Series, NASCAR O'Reilly Auto Parts Series, NASCAR Craftsman Truck Series, Formula 1, IndyCar, MotoGP, and IMSA WeatherTech SportsCar Championship.
- Static racing schedule JSON files under `sources/schedules/2026/`.
- Grouped racing source adapter at `sources/racing-2026.mjs`.
- Racing imports use deterministic stable IDs, series metadata, base importance values, and source verification metadata.
- Event validation script covering required fields, stable IDs, duplicate IDs, optional metadata, and imported source metadata.
- Static hosting compatibility for GitHub Pages.
- GitHub repository connection is active and working.
- Local logo asset structure under `assets/logos/` with graceful fallback to text badges, sport icons, and flag emoji.
- Generated `data/logo-registry.json` for sport, league, team, channel, and flag lookup.
- TheSportsDB adapter for controlled league/team artwork in the Node update pipeline.
- FlagCDN country flags for World Cup matchup tiles.
- Local channel identifier SVGs for common broadcast/streaming labels.
- Local sport fallback SVG marks.
- Local FIFA World Cup 2026 league mark for World Cup event cards and rows.
- Selective curated major-event windows beyond soccer.
- Optional logo metadata fields: `sportLogo`, `competitionLogo`, `homeTeamLogo`, `awayTeamLogo`, `teamLogos`, `channelLogo`, `flagLogos`, `logoSource`, and `logoUpdatedAt`.
- Optional active tournament metadata fields: `tournamentId`, `tournamentName`, `tournamentStartDate`, `tournamentEndDate`, `tournamentStage`, `tournamentStatus`, and `tournamentPriority`.
- `DATA_SOURCES.md` source audit covering event, logo, TV, API-key, reliability, and limitation notes.
- Real SCC crest image integrated into the sidebar brand area.
- Real stadium banner image integrated as the compact page header background.
- Stadium banner crop, overlay, and compact header height tuned so more stadium-light detail is visible while keeping the title left-aligned.
- Reusable command-center color system for dashboard sections, stat tiles, quick filters, status badges, and broadcast labels.
- Dashboard sections now have distinct accent identities: Today cyan, This Week blue, Keep-Free Weekends lime/gold, World Cup violet/blue, Must-Watch red, Watchlist orange/gold, and All Events cyan.
- Top stat tile icons now use centered inline SVG dashboard icons instead of placeholder/emoji glyphs.

# In Progress

- Playtesting Version 0.20.0 across Dashboard, Calendar, Weekends, Events, Watchlist, Settings, and Racing quick filter.
- Continuing to tune Sports Command Center around real watch-planning use.
- Preparing the next personalization milestone around favorites, personal scoring, Weekend Score, and must-watch detection.

# Planned Features

- Publish and verify the GitHub Pages version.
- Add a clear GitHub Pages setup guide once the chosen publishing folder is final.
- Improve World Cup source handling if a more complete no-key or secret-backed source becomes available.
- Tune racing schedule source maintenance after real playtesting.
- Expand manual/local logo coverage for favorite teams, competitions, and channels.
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
  assets/
    logos/
      channels/
      flags/
      leagues/
      teams/
  README.md
  ROADMAP.md
  PROJECT_STATUS.md
  CHANGELOG.md
  scripts/
    update-events.mjs
  sources/
    racing-2026.mjs
    schedules/
      2026/
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
- Some racing imports have confirmed dates but `TBD` start times or TV/streaming when official sources do not provide reliable data yet.
- Static racing schedule JSON should be re-verified when official schedules, race names, TV windows, or start times change.
- Curated major-event windows are planning anchors and should be confirmed before travel, tickets, or broadcast decisions.
- TheSportsDB free-tier rate limits can temporarily block fresh logo lookups; the updater preserves the existing registry when that happens.
- Channel SVGs are controlled local identifiers, not scraped official broadcast logos.
- Knockout placeholder teams do not have real flag assets until actual teams are known.
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
- Completed Version 0.16.3 as a pixel-target visual match pass using the generated Sports Command Center screenshot as the approved design spec.
- Reordered the dashboard so stat tiles appear before quick filters, removed the visible hero block from the dashboard flow, tightened the stadium header, narrowed the sidebar, and improved the SCC crest.
- Capped Today, This Week, Keep-Free Weekends, Must-Watch Events, Watchlist, and World Cup match tiles at three visible items with `+ X more` rows.
- Added a controlled local logo asset structure and rendering fallback layer for future channel, league, team, and flag images.
- Moved the update status/check card to the lower sidebar near the version area and kept Add Event as a compact header action.
- Completed Version 0.16.4 by moving the full settings form into the Settings tab so the sidebar stays focused on navigation, filters, sharing, update status, and version.
- Completed Version 0.16.5 by removing inactive header icon buttons and leaving Add Event as the only header action.
- Completed Version 0.16.6 by removing the detailed hosted update status block from the sidebar while keeping the compact Last Update card and update/check behavior.
- Completed Version 0.17.0 as a final command-center visual polish pass: brighter cyan/blue palette, stronger stadium banner, improved SCC crest styling, preferred/default timezone display in compact rows, and condensed sidebar range labels.
- No new event sources, scraping, backend, account system, or product subsystem was added in Version 0.17.0.
- Completed Version 0.18.0 as the first real sports data and visual identity foundation.
- Added `sources/thesportsdb.mjs`, `sources/logo-registry.mjs`, and `sources/major-events.mjs`.
- Added `data/logo-registry.json` with league/team artwork from TheSportsDB where available, FlagCDN country flags, local channel identifiers, and local sport fallback marks.
- Updated `scripts/update-events.mjs` to refresh World Cup matches, curated major events, the logo registry, and decorated event metadata.
- Expanded hosted `events.json` from 107 to 141 events.
- Added curated major-event windows for football, racing, baseball, basketball, hockey, tennis, golf, combat sports, horse racing, and major events.
- Added optional logo and tournament metadata to imported events.
- Updated compact event rows, World Cup tiles, Active Tournaments, Must-Watch, Watchlist, and All Events to resolve logos with safe fallbacks.
- Added `DATA_SOURCES.md` and updated README/Roadmap/status documentation.
- Confirmed repeated updater runs do not create duplicate events and do not rewrite files when TheSportsDB is rate-limited.
- Completed Version 0.18.1 as a focused brand asset integration pass.
- Integrated `assets/brand/scc-crest.png` in the sidebar and disabled the old CSS-generated crest.
- Integrated `assets/brand/stadium-banner.png` as the compact header background.
- Copied brand assets, logo registry, and updated app files into `outputs/sports-weekend-planner/`.
- Confirmed the 0.18 data/logo pipeline remains intact: 141 events, 104 World Cup matches, 37 curated major-event windows, and no duplicate IDs.
- Completed Version 0.18.2 as a focused header banner position polish pass.
- Increased the compact header height within the requested range, moved the stadium banner crop upward, reduced the dark overlay, and kept the Sports Command Center title left-aligned.
- Preserved event data, logo pipeline, SCC crest, dashboard layout, and existing update workflow.
- Completed Version 0.18.3 as a focused command-center color system pass.
- Added reusable color tokens for the dark broadcast-dashboard theme and light-mode counterparts.
- Assigned distinct dashboard section accents for Today, This Week, Keep-Free Weekends, World Cup / Active Tournaments, Must-Watch Events, Watchlist, and All Events.
- Matched stat tile and quick filter chip colors to the approved concept direction while keeping the layout compact.
- Refined status, Weekend Score, and channel badge color treatment without changing event data, logo registry, update pipeline, crest, or banner assets.
- Completed Version 0.19.0 as the first full racing schedule expansion.
- Added future 2026 racing schedules for NASCAR Cup Series, NASCAR O'Reilly Auto Parts Series, NASCAR Craftsman Truck Series, Formula 1, IndyCar, MotoGP, and IMSA WeatherTech SportsCar Championship.
- Added 93 normalized racing schedule events to the updater; 91 were new and 2 replaced older curated racing placeholders.
- Expanded hosted `events.json` to 232 events with no duplicate IDs.
- Preserved World Cup import, curated major-event windows, logo registry, hosted update flow, localStorage behavior, and current visual styling.
- Documented future NFL/NCAA football source-model groundwork without importing football schedules in this version.
- Carried forward the pending 0.18.3 visual polish: centered status pills, continuous All Events border styling, and hidden stat-card mini bars.
- Completed Version 0.19.1 as a focused All Events usability fix.
- Added Previous/Next pagination to the All Events table and reset pagination when filters or sort mode change.
- Completed Version 0.19.2 as a focused World Cup logo fix.
- Added a local FIFA World Cup 2026 SVG under `assets/logos/leagues/` and registered it as a manual local league asset.
- Completed Version 0.19.3 as a focused top stat tile icon polish pass.
- Replaced weak top-row stat tile placeholders with centered inline SVG icons while preserving the dashboard layout and accent color system.
- Completed Version 0.19.4 as a focused Calendar view bug fix.
- Calendar now starts on the current real month when opened instead of the old hard-coded May 2026 month.
- Completed Version 0.20.0 as a focused Calendar visual/layout revamp.
- Replaced the Calendar's green/olive day blocks with premium SCC broadcast styling, cleaner weekday/toolbars, compact event chips, current-day styling, and priority-event emphasis.
- Preserved static architecture, event data, hosted updates, localStorage behavior, GitHub Actions, filters, month navigation, and event modal behavior.

# Next Recommended Steps

1. Playtest 0.20.0 with the Dashboard, Calendar, Racing quick filter, Weekends, and All Events views to confirm the Calendar revamp feels consistent with the SCC dashboard.
2. Re-check racing TV/start-time metadata as official listings update, especially F1, MotoGP, and IMSA.
3. Tune Weekend Score and must-watch logic so racing-heavy weekends rank well without overwhelming other sports.
4. Start the personalization milestone: favorite teams/drivers/leagues, personal scoring, must-watch detection, and Weekend Score improvements.
5. Start the PWA milestone when the web version feels stable enough to install on a phone.
