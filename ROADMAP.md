# Project Vision

Sports Command Center should become a personalized sports watch-planning app that helps users answer:

- What should I watch today?
- What should I watch this week?
- Which weekends should I keep free?
- What major events are coming up?
- What World Cup matches are happening?

The app should reduce sports schedule overload by surfacing major events, personal favorites, must-watch windows, and high-value weekends. Travel planning is useful but secondary.

# Current State

Version 0.19.0 is a static HTML/CSS/JavaScript app that runs locally or on static hosting. It stores user data in `localStorage`, fetches hosted event updates from `events.json`, and includes a GitHub Actions-compatible pipeline that can refresh `events.json` and `data/logo-registry.json` from controlled sources.

The current automated source adapters import all 104 FIFA World Cup 2026 matches from OpenFootball's no-key public JSON feed, selective curated major-event windows, and 93 future 2026 racing schedule events from verified static JSON. The app also includes TheSportsDB league/team artwork, FlagCDN country flags, local channel identifiers, and optional tournament/series metadata for future Active Tournament improvements.

# Milestone 1 - Foundation

Completed or nearly completed:

- Static app structure.
- Dashboard, calendar, and weekend planner.
- Manual add/edit/delete event workflow.
- Filters and quick dashboard chips.
- Local settings and theme support.
- Personal scoring and favorite matching.
- JSON import/export and import preview.
- Google Calendar-compatible `.ics` export.
- Hosted `events.json` merge flow.
- Past-event hiding on Dashboard and Weekends.
- GitHub repository connection.
- GitHub Pages-compatible static structure.
- Event validation helper.
- Generated logo registry.
- TheSportsDB artwork adapter.
- FlagCDN World Cup flags.
- Curated multi-sport major-event windows.
- Verified static 2026 racing schedule import.
- Optional logo and tournament metadata fields.

# Milestone 2 - Core Experience

Minimum useful 1.0 release work:

- Enable and verify GitHub Pages hosting.
- Confirm deployed `/events.json` can be fetched and merged by the app.
- Run the GitHub Action manually and verify it does not create duplicate events.
- Finish a desktop and mobile playtest of Dashboard, Calendar, Weekends, filters, add/edit/delete, import/export, and hosted updates.
- Tune quick filters and dashboard section ordering based on real use.
- Improve empty states and update status messaging where needed.
- Improve favorite teams, drivers, leagues, and competitions so the calendar feels more personalized.
- Improve Weekend Score and must-watch identification using the new event/source metadata.
- Add a friend-friendly shared event database workflow for export/import/update habits.
- Add Google Calendar export refinements for filtered watchlists and keep-free weekends.

# Milestone 3 - Enhanced Experience

Usability and polish after the core hosted version works:

- Improve Weekend Score with real usage feedback.
- Add canonical suggestions for teams, drivers, leagues, and competitions.
- Add selected-event export options.
- Add better calendar navigation such as jump to today and month picker.
- Add sort controls for list views.
- Add status/date-range/TV/friend-interest filters.
- Add clearer event detail sections for watch info, personalization, source info, and optional trip info.
- Add accessibility and keyboard navigation review.
- Add PWA manifest, icons, service worker, and offline shell so the app can become installable on a phone.
- Add richer logo coverage for manually curated favorite teams, leagues, and channels.
- Improve Active Tournaments so it can rotate between World Cup, playoffs, majors, race weekends, and tournament windows.

# Milestone 4 - Advanced Features

Later, once the app is reliable:

- Additional public or secret-backed sports data adapters through GitHub Actions.
- Google Calendar export improvements or sync.
- Shared backend database.
- Shared login/accounts.
- Notifications for must-watch events and schedule changes.
- Favorite team/driver auto-imports.
- NFL and NCAA football source adapters after racing personalization is stable.
- Conflict detection for overlapping must-watch events.
- Optional map view for serious trip candidates.
- Optional ticket price tracking, hotel estimates, flight estimates, and travel budgets after the watch-planning product is stable.

# Future Ideas

- AI-generated weekly sports weekend brief.
- Public read-only weekend sharing link.
- Collaborative notes per event.
- Attended-event history.
- Best sports weekends of the year ranking.
- Optional ticket price tracking.
- Optional hotel/flight/travel budget estimates.

# Technical Improvements

- Add automated browser smoke tests.
- Split `app.js` into smaller modules when the static prototype grows too large.
- Add a formal JSON schema for event validation.
- Add source-specific tests for update adapters.
- Add tests for logo registry generation and fallback behavior.
- Add stale-event handling so postponed/canceled imported events can be marked instead of silently lingering.
- Keep API secrets out of client code; use GitHub Actions secrets for any future authenticated source.
- Keep GitHub Pages/static hosting as the default deployment path.

# Current Priority

1. Playtest Version 0.19.0 with racing-heavy weekends, Racing quick filter, Calendar, Weekends, and All Events.
2. Improve personalization: favorite drivers/series/leagues, personal scoring, and must-watch/Weekend Score behavior.
3. Refine the shared event database workflow and Google Calendar export now that hosted events cover more sports.
