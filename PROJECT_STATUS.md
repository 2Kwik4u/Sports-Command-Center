# Project Overview

Sports Weekend Planner is a static web application for tracking major sports events, identifying what is worth watching, and deciding which weekends should be kept free for sports. The app is designed for two friends to maintain a shared sports calendar that reduces information overload by filtering and prioritizing events across many sports.

The clarified product direction is closer to a personalized Sports Command Center than a travel planner. Travel planning remains a secondary feature for selected events, while the primary experience should focus on must-watch identification, personal preferences, Weekend Score, and shared calendar workflow.

# Current Version

Version 0.15.0

# Completed Features

- Dark, light, and system theme support with persisted local settings.
- Dashboard with event summary stats, next major event, best sports weekends, trip candidates, sport groups, and all matching events.
- Monthly calendar view with previous and next month controls.
- Weekend planner view grouping Friday through Sunday events.
- Add, edit, and delete events through a modal form.
- Event fields for sport, competition, date, time, timezone, importance, status, venue, location, TV/streaming, and notes.
- Trip planning fields for distance from home, hotel needed, ticket link, travel notes, personal interest, friend interest, and trip status.
- Filters for search, sport, minimum importance, and road trip candidates.
- Manual starter event database covering soccer, football, racing, baseball, basketball, hockey, tennis, golf, combat sports, horse racing, and major events.
- JSON import and export for sharing event databases between users.
- Shared JSON export with metadata and favorite preference context.
- Import merge feedback showing added, replaced, and unchanged event counts.
- Import preview dialog before JSON imports are merged into local storage.
- Google Calendar-compatible `.ics` export for high-priority events in the current filtered view.
- Selected-weekend `.ics` export controls from the dashboard and weekend planner.
- Local settings for home base, default timezone, default TV service, theme, auto-update preference, and hosted update source.
- Favorite settings for sports, leagues, competitions, teams, drivers, and keywords.
- Personal importance scoring separate from general event importance.
- Structured event-level personalization fields for teams, drivers/athletes, competition tags, and extra watch keywords.
- Favorite-only and minimum personal score filters.
- Personalized watchlist dashboard section.
- Visible app version in the left sidebar settings area.
- Command-line validation for `events.json`, including personalized event fields.
- Preference-aware Weekend Score and event priority scoring.
- Inferred must-watch detection using status, major-event importance, personal score, favorite matches, and watch priority.
- Weekend Score labels and reason summaries such as Keep free, Strong watch weekend, Worth checking, and Light weekend.
- Hosted `events.json` update flow that can merge deployed event updates by `id`.
- Static hosting compatibility for Vercel, GitHub Pages, Netlify, or any basic web host.
- Shareable output folder and zip artifact under `outputs/`.

# In Progress

- Preparing the app for Vercel hosting from the GitHub repository.
- Establishing `events.json` as the first hosted shared calendar update source.
- Re-centering the product roadmap around personalized sports watch planning instead of trip planning.
- Refining the personalized calendar experience after the first implementation pass.

# Planned Features

- Favorite teams, drivers, leagues, competitions, and sports preferences.
- Personal importance scoring separate from general event importance.
- Weekend Score improvements based on importance, must-watch status, event density, sport variety, and personal preferences.
- Stronger must-watch event identification.
- Shared event database workflow improvements for two people maintaining one calendar.
- Google Calendar export refinements for selected weekends and more detailed export options.
- Better validation tooling for `events.json`.
- Real sports schedule API integrations through Vercel serverless functions.
- Scheduled hosted updates through Vercel cron jobs.
- Shared login/accounts and synced database storage.
- Notifications for upcoming must-watch or favorite-based events.
- Optional later trip-planning features such as maps, ticket price tracking, hotel estimates, flight estimates, and travel budgets.

# Architecture

- Stack: plain HTML, CSS, and JavaScript.
- Storage: browser `localStorage` for events and app settings.
- Deployment target: static hosting on Vercel.
- Event model: local event objects with stable `id` values, allowing imports and hosted updates to merge by `id`.
- Personalization direction: future event data should support favorite teams, drivers, leagues, competitions, sports, personal importance, and friend interest.
- Hosted updates: the browser fetches `events.json` from the deployed site and merges valid events into local storage.
- API strategy: future real schedule APIs should be accessed from Vercel serverless functions or cron jobs, not directly from browser JavaScript, to avoid exposing API keys.
- Theme strategy: CSS variables define the visual system; JavaScript applies `data-theme` to the `body`.
- Current implementation has no build step, package manager, backend, or framework dependency.

