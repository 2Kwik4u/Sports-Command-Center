import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { mergeEvents } from "../sources/normalize-event.mjs";
import { buildLogoRegistry, decorateEventsWithLogos } from "../sources/logo-registry.mjs";
import { fetchCuratedMajorEvents } from "../sources/major-events.mjs";
import { fetchRacing2026Events } from "../sources/racing-2026.mjs";
import { fetchTheSportsDbLogoRegistry } from "../sources/thesportsdb.mjs";
import { fetchWorldCup2026Events } from "../sources/world-cup-2026.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const eventsFile = path.join(root, "events.json");
const logoRegistryFile = path.join(root, "data", "logo-registry.json");

async function readEventsFile() {
  const raw = await fs.readFile(eventsFile, "utf8");
  const parsed = JSON.parse(raw);

  return {
    parsed,
    events: Array.isArray(parsed) ? parsed : parsed.events || []
  };
}

async function readJsonFile(file, fallback) {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return fallback;
    }

    throw error;
  }
}

async function writeTextIfChanged(file, text) {
  try {
    const existingText = await fs.readFile(file, "utf8");

    if (existingText === text) {
      return false;
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, text, "utf8");
  return true;
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
  const existingLogoRegistry = await readJsonFile(logoRegistryFile, {});
  const providerLogoRegistry = await fetchTheSportsDbLogoRegistry();
  const logoRegistry = buildLogoRegistry({
    existingRegistry: existingLogoRegistry,
    providerRegistry: providerLogoRegistry
  });
  const worldCupEvents = await fetchWorldCup2026Events();
  const racingEvents = await fetchRacing2026Events();
  const curatedEvents = fetchCuratedMajorEvents();
  const importedEvents = decorateEventsWithLogos([...worldCupEvents, ...curatedEvents, ...racingEvents], logoRegistry);
  const { events: mergedEvents, summary } = mergeEvents(events, importedEvents);
  const decoratedEvents = sortEvents(decorateEventsWithLogos(mergedEvents, logoRegistry));
  const eventsChanged = JSON.stringify(sortEvents(events)) !== JSON.stringify(decoratedEvents);
  const nextPayload = Array.isArray(parsed)
    ? decoratedEvents
    : {
        ...parsed,
        app: "Sports Command Center",
        version: 2,
        updatedAt: eventsChanged
          ? new Date().toISOString()
          : parsed.updatedAt || new Date().toISOString(),
        automation: {
          strategy: "GitHub Actions plus hosted events.json",
          sources: [
            {
              name: "OpenFootball World Cup JSON",
              adapter: "sources/world-cup-2026.mjs",
              eventCount: worldCupEvents.length
            },
            {
              name: "Curated Major Event Windows",
              adapter: "sources/major-events.mjs",
              eventCount: curatedEvents.length
            },
            {
              name: "Static 2026 Racing Schedules",
              adapter: "sources/racing-2026.mjs",
              eventCount: racingEvents.length
            },
            {
              name: "TheSportsDB Logo Registry",
              adapter: "sources/thesportsdb.mjs",
              eventCount: 0,
              leagueLogoCount: Object.keys(logoRegistry.leagues || {}).length,
              teamLogoCount: Object.keys(logoRegistry.teams || {}).length,
              publicKeyUsed: providerLogoRegistry.source?.publicKeyUsed ?? true
            }
          ]
        },
        events: decoratedEvents
      };
  const registryWritten = await writeTextIfChanged(
    logoRegistryFile,
    `${JSON.stringify(logoRegistry, null, 2)}\n`
  );
  const eventsWritten = await writeTextIfChanged(
    eventsFile,
    `${JSON.stringify(nextPayload, null, 2)}\n`
  );

  console.log("Sports Command Center event update complete.");
  console.log(`World Cup events normalized: ${worldCupEvents.length}`);
  console.log(`Curated major events normalized: ${curatedEvents.length}`);
  console.log(`Racing schedule events normalized: ${racingEvents.length}`);
  console.log(`TheSportsDB league logo entries: ${Object.keys(providerLogoRegistry.leagues || {}).length}`);
  console.log(`TheSportsDB team logo entries: ${Object.keys(providerLogoRegistry.teams || {}).length}`);
  console.log(`Logo registry written: ${registryWritten ? "yes" : "no changes"}`);
  console.log(`Events written: ${eventsWritten ? "yes" : "no changes"}`);
  console.log(`Added: ${summary.added}`);
  console.log(`Replaced: ${summary.replaced}`);
  console.log(`Unchanged: ${summary.unchanged}`);
  console.log(`Total events in events.json: ${nextPayload.events?.length || nextPayload.length}`);

  if (providerLogoRegistry.warnings?.length) {
    console.log(`TheSportsDB warnings: ${providerLogoRegistry.warnings.slice(0, 5).join(" | ")}`);
  }
}

main().catch((error) => {
  console.error(`Event update failed: ${error.message}`);
  process.exitCode = 1;
});
