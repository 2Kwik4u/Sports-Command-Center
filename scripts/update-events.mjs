import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { mergeEvents } from "../sources/normalize-event.mjs";
import { fetchWorldCup2026Events } from "../sources/world-cup-2026.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const eventsFile = path.join(root, "events.json");

async function readEventsFile() {
  const raw = await fs.readFile(eventsFile, "utf8");
  const parsed = JSON.parse(raw);

  return {
    parsed,
    events: Array.isArray(parsed) ? parsed : parsed.events || []
  };
}

function sortEvents(events) {
  return [...events].sort((first, second) => {
    const dateComparison = String(first.date || "").localeCompare(String(second.date || ""));

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return String(first.title || "").localeCompare(String(second.title || ""));
  });
}

async function main() {
  const { parsed, events } = await readEventsFile();
  const worldCupEvents = await fetchWorldCup2026Events();
  const { events: mergedEvents, summary } = mergeEvents(events, worldCupEvents);
  const nextPayload = Array.isArray(parsed)
    ? sortEvents(mergedEvents)
    : {
        ...parsed,
        app: "Sports Command Center",
        version: 2,
        updatedAt: summary.added || summary.replaced
          ? new Date().toISOString()
          : parsed.updatedAt || new Date().toISOString(),
        automation: {
          strategy: "GitHub Actions plus hosted events.json",
          sources: [
            {
              name: "OpenFootball World Cup JSON",
              adapter: "sources/world-cup-2026.mjs",
              eventCount: worldCupEvents.length
            }
          ]
        },
        events: sortEvents(mergedEvents)
      };

  await fs.writeFile(eventsFile, `${JSON.stringify(nextPayload, null, 2)}\n`, "utf8");

  console.log("Sports Command Center event update complete.");
  console.log(`World Cup events normalized: ${worldCupEvents.length}`);
  console.log(`Added: ${summary.added}`);
  console.log(`Replaced: ${summary.replaced}`);
  console.log(`Unchanged: ${summary.unchanged}`);
  console.log(`Total events in events.json: ${nextPayload.events?.length || nextPayload.length}`);
}

main().catch((error) => {
  console.error(`Event update failed: ${error.message}`);
  process.exitCode = 1;
});
