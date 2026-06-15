# Project Vision

Sports Command Center should become a personalized sports watch-planning app that helps users answer:

- What should I watch today?
- What should I watch this week?
- Which weekends should I keep free?
- What major events are coming up?
- What World Cup matches are happening?

The app should reduce sports schedule overload by surfacing major events, personal favorites, must-watch windows, and high-value weekends. Travel planning is useful but secondary.

# Current State

Version 0.16.0 is a static HTML/CSS/JavaScript app that runs locally or on GitHub Pages. It stores user data in `localStorage`, fetches hosted event updates from `events.json`, and now includes a GitHub Actions pipeline that can refresh `events.json` from public structured sources.

The first automated source adapter imports all 104 FIFA World Cup 2026 matches from OpenFootball's no-key public JSON feed.

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

# Milestone 2 - Core Experience

Minimum useful 1.0 release work:

- Enable and verify GitHub Pages hosting.
- Confirm deployed `/events.json` can be fetched and merged by the app.
- Run the GitHub Action manually and verify it does not create duplicate events.
- Finish a desktop and mobile playtest of Dashboard, Calendar, Weekends, filters, add/edit/delete, import/export, and hosted updates.
- Tune quick filters and dashboard section ordering based on real use.
- Improve empty states and update status messaging where needed.

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

# Milestone 4 - Advanced Features

Later, once the app is reliable:

- Additional public or secret-backed sports data adapters through GitHub Actions.
- Google Calendar export improvements or sync.
- Shared backend database.
- Shared login/accounts.
- Notifications for must-watch events and schedule changes.
- Favorite team/driver auto-imports.
- Conflict detection for overlapping must-watch events.
- Optional map view for serious trip candidates.

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
- Add stale-event handling so postponed/canceled imported events can be marked instead of silently lingering.
- Keep API secrets out of client code; use GitHub Actions secrets for any future authenticated source.
- Keep GitHub Pages/static hosting as the default deployment path.

# Current Priority

1. Verify GitHub Pages publishing and hosted update behavior.
2. Playtest Version 0.16.0 across desktop and mobile.
3. Tune World Cup, quick filter, and Weekend Score behavior based on what feels useful.
