const STORAGE_KEY = "sports-weekend-planner-events-step-1";
const SETTINGS_KEY = "sports-weekend-planner-settings";
const SEED_VERSION_KEY = "sports-weekend-planner-seed-version";
const APP_VERSION = "0.15.1";
const CURRENT_SEED_VERSION = 2;
const DEFAULT_UPDATE_URL = "events.json";

const sportStyles = {
  Soccer: ["#5eead4", "rgba(94, 234, 212, 0.16)", "rgba(94, 234, 212, 0.45)"],
  Football: ["#60a5fa", "rgba(96, 165, 250, 0.16)", "rgba(96, 165, 250, 0.45)"],
  Racing: ["#fb7185", "rgba(251, 113, 133, 0.16)", "rgba(251, 113, 133, 0.45)"],
  Basketball: ["#fb923c", "rgba(251, 146, 60, 0.16)", "rgba(251, 146, 60, 0.45)"],
  Hockey: ["#a78bfa", "rgba(167, 139, 250, 0.16)", "rgba(167, 139, 250, 0.45)"],
  Tennis: ["#bef264", "rgba(190, 242, 100, 0.16)", "rgba(190, 242, 100, 0.45)"],
  Golf: ["#4ade80", "rgba(74, 222, 128, 0.16)", "rgba(74, 222, 128, 0.45)"],
  Baseball: ["#facc15", "rgba(250, 204, 21, 0.16)", "rgba(250, 204, 21, 0.45)"],
  "Combat Sports": ["#f472b6", "rgba(244, 114, 182, 0.16)", "rgba(244, 114, 182, 0.45)"],
  "Horse Racing": ["#fdba74", "rgba(253, 186, 116, 0.16)", "rgba(253, 186, 116, 0.45)"],
  "Major Events": ["#fde047", "rgba(253, 224, 71, 0.16)", "rgba(253, 224, 71, 0.45)"]
};

const statusStyles = {
  "Must-watch": ["#fef08a", "rgba(250, 204, 21, 0.16)", "rgba(250, 204, 21, 0.46)"],
  "Good TV weekend": ["#67e8f9", "rgba(34, 211, 238, 0.14)", "rgba(34, 211, 238, 0.38)"],
  "Possible road trip": ["#fdba74", "rgba(251, 146, 60, 0.16)", "rgba(251, 146, 60, 0.42)"],
  "Already attending": ["#86efac", "rgba(34, 197, 94, 0.14)", "rgba(34, 197, 94, 0.42)"],
  Skip: ["#cbd5e1", "rgba(148, 163, 184, 0.12)", "rgba(148, 163, 184, 0.35)"]
};

function starterEvent(event) {
  return {
    timezone: "ET",
    venue: "TBD",
    location: "TBD",
    tv: "TBD",
    notes: "Starter manual event. Confirm exact date, venue, teams, and broadcast before relying on it.",
    personalImportance: event.personalImportance || event.importance || 7,
    teams: event.teams || [],
    drivers: event.drivers || [],
    competitionTags: event.competitionTags || [],
    favoriteTags: event.favoriteTags || [],
    trip: {
      distanceFromHome: "",
      travelNotes: "",
      hotelNeeded: false,
      ticketLink: "",
      myInterest: 7,
      friendInterest: 7,
      status: "Idea"
    },
    ...event,
    trip: {
      distanceFromHome: "",
      travelNotes: "",
      hotelNeeded: false,
      ticketLink: "",
      myInterest: 7,
      friendInterest: 7,
      status: "Idea",
      ...event.trip
    }
  };
}

