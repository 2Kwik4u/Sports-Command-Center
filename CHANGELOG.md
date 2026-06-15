# Changelog

## 0.16.1

- Tightened the UI toward the approved Sports Command Center concept screenshot.
- Added icon-forward sidebar navigation and a larger SCC sports badge.
- Reworked the top stats into six compact scoreboard tiles.
- Added a header update card that matches the concept more closely.
- Added sport icons to compact event rows.
- Added country flags to World Cup match tiles.
- Changed All Matching Events into a dense table-style view.

## 0.16.0

- Rebranded the app direction toward Sports Command Center.
- Added a more energetic sports dashboard visual refresh.
- Added Dashboard sections for Today / Next 24 Hours, This Week, World Cup / Active Tournaments, and Keep-Free Weekends.
- Added dashboard quick filter chips.
- Added automated source metadata fields to the event model.
- Added GitHub Actions workflow for event updates.
- Added `scripts/update-events.mjs`.
- Added source adapter pattern under `sources/`.
- Added FIFA World Cup 2026 import with 104 matches from OpenFootball's public JSON feed.
- Updated `events.json` to 107 hosted events.
- Improved hosted update status UX.
- Improved event validation for stable IDs, duplicate IDs, metadata fields, and auto-imported source fields.
- Updated project documentation for GitHub Pages/static hosting and GitHub Actions automation.

## 0.15.1

- Hid past events from Dashboard and Weekends without deleting historical data.

## 0.15.0

- Added visible app version in the sidebar.
- Added import preview.
- Added selected-weekend Google Calendar export.
- Added event validation helper.
- Improved personalization and Weekend Score behavior.
