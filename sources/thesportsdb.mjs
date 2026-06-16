import { slugify } from "./normalize-event.mjs";

const BASE_URL = "https://www.thesportsdb.com/api/v1/json";
const PUBLIC_FREE_KEY = "123";

const LEAGUE_LOOKUPS = [
  { id: "4328", aliases: ["Premier League"] },
  { id: "4346", aliases: ["MLS"] },
  { id: "4370", aliases: ["F1"] },
  { id: "4380", aliases: ["NHL", "NHL Playoffs", "Stanley Cup Final"] },
  { id: "4387", aliases: ["NBA", "NBA Finals"] },
  { id: "4391", aliases: ["NFL", "NFL Regular Season", "NFL Playoffs", "Super Bowl"] },
  { id: "4424", aliases: ["MLB", "MLB Playoffs", "World Series"] },
  { id: "4425", aliases: ["PGA Tour"] },
  { id: "4464", aliases: ["ATP World Tour"] },
  { id: "4480", aliases: ["Champions League", "UEFA Champions League"] },
  { id: "4488", aliases: ["IMSA"] },
  { id: "4489", aliases: ["Supercars"] },
  { id: "4570", aliases: ["Carabao Cup"] },
  { id: "5071", aliases: ["UEFA Conference League"] }
];

const TEAM_LEAGUE_QUERIES = [
  "American Major League Soccer",
  "English Premier League",
  "Formula 1",
  "MLB",
  "NBA",
  "NFL",
  "NHL"
];

function apiKey() {
  return process.env.THESPORTSDB_API_KEY || PUBLIC_FREE_KEY;
}

function endpoint(path) {
  return `${BASE_URL}/${apiKey()}/${path}`;
}

function smallImage(url) {
  const cleanUrl = String(url || "").trim();

  if (!cleanUrl || /\/(tiny|small|medium)$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return `${cleanUrl}/tiny`;
}

async function fetchJson(path) {
  const url = endpoint(path);

  try {
    const response = await fetch(url, { headers: { "User-Agent": "Sports-Command-Center-Updater" } });

    if (!response.ok) {
      return { url, data: null, warning: `HTTP ${response.status}` };
    }

    const text = await response.text();
    const data = JSON.parse(text);

    return { url, data, warning: "" };
  } catch (error) {
    return { url, data: null, warning: error.message };
  }
}

function logoFromRecord(record) {
  return smallImage(record?.strBadge || record?.strLogo || "");
}

function leagueAsset(record, sourceUrl) {
  const logo = logoFromRecord(record);

  if (!record?.strLeague || !logo) {
    return null;
  }

  return {
    name: record.strLeague,
    sport: record.strSport || "",
    logo,
    providerId: record.idLeague || "",
    source: "TheSportsDB",
    logoSource: "TheSportsDB",
    logoUpdatedAt: "",
    sourceUrl
  };
}

function teamAsset(record, sourceUrl) {
  const logo = logoFromRecord(record);

  if (!record?.strTeam || !logo) {
    return null;
  }

  return {
    name: record.strTeam,
    sport: record.strSport || "",
    league: record.strLeague || "",
    logo,
    providerId: record.idTeam || "",
    source: "TheSportsDB",
    logoSource: "TheSportsDB",
    logoUpdatedAt: "",
    sourceUrl
  };
}

function addAliases(bucket, asset, aliases = []) {
  aliases.forEach((alias) => {
    const key = slugify(alias);

    if (!bucket[key]) {
      bucket[key] = {
        ...asset,
        name: alias,
        aliasOf: asset.name
      };
    }
  });
}

export async function fetchTheSportsDbLogoRegistry() {
  const leagues = {};
  const teams = {};
  const warnings = [];

  for (const lookup of LEAGUE_LOOKUPS) {
    const { url, data, warning } = await fetchJson(`lookupleague.php?id=${encodeURIComponent(lookup.id)}`);
    const record = data?.leagues?.[0];
    const asset = leagueAsset(record, url);

    if (warning) {
      warnings.push(`League ${lookup.id}: ${warning}`);
    }

    if (asset) {
      leagues[slugify(asset.name)] = asset;
      addAliases(leagues, asset, lookup.aliases);
    }
  }

  for (const leagueName of TEAM_LEAGUE_QUERIES) {
    const { url, data, warning } = await fetchJson(`search_all_teams.php?l=${encodeURIComponent(leagueName)}`);
    const records = Array.isArray(data?.teams) ? data.teams : [];

    if (warning) {
      warnings.push(`Teams ${leagueName}: ${warning}`);
    }

    records.forEach((record) => {
      const asset = teamAsset(record, url);

      if (asset) {
        teams[slugify(asset.name)] = asset;
      }
    });
  }

  return {
    leagues,
    teams,
    warnings,
    source: {
      name: "TheSportsDB",
      endpointCount: LEAGUE_LOOKUPS.length + TEAM_LEAGUE_QUERIES.length,
      publicKeyUsed: apiKey() === PUBLIC_FREE_KEY
    }
  };
}