const starterEvents = [
  starterEvent({ id: "evt-champions-league-final", title: "Champions League Final", sport: "Soccer", competition: "UEFA Champions League", date: "2026-05-30", startTime: "15:00", importance: 10, status: "Must-watch", venue: "Puskas Arena", location: "Budapest, Hungary", tv: "CBS / Paramount+", notes: "Top-tier global final. Confirm exact broadcast details before match day.", trip: { distanceFromHome: "International", travelNotes: "Bucket-list trip. Would need flights, hotel, and several days.", hotelNeeded: true, myInterest: 10, friendInterest: 9 } }),
  starterEvent({ id: "evt-europa-league-final", title: "Europa League Final", sport: "Soccer", competition: "UEFA Europa League", date: "2027-05-26", startTime: "15:00", importance: 8, status: "Good TV weekend" }),
  starterEvent({ id: "evt-conference-league-final", title: "Conference League Final", sport: "Soccer", competition: "UEFA Conference League", date: "2027-05-19", startTime: "15:00", importance: 7, status: "Good TV weekend" }),
  starterEvent({ id: "evt-world-cup-final", title: "World Cup Final", sport: "Soccer", competition: "FIFA World Cup", date: "2026-07-19", startTime: "15:00", importance: 10, status: "Must-watch", venue: "MetLife Stadium", location: "East Rutherford, NJ", trip: { distanceFromHome: "Add from your home", hotelNeeded: true, myInterest: 10, friendInterest: 10, status: "Considering" } }),
  starterEvent({ id: "evt-mls-cup", title: "MLS Cup", sport: "Soccer", competition: "MLS", date: "2026-12-05", startTime: "16:00", importance: 7, status: "Good TV weekend" }),
  starterEvent({ id: "evt-us-open-cup-final", title: "US Open Cup Final", sport: "Soccer", competition: "US Open Cup", date: "2026-09-23", startTime: "20:00", importance: 6, status: "Good TV weekend" }),
  starterEvent({ id: "evt-leagues-cup-final", title: "Leagues Cup Final", sport: "Soccer", competition: "Leagues Cup", date: "2026-08-30", startTime: "20:00", importance: 6, status: "Good TV weekend" }),
  starterEvent({ id: "evt-nfl-kickoff", title: "NFL Kickoff Game", sport: "Football", competition: "NFL Regular Season", date: "2026-09-10", startTime: "20:20", importance: 8, status: "Good TV weekend", tv: "NBC / Peacock" }),
  starterEvent({ id: "evt-super-bowl", title: "Super Bowl", sport: "Football", competition: "NFL Playoffs", date: "2027-02-14", startTime: "18:30", importance: 10, status: "Must-watch", tv: "TBD", trip: { hotelNeeded: true, myInterest: 9, friendInterest: 9, status: "Idea" } }),
  starterEvent({ id: "evt-cfp-title", title: "College Football Playoff Championship", sport: "Football", competition: "College Football Playoff", date: "2027-01-18", startTime: "19:30", importance: 9, status: "Must-watch" }),
  starterEvent({ id: "evt-bowl-season", title: "College Football Bowl Weekend", sport: "Football", competition: "College Football Bowls", date: "2026-12-19", startTime: "12:00", importance: 7, status: "Good TV weekend" }),
  starterEvent({ id: "evt-indy-500", title: "Indianapolis 500", sport: "Racing", competition: "IndyCar", date: "2026-05-24", startTime: "12:45", importance: 10, status: "Possible road trip", venue: "Indianapolis Motor Speedway", location: "Speedway, IN", tv: "FOX", notes: "One of the best annual live-event atmospheres.", trip: { distanceFromHome: "Add from your home", travelNotes: "Race-weekend hotels fill early. Consider booking far ahead.", hotelNeeded: true, ticketLink: "https://www.indianapolismotorspeedway.com/", myInterest: 9, friendInterest: 8, status: "Considering" } }),
  starterEvent({ id: "evt-f1-us-gp", title: "Formula 1 United States Grand Prix", sport: "Racing", competition: "Formula 1", date: "2026-10-25", startTime: "15:00", importance: 8, status: "Possible road trip", venue: "Circuit of the Americas", location: "Austin, TX", tv: "ESPN", trip: { distanceFromHome: "Add from your home", hotelNeeded: true, myInterest: 9, friendInterest: 8, status: "Considering" } }),
  starterEvent({ id: "evt-nascar-championship", title: "NASCAR Cup Series Championship", sport: "Racing", competition: "NASCAR Cup Series", date: "2026-11-08", startTime: "15:00", importance: 8, status: "Good TV weekend" }),
  starterEvent({ id: "evt-imsa-rolex-24", title: "Rolex 24 at Daytona", sport: "Racing", competition: "IMSA", date: "2027-01-31", startTime: "13:30", importance: 8, status: "Possible road trip", venue: "Daytona International Speedway", location: "Daytona Beach, FL", trip: { hotelNeeded: true, myInterest: 8, friendInterest: 7, status: "Idea" } }),
  starterEvent({ id: "evt-motogp-americas", title: "MotoGP Grand Prix of the Americas", sport: "Racing", competition: "MotoGP", date: "2027-03-28", startTime: "15:00", importance: 7, status: "Good TV weekend", venue: "Circuit of the Americas", location: "Austin, TX" }),
  starterEvent({ id: "evt-bathurst-1000", title: "Bathurst 1000", sport: "Racing", competition: "Supercars", date: "2026-10-11", startTime: "01:30", importance: 7, status: "Good TV weekend" }),
  starterEvent({ id: "evt-world-series-game-1", title: "World Series Game 1", sport: "Baseball", competition: "MLB Playoffs", date: "2026-10-23", startTime: "20:00", importance: 9, status: "Must-watch", tv: "FOX" }),
  starterEvent({ id: "evt-mlb-wild-card-weekend", title: "MLB Wild Card Weekend", sport: "Baseball", competition: "MLB Playoffs", date: "2026-10-03", startTime: "14:00", importance: 7, status: "Good TV weekend" }),
  starterEvent({ id: "evt-world-baseball-classic-final", title: "World Baseball Classic Final", sport: "Baseball", competition: "World Baseball Classic", date: "2026-03-17", startTime: "20:00", importance: 8, status: "Must-watch" }),
  starterEvent({ id: "evt-nba-finals-game-1", title: "NBA Finals Game 1", sport: "Basketball", competition: "NBA Finals", date: "2026-06-04", startTime: "20:30", importance: 9, status: "Must-watch", tv: "ABC / ESPN App", notes: "Good example of a playoff-series event.", trip: { myInterest: 8, friendInterest: 8 } }),
  starterEvent({ id: "evt-march-madness-first-weekend", title: "March Madness First Weekend", sport: "Basketball", competition: "NCAA Tournament", date: "2027-03-20", startTime: "12:00", importance: 9, status: "Good TV weekend" }),
  starterEvent({ id: "evt-final-four", title: "Final Four Saturday", sport: "Basketball", competition: "NCAA Tournament", date: "2027-04-03", startTime: "18:00", importance: 9, status: "Must-watch" }),
  starterEvent({ id: "evt-stanley-cup-final", title: "Stanley Cup Final Game 1", sport: "Hockey", competition: "NHL Playoffs", date: "2026-06-06", startTime: "20:00", importance: 9, status: "Good TV weekend", tv: "TNT / Max", notes: "Strong TV weekend anchor." }),
  starterEvent({ id: "evt-wimbledon-finals", title: "Wimbledon Finals Weekend", sport: "Tennis", competition: "Wimbledon", date: "2026-07-12", startTime: "09:00", importance: 9, status: "Must-watch", venue: "All England Club", location: "London, England", tv: "ESPN", notes: "Morning TV event that pairs well with afternoon sports.", trip: { distanceFromHome: "International", travelNotes: "Bucket-list trip, probably future planning.", hotelNeeded: true, ticketLink: "https://www.wimbledon.com/", myInterest: 8, friendInterest: 7 } }),
  starterEvent({ id: "evt-us-open-tennis-finals", title: "US Open Tennis Finals Weekend", sport: "Tennis", competition: "US Open", date: "2026-09-13", startTime: "16:00", importance: 8, status: "Good TV weekend", venue: "USTA Billie Jean King National Tennis Center", location: "New York, NY", trip: { hotelNeeded: true, status: "Idea" } }),
  starterEvent({ id: "evt-australian-open-finals", title: "Australian Open Finals Weekend", sport: "Tennis", competition: "Australian Open", date: "2027-01-31", startTime: "03:30", importance: 8, status: "Good TV weekend" }),
  starterEvent({ id: "evt-french-open-finals", title: "French Open Finals Weekend", sport: "Tennis", competition: "French Open", date: "2027-06-06", startTime: "09:00", importance: 8, status: "Good TV weekend" }),
  starterEvent({ id: "evt-masters-final-round", title: "The Masters Final Round", sport: "Golf", competition: "The Masters", date: "2027-04-11", startTime: "14:00", importance: 10, status: "Must-watch", venue: "Augusta National Golf Club", location: "Augusta, GA" }),
  starterEvent({ id: "evt-pga-championship", title: "PGA Championship Final Round", sport: "Golf", competition: "PGA Championship", date: "2027-05-23", startTime: "14:00", importance: 8, status: "Good TV weekend" }),
  starterEvent({ id: "evt-ryder-cup-sunday", title: "Ryder Cup Sunday", sport: "Golf", competition: "Ryder Cup", date: "2027-09-26", startTime: "08:00", importance: 9, status: "Must-watch" }),
  starterEvent({ id: "evt-kentucky-derby", title: "Kentucky Derby", sport: "Horse Racing", competition: "Triple Crown", date: "2027-05-01", startTime: "18:45", importance: 8, status: "Possible road trip", venue: "Churchill Downs", location: "Louisville, KY", trip: { hotelNeeded: true, myInterest: 8, friendInterest: 7, status: "Idea" } }),
  starterEvent({ id: "evt-ufc-major-card", title: "UFC Major PPV Card", sport: "Combat Sports", competition: "UFC", date: "2026-08-15", startTime: "22:00", importance: 7, status: "Good TV weekend", tv: "ESPN+ PPV" }),
  starterEvent({ id: "evt-boxing-title-card", title: "Major Boxing Title Card", sport: "Combat Sports", competition: "Boxing", date: "2026-11-21", startTime: "21:00", importance: 7, status: "Good TV weekend" }),
  starterEvent({ id: "evt-world-cup-qualifier-window", title: "World Cup Qualifier Window", sport: "Major Events", competition: "World Cup Qualifiers", date: "2026-09-05", startTime: "19:00", importance: 7, status: "Good TV weekend" }),
  starterEvent({ id: "evt-summer-olympics-opening", title: "Summer Olympics Opening Ceremony", sport: "Major Events", competition: "Olympics", date: "2028-07-14", startTime: "20:00", importance: 10, status: "Must-watch" })
];

let events = loadEvents();
let settings = loadSettings();
let visibleMonth = new Date(2026, 4, 1);
let pendingImportEvents = [];
let pendingImportSummary = null;

function loadEvents() {
  const savedEvents = localStorage.getItem(STORAGE_KEY);

  if (!savedEvents) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterEvents));
    localStorage.setItem(SEED_VERSION_KEY, String(CURRENT_SEED_VERSION));
    return starterEvents;
  }

  try {
    return upgradeStarterEvents(JSON.parse(savedEvents)).map(normalizeEvent);
  } catch {
    localStorage.setItem(SEED_VERSION_KEY, String(CURRENT_SEED_VERSION));
    return starterEvents;
  }
}

function upgradeStarterEvents(savedEvents) {
  const seedVersion = Number(localStorage.getItem(SEED_VERSION_KEY) || 1);

  if (seedVersion >= CURRENT_SEED_VERSION) {
    return savedEvents;
  }

  const existingIds = new Set(savedEvents.map((event) => event.id));
  const newStarterEvents = starterEvents.filter((event) => !existingIds.has(event.id));
  const upgradedEvents = [...savedEvents, ...newStarterEvents];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(upgradedEvents));
  localStorage.setItem(SEED_VERSION_KEY, String(CURRENT_SEED_VERSION));

  return upgradedEvents;
}

function saveEvents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function defaultSettings() {
  return {
    theme: "dark",
    homeBase: "",
    defaultTimezone: "ET",
    defaultTv: "",
    favoriteSports: [],
    favoriteCompetitions: [],
    favoriteTeams: [],
    favoriteDrivers: [],
    autoUpdate: true,
    updateUrl: DEFAULT_UPDATE_URL
  };
}

