# Changelog

## 0.16.5

- Removed nonfunctional search, notification, and settings icon buttons from the header.
- Kept Add Event as the only header action.
- Preserved the dedicated Settings tab and existing Add Event behavior.

## 0.16.4

- Moved the full app settings form out of the sidebar and into a dedicated Settings view.
- Changed the Settings sidebar item to open the main Settings tab.
- Kept the sidebar focused on navigation, filters, share/update utilities, update status, and version.
- Preserved settings save behavior, theme switching, hosted update controls, and version display.

## 0.16.3

- Treated the generated Sports Command Center screenshot as the approved pixel-target design spec.
- Reordered the Dashboard so six stat tiles appear before quick filters.
- Tightened the stadium header, narrowed the sidebar, and improved the SCC crest.
- Moved update status/check controls to the lower sidebar near the version area.
- Kept Add Event as a compact header action.
- Capped Today, This Week, Keep-Free Weekends, Must-Watch Events, Watchlist, and World Cup tiles to three visible items plus `+ X more` rows.
- Added cleaner event time formatting for compact broadcast-style rows.
- Added a controlled `assets/logos/` structure and JavaScript fallback layer for future local channel, league, team, and flag logos.
- Preserved existing static app functionality, hosted updates, local storage, JSON import/export, and calendar export.

## 0.16.2

- Treated the generated Sports Command Center screenshot as the approved visual target.
- Reduced header/banner height so the dashboard feels less like a tall landing page.
- Tightened stat cards, quick filters, dashboard panels, and event row spacing.
- Added broadcast-style TV/channel badges.
- Changed Must-Watch Events from one large spotlight into compact priority rows.
- Changed Watchlist rows to match the denser command-center style.
- Added Teams / Participants to the All Events table.
- Added table sort control and top-right `.ics` export action.
- Hid optional trip/sports summary panels from the main dashboard grid to match the approved two-row concept layout.
- Preserved existing static app functionality and event automation.

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