# File Structure

```text
i-want-to-build-a-web/
  index.html
  styles.css
  app.js
  events.json
  PROJECT_STATUS.md
  ROADMAP.md
  README.md
  outputs/
    sports-weekend-planner/
      .nojekyll
      index.html
      styles.css
      app.js
      events.json
    sports-weekend-planner-shareable-v1.zip
  work/
    local-static-server.cjs
    validate-events.cjs
```

- `index.html`: Main app markup, dashboard, views, modal, filters, settings, and import/export controls.
- `styles.css`: Responsive layout, dark/light themes, sport accents, status tags, dashboard styling, and modal styling.
- `app.js`: Event data, starter seed data, rendering, filters, CRUD, settings, themes, import/export, and hosted updates.
- `events.json`: Hosted calendar update source for Vercel/static deployments.
- `ROADMAP.md`: Long-term roadmap and priority plan.
- `README.md`: Project overview, setup instructions, usage, status, and development philosophy.
- `outputs/sports-weekend-planner/`: Copied deployable/shareable app artifact.
- `outputs/sports-weekend-planner-shareable-v1.zip`: Zip package for sharing with someone who does not use Codex.
- `work/local-static-server.cjs`: Node-based local server helper for `http://localhost:8000`.
- `work/validate-events.cjs`: Node-based validator for hosted event data and personalization fields.

# Known Issues

- The app does not yet have a shared backend; each browser has its own local database.
- Favorite matching is structured by category now, but still uses text matching rather than canonical team/driver IDs.
- Weekend Score now accounts for personal preferences and gives labels/reasons, but the formula should still be tuned based on real usage.
- Hosted updates merge into each user's local storage but do not remove stale local events.
- `events.json` includes manual starter/update events and should not be treated as verified live schedule data.
- Fetching `events.json` may not work from `file://` local browsing; it is intended to work once served over HTTP/HTTPS by Vercel.
- Import conflicts are resolved by replacing events with the same `id`, with added/replaced/unchanged feedback.
- No automated test suite exists yet.
- `events.json` validation exists as a Node helper, but it is not yet wired into a deploy workflow.
- Browser automation from the Codex environment has repeatedly failed because the local browser helper could not start in the sandbox.
- Trip planning fields exist, but travel planning is now intentionally secondary to sports watch planning.

# Recent Changes

- Added dark/light/system theme support.
- Added settings controls for theme, home base, default timezone, default TV service, auto-update preference, and update source.
- Added hosted calendar update support through `events.json`.
- Added `events.json` with example hosted update events.
- Fixed the dashboard layout so the Next Major Event panel no longer stretches to match the height of the full event list.
- Added richer sport and status color styling while preserving the premium command-center visual direction.
- Added a Node-based local static server helper at `work/local-static-server.cjs`.
- Updated `README.md` with local server instructions for `http://localhost:8000`.
- Revised project priorities so personalization, must-watch identification, Weekend Score, shared calendar workflow, and Google Calendar export are promoted ahead of travel-planning features.
- Added the first personalized calendar implementation: favorite settings, personal score, event keywords, favorite filtering, watchlist cards, and preference-aware scoring.
- Tuned must-watch and Weekend Score logic with inferred keep-free events, clearer weekend labels, and visible reason summaries.
- Improved sharing with richer shared JSON exports, clearer import merge summaries, and Google Calendar-compatible `.ics` export for high-priority filtered events.
- Added structured favorite matching fields for teams, drivers/athletes, competition tags, and extra watch keywords.
- Added the visible app version under the settings status note in the left sidebar.
- Added import preview before shared JSON files are merged.
- Added selected-weekend Google Calendar export buttons.
- Added `work/validate-events.cjs` for validating `events.json` and personalized event fields.
- Confirmed the project moved to `C:\Users\tookw\Documents\Codex\2026-05-29\Eric's Labs\i-want-to-build-a-web`.

# Next Recommended Steps

1. Add a documented pre-deploy checklist that runs the event validator and local smoke checks.
2. Tune the Weekend Score formula further after real usage with favorite settings.
3. Consider canonical IDs or dropdown suggestions for common teams, drivers, leagues, and competitions.
4. Add more flexible calendar export options, such as all filtered events or only selected events.
5. Prepare Vercel deployment settings and verify hosted `/events.json` updates.