function loadSettings() {
  const savedSettings = localStorage.getItem(SETTINGS_KEY);

  if (!savedSettings) {
    return defaultSettings();
  }

  try {
    return {
      ...defaultSettings(),
      ...JSON.parse(savedSettings)
    };
  } catch {
    return defaultSettings();
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function resolvedTheme() {
  if (settings.theme === "system") {
    return globalThis.matchMedia && globalThis.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  return settings.theme === "light" ? "light" : "dark";
}

function applyTheme() {
  document.body.dataset.theme = resolvedTheme();
}

function defaultTrip() {
  return {
    distanceFromHome: "",
    travelNotes: "",
    hotelNeeded: false,
    ticketLink: "",
    myInterest: 7,
    friendInterest: 7,
    status: "Idea"
  };
}

function normalizeEvent(event) {
  return {
    id: String(event.id || createEventId()),
    title: String(event.title || "Untitled event").trim(),
    sport: String(event.sport || "Major Events").trim(),
    competition: String(event.competition || "").trim(),
    date: String(event.date || toDateValue(new Date())),
    startTime: String(event.startTime || "").trim(),
    timezone: String(event.timezone || "ET").trim(),
    importance: clamp(Number(event.importance || 1), 1, 10),
    status: String(event.status || "Good TV weekend").trim(),
    venue: String(event.venue || "").trim(),
    location: String(event.location || "").trim(),
    tv: String(event.tv || "").trim(),
    notes: String(event.notes || "").trim(),
    personalImportance: clamp(Number(event.personalImportance || event.trip?.myInterest || event.importance || 1), 1, 10),
    teams: normalizeList(event.teams || event.participants || []),
    drivers: normalizeList(event.drivers || event.athletes || []),
    competitionTags: normalizeList(event.competitionTags || event.leagueTags || event.leagues || []),
    favoriteTags: normalizeList(event.favoriteTags || event.tags || []),
    trip: {
      ...defaultTrip(),
      ...(event.trip || {}),
      hotelNeeded: Boolean(event.trip?.hotelNeeded),
      myInterest: clamp(Number(event.trip?.myInterest || 7), 1, 10),
      friendInterest: clamp(Number(event.trip?.friendInterest || 7), 1, 10)
    }
  };
}

function isValidImportEvent(event) {
  return event &&
    typeof event === "object" &&
    typeof event.title === "string" &&
    typeof event.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(event.date);
}

function formatDate(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function parseDate(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateObject(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function eventDateTime(event) {
  const date = parseDate(event.date);

  if (event.startTime) {
    const [hours, minutes] = event.startTime.split(":").map(Number);
    date.setHours(hours || 0, minutes || 0);
  }

  return date;
}

function startOfToday() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function isUpcomingEvent(event) {
  return parseDate(event.date) >= startOfToday();
}

function getUpcomingEvents(sourceEvents) {
  return sourceEvents.filter(isUpcomingEvent);
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function sameCalendarDay(firstDate, secondDate) {
  return firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();
}

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createEventId() {
  if (globalThis.crypto && globalThis.crypto.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `event-${Date.now()}`;
}

function downloadTextFile(filename, contents, type) {
  const file = new Blob([contents], { type });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clamp(value, minimum, maximum) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.min(Math.max(value, minimum), maximum);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => normalizeList(item))
      .filter(Boolean);
  }

  return String(value || "")
    .split(/[\n,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToText(value) {
  return normalizeList(value).join(", ");
}

function lowerList(value) {
  return normalizeList(value).map((item) => item.toLowerCase());
}

function eventPreferenceText(event) {
  return [
    event.title,
    event.sport,
    event.competition,
    event.venue,
    event.location,
    event.tv,
    event.status,
    event.notes,
    ...(event.teams || []),
    ...(event.drivers || []),
    ...(event.competitionTags || []),
    ...(event.favoriteTags || [])
  ].join(" ").toLowerCase();
}

function favoriteMatchDetails(event) {
  const matches = [];
  const sport = String(event.sport || "").toLowerCase();
  const competition = String(event.competition || "").toLowerCase();
  const text = eventPreferenceText(event);
  const eventTeams = lowerList(event.teams);
  const eventDrivers = lowerList(event.drivers);
  const eventCompetitions = lowerList([event.competition, ...(event.competitionTags || [])]);

  lowerList(settings.favoriteSports).forEach((favorite) => {
    if (favorite && sport === favorite) {
      matches.push(`favorite sport: ${event.sport}`);
    }
  });

  lowerList(settings.favoriteCompetitions).forEach((favorite) => {
    if (favorite && (competition.includes(favorite) || eventCompetitions.some((tag) => tag.includes(favorite)) || text.includes(favorite))) {
      matches.push(`favorite competition: ${favorite}`);
    }
  });

  lowerList(settings.favoriteTeams).forEach((favorite) => {
    if (favorite && (eventTeams.some((team) => team.includes(favorite)) || text.includes(favorite))) {
      matches.push(`favorite team: ${favorite}`);
    }
  });

  lowerList(settings.favoriteDrivers).forEach((favorite) => {
    if (favorite && (eventDrivers.some((driver) => driver.includes(favorite)) || text.includes(favorite))) {
      matches.push(`favorite driver: ${favorite}`);
    }
  });

  return [...new Set(matches)];
}

function hasFavoriteMatch(event) {
  return favoriteMatchDetails(event).length > 0;
}

function eventWatchPriority(event) {
  const favoriteBonus = hasFavoriteMatch(event) ? 3 : 0;
  const mustWatchBonus = event.status === "Must-watch" ? 3 : 0;
  const goodTvBonus = event.status === "Good TV weekend" ? 1 : 0;
  const sharedInterest = Math.round(((event.personalImportance || 1) + (event.trip?.friendInterest || 1)) / 2);

  return event.importance + event.personalImportance + sharedInterest + favoriteBonus + mustWatchBonus + goodTvBonus;
}

function priorityLabel(event) {
  const reasons = [];

  if (event.status === "Must-watch") {
    reasons.push("must-watch");
  }

  if (hasFavoriteMatch(event)) {
    reasons.push("favorite match");
  }

  if ((event.personalImportance || 0) >= 8) {
    reasons.push("high personal score");
  }

  if ((event.trip?.friendInterest || 0) >= 8) {
    reasons.push("friend interested");
  }

  return reasons.length ? reasons.join(", ") : "general sports priority";
}

function isMustWatchEvent(event) {
  return event.status === "Must-watch" ||
    event.importance >= 9 ||
    event.personalImportance >= 9 ||
    (hasFavoriteMatch(event) && event.importance >= 8) ||
    eventWatchPriority(event) >= 28;
}

function mustWatchReason(event) {
  if (event.status === "Must-watch") {
    return "marked must-watch";
  }

  if (event.personalImportance >= 9) {
    return "personal score 9+";
  }

  if (event.importance >= 9) {
    return "major event";
  }

  if (hasFavoriteMatch(event) && event.importance >= 8) {
    return "favorite plus major event";
  }

  if (eventWatchPriority(event) >= 28) {
    return "high watch priority";
  }

  return "watch candidate";
}

function isRoadTripCandidate(event) {
  return event.status === "Possible road trip" ||
    event.status === "Already attending" ||
    ["Considering", "Planning", "Booked"].includes(event.trip?.status);
}

function getFilteredEvents() {
  const searchTerm = document.querySelector("#searchInput").value.trim().toLowerCase();
  const selectedSport = document.querySelector("#sportFilter").value;
  const minimumImportance = Number(document.querySelector("#importanceFilter").value);
  const minimumPersonalScore = Number(document.querySelector("#personalScoreFilter").value);
  const favoritesOnly = document.querySelector("#favoritesFilter").checked;
  const roadTripsOnly = document.querySelector("#roadTripFilter").checked;

  return events.filter((event) => {
    const searchableText = [
      event.title,
      event.sport,
      event.competition,
      event.venue,
      event.location,
      event.tv,
      event.status,
      event.notes,
      event.personalImportance,
      ...(event.teams || []),
      ...(event.drivers || []),
      ...(event.competitionTags || []),
      ...(event.favoriteTags || []),
      event.trip?.travelNotes
    ].join(" ").toLowerCase();

    return (!searchTerm || searchableText.includes(searchTerm)) &&
      (selectedSport === "all" || event.sport === selectedSport) &&
      event.importance >= minimumImportance &&
      event.personalImportance >= minimumPersonalScore &&
      (!favoritesOnly || hasFavoriteMatch(event)) &&
      (!roadTripsOnly || isRoadTripCandidate(event));
  });
}

function sportTag(sport) {
  const [color, background, line] = sportStyles[sport] || sportStyles.Soccer;

  return `<span class="tag" style="--tag-color: ${color}; --tag-bg: ${background}; --tag-line: ${line};">${escapeHtml(sport)}</span>`;
}

function statusTag(status) {
  const [color, background, line] = statusStyles[status] || statusStyles["Good TV weekend"];

  return `<span class="tag status-tag" style="--tag-color: ${color}; --tag-bg: ${background}; --tag-line: ${line};">${escapeHtml(status)}</span>`;
}

function sportAccentStyle(sport) {
  const [color, background, line] = sportStyles[sport] || sportStyles.Soccer;

  return `--sport-color: ${color}; --sport-bg: ${background}; --sport-line: ${line};`;
}

function eventCard(event) {
  const favoriteMatches = favoriteMatchDetails(event);

  return `
    <button class="event-card event-button" type="button" data-event-id="${escapeHtml(event.id)}" style="${sportAccentStyle(event.sport)}">
      <div class="event-topline">
        <div>
          <h4>${escapeHtml(event.title)}</h4>
          <div class="event-meta">
            ${sportTag(event.sport)}
            ${statusTag(event.status)}
            <span>${formatDate(event.date)}</span>
            <span>${escapeHtml(event.startTime || "Time TBD")} ${escapeHtml(event.timezone || "")}</span>
            <span>${escapeHtml(event.tv || "TV TBD")}</span>
            <span>Personal ${event.personalImportance}/10</span>
            ${favoriteMatches.length ? `<span class="watch-reason">${escapeHtml(priorityLabel(event))}</span>` : ""}
          </div>
        </div>
        <span class="importance" title="Watch priority">${eventWatchPriority(event)}</span>
      </div>
    </button>
  `;
}

function renderNextMajorEvent(visibleEvents) {
  const nextMajorEvent = document.querySelector("#nextMajorEvent");
  const now = new Date();
  const upcomingEvents = [...visibleEvents]
    .filter((event) => eventDateTime(event) >= now)
    .sort((first, second) => {
      const priorityDifference = eventWatchPriority(second) - eventWatchPriority(first);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return eventDateTime(first) - eventDateTime(second);
    });
  const nextMajor = upcomingEvents.find(isMustWatchEvent) || upcomingEvents.find((event) => hasFavoriteMatch(event) || event.importance >= 8) || upcomingEvents[0];

  if (!nextMajor) {
    nextMajorEvent.innerHTML = `<div class="empty-state">No upcoming event matches the current filters.</div>`;
    return;
  }

  nextMajorEvent.innerHTML = `
    <button class="spotlight-card event-button" type="button" data-event-id="${escapeHtml(nextMajor.id)}" style="${sportAccentStyle(nextMajor.sport)}">
      ${sportTag(nextMajor.sport)}
      <h4>${escapeHtml(nextMajor.title)}</h4>
      <div class="event-meta">
        <span>${formatDate(nextMajor.date)}</span>
        <span>${escapeHtml(nextMajor.startTime || "Time TBD")} ${escapeHtml(nextMajor.timezone || "")}</span>
        <span>${escapeHtml(nextMajor.location || "Location TBD")}</span>
      </div>
      <p>Priority ${eventWatchPriority(nextMajor)} - ${escapeHtml(isMustWatchEvent(nextMajor) ? mustWatchReason(nextMajor) : priorityLabel(nextMajor))} ${statusTag(nextMajor.status)}</p>
    </button>
  `;
}

function renderStats(visibleEvents) {
  const mustWatchCount = visibleEvents.filter(isMustWatchEvent).length;
  const favoriteMatchCount = visibleEvents.filter(hasFavoriteMatch).length;
  const averagePriority = visibleEvents.length
    ? visibleEvents.reduce((total, event) => total + eventWatchPriority(event), 0) / visibleEvents.length
    : 0;

  document.querySelector("#totalEvents").textContent = visibleEvents.length;
  document.querySelector("#mustWatchEvents").textContent = mustWatchCount;
  document.querySelector("#roadTripEvents").textContent = favoriteMatchCount;
  document.querySelector("#averageImportance").textContent = averagePriority.toFixed(1);
}

function renderEvents(visibleEvents) {
  const sortedEvents = [...visibleEvents].sort((a, b) => a.date.localeCompare(b.date));
  const eventList = document.querySelector("#eventList");

  eventList.innerHTML = sortedEvents.map(eventCard).join("") ||
    `<div class="empty-state">No events match the current filters.</div>`;
}

function renderSportSummary(visibleEvents) {
  const sports = [...new Set(visibleEvents.map((event) => event.sport))].sort();
  const sportSummary = document.querySelector("#sportSummary");

  sportSummary.innerHTML = sports.map((sport) => {
    const sportEvents = visibleEvents.filter((event) => event.sport === sport);
    const topEvent = [...sportEvents].sort((a, b) => b.importance - a.importance)[0];

    return `
      <article class="sport-card">
        <strong>${escapeHtml(sport)}</strong>
        <span>${sportEvents.length} event${sportEvents.length === 1 ? "" : "s"} tracked. Top event: ${escapeHtml(topEvent.title)}.</span>
      </article>
    `;
  }).join("") || `<div class="empty-state">No sports match the current filters.</div>`;
}

function renderTripCandidates(visibleEvents) {
  const tripList = document.querySelector("#tripList");
  const homeBaseSummary = document.querySelector("#homeBaseSummary");
  const tripEvents = visibleEvents
    .filter(isRoadTripCandidate)
    .sort((first, second) => second.importance - first.importance);

  homeBaseSummary.textContent = settings.homeBase
    ? `Home base: ${settings.homeBase}`
    : "Home base not set.";

  tripList.innerHTML = tripEvents.map((event) => `
    <article class="trip-card" style="${sportAccentStyle(event.sport)}">
      <strong>${escapeHtml(event.title)}</strong>
      <p>${escapeHtml(event.location || "Location TBD")} - ${escapeHtml(event.trip?.status || "Idea")}</p>
      <div class="trip-details">
        <span>Distance: ${escapeHtml(event.trip?.distanceFromHome || "Not set")}</span>
        <span>Hotel: ${event.trip?.hotelNeeded ? "needed" : "not needed"}${event.trip?.ticketLink ? ` - <a href="${escapeHtml(event.trip.ticketLink)}" target="_blank" rel="noreferrer">tickets</a>` : ""}</span>
        <span>${escapeHtml(event.trip?.travelNotes || "No travel notes yet.")}</span>
      </div>
      <div class="interest-row">
        <span class="interest-pill">Me ${escapeHtml(event.trip?.myInterest || "?")}/10</span>
        <span class="interest-pill">Friend ${escapeHtml(event.trip?.friendInterest || "?")}/10</span>
      </div>
    </article>
  `).join("") || `<div class="empty-state">No road trip candidates match the current filters.</div>`;
}

function renderPersonalWatchList(visibleEvents) {
  const personalWatchList = document.querySelector("#personalWatchList");
  const watchlistSummary = document.querySelector("#watchlistSummary");
  const watchEvents = [...visibleEvents]
    .filter((event) => isMustWatchEvent(event) || hasFavoriteMatch(event) || event.personalImportance >= 8)
    .sort((first, second) => eventWatchPriority(second) - eventWatchPriority(first))
    .slice(0, 6);

  const favoriteCount = visibleEvents.filter(hasFavoriteMatch).length;
  watchlistSummary.textContent = favoriteCount
    ? `${favoriteCount} favorite-based event${favoriteCount === 1 ? "" : "s"} in view.`
    : "Add favorites in settings to personalize this list.";

  personalWatchList.innerHTML = watchEvents.map((event) => `
    <button class="watch-card event-button" type="button" data-event-id="${escapeHtml(event.id)}" style="${sportAccentStyle(event.sport)}">
      <strong>${escapeHtml(event.title)}</strong>
      <p>${escapeHtml(isMustWatchEvent(event) ? mustWatchReason(event) : priorityLabel(event))}</p>
      <div class="event-meta">
        ${sportTag(event.sport)}
        <span>${formatDate(event.date)}</span>
        <span>Priority ${eventWatchPriority(event)}</span>
        <span>Personal ${event.personalImportance}/10</span>
      </div>
    </button>
  `).join("") || `<div class="empty-state">No personalized watchlist events match the current filters.</div>`;
}

function weekendScore(eventsForWeekend) {
  return weekendScoreDetails(eventsForWeekend).score;
}

function weekendScoreDetails(eventsForWeekend) {
  const eventsCount = eventsForWeekend.length;
  const sportCount = new Set(eventsForWeekend.map((event) => event.sport)).size;
  const mustWatchCount = eventsForWeekend.filter(isMustWatchEvent).length;
  const favoriteCount = eventsForWeekend.filter(hasFavoriteMatch).length;
  const highPersonalCount = eventsForWeekend.filter((event) => event.personalImportance >= 8).length;
  const sharedInterestCount = eventsForWeekend.filter((event) => (event.trip?.friendInterest || 0) >= 8).length;
  const baseScore = eventsForWeekend.reduce((total, event) => total + event.importance + event.personalImportance, 0);
  const mustWatchBonus = mustWatchCount * 6;
  const favoriteBonus = favoriteCount * 5;
  const highPersonalBonus = highPersonalCount * 3;
  const sharedInterestBonus = sharedInterestCount * 2;
  const densityBonus = Math.min(eventsCount, 4) * 2;
  const varietyBonus = Math.max(sportCount - 1, 0) * 3;
  const score = baseScore + mustWatchBonus + favoriteBonus + highPersonalBonus + sharedInterestBonus + densityBonus + varietyBonus;

  return {
    score,
    baseScore,
    mustWatchBonus,
    favoriteBonus,
    highPersonalBonus,
    sharedInterestBonus,
    densityBonus,
    varietyBonus,
    eventsCount,
    sportCount,
    mustWatchCount,
    favoriteCount,
    highPersonalCount,
    sharedInterestCount
  };
}

function weekendScoreLabel(details) {
  if (details.mustWatchCount >= 2 || details.score >= 80) {
    return "Keep free";
  }

  if (details.mustWatchCount >= 1 || details.score >= 55) {
    return "Strong watch weekend";
  }

  if (details.favoriteCount >= 1 || details.score >= 36) {
    return "Worth checking";
  }

  return "Light weekend";
}

function weekendScoreSummary(details) {
  const reasons = [];

  if (details.mustWatchCount) {
    reasons.push(`${details.mustWatchCount} must-watch`);
  }

  if (details.favoriteCount) {
    reasons.push(`${details.favoriteCount} favorite match${details.favoriteCount === 1 ? "" : "es"}`);
  }

  if (details.highPersonalCount) {
    reasons.push(`${details.highPersonalCount} high personal score`);
  }

  if (details.sharedInterestCount) {
    reasons.push(`${details.sharedInterestCount} shared-interest event${details.sharedInterestCount === 1 ? "" : "s"}`);
  }

  if (details.sportCount > 1) {
    reasons.push(`${details.sportCount} sports`);
  }

  return reasons.join(" - ") || "general event volume";
}

function getWeekendGroups(visibleEvents, options = {}) {
  const weekendMap = new Map();
  const startDate = options.startDate;
  const endDate = options.endDate;

  visibleEvents.forEach((event) => {
    const eventDate = parseDate(event.date);
    const day = eventDate.getDay();

    if (day >= 1 && day <= 4) {
      return;
    }

    if (startDate && eventDate < startDate) {
      return;
    }

    if (endDate && eventDate > endDate) {
      return;
    }

    const friday = fridayForWeek(eventDate);
    const key = toDateValue(friday);

    if (!weekendMap.has(key)) {
      weekendMap.set(key, []);
    }

    weekendMap.get(key).push(event);
  });

  return [...weekendMap.entries()]
    .map(([fridayValue, weekendEvents]) => {
      const friday = parseDate(fridayValue);
      const details = weekendScoreDetails(weekendEvents);

      return {
        friday,
        sunday: addDays(friday, 2),
        events: weekendEvents.sort((first, second) => first.date.localeCompare(second.date)),
        score: details.score,
        details
      };
    })
    .sort((first, second) => {
      const scoreDifference = second.score - first.score;

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return first.friday - second.friday;
    });
}

function renderBestWeekends(visibleEvents) {
  const bestWeekendList = document.querySelector("#bestWeekendList");
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endDate = addDays(startDate, 60);
  const bestWeekends = getWeekendGroups(visibleEvents, { startDate, endDate }).slice(0, 4);

  bestWeekendList.innerHTML = bestWeekends.map((weekend) => `
    <article class="weekend-score-card" style="${sportAccentStyle(weekend.events[0]?.sport)}">
      <h4>${formatDateObject(weekend.friday)} - ${formatDateObject(weekend.sunday)}</h4>
      <div class="event-meta">
        <span class="score-label">${escapeHtml(weekendScoreLabel(weekend.details))}</span>
        <span>Score ${weekend.score}</span>
        <span>${weekend.events.length} event${weekend.events.length === 1 ? "" : "s"}</span>
      </div>
      <p>${escapeHtml(weekendScoreSummary(weekend.details))}</p>
      <p>${weekend.events.map((event) => escapeHtml(event.title)).join(", ")}</p>
      <button class="secondary-button compact-action" type="button" data-export-weekend="${toDateValue(weekend.friday)}">Export Weekend Calendar</button>
    </article>
  `).join("") || `<div class="empty-state">No scored weekends match the current filters.</div>`;
}

function renderCalendar(visibleEvents) {
  const calendarGrid = document.querySelector("#calendarGrid");
  const calendarMonthLabel = document.querySelector("#calendarMonthLabel");
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const firstVisibleDay = addDays(firstDayOfMonth, -firstDayOfMonth.getDay());
  const calendarDays = [];

  calendarMonthLabel.textContent = visibleMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric"
  });

  for (let index = 0; index < 42; index += 1) {
    const day = addDays(firstVisibleDay, index);
    const dayEvents = visibleEvents.filter((event) => sameCalendarDay(parseDate(event.date), day));
    const outsideMonthClass = day.getMonth() === month ? "" : "outside-month";

    calendarDays.push(`
      <article class="calendar-day ${outsideMonthClass}">
        <div class="day-number">${day.getDate()}</div>
        ${dayEvents.map((event) => `
          <button class="calendar-event" type="button" data-event-id="${escapeHtml(event.id)}" style="${sportAccentStyle(event.sport)}">
            ${sportTag(event.sport)}
            <strong>${escapeHtml(event.title)}</strong>
            <span>${escapeHtml(event.startTime || "Time TBD")} ${escapeHtml(event.timezone || "")} - Priority ${eventWatchPriority(event)}</span>
          </button>
        `).join("")}
      </article>
    `);
  }

  calendarGrid.innerHTML = calendarDays.join("");
}

function fridayForWeek(date) {
  const day = date.getDay();
  const daysFromFriday = day >= 5 ? day - 5 : day + 2;

  return addDays(date, -daysFromFriday);
}

function renderWeekends(visibleEvents) {
  const weekendList = document.querySelector("#weekendList");
  const weekendMap = new Map();

  visibleEvents.forEach((event) => {
    const eventDate = parseDate(event.date);
    const day = eventDate.getDay();

    if (day >= 1 && day <= 4) {
      return;
    }

    const friday = fridayForWeek(eventDate);
    const key = toDateValue(friday);

    if (!weekendMap.has(key)) {
      weekendMap.set(key, []);
    }

    weekendMap.get(key).push(event);
  });

  const weekendCards = [...weekendMap.entries()]
    .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
    .map(([fridayValue, weekendEvents]) => {
      const friday = parseDate(fridayValue);
      const sunday = addDays(friday, 2);
      const details = weekendScoreDetails(weekendEvents);

      return `
        <article class="weekend-card" style="${sportAccentStyle(weekendEvents[0]?.sport)}">
          <h4>${formatDateObject(friday)} - ${formatDateObject(sunday)} - Weekend score ${details.score}</h4>
          <div class="event-meta">
            <span class="score-label">${escapeHtml(weekendScoreLabel(details))}</span>
            <span>${escapeHtml(weekendScoreSummary(details))}</span>
          </div>
          <button class="secondary-button compact-action" type="button" data-export-weekend="${escapeHtml(fridayValue)}">Export Weekend Calendar</button>
          <div class="weekend-events">
            ${weekendEvents
              .sort((a, b) => a.date.localeCompare(b.date))
              .map(eventCard)
              .join("")}
          </div>
        </article>
      `;
    });

  weekendList.innerHTML = weekendCards.length
    ? weekendCards.join("")
    : `<div class="empty-state">No Friday-Sunday events match the current filters.</div>`;
}

function collectEventFromForm() {
  return {
    id: document.querySelector("#eventIdInput").value || createEventId(),
    title: document.querySelector("#titleInput").value.trim(),
    sport: document.querySelector("#sportInput").value,
    competition: document.querySelector("#competitionInput").value.trim(),
    date: document.querySelector("#dateInput").value,
    startTime: document.querySelector("#timeInput").value,
    timezone: document.querySelector("#timezoneInput").value.trim() || "ET",
    importance: clamp(Number(document.querySelector("#importanceInput").value), 1, 10),
    personalImportance: clamp(Number(document.querySelector("#personalImportanceInput").value || 1), 1, 10),
    status: document.querySelector("#statusInput").value,
    venue: document.querySelector("#venueInput").value.trim(),
    location: document.querySelector("#locationInput").value.trim(),
    tv: document.querySelector("#tvInput").value.trim(),
    notes: document.querySelector("#notesInput").value.trim(),
    teams: normalizeList(document.querySelector("#teamTagsInput").value),
    drivers: normalizeList(document.querySelector("#driverTagsInput").value),
    competitionTags: normalizeList(document.querySelector("#competitionTagsInput").value),
    favoriteTags: normalizeList(document.querySelector("#favoriteTagsInput").value),
    trip: {
      distanceFromHome: document.querySelector("#distanceInput").value.trim(),
      travelNotes: document.querySelector("#travelNotesInput").value.trim(),
      hotelNeeded: document.querySelector("#hotelInput").value === "true",
      ticketLink: document.querySelector("#ticketInput").value.trim(),
      myInterest: clamp(Number(document.querySelector("#myInterestInput").value || 1), 1, 10),
      friendInterest: clamp(Number(document.querySelector("#friendInterestInput").value || 1), 1, 10),
      status: document.querySelector("#tripStatusInput").value
    }
  };
}

function openEventDialog() {
  const eventForm = document.querySelector("#eventForm");
  const eventDialog = document.querySelector("#eventDialog");

  eventForm.reset();
  document.querySelector("#dialogTitle").textContent = "New sports event";
  document.querySelector("#eventIdInput").value = "";
  document.querySelector("#dateInput").value = toDateValue(new Date());
  document.querySelector("#timezoneInput").value = settings.defaultTimezone || "ET";
  document.querySelector("#importanceInput").value = 7;
  document.querySelector("#personalImportanceInput").value = 7;
  document.querySelector("#teamTagsInput").value = "";
  document.querySelector("#driverTagsInput").value = "";
  document.querySelector("#competitionTagsInput").value = "";
  document.querySelector("#favoriteTagsInput").value = "";
  document.querySelector("#distanceInput").value = "";
  document.querySelector("#tvInput").value = settings.defaultTv;
  document.querySelector("#myInterestInput").value = 7;
  document.querySelector("#friendInterestInput").value = 7;
  document.querySelector("#deleteEventButton").hidden = true;
  eventDialog.showModal();
}

function openEditDialog(eventId) {
  const event = events.find((candidate) => candidate.id === eventId);

  if (!event) {
    return;
  }

  document.querySelector("#dialogTitle").textContent = "Edit sports event";
  document.querySelector("#eventIdInput").value = event.id;
  document.querySelector("#titleInput").value = event.title;
  document.querySelector("#sportInput").value = event.sport;
  document.querySelector("#competitionInput").value = event.competition || "";
  document.querySelector("#dateInput").value = event.date;
  document.querySelector("#timeInput").value = event.startTime || "";
  document.querySelector("#timezoneInput").value = event.timezone || "ET";
  document.querySelector("#importanceInput").value = event.importance;
  document.querySelector("#personalImportanceInput").value = event.personalImportance || event.trip?.myInterest || event.importance || 7;
  document.querySelector("#statusInput").value = event.status;
  document.querySelector("#venueInput").value = event.venue || "";
  document.querySelector("#locationInput").value = event.location || "";
  document.querySelector("#tvInput").value = event.tv || "";
  document.querySelector("#distanceInput").value = event.trip?.distanceFromHome || "";
  document.querySelector("#tripStatusInput").value = event.trip?.status || "Idea";
  document.querySelector("#hotelInput").value = event.trip?.hotelNeeded ? "true" : "false";
  document.querySelector("#ticketInput").value = event.trip?.ticketLink || "";
  document.querySelector("#myInterestInput").value = event.trip?.myInterest || 7;
  document.querySelector("#friendInterestInput").value = event.trip?.friendInterest || 7;
  document.querySelector("#travelNotesInput").value = event.trip?.travelNotes || "";
  document.querySelector("#notesInput").value = event.notes || "";
  document.querySelector("#teamTagsInput").value = listToText(event.teams);
  document.querySelector("#driverTagsInput").value = listToText(event.drivers);
  document.querySelector("#competitionTagsInput").value = listToText(event.competitionTags);
  document.querySelector("#favoriteTagsInput").value = listToText(event.favoriteTags);
  document.querySelector("#deleteEventButton").hidden = false;
  document.querySelector("#eventDialog").showModal();
}

function closeEventDialog() {
  document.querySelector("#eventDialog").close();
}

function handleEventSubmit(event) {
  event.preventDefault();

  const savedEvent = collectEventFromForm();
  const existingIndex = events.findIndex((candidate) => candidate.id === savedEvent.id);

  if (existingIndex >= 0) {
    events[existingIndex] = savedEvent;
  } else {
    events.push(savedEvent);
  }

  saveEvents();
  renderAll();
  closeEventDialog();
}

function handleEventDelete() {
  const eventId = document.querySelector("#eventIdInput").value;

  if (!eventId) {
    return;
  }

  const event = events.find((candidate) => candidate.id === eventId);
  const confirmed = confirm(`Delete "${event?.title || "this event"}"?`);

  if (!confirmed) {
    return;
  }

  events = events.filter((candidate) => candidate.id !== eventId);
  saveEvents();
  renderAll();
  closeEventDialog();
}

function renderAll() {
  const visibleEvents = getFilteredEvents();
  const upcomingEvents = getUpcomingEvents(visibleEvents);

  renderStats(upcomingEvents);
  renderNextMajorEvent(upcomingEvents);
  renderEvents(upcomingEvents);
  renderBestWeekends(upcomingEvents);
  renderSportSummary(upcomingEvents);
  renderPersonalWatchList(upcomingEvents);
  renderTripCandidates(upcomingEvents);
  renderCalendar(visibleEvents);
  renderWeekends(upcomingEvents);
}

function renderSettingsForm() {
  document.querySelector("#themeInput").value = settings.theme;
  document.querySelector("#homeBaseInput").value = settings.homeBase;
  document.querySelector("#defaultTimezoneInput").value = settings.defaultTimezone;
  document.querySelector("#defaultTvInput").value = settings.defaultTv;
  document.querySelector("#favoriteSportsInput").value = listToText(settings.favoriteSports);
  document.querySelector("#favoriteCompetitionsInput").value = listToText(settings.favoriteCompetitions);
  document.querySelector("#favoriteTeamsInput").value = listToText(settings.favoriteTeams);
  document.querySelector("#favoriteDriversInput").value = listToText(settings.favoriteDrivers);
  document.querySelector("#autoUpdateInput").checked = settings.autoUpdate;
  document.querySelector("#updateUrlInput").value = settings.updateUrl;
  document.querySelector("#appVersion").textContent = `Version ${APP_VERSION}`;
}

function setDataStatus(message) {
  document.querySelector("#dataStatus").textContent = message;
}

function setActiveView(viewName) {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("active-view");
  });

  document.querySelector(`#${viewName}View`).classList.add("active-view");

  const titles = {
    dashboard: "Sports command center",
    calendar: "Monthly calendar",
    weekends: "Weekend planner"
  };

  document.querySelector("#pageTitle").textContent = titles[viewName];
}

function wireNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.view));
  });

  document.querySelector("#previousMonthButton").addEventListener("click", () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
    renderCalendar(getFilteredEvents());
  });

  document.querySelector("#nextMonthButton").addEventListener("click", () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
    renderCalendar(getFilteredEvents());
  });
}

