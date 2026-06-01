# Sports Weekend Planner

## Overview

Sports Weekend Planner is a shared sports calendar and trip-planning web app for people who want to track major sporting events across many sports. It is built for users who care less about seeing every single game and more about identifying the biggest events, best TV weekends, and live-event road trip opportunities.

The current version is a beginner-friendly static web app that runs in the browser and can be hosted on Vercel, GitHub Pages, Netlify, or any other static hosting service.

## Vision

The long-term goal is to help users monitor major sporting events, plan trips to live events, and quickly answer one practical question: which sports weekends are worth protecting on the calendar?

Over time, Sports Weekend Planner should become a premium sports command center that combines:

- A curated major-events calendar.
- A weekend watch planner.
- A live-event trip planner.
- Shared planning for two people.
- Future sports schedule imports and calendar integrations.

The project should prioritize meaningful events and useful planning decisions over trying to become a complete schedule database for every league.

## Current Features

- Dashboard view with event summary stats.
- Monthly calendar view.
- Weekend list view grouped around Friday through Sunday.
- Manual event database with starter events across many sports.
- Add, edit, and delete events.
- Event fields for sport, competition, date, start time, timezone, importance, status, venue, location, TV or streaming service, and notes.
- Trip planning fields for distance from home, travel notes, hotel needed, ticket link, personal interest, friend interest, and trip status.
- Event statuses including Must-watch, Good TV weekend, Possible road trip, Already attending, and Skip.
- Sport-colored tags and visual accents.
- Filters for search, sport, minimum importance, and road trip candidates.
- Dashboard sections for next major event, upcoming road trip candidates, must-watch events, best sports weekends, and events grouped by sport.
- Dark, light, and system theme settings.
- Local settings for home base, default timezone, default TV service, auto-update preference, and hosted update source.
- Favorite settings for sports, leagues, competitions, teams, drivers, and keywords.
- Personal importance scoring separate from general event importance.
- Structured event fields for teams, drivers/athletes, competition tags, and extra watch keywords.
- Favorite-only and minimum personal score filters.
- Personalized watchlist dashboard section.
- Visible app version in the left sidebar settings area.
- Preference-aware Weekend Score and event priority scoring.
- Inferred keep-free/must-watch detection using event status, major-event importance, personal score, favorite matches, and watch priority.
- Weekend Score labels and reason summaries for comparing which weekends matter most.
- JSON export for sharing the local event database.
- JSON import for loading shared or edited event data.
- Shared JSON exports include event count, export metadata, and favorite preference context.
- Imports show how many events were added, replaced, or unchanged.
- Imports show a preview before shared JSON files are merged into local storage.
- Google Calendar-compatible `.ics` export for high-priority events from the current filtered view.
- Selected-weekend Google Calendar export from weekend cards.
- Hosted `events.json` update support that can merge deployed event updates by stable event `id`.
- Node-based event validation helper for `events.json`.
- Static hosting compatibility.
- Shareable output folder and zip artifact under `outputs/`.

## Planned Features

Near-term roadmap items include:

- Deploy and verify the app on Vercel.
- Confirm that hosted `/events.json` updates work from the deployed site.
- Wire `events.json` validation into a repeatable pre-deploy checklist.
- Improve event data quality with more confirmed dates, venues, times, and broadcast information.
- Add clearer feedback for hosted update results.
- Add a reset or restore option for the starter event database.
- Improve responsive behavior across desktop and mobile.

Longer-term roadmap items include:

- Sports schedule API integrations through serverless functions.
- Scheduled hosted updates with Vercel cron jobs.
- Shared backend storage for two-person collaboration.
- Login/accounts.
- Google Calendar export refinements.
- Notifications.
- Map view.
- Ticket price tracking.
- Hotel and travel estimate support.
- Favorite teams, leagues, drivers, and sports filters.

See `ROADMAP.md` for the authoritative long-term plan.

## Technology Stack

- Frontend: plain HTML, CSS, and JavaScript.
- Backend: none in the current version.
- Storage: browser `localStorage` for events and settings.
- Hosted data source: static `events.json` file.
- Libraries: none currently.
- Tooling: no build step, no package manager requirement, and no framework dependency.
- Deployment target: Vercel or any static hosting provider.

There is currently no `package.json`, so there are no npm dependencies to install.

## Project Structure

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

Important files:

