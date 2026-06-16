import { slugify } from "./normalize-event.mjs";

const SOURCE_NAME = "curated/major-events";
const SOURCE_URL = "DATA_SOURCES.md#curated-major-event-windows";

function trip(overrides = {}) {
  return {
    distanceFromHome: "",
    travelNotes: "",
    hotelNeeded: false,
    ticketLink: "",
    myInterest: 7,
    friendInterest: 7,
    status: "Idea",
    ...overrides
  };
}

function tournamentMetadata(event) {
  const competitionKey = slugify(event.tournamentName || event.competition || event.title);

  return {
    tournamentId: event.tournamentId || competitionKey,
    tournamentName: event.tournamentName || event.competition || event.title,
    tournamentStartDate: event.tournamentStartDate || event.date,
    tournamentEndDate: event.tournamentEndDate || event.date,
    tournamentStage: event.tournamentStage || event.stage || "",
    tournamentStatus: event.tournamentStatus || "planned",
    tournamentPriority: event.tournamentPriority || event.importance || 7
  };
}

function curatedEvent(event) {
  const teams = event.teams || event.participants || [];
  const importance = event.importance || 7;
  const normalizedEvent = {
    timezone: "ET",
    venue: "TBD",
    location: "TBD",
    tv: "TBD",
    notes: "Curated major-event planning window. Confirm exact date, venue, participants, and broadcast before relying on it.",
    personalImportance: importance,
    teams,
    participants: event.participants || teams,
    drivers: event.drivers || [],
    competitionTags: [event.competition, event.tournamentName, event.stage].filter(Boolean),
    favoriteTags: [event.sport, event.competition, event.tournamentName, event.stage].filter(Boolean),
    source: SOURCE_NAME,
    sourceId: event.id,
    sourceUrl: SOURCE_URL,
    sourceUpdatedAt: "",
    lastVerifiedAt: "",
    isAutoImported: true,
    dataStatus: "Curated",
    stage: event.stage || "",
    round: event.round || "",
    group: event.group || "",
    homeTeam: event.homeTeam || "",
    awayTeam: event.awayTeam || "",
    resultStatus: "Scheduled",
    score: "",
    trip: trip(event.trip),
    ...event
  };

  return {
    ...normalizedEvent,
    ...tournamentMetadata(normalizedEvent),
    trip: trip(normalizedEvent.trip)
  };
}