function renderSportFilterOptions() {
  const sportFilter = document.querySelector("#sportFilter");
  const sportInput = document.querySelector("#sportInput");
  const currentFilterValue = sportFilter.value || "all";
  const currentSportInputValue = sportInput.value;
  const sports = [...new Set([
    ...Object.keys(sportStyles),
    ...events.map((event) => event.sport)
  ])].sort();
  const sportOptions = sports.map((sport) => `<option value="${escapeHtml(sport)}">${escapeHtml(sport)}</option>`).join("");

  sportFilter.innerHTML = `<option value="all">All sports</option>${sportOptions}`;
  sportInput.innerHTML = sportOptions;
  sportFilter.value = sports.includes(currentFilterValue) ? currentFilterValue : "all";
  sportInput.value = sports.includes(currentSportInputValue) ? currentSportInputValue : "Soccer";
}

function clearFilters() {
  document.querySelector("#searchInput").value = "";
  document.querySelector("#sportFilter").value = "all";
  document.querySelector("#importanceFilter").value = "1";
  document.querySelector("#importanceValue").textContent = "1+";
  document.querySelector("#personalScoreFilter").value = "1";
  document.querySelector("#personalScoreValue").textContent = "1+";
  document.querySelector("#favoritesFilter").checked = false;
  document.querySelector("#roadTripFilter").checked = false;
  renderAll();
}

