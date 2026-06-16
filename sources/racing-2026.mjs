import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { slugify } from "./normalize-event.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schedulesRoot = path.join(root, "sources", "schedules", "2026");
const SOURCE_NAME = "static/racing-2026";
const IMPORT_START_DATE = "2026-06-16";

const SCHEDULE_FILES = [
  "nascar-cup.json",
  "nascar-oreilly.json",
  "nascar-trucks.json",
  "formula-1.json",
  "indycar.json",
  "motogp.json",
  "imsa-weathertech.json"
];

function todayDateValue() {
  return new Date().toISOString().slice(0, 10);
}

function activeImportStartDate() {
  return todayDateValue() > IMPORT_START_DATE ? todayDateValue() : IMPORT_START_DATE;
}

async function readSchedule(fileName) {
  const file = path.join(schedulesRoot, fileName);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

function tripForEvent(event) {
  const roadTripCandidate = event.status === "Possible road trip";

  return {
    distanceFromHome: "",
    travelNotes: roadTripCandidate
      ? "Road trip candidate from the verified racing schedule. Confirm tickets, travel timing, and lodging before planning."
      : "",
    hotelNeeded: roadTripCandidate,
    ticketLink: "",
    myInterest: Math.max(6, Math.min(10, Number(event.importance || 7))),
    friendInterest: Math.max(6, Math.min(10, Number(event.importance || 7))),
    status: roadTripCandidate ? "Idea" : "Idea"
  };
}

function stableEventId(schedule, event) {
  if (event.legacyId) {
    return event.legacyId;
  }

  const key = event.canonicalTitle || event.title || event.venue;
  return `${schedule.seriesId}-${schedule.season}-${slugify(key)}-${event.date}`;
}

function normalizedRacingEvent(schedule, event) {
  const id = stableEventId(schedule, event);
  const sourceId = `${schedule.seriesId}-${schedule.season}-${slugify(event.canonicalTitle || event.title || event.venue)}-${event.date}`;
  const weekendStartDate = event.weekendStartDate || event.date;
  const weekendEndDate = event.weekendEndDate || event.date;
  const title = event.title || `${schedule.seriesName} Race`;
  const dataStatus = event.dataStatus || schedule.defaultDataStatus || "Verified static schedule.";
  const sourceUrl = event.sourceUrl || schedule.sourceUrl;
  const lastVerifiedAt = event.lastVerifiedAt || schedule.lastVerifiedAt || "";
  const importance = Number(event.importance || 6);

  return {
    id,
    title,
    sport: schedule.sport || "Racing",
    competition: schedule.competition || schedule.seriesName,
    date: event.date,
    startTime: event.startTime || "",
    timezone: event.timezone || "TBD",
    importance,
    personalImportance: importance,
    status: event.status || "Good TV weekend",
    venue: event.venue || "TBD",
    location: event.location || "TBD",
    tv: event.tv || "TBD",
    notes: `Verified 2026 racing schedule import. ${dataStatus}`,
    teams: [],
    participants: [schedule.seriesName],
    drivers: [],
    competitionTags: [
      schedule.seriesName,
      event.venue,
      event.stage,
      event.eventType
    ].filter(Boolean),
    favoriteTags: [
      "Racing",
      schedule.seriesName,
      schedule.competition,
      title,
      event.venue,
      event.location
    ].filter(Boolean),
    source: SOURCE_NAME,
    sourceId,
    sourceUrl,
    sourceUpdatedAt: schedule.lastVerifiedAt || "",
    lastVerifiedAt,
    isAutoImported: true,
    dataStatus,
    stage: event.stage || "",
    round: event.stage || "",
    resultStatus: "Scheduled",
    score: "",
    trip: tripForEvent(event),
    tournamentId: `${schedule.seriesId}-${schedule.season}`,
    tournamentName: `${schedule.seriesName} ${schedule.season} Season`,
    tournamentStartDate: weekendStartDate,
    tournamentEndDate: weekendEndDate,
    tournamentStage: event.stage || "",
    tournamentStatus: "scheduled",
    tournamentPriority: importance,
    seriesId: schedule.seriesId,
    seriesName: schedule.seriesName,
    season: schedule.season,
    raceNumber: event.raceNumber,
    eventType: event.eventType || "",
    radio: event.radio || "",
    duration: event.duration || ""
  };
}

export async function fetchRacing2026Events() {
  const importStartDate = activeImportStartDate();
  const schedules = await Promise.all(SCHEDULE_FILES.map(readSchedule));

  return schedules.flatMap((schedule) => {
    const events = Array.isArray(schedule.events) ? schedule.events : [];

    return events
      .filter((event) => event.date >= importStartDate)
      .map((event) => normalizedRacingEvent(schedule, event));
  });
}
