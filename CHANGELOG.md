# Changelog

## 0.21.2

- Added local NASCAR series identifiers for NASCAR Cup Series, NASCAR O'Reilly Auto Parts Series, and NASCAR Craftsman Truck Series.
- Registered the NASCAR series assets as manual local league assets so the logo registry preserves them during future updates.
- Refreshed `data/logo-registry.json` and decorated existing NASCAR events with the matching `competitionLogo` metadata.
- Updated single-participant Dashboard rows so NASCAR series entries render with the applicable series mark instead of plain text when available.
- Synced the maintained `outputs/sports-weekend-planner/` app copy, hosted `events.json`, logo registry, and new league assets.

## 0.21.1

- Renamed the Dashboard All Events table column from `Event` to `Event / Location`.
- Updated Dashboard All Events rows so the primary line shows the event title and the muted secondary line shows existing location and/or venue data.
- Added `Location TBD` only when no useful venue/location value exists.
- Reduced duplicate matchup text by rendering compact participant identities with flags/logos/abbreviations when the event title already repeats the matchup.
- Preserved event data shape, hosted update behavior, localStorage behavior, Dashboard pagination, and static hosting compatibility.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.21.0

- Added a dedicated Events page instead of sending the Events navigation item back to the Dashboard table.
- Added an Events command board with local search, date ranges, quick chips, watch-priority sorting, grouped date sections, and compact agenda cards.
- Added shared-interest readouts to Events cards so two people can quickly compare "Me" and "Friend" interest per event.
- Added mobile-friendly Events page behavior with stacked agenda cards instead of a wide table as the primary phone experience.
- Added an Events board `.ics` export for the current Events board result set.
- Preserved Dashboard All Events pagination, Dashboard/Calendar/Weekends behavior, event data, hosted update flow, localStorage behavior, GitHub Actions, and static hosting compatibility.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.20.1

- Revamped the Weekends view to match the newer Sports Command Center dashboard and Calendar visual direction.
- Replaced the older stacked weekend cards with SCC command-board panels showing Weekend Score, event counts, sport variety, shared-interest average, shared locks, friend high-interest count, and top overlap.
- Added compact weekend event rows with sport logos/fallback marks, status/source pills, event metadata, priority badges, and a dedicated shared-interest card.
- Added per-event "Me" and "Friend" interest bars plus overlap labels such as Shared lock, Worth a text, Sell the friend, Friend pull, and Low overlap.
- Moved shared event data controls from the sidebar into the Settings tab.
- Renamed the All Events date sort to Date & Time and made it sort same-day events by timezone-aware start time.
- Added `AGENTS.md` repo guidance and documented the canonical local project root.
- Archived the stale pre-move local contents and replaced the old project path contents with pointer files that identify the canonical repo.
- Preserved weekend exports, event modal opening from weekend rows, filters, event data, hosted updates, localStorage behavior, static hosting compatibility, and GitHub Actions.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.20.0

- Revamped the Calendar view to match the newer Sports Command Center broadcast-dashboard visual direction.
- Replaced the old green/olive calendar day surfaces with dark navy/charcoal glass panels, cyan-blue framing, and subtle grid glow.
- Added safe visual day-state hooks for current day, outside-month days, weekends, days with events, and days with high-priority events.
- Restyled Calendar event buttons as compact broadcast chips with sport accent rails, tighter typography, and clearer priority treatment.
- Preserved Calendar navigation, filtering, event modal behavior, static hosting compatibility, localStorage behavior, hosted updates, and event data.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.19.4

- Fixed the Calendar view so opening the Calendar tab starts on the current real month instead of the old hard-coded May 2026 month.
- Kept Previous/Next month navigation working after the Calendar tab opens.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.19.3

- Replaced the six top stat tile placeholder/emoji icons with compact inline SVG dashboard icons.
- Centered stat tile icons inside their existing icon blocks for more balanced alignment.
- Preserved the current stat tile layout, counts, dashboard grid, and section accent color system.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.19.2

- Added a local FIFA World Cup 2026 SVG mark under `assets/logos/leagues/`.
- Registered the World Cup mark as a manual local league asset so World Cup cards and rows use it instead of the generic soccer fallback.
- Refreshed `data/logo-registry.json` and hosted event logo metadata.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.19.1

- Added pagination controls to the All Events dashboard table so lists longer than 10 rows can be navigated.
- Reset the All Events table back to page 1 when filters, quick filters, or sort mode change.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.19.0