function exportedPreferences() {
  return {
    favoriteSports: settings.favoriteSports,
    favoriteCompetitions: settings.favoriteCompetitions,
    favoriteTeams: settings.favoriteTeams,
    favoriteDrivers: settings.favoriteDrivers
  };
}

function exportEvents() {
  const exportPayload = {
    app: "Sports Weekend Planner",
    format: "sports-weekend-planner-shared-calendar",
    version: 2,
    exportedAt: new Date().toISOString(),
    eventCount: events.length,
    preferences: exportedPreferences(),
    events
  };

  downloadTextFile(
    `sports-weekend-planner-shared-${toDateValue(new Date())}.json`,
    JSON.stringify(exportPayload, null, 2),
    "application/json"
  );
  setDataStatus(`Exported shared JSON with ${events.length} events. Send this file to your friend for import.`);
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function formatIcsDate(date) {
  return `${date.getFullYear()}${padDatePart(date.getMonth() + 1)}${padDatePart(date.getDate())}`;
}

function formatIcsDateTime(date) {
  return `${date.getUTCFullYear()}${padDatePart(date.getUTCMonth() + 1)}${padDatePart(date.getUTCDate())}T${padDatePart(date.getUTCHours())}${padDatePart(date.getUTCMinutes())}${padDatePart(date.getUTCSeconds())}Z`;
}

function escapeIcsText(value) {
  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replace(/\r?\n/g, "\\n");
}

function foldIcsLine(line) {
  const chunks = [];
  let remaining = line;

  while (remaining.length > 75) {
    chunks.push(remaining.slice(0, 75));
    remaining = ` ${remaining.slice(75)}`;
  }

  chunks.push(remaining);
  return chunks.join("\r\n");
}

function eventToIcs(event) {
  const start = eventDateTime(event);
  const end = addDays(start, 0);
  const lines = [
    "BEGIN:VEVENT",
    `UID:${escapeIcsText(event.id)}@sports-weekend-planner`,
    `DTSTAMP:${formatIcsDateTime(new Date())}`,
    `SUMMARY:${escapeIcsText(event.title)}`
  ];

  if (event.startTime) {
    end.setHours(start.getHours() + 2);
    lines.push(`DTSTART:${formatIcsDateTime(start)}`);
    lines.push(`DTEND:${formatIcsDateTime(end)}`);
  } else {
    lines.push(`DTSTART;VALUE=DATE:${formatIcsDate(start)}`);
    lines.push(`DTEND;VALUE=DATE:${formatIcsDate(addDays(start, 1))}`);
  }

  if (event.location || event.venue) {
    lines.push(`LOCATION:${escapeIcsText([event.venue, event.location].filter(Boolean).join(", "))}`);
  }

  lines.push(`DESCRIPTION:${escapeIcsText([
    `${event.sport}${event.competition ? ` - ${event.competition}` : ""}`,
    `Status: ${event.status}`,
    `Priority: ${eventWatchPriority(event)} (${priorityLabel(event)})`,
    `Importance: ${event.importance}/10`,
    `Personal score: ${event.personalImportance}/10`,
    `TV/streaming: ${event.tv || "TBD"}`,
    event.notes ? `Notes: ${event.notes}` : ""
  ].filter(Boolean).join("\n"))}`);
  lines.push("END:VEVENT");

  return lines.map(foldIcsLine).join("\r\n");
}

function buildIcsCalendar(calendarEvents) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sports Weekend Planner//Sports Command Center//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...calendarEvents.map(eventToIcs),
    "END:VCALENDAR"
  ].join("\r\n");
}

