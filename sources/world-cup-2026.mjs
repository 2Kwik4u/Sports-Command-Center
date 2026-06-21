import fs from "node:fs/promises";

import {
  importanceForSoccerTournamentRound,
  parseSourceTime,
  resultStatus,
  scoreText,
  slugify,
  statusForSoccerTournamentRound
} from "./normalize-event.mjs";

export const WORLD_CUP_2026_SOURCE_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";
export const WORLD_CUP_2026_TV_SCHEDULE_URL = new URL(
  "./schedules/2026/world-cup-tv.json",
  import.meta.url
);

const SUPPORTED_TV_ASSIGNMENTS = new Set(["FOX", "FS1"]);

function stableMatchId(match) {
  const teams = [match.team1, match.team2].filter(Boolean).join("-v-");
  const base = [
    "fifa-world-cup-2026",
    match.group || match.round,
    match.round,
    teams,
    match.date
  ].filter(Boolean).join("-");

  return slugify(base);
}

function notesForMatch(match, sourceLabel) {
  const parts = [
    `${match.round || "World Cup match"}${match.group ? `, ${match.group}` : ""}.`,
    "Imported by the automated event updater.",
    sourceLabel ? `Source: ${sourceLabel}.` : "",
    "Confirm TV/streaming details before match day."
  ];

  return parts.filter(Boolean).join(" ");
}

async function readWorldCupTvSchedule(scheduleUrl = WORLD_CUP_2026_TV_SCHEDULE_URL) {
  const raw = await fs.readFile(scheduleUrl, "utf8");
  const schedule = JSON.parse(raw);
  const assignments = Array.isArray(schedule.assignments) ? schedule.assignments : [];

  return {
    ...schedule,
    assignments
  };
}

function buildTvAssignmentMap(schedule) {
  return schedule.assignments.reduce((assignments, assignment) => {
    const eventId = String(assignment.eventId || "").trim();
    const tv = String(assignment.tv || "").trim().toUpperCase();

    if (!eventId || !SUPPORTED_TV_ASSIGNMENTS.has(tv)) {
      return assignments;
    }

    assignments.set(eventId, {
      tv,
      sourceName: schedule.sourceName || "",
      sourceUrl: schedule.sourceUrl || "",
      lastVerifiedAt: schedule.lastVerifiedAt || ""
    });

    return assignments;
  }, new Map());
}

export async function fetchWorldCup2026Events(options = {}) {
  const sourceUrl = options.sourceUrl || WORLD_CUP_2026_SOURCE_URL;
  const tvSchedule = await readWorldCupTvSchedule(options.tvScheduleUrl);
  const tvAssignments = buildTvAssignmentMap(tvSchedule);
  const response = await fetch(sourceUrl, { headers: { "User-Agent": "Sports-Command-Center-Updater" } });

  if (!response.ok) {
    throw new Error(`World Cup source returned ${response.status}`);
  }

  const sourceUpdatedAt = response.headers.get("last-modified") || "";
  const sourceData = await response.json();
  const matches = Array.isArray(sourceData.matches) ? sourceData.matches : [];
  const sourceLabel = sourceData.name || "OpenFootball World Cup JSON";

  return matches.map((match) => {
    const teams = [match.team1, match.team2].filter(Boolean);
    const { startTime, timezone } = parseSourceTime(match.time);
    const importance = importanceForSoccerTournamentRound(match.round, teams);
    const status = statusForSoccerTournamentRound(match.round, importance);
    const id = match.num
      ? `fifa-world-cup-2026-match-${String(match.num).padStart(3, "0")}`
      : stableMatchId(match);
    const tvAssignment = tvAssignments.get(id);

    return {
      id,
      title: teams.length === 2
        ? `${teams[0]} vs ${teams[1]}`
        : `FIFA World Cup - ${match.round || "Match"}`,
      sport: "Soccer",
      competition: "FIFA World Cup",
      date: match.date,
      startTime,
      timezone,
      importance,
      personalImportance: importance,
      status,
      venue: match.ground || "TBD",
      location: match.ground || "TBD",
      tv: tvAssignment?.tv || "TBD",
      notes: notesForMatch(match, sourceLabel),
      teams,
      participants: teams,
      homeTeam: match.team1 || "",
      awayTeam: match.team2 || "",
      competitionTags: ["FIFA World Cup", "World Cup 2026", match.group, match.round].filter(Boolean),
      favoriteTags: ["World Cup", "Soccer", match.group, match.round].filter(Boolean),
      tournamentId: "fifa-world-cup-2026",
      tournamentName: "FIFA World Cup 2026",
      tournamentStartDate: "2026-06-11",
      tournamentEndDate: "2026-07-19",
      tournamentStage: match.round || "",
      tournamentStatus: "active-window",
      tournamentPriority: importance,
      source: "openfootball/worldcup.json",
      sourceId: String(match.num || stableMatchId(match)),
      sourceUrl,
      sourceUpdatedAt,
      lastVerifiedAt: tvAssignment?.lastVerifiedAt || sourceUpdatedAt,
      isAutoImported: true,
      dataStatus: tvAssignment ? `Imported; TV verified by ${tvAssignment.sourceName}.` : "Imported",
      stage: match.round || "",
      round: match.round || "",
      group: match.group || "",
      resultStatus: resultStatus(match),
      score: scoreText(match.score),
      trip: {
        distanceFromHome: "",
        travelNotes: "",
        hotelNeeded: false,
        ticketLink: "",
        myInterest: importance,
        friendInterest: 7,
        status: "Idea"
      }
    };
  });
}