- Added verified static future 2026 racing schedule data for NASCAR Cup Series, NASCAR O'Reilly Auto Parts Series, NASCAR Craftsman Truck Series, Formula 1, IndyCar, MotoGP, and IMSA WeatherTech SportsCar Championship.
- Added `sources/racing-2026.mjs` to normalize static racing schedule JSON into the existing event schema.
- Added static racing schedule files under `sources/schedules/2026/`.
- Wired racing imports into `scripts/update-events.mjs` while preserving World Cup, curated major-event windows, logo decoration, and merge-by-stable-ID behavior.
- Expanded hosted `events.json` from 141 to 232 events: 93 racing events normalized, 91 new events added, and 2 older curated racing placeholders replaced by richer racing schedule rows.
- Added optional racing metadata support for `seriesId`, `seriesName`, `season`, `raceNumber`, `eventType`, `radio`, and `duration`.
- Kept imported racing importance as base/default priority only, leaving room for future favorite-aware and conflict-aware scoring.
- Documented future NFL/NCAA football source-model groundwork without importing football schedules in this version.
- Carried forward the pending 0.18.3 visual polish: centered status pills, continuous All Events border styling, and hidden stat-card mini bars.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.18.3

- Added a reusable command-center color system for the Sports Command Center dashboard.
- Assigned distinct section accent identities: Today cyan, This Week blue, Keep-Free Weekends lime/gold, World Cup / Active Tournaments violet/blue, Must-Watch red, Watchlist orange/gold, and All Events cyan.
- Matched the six stat tiles to the section color system without making the tiles overly bright.
- Updated quick filter chips with compact, controlled accent colors and clearer active/hover states.
- Polished status, Weekend Score, channel badge, and source badge colors for better broadcast-dashboard readability.
- Preserved dashboard layout, event data, logo registry, update pipeline, SCC crest, stadium banner asset, and existing app behavior.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.18.2

- Tuned the real stadium banner crop and positioning in the compact page header.
- Reduced the dark overlay so more stadium-light detail is visible while keeping title text readable.
- Slightly increased compact desktop header height within the requested range.
- Preserved left-aligned title placement, compact Add Event placement, dashboard layout, event data, logo pipeline, and SCC crest.
- Synced the maintained `outputs/sports-weekend-planner/` app copy.

## 0.18.1

- Integrated the real SCC crest image into the sidebar brand area.
- Integrated the real stadium banner image as the compact page header background.
- Disabled the old CSS-generated sidebar crest so the real asset is the visible brand mark.
- Copied the brand assets, logo registry, and updated root app files into `outputs/sports-weekend-planner/`.
- Confirmed the Version 0.18 data/logo pipeline remains intact with 141 events, 104 World Cup matches, 37 curated major-event windows, and no duplicate event IDs.

## 0.18.0

- Added the first real sports data and visual identity foundation.
- Added `data/logo-registry.json` as the generated browser lookup for sports, leagues, teams, channels, and flags.
- Added TheSportsDB artwork support through `sources/thesportsdb.mjs`; API calls stay in the Node updater, not browser JavaScript.
- Added FlagCDN country flags for World Cup match tiles.
- Added local channel identifier SVGs and local sport fallback marks under `assets/logos/`.
- Added `sources/major-events.mjs` with selective curated major-event windows beyond soccer.
- Expanded hosted `events.json` from 107 to 141 events.
- Added optional event logo fields and optional active tournament metadata fields.
- Updated compact event rows, World Cup tiles, Active Tournaments, Must-Watch, Watchlist, and All Events to render logos with safe fallbacks.
- Updated the event updater to refresh World Cup matches, curated major events, logo registry data, and decorated event metadata.
- Updated validation for logo maps and tournament metadata.
- Added `DATA_SOURCES.md` source audit.
- Confirmed repeated updater runs do not create duplicate events or noisy rewrites when TheSportsDB is rate-limited.

## 0.17.0

- Completed a final command-center visual polish pass.
- Adjusted the dark palette toward a brighter cyan/blue sports-broadcast look with cleaner contrast.
- Improved the compact stadium banner with stronger light clusters, beams, and broadcast atmosphere.
- Polished the SCC crest styling with brighter teal outlines, depth, and stronger badge contrast.
- Updated compact event time display to prefer the user's default timezone, ET by default, without mutating stored event data.
- Condensed the sidebar range-filter labels so the label and current number sit on one line with the number highlighted.
- Preserved the existing static app behavior and did not add new product systems or event sources.

## 0.16.6

- Removed the detailed hosted update status block from the sidebar Event updates section.
- Kept the compact Last Update card and update/check behavior.
- Removed unused CSS for the deleted hosted status block.

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