function downloadCalendarEvents(calendarEvents, filenamePrefix, statusMessage) {
  downloadTextFile(
    `${filenamePrefix}-${toDateValue(new Date())}.ics`,
    buildIcsCalendar(calendarEvents),
    "text/calendar"
  );
  setDataStatus(statusMessage);
}

function exportCalendarEvents() {
  const visibleEvents = getFilteredEvents();
  const calendarEvents = visibleEvents
    .filter((event) => isMustWatchEvent(event) || hasFavoriteMatch(event) || event.personalImportance >= 8)
    .sort((first, second) => eventDateTime(first) - eventDateTime(second));

  if (!calendarEvents.length) {
    setDataStatus("No high-priority events match the current filters. Adjust filters or raise an event's personal score.");
    return;
  }

  downloadCalendarEvents(
    calendarEvents,
    "sports-weekend-planner-calendar",
    `Exported ${calendarEvents.length} high-priority event${calendarEvents.length === 1 ? "" : "s"} for Google Calendar.`
  );
}

function exportWeekendCalendar(fridayValue) {
  const weekendEvents = getFilteredEvents()
    .filter((event) => toDateValue(fridayForWeek(parseDate(event.date))) === fridayValue)
    .sort((first, second) => eventDateTime(first) - eventDateTime(second));

  if (!weekendEvents.length) {
    setDataStatus("No events found for that selected weekend under the current filters.");
    return;
  }

  downloadCalendarEvents(
    weekendEvents,
    `sports-weekend-planner-weekend-${fridayValue}`,
    `Exported ${weekendEvents.length} event${weekendEvents.length === 1 ? "" : "s"} from the selected weekend.`
  );
}

