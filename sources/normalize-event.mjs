export function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseSourceTime(value) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})\s+(.+)$/);

  if (!match) {
    return { startTime: "", timezone: "TBD" };
  }

  return {
    startTime: `${match[1].padStart(2, "0")}:${match[2]}`,
    timezone: match[3].trim()
  };
}

export function scoreText(score) {
  if (!score || !Array.isArray(score.ft) || score.ft.length < 2) {
    return "";
  }

  return `${score.ft[0]}-${score.ft[1]}`;
}

export function resultStatus(match) {
  if (scoreText(match.score)) {
    return "Final";
  }

  return "Scheduled";
}

export function importanceForSoccerTournamentRound(round, teams = []) {
  const normalizedRound = String(round || "").toLowerCase();
  const teamText = teams.join(" ").toLowerCase();
  const favoriteCountryHints = ["united states", "usa", "usmnt"];

  if (normalizedRound.includes("final") && !normalizedRound.includes("third")) {
    return 10;
  }

  if (normalizedRound.includes("semi")) {
    return 10;
  }

  if (normalizedRound.includes("quarter") || normalizedRound.includes("round of")) {
    return 8;
  }

  if (favoriteCountryHints.some((team) => teamText.includes(team))) {
    return 8;
  }

  return 6;
}

export function statusForSoccerTournamentRound(round, importance) {
  const normalizedRound = String(round || "").toLowerCase();

  if (importance >= 8 || normalizedRound.includes("final") || normalizedRound.includes("semi")) {
    return "Must-watch";
  }

  return "Good TV weekend";
}

export function mergeEvents(existingEvents, importedEvents) {
  const merged = new Map();
  let added = 0;
  let replaced = 0;
  let unchanged = 0;

  existingEvents.forEach((event) => {
    merged.set(event.id, event);
  });

  importedEvents.forEach((incomingEvent) => {
    const existingEvent = merged.get(incomingEvent.id);

    if (!existingEvent) {
      merged.set(incomingEvent.id, incomingEvent);
      added += 1;
      return;
    }

    const nextEvent = existingEvent.isAutoImported
      ? { ...existingEvent, ...incomingEvent }
      : { ...incomingEvent, ...existingEvent };

    if (JSON.stringify(existingEvent) === JSON.stringify(nextEvent)) {
      unchanged += 1;
      return;
    }

    merged.set(incomingEvent.id, nextEvent);
    replaced += 1;
  });

  return {
    events: [...merged.values()],
    summary: { added, replaced, unchanged }
  };
}