export function fetchCuratedMajorEvents() {
  return [
    curatedEvent({
      id: "evt-champions-league-final",
      title: "Champions League Final",
      sport: "Soccer",
      competition: "UEFA Champions League",
      date: "2027-05-29",
      startTime: "15:00",
      importance: 10,
      status: "Must-watch",
      tournamentStartDate: "2026-09-15",
      tournamentEndDate: "2027-05-29",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "evt-europa-league-final",
      title: "Europa League Final",
      sport: "Soccer",
      competition: "UEFA Europa League",
      date: "2027-05-26",
      startTime: "15:00",
      importance: 8,
      status: "Good TV weekend",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "evt-conference-league-final",
      title: "Conference League Final",
      sport: "Soccer",
      competition: "UEFA Conference League",
      date: "2027-05-19",
      startTime: "15:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "hosted-premier-league-opening-weekend",
      title: "Premier League Opening Weekend",
      sport: "Soccer",
      competition: "Premier League",
      date: "2026-08-15",
      startTime: "10:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentName: "Premier League",
      tournamentStage: "Opening weekend"
    }),
    curatedEvent({
      id: "evt-mls-cup",
      title: "MLS Cup",
      sport: "Soccer",
      competition: "MLS",
      date: "2026-12-05",
      startTime: "16:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "hosted-fa-cup-final",
      title: "FA Cup Final",
      sport: "Soccer",
      competition: "FA Cup",
      date: "2027-05-15",
      startTime: "10:00",
      importance: 8,
      status: "Must-watch",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "evt-us-open-cup-final",
      title: "US Open Cup Final",
      sport: "Soccer",
      competition: "US Open Cup",
      date: "2026-09-23",
      startTime: "20:00",
      importance: 6,
      status: "Good TV weekend",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "evt-leagues-cup-final",
      title: "Leagues Cup Final",
      sport: "Soccer",
      competition: "Leagues Cup",
      date: "2026-08-30",
      startTime: "20:00",
      importance: 6,
      status: "Good TV weekend",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "evt-nfl-kickoff",
      title: "NFL Kickoff Game",
      sport: "Football",
      competition: "NFL Regular Season",
      date: "2026-09-10",
      startTime: "20:20",
      importance: 8,
      status: "Good TV weekend",
      tournamentName: "NFL Season",
      tournamentStage: "Opening game"
    }),
    curatedEvent({
      id: "evt-super-bowl",
      title: "Super Bowl LXI",
      sport: "Football",
      competition: "NFL Playoffs",
      date: "2027-02-14",
      startTime: "18:30",
      importance: 10,
      status: "Must-watch",
      tournamentName: "NFL Playoffs",
      tournamentStage: "Championship",
      trip: { hotelNeeded: true, myInterest: 9, friendInterest: 9 }
    }),
    curatedEvent({
      id: "evt-cfp-title",
      title: "College Football Playoff Championship",
      sport: "Football",
      competition: "College Football Playoff",
      date: "2027-01-18",
      startTime: "19:30",
      importance: 9,
      status: "Must-watch",
      tournamentStage: "Championship"
    }),
    curatedEvent({
      id: "evt-bowl-season",
      title: "College Football Bowl Weekend",
      sport: "Football",
      competition: "College Football Bowls",
      date: "2026-12-19",
      startTime: "12:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "Bowl season"
    }),
    curatedEvent({
      id: "evt-world-series-game-1",
      title: "World Series Game 1",
      sport: "Baseball",
      competition: "MLB Playoffs",
      date: "2026-10-23",
      startTime: "20:00",
      importance: 9,
      status: "Must-watch",
      tournamentName: "World Series",
      tournamentStage: "Game 1"
    }),
    curatedEvent({
      id: "evt-mlb-wild-card-weekend",
      title: "MLB Wild Card Weekend",
      sport: "Baseball",
      competition: "MLB Playoffs",
      date: "2026-10-03",
      startTime: "14:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "Wild Card"
    }),
    curatedEvent({
      id: "evt-nba-finals-game-1",
      title: "NBA Finals Opening Window",
      sport: "Basketball",
      competition: "NBA Finals",
      date: "2027-06-03",
      startTime: "20:30",
      importance: 9,
      status: "Must-watch",
      tournamentStage: "Finals"
    }),
    curatedEvent({
      id: "evt-march-madness-first-weekend",
      title: "March Madness First Weekend",
      sport: "Basketball",
      competition: "NCAA Tournament",
      date: "2027-03-20",
      startTime: "12:00",
      importance: 9,
      status: "Good TV weekend",
      tournamentName: "March Madness",
      tournamentStage: "First weekend"
    }),
    curatedEvent({
      id: "evt-final-four",
      title: "Final Four Saturday",
      sport: "Basketball",
      competition: "NCAA Tournament",
      date: "2027-04-03",
      startTime: "18:00",
      importance: 9,
      status: "Must-watch",
      tournamentName: "March Madness",
      tournamentStage: "Final Four"
    }),
    curatedEvent({
      id: "evt-stanley-cup-final",
      title: "Stanley Cup Final Opening Window",
      sport: "Hockey",
      competition: "NHL Playoffs",
      date: "2027-06-05",
      startTime: "20:00",
      importance: 9,
      status: "Good TV weekend",
      tournamentName: "Stanley Cup Final",
      tournamentStage: "Final"
    }),
    curatedEvent({
      id: "evt-indy-500",
      title: "Indianapolis 500",
      sport: "Racing",
      competition: "IndyCar",
      date: "2027-05-30",
      startTime: "12:45",
      importance: 10,
      status: "Possible road trip",
      venue: "Indianapolis Motor Speedway",
      location: "Speedway, IN",
      tournamentStage: "Race",
      trip: { hotelNeeded: true, myInterest: 9, friendInterest: 8, status: "Considering" }
    }),
    curatedEvent({
      id: "evt-f1-us-gp",
      title: "Formula 1 United States Grand Prix",
      sport: "Racing",
      competition: "Formula 1",
      date: "2026-10-25",
      startTime: "15:00",
      importance: 8,
      status: "Possible road trip",
      venue: "Circuit of the Americas",
      location: "Austin, TX",
      tournamentStage: "Race weekend",
      trip: { hotelNeeded: true, myInterest: 9, friendInterest: 8, status: "Considering" }
    }),
    curatedEvent({
      id: "evt-nascar-championship",
      title: "NASCAR Cup Series Championship",
      sport: "Racing",
      competition: "NASCAR Cup Series",
      date: "2026-11-08",
      startTime: "15:00",
      importance: 8,
      status: "Good TV weekend",
      tournamentStage: "Championship race"
    }),
    curatedEvent({
      id: "evt-imsa-rolex-24",
      title: "Rolex 24 at Daytona",
      sport: "Racing",
      competition: "IMSA",
      date: "2027-01-31",
      startTime: "13:30",
      importance: 8,
      status: "Possible road trip",
      venue: "Daytona International Speedway",
      location: "Daytona Beach, FL",
      tournamentStage: "Endurance race",
      trip: { hotelNeeded: true, myInterest: 8, friendInterest: 7 }
    }),
    curatedEvent({
      id: "evt-motogp-americas",
      title: "MotoGP Grand Prix of the Americas",
      sport: "Racing",
      competition: "MotoGP",
      date: "2027-03-28",
      startTime: "15:00",
      importance: 7,
      status: "Good TV weekend",
      venue: "Circuit of the Americas",
      location: "Austin, TX",
      tournamentStage: "Race"
    }),
    curatedEvent({
      id: "evt-bathurst-1000",
      title: "Bathurst 1000",
      sport: "Racing",
      competition: "Supercars",
      date: "2026-10-11",
      startTime: "01:30",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "Race"
    }),
    curatedEvent({
      id: "evt-wimbledon-finals",
      title: "Wimbledon Finals Weekend",
      sport: "Tennis",
      competition: "Wimbledon",
      date: "2026-07-12",
      startTime: "09:00",
      importance: 9,
      status: "Must-watch",
      venue: "All England Club",
      location: "London, England",
      tournamentStage: "Finals",
      trip: { distanceFromHome: "International", hotelNeeded: true, myInterest: 8, friendInterest: 7 }
    }),
    curatedEvent({
      id: "evt-us-open-tennis-finals",
      title: "US Open Tennis Finals Weekend",
      sport: "Tennis",
      competition: "US Open",
      date: "2026-09-13",
      startTime: "16:00",
      importance: 8,
      status: "Good TV weekend",
      venue: "USTA Billie Jean King National Tennis Center",
      location: "New York, NY",
      tournamentStage: "Finals",
      trip: { hotelNeeded: true }
    }),
    curatedEvent({
      id: "evt-australian-open-finals",
      title: "Australian Open Finals Weekend",
      sport: "Tennis",
      competition: "Australian Open",
      date: "2027-01-31",
      startTime: "03:30",
      importance: 8,
      status: "Good TV weekend",
      tournamentStage: "Finals"
    }),
    curatedEvent({
      id: "evt-french-open-finals",
      title: "French Open Finals Weekend",
      sport: "Tennis",
      competition: "French Open",
      date: "2027-06-06",
      startTime: "09:00",
      importance: 8,
      status: "Good TV weekend",
      tournamentStage: "Finals"
    }),
    curatedEvent({
      id: "evt-masters-final-round",
      title: "The Masters Final Round",
      sport: "Golf",
      competition: "The Masters",
      date: "2027-04-11",
      startTime: "14:00",
      importance: 10,
      status: "Must-watch",
      venue: "Augusta National Golf Club",
      location: "Augusta, GA",
      tournamentStage: "Final round"
    }),
    curatedEvent({
      id: "evt-pga-championship",
      title: "PGA Championship Final Round",
      sport: "Golf",
      competition: "PGA Championship",
      date: "2027-05-23",
      startTime: "14:00",
      importance: 8,
      status: "Good TV weekend",
      tournamentStage: "Final round"
    }),
    curatedEvent({
      id: "hosted-the-open-final-round",
      title: "The Open Championship Final Round",
      sport: "Golf",
      competition: "The Open Championship",
      date: "2027-07-18",
      startTime: "09:00",
      importance: 9,
      status: "Must-watch",
      tournamentStage: "Final round"
    }),
    curatedEvent({
      id: "evt-ryder-cup-sunday",
      title: "Ryder Cup Sunday",
      sport: "Golf",
      competition: "Ryder Cup",
      date: "2027-09-26",
      startTime: "08:00",
      importance: 9,
      status: "Must-watch",
      tournamentStage: "Final day"
    }),
    curatedEvent({
      id: "evt-kentucky-derby",
      title: "Kentucky Derby",
      sport: "Horse Racing",
      competition: "Triple Crown",
      date: "2027-05-01",
      startTime: "18:45",
      importance: 8,
      status: "Possible road trip",
      venue: "Churchill Downs",
      location: "Louisville, KY",
      tournamentStage: "Race",
      trip: { hotelNeeded: true, myInterest: 8, friendInterest: 7 }
    }),
    curatedEvent({
      id: "evt-ufc-major-card",
      title: "UFC Major PPV Card",
      sport: "Combat Sports",
      competition: "UFC",
      date: "2026-08-15",
      startTime: "22:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "PPV card"
    }),
    curatedEvent({
      id: "evt-boxing-title-card",
      title: "Major Boxing Title Card",
      sport: "Combat Sports",
      competition: "Boxing",
      date: "2026-11-21",
      startTime: "21:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "Title card"
    }),
    curatedEvent({
      id: "evt-world-cup-qualifier-window",
      title: "World Cup Qualifier Window",
      sport: "Major Events",
      competition: "World Cup Qualifiers",
      date: "2026-09-05",
      startTime: "19:00",
      importance: 7,
      status: "Good TV weekend",
      tournamentStage: "Qualifier window"
    }),
    curatedEvent({
      id: "evt-summer-olympics-opening",
      title: "Summer Olympics Opening Ceremony",
      sport: "Major Events",
      competition: "Olympics",
      date: "2028-07-14",
      startTime: "20:00",
      importance: 10,
      status: "Must-watch",
      tournamentStage: "Opening ceremony"
    })
  ];
}