function parseImportedEvents(importText) {
  const parsed = JSON.parse(importText);
  const incomingEvents = Array.isArray(parsed) ? parsed : parsed.events;

  if (!Array.isArray(incomingEvents)) {
    throw new Error("JSON must contain an events array.");
  }

  return incomingEvents
    .filter(isValidImportEvent)
    .map(normalizeEvent);
}

function importSummary(importedEvents) {
  const existingEvents = new Map(events.map((event) => [event.id, event]));
  const addedEvents = [];
  const replacedEvents = [];
  const unchangedEvents = [];
  let added = 0;
  let replaced = 0;
  let unchanged = 0;

  importedEvents.forEach((event) => {
    if (!existingEvents.has(event.id)) {
      added += 1;
      addedEvents.push(event);
      return;
    }

    if (JSON.stringify(existingEvents.get(event.id)) === JSON.stringify(event)) {
      unchanged += 1;
      unchangedEvents.push(event);
      return;
    }

    replaced += 1;
    replacedEvents.push(event);
  });

  return { added, replaced, unchanged, addedEvents, replacedEvents, unchangedEvents };
}

function mergeImportedEvents(importedEvents, label = "Imported") {
  const eventMap = new Map(events.map((event) => [event.id, event]));
  const summary = importSummary(importedEvents);

  importedEvents.forEach((event) => {
    eventMap.set(event.id, event);
  });

  events = [...eventMap.values()];
  saveEvents();
  renderSportFilterOptions();
  renderAll();
  setDataStatus(`${label} ${summary.added} added, ${summary.replaced} replaced, ${summary.unchanged} unchanged. Database now has ${events.length}.`);
}

