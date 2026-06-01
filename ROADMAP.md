# Project Vision

Sports Weekend Planner should evolve into a personalized Sports Command Center for identifying which sports events are worth watching, which weekends should be kept free, and which major events deserve attention across many sports.

The primary goal is to reduce sports schedule overload. Instead of trying to list every game, the app should help users filter, prioritize, and compare events based on personal interests, favorite teams, favorite drivers, preferred leagues, must-watch status, and weekend quality.

Sharing a common sports calendar with a friend is a core product goal. Travel planning remains useful, but it is secondary to the main watch-planning experience.

# Current State

The project is currently a static HTML, CSS, and JavaScript web app with no build step or backend. It runs directly in the browser, stores events and settings in `localStorage`, and includes a manual starter event database plus a hosted `events.json` update path.

Current functionality includes dashboard summaries, monthly calendar view, weekend list view, add/edit/delete event controls, filters, trip planning fields, shared JSON import/export with import preview, Google Calendar-compatible `.ics` export for high-priority and selected-weekend events, dark/light/system themes, basic hosted calendar updates, favorite preferences, structured event personalization fields, personal importance scoring, inferred keep-free/must-watch detection, preference-aware Weekend Score labels, and local `events.json` validation. The personalization layer is useful but still early and may eventually need canonical team, driver, league, and competition IDs.

# Milestone 1 - Foundation

These features are completed or nearly completed and form the base of the project:

- Static app structure using `index.html`, `styles.css`, `app.js`, and `events.json`.
- Manual event database with seed events across many sports.
- Event creation, editing, and deletion.
- Event details for title, sport, competition, date, time, timezone, importance, status, location, venue, TV, and notes.
- Trip planning fields for distance, hotel need, ticket link, travel notes, personal interest, friend interest, and trip status.
- Dashboard with summary stats, next major event, best upcoming weekends, trip candidates, sport grouping, and matching events.
- Month calendar view.
- Weekend list view.
- Filters for search, sport, importance, and road trip candidates.
- Dark, light, and system theme options.
- Local settings for home base, default timezone, default TV service, theme, auto-update preference, and update URL.
- JSON import/export for sharing local event data.
- Hosted `events.json` update flow that merges events by stable `id`.
- Static hosting compatibility for Vercel or similar platforms.

# Milestone 2 - Core Experience

These are the minimum features needed before calling the app a useful version 1.0:

- Deploy the app successfully on Vercel from the GitHub repository.
- Confirm the hosted site can load and merge `/events.json` over HTTPS.
- Decide one clear deployment source: project root or `outputs/sports-weekend-planner/`.
- Add validation for `events.json` so bad event data is caught before deployment. Completed as a local Node helper; not yet automated in deployment.
- Improve event data quality for the starter database, including more exact dates, times, TV details, competition names, and placeholders where schedules are not confirmed.
- Add a visible indication of when hosted updates last succeeded and how many events were added or replaced.
- Strengthen must-watch event identification so the dashboard clearly separates truly important events from ordinary upcoming events.
- Improve Weekend Score so it reflects importance, must-watch status, sport variety, event density, and personal preferences.
- Add a simple reset or restore option so users can recover the starter database if local data gets messy.
- Do a full responsive review on desktop and phone widths.

# Milestone 3 - Personalized Calendar

This milestone should make the calendar feel tailored to the user instead of being only a generic sports schedule:

- Add favorite teams, drivers, leagues, competitions, and sports to user settings. Completed in a first keyword-based pass.
- Add event fields or tags that can connect events to favorites. Completed with structured text fields for teams, drivers/athletes, competition tags, and extra watch keywords.
- Add personal importance scoring separate from general event importance. Completed in a first pass.
- Add friend interest scoring to more dashboard logic.
- Improve Weekend Score using favorite matches, personal importance, must-watch status, and sport variety. Completed in a first explainable pass and needs tuning from real usage.
- Add filters for favorites, must-watch events, personal importance, and shared interest. Favorite and personal score filters are complete; shared-interest filters remain.
- Add dashboard sections for "Your Must-Watch Events," "Favorite-Driven Weekends," and "Best Shared Watch Weekends." A first personalized watchlist is complete; richer shared weekend sections remain.
- Improve event cards so they explain why an event is being highlighted.
- Improve the shared event database workflow so two people can exchange and merge the same calendar more confidently. Partially completed with richer export metadata and merge summaries.
- Add Google Calendar export for must-watch events, favorite-based events, or selected weekends. High-priority filtered event export and selected-weekend export are complete.

# Milestone 4 - Enhanced Experience

These features improve usability, trust, and polish once the personalized 1.0 experience is reliable:

- Better event detail view with clearer sections for watch info, personalization, shared interest, and optional trip info.
- Calendar improvements such as jumping to today, choosing a month, and showing more compact events on crowded days.
- Sort controls for list views, such as date, importance, sport, personal score, and shared interest.
- More filter options for status, trip status, TV service, date range, and friend interest.
- CSV export in addition to JSON export.
- Printable or shareable weekend summary view.
- More helpful empty states and confirmation messages.
- Accessibility pass for keyboard navigation, focus states, labels, contrast, and dialog behavior.
- More polished mobile layout for the sidebar, filters, settings, and event modal.

# Milestone 5 - Advanced Features

These features add more complex behavior and should come after a reliable personalized version exists:

- Vercel serverless functions for sports calendar imports.
- Vercel cron jobs for scheduled event updates.
- Shared backend database so two people see the same events automatically.
- Login/accounts for shared use.
- Notifications for must-watch events, favorite-based events, and major schedule changes.
- Auto-import major sports calendars from selected providers.
- Conflict detection for overlapping must-watch events.
- Personal and friend voting or comments on events.
- Advanced Google Calendar sync beyond one-time export.

# Future Ideas

These are interesting possibilities, but they should not be worked on until the product is already useful and stable:

- AI-generated weekly sports weekend brief.
- Public read-only sharing link for a specific weekend plan.
- Collaborative planning notes per event.
- Sports bar watch-location planner.
- Historical archive of attended events.
- Photos or memories attached to attended events.
- Power ranking of the best sports weekends of the year.
- Optional map view for selected road trip candidates.
- Optional ticket price tracking for events already marked as serious trip candidates.
- Optional hotel, flight, or travel budget estimates for later trip-planning expansion.

# Technical Improvements

- Add an event schema or validation script for `events.json`. Completed as `work/validate-events.cjs`; a formal schema can come later.
- Add a favorites/preferences data model that can support teams, drivers, leagues, competitions, and sports.
- Add clear separation between global event importance and personal importance.
- Add repeatable calculations for Weekend Score and personal watch priority.
- Split `app.js` into smaller modules once the project grows beyond the current static prototype.
- Add basic automated checks for event parsing, filtering, weekend scoring, import/export, hosted updates, and personalization logic.
- Add browser smoke tests for the main user flows: dashboard load, add event, edit event, delete event, filter, import, export, theme switch, and favorites filtering.
- Add safer import conflict handling, including a preview of events that will be added or replaced. Completed in a first import-preview pass.
- Add stale-event handling for hosted updates so removed or postponed events can be marked clearly instead of lingering forever.
- Keep API keys out of browser code by using serverless functions for future API integrations.
- Consider moving from `localStorage` to a hosted database only when shared multi-user sync becomes a near-term feature.
- Create a repeatable deployment workflow for Vercel.

# Current Priority

1. Add a documented pre-deploy checklist that runs the event validator and local smoke checks.
2. Tune the Weekend Score formula further after real usage with favorite settings.
3. Consider canonical IDs or dropdown suggestions for common teams, drivers, leagues, and competitions.