- `index.html`: Main app layout, navigation, filters, dashboard, calendar view, weekend view, settings, and event form modal.
- `styles.css`: Visual design, responsive layout, dark/light themes, sport accents, cards, calendar styling, and modal styling.
- `app.js`: Starter data, local storage, rendering, filtering, event CRUD, settings, themes, import/export, and hosted updates.
- `events.json`: Static hosted update file for adding or replacing events on deployed versions of the app.
- `PROJECT_STATUS.md`: Current project summary and status report.
- `ROADMAP.md`: Long-term roadmap and feature prioritization.
- `outputs/sports-weekend-planner/`: Shareable/deployable copy of the app.
- `outputs/sports-weekend-planner-shareable-v1.zip`: Zip package for sharing the current static app.
- `work/local-static-server.cjs`: Local static server for `http://localhost:8000`.
- `work/validate-events.cjs`: Event validator for hosted calendar data.

## Installation

This project currently does not require installation in the traditional sense because it has no dependencies and no build step.

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` in a modern web browser.

That is enough for the core app experience: dashboard, calendar, weekend view, event editing, filters, themes, and local import/export.

For the best local testing experience, especially when testing `events.json` hosted updates, run the project through a local static server instead of opening it with a `file://` URL.

This repository includes a small Node-based local server helper:

```bash
node work/local-static-server.cjs
```

Then open:

```text
http://localhost:8000
```

If you prefer Python and have it installed, this also works:


```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If Python is not installed, any static file server will work.

To validate the hosted event file before deployment, run:

```bash
node work/validate-events.cjs
```

## Usage

1. Open the app in a browser.
2. Use the Dashboard to see major upcoming events, trip candidates, best sports weekends, and sport groupings.
3. Use the Calendar view to browse events by month.
4. Use the Weekends view to compare sports-heavy weekends.
5. Select Add Event to create a new sports event.
6. Click an existing event card to edit or delete it.
7. Use filters to search by event, venue, TV service, sport, importance, or road trip status.
8. Use Settings to choose dark, light, or system theme and set defaults like home base, timezone, and TV service.
9. Use Export Shared JSON to download your local event database.
10. Use Import JSON to load a shared event database.
11. Review the import preview before confirming a merge.
12. Use Export Google Calendar to download a `.ics` file of high-priority events from the current filtered view.
13. Use Export Weekend Calendar on a weekend card to download a `.ics` file for that specific weekend.
14. On a hosted site, use Check Updates to merge events from the configured `events.json` update source.

## Current Status

Current version: `0.15.0`

Sports Weekend Planner is in an early but usable prototype stage. The foundation is working: users can browse, filter, add, edit, delete, preview imports, export shared JSON, theme event data locally, personalize the calendar with favorite sports, competitions, teams, drivers, structured event tags, and personal event scores, compare weekends with preference-aware watch scoring, validate hosted event data, and export high-priority or selected-weekend events to Google Calendar-compatible `.ics` files. The project is not yet a full version 1.0 because it does not have deployed verification, shared backend storage, or real sports API integrations.

The current development focus is to make the static hosted version reliable before adding heavier automation.

## Roadmap

The future plan is maintained in `ROADMAP.md`. That file should be treated as the authoritative roadmap for milestones, priorities, advanced features, and future ideas.

Current top priorities from the roadmap are:

1. Deploy the current app to Vercel and verify hosted behavior.
2. Improve documentation and beginner-friendly setup instructions.
3. Prepare Vercel deployment and hosted update verification.

## Security and Privacy

The current version stores event data and settings in the browser using `localStorage`. This means:

- Data is stored locally on each user's device and browser.
- There is no central account or shared database yet.
- Clearing browser data can remove saved events and settings.
- Exported JSON files may contain personal notes, trip ideas, home base, ticket links, or other planning details.
- Imported JSON should only come from trusted sources.

The app currently does not require API keys. Future sports schedule API integrations should run through serverless backend functions so private API keys are not exposed in browser JavaScript.

## Known Limitations

- No shared backend or real-time sync yet.
- No login or accounts yet.
- Each browser has its own local event database.
- Hosted updates merge events but do not currently remove stale local events.
- `events.json` is manually maintained and not verified against live sports schedules.
- No automated tests yet.
- Event validation exists as a local helper, but it is not yet part of an automated deploy workflow.
- Hosted update fetching may not work when opening the app directly from `file://`; use a hosted site or local server for that feature.
- Import conflicts are resolved by replacing events with the same `id`.
- Calendar and weekend scoring are useful but still early.

## Development Philosophy

This project prioritizes:

- Shipping useful functionality before advanced features.
- Manual data management before API integrations.
- Reliability before automation.
- Simplicity over unnecessary complexity.