function previewEventList(importedEvents) {
  return importedEvents
    .slice(0, 6)
    .map((event) => `<li>${escapeHtml(event.title)} <span>${escapeHtml(formatDate(event.date))}</span></li>`)
    .join("") || "<li>No events in this group.</li>";
}

function openImportPreview(importedEvents) {
  pendingImportEvents = importedEvents;
  pendingImportSummary = importSummary(importedEvents);

  document.querySelector("#importPreviewContent").innerHTML = `
    <div class="import-summary-grid">
      <article>
        <strong>${pendingImportSummary.added}</strong>
        <span>Added</span>
      </article>
      <article>
        <strong>${pendingImportSummary.replaced}</strong>
        <span>Replaced</span>
      </article>
      <article>
        <strong>${pendingImportSummary.unchanged}</strong>
        <span>Unchanged</span>
      </article>
    </div>
    <section class="import-preview-section">
      <h3>New events</h3>
      <ul>${previewEventList(pendingImportSummary.addedEvents)}</ul>
    </section>
    <section class="import-preview-section">
      <h3>Events that will be replaced</h3>
      <ul>${previewEventList(pendingImportSummary.replacedEvents)}</ul>
    </section>
    <p class="data-status">Importing replaces matching event IDs and keeps everything else in your local calendar.</p>
  `;
  document.querySelector("#importPreviewDialog").showModal();
}

function closeImportPreview() {
  pendingImportEvents = [];
  pendingImportSummary = null;
  document.querySelector("#importPreviewDialog").close();
}

function confirmImportPreview() {
  if (!pendingImportEvents.length) {
    closeImportPreview();
    return;
  }

  const count = pendingImportEvents.length;
  mergeImportedEvents(pendingImportEvents, "Imported previewed calendar:");
  closeImportPreview();
  setDataStatus(`Imported ${count} reviewed event${count === 1 ? "" : "s"}. Database now has ${events.length}.`);
}

async function checkHostedUpdates(options = {}) {
  const updateUrl = settings.updateUrl || DEFAULT_UPDATE_URL;

  if (!globalThis.fetch) {
    if (options.showStatus) {
      setDataStatus("Hosted updates need a browser with fetch support.");
    }
    return;
  }

  try {
    if (options.showStatus) {
      setDataStatus("Checking hosted event updates...");
    }

    const response = await fetch(updateUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Could not load ${updateUrl}`);
    }

    const importText = await response.text();
    const importedEvents = parseImportedEvents(importText);

    if (!importedEvents.length) {
      if (options.showStatus) {
        setDataStatus("Hosted update file loaded, but it had no valid events.");
      }
      return;
    }

    mergeImportedEvents(importedEvents, "Updated from hosted calendar:");
  } catch (error) {
    if (options.showStatus) {
      setDataStatus(`Hosted update unavailable: ${error.message}`);
    }
  }
}

function importEventsFromFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    try {
      const importedEvents = parseImportedEvents(String(reader.result || ""));

      if (!importedEvents.length) {
        setDataStatus("Import file loaded, but it had no valid events.");
        return;
      }

      openImportPreview(importedEvents);
    } catch (error) {
      setDataStatus(`Import failed: ${error.message}`);
    } finally {
      document.querySelector("#importFileInput").value = "";
    }
  });

  reader.addEventListener("error", () => {
    setDataStatus("Import failed: could not read the file.");
    document.querySelector("#importFileInput").value = "";
  });

  reader.readAsText(file);
}

function wireImportExport() {
  const importFileInput = document.querySelector("#importFileInput");

  document.querySelector("#exportButton").addEventListener("click", exportEvents);
  document.querySelector("#calendarExportButton").addEventListener("click", exportCalendarEvents);
  document.querySelector("#importButton").addEventListener("click", () => importFileInput.click());
  importFileInput.addEventListener("change", () => importEventsFromFile(importFileInput.files[0]));
  document.querySelector("#closeImportPreviewButton").addEventListener("click", closeImportPreview);
  document.querySelector("#cancelImportPreviewButton").addEventListener("click", closeImportPreview);
  document.querySelector("#confirmImportButton").addEventListener("click", confirmImportPreview);
}

function handleSaveSettings() {
  settings = {
    theme: document.querySelector("#themeInput").value,
    homeBase: document.querySelector("#homeBaseInput").value.trim(),
    defaultTimezone: document.querySelector("#defaultTimezoneInput").value.trim() || "ET",
    defaultTv: document.querySelector("#defaultTvInput").value.trim(),
    favoriteSports: normalizeList(document.querySelector("#favoriteSportsInput").value),
    favoriteCompetitions: normalizeList(document.querySelector("#favoriteCompetitionsInput").value),
    favoriteTeams: normalizeList(document.querySelector("#favoriteTeamsInput").value),
    favoriteDrivers: normalizeList(document.querySelector("#favoriteDriversInput").value),
    autoUpdate: document.querySelector("#autoUpdateInput").checked,
    updateUrl: document.querySelector("#updateUrlInput").value.trim() || DEFAULT_UPDATE_URL
  };

  saveSettings();
  applyTheme();
  renderAll();
  document.querySelector("#settingsStatus").textContent = "Settings saved on this device.";
}

function wireSettings() {
  document.querySelector("#saveSettingsButton").addEventListener("click", handleSaveSettings);
  document.querySelector("#checkUpdatesButton").addEventListener("click", () => checkHostedUpdates({ showStatus: true }));

  if (globalThis.matchMedia) {
    globalThis.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
      if (settings.theme === "system") {
        applyTheme();
      }
    });
  }
}

function wireFilters() {
  const filterControls = [
    document.querySelector("#searchInput"),
    document.querySelector("#sportFilter"),
    document.querySelector("#importanceFilter"),
    document.querySelector("#personalScoreFilter"),
    document.querySelector("#favoritesFilter"),
    document.querySelector("#roadTripFilter")
  ];

  filterControls.forEach((control) => {
    control.addEventListener("input", () => {
      document.querySelector("#importanceValue").textContent = `${document.querySelector("#importanceFilter").value}+`;
      document.querySelector("#personalScoreValue").textContent = `${document.querySelector("#personalScoreFilter").value}+`;
      renderAll();
    });
  });

  document.querySelector("#clearFiltersButton").addEventListener("click", clearFilters);
}

function wireEventForm() {
  document.querySelector("#addEventButton").addEventListener("click", openEventDialog);
  document.querySelector("#closeDialogButton").addEventListener("click", closeEventDialog);
  document.querySelector("#cancelDialogButton").addEventListener("click", closeEventDialog);
  document.querySelector("#deleteEventButton").addEventListener("click", handleEventDelete);
  document.querySelector("#eventForm").addEventListener("submit", handleEventSubmit);

  document.body.addEventListener("click", (event) => {
    const weekendExportButton = event.target.closest("[data-export-weekend]");

    if (weekendExportButton) {
      exportWeekendCalendar(weekendExportButton.dataset.exportWeekend);
      return;
    }

    const eventButton = event.target.closest("[data-event-id]");

    if (eventButton) {
      openEditDialog(eventButton.dataset.eventId);
    }
  });
}

applyTheme();
renderSportFilterOptions();
renderSettingsForm();
renderAll();
wireNavigation();
wireEventForm();
wireFilters();
wireImportExport();
wireSettings();

if (settings.autoUpdate) {
  checkHostedUpdates();
}
