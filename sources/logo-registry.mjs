import { slugify } from "./normalize-event.mjs";

export const LOGO_REGISTRY_VERSION = 1;

const FLAG_CODES = {
  Algeria: "dz",
  Argentina: "ar",
  Australia: "au",
  Austria: "at",
  Belgium: "be",
  "Bosnia & Herzegovina": "ba",
  Brazil: "br",
  Canada: "ca",
  "Cape Verde": "cv",
  Colombia: "co",
  Croatia: "hr",
  Curacao: "cw",
  "Czech Republic": "cz",
  "DR Congo": "cd",
  Ecuador: "ec",
  Egypt: "eg",
  England: "gb-eng",
  France: "fr",
  Germany: "de",
  Ghana: "gh",
  Haiti: "ht",
  Iran: "ir",
  Iraq: "iq",
  "Ivory Coast": "ci",
  Japan: "jp",
  Jordan: "jo",
  Mexico: "mx",
  Morocco: "ma",
  Netherlands: "nl",
  "New Zealand": "nz",
  Norway: "no",
  Panama: "pa",
  Paraguay: "py",
  Portugal: "pt",
  Qatar: "qa",
  "Saudi Arabia": "sa",
  Scotland: "gb-sct",
  Senegal: "sn",
  "South Africa": "za",
  "South Korea": "kr",
  Spain: "es",
  Sweden: "se",
  Switzerland: "ch",
  Tunisia: "tn",
  Turkey: "tr",
  USA: "us",
  Uruguay: "uy",
  Uzbekistan: "uz"
};

const LOCAL_CHANNELS = [
  ["ABC", "abc.svg"],
  ["Apple TV", "apple-tv.svg"],
  ["CBS", "cbs.svg"],
  ["ESPN", "espn.svg"],
  ["ESPN2", "espn2.svg"],
  ["ESPN+", "espn-plus.svg"],
  ["FOX", "fox.svg"],
  ["FS1", "fs1.svg"],
  ["FS2", "fs2.svg"],
  ["NBC", "nbc.svg"],
  ["Paramount+", "paramount-plus.svg"],
  ["Peacock", "peacock.svg"],
  ["Prime Video", "prime-video.svg"],
  ["TBS", "tbs.svg"],
  ["TNT", "tnt.svg"],
  ["truTV", "trutv.svg"],
  ["YouTube TV", "youtube-tv.svg"]
];

const SPORT_FALLBACKS = {
  Soccer: "assets/logos/fallbacks/sport-soccer.svg",
  Football: "assets/logos/fallbacks/sport-football.svg",
  Racing: "assets/logos/fallbacks/sport-racing.svg",
  Basketball: "assets/logos/fallbacks/sport-basketball.svg",
  Hockey: "assets/logos/fallbacks/sport-hockey.svg",
  Tennis: "assets/logos/fallbacks/sport-tennis.svg",
  Golf: "assets/logos/fallbacks/sport-golf.svg",
  Baseball: "assets/logos/fallbacks/sport-baseball.svg",
  "Combat Sports": "assets/logos/fallbacks/sport-combat.svg",
  "Horse Racing": "assets/logos/fallbacks/sport-horse-racing.svg",
  "Major Events": "assets/logos/fallbacks/sport-major-events.svg"
};

const LEAGUE_ALIASES = {
  "american-major-league-soccer": ["MLS"],
  "english-premier-league": ["Premier League"],
  "efl-cup": ["Carabao Cup"],
  "fifa-world-cup": ["World Cup", "World Cup 2026", "FIFA World Cup 2026"],
  "formula-1": ["F1"],
  "imsa-sportscar-championship": ["IMSA"],
  "mlb": ["MLB Playoffs", "World Series"],
  "nba": ["NBA Finals"],
  "nfl": ["NFL Regular Season", "NFL Playoffs", "Super Bowl"],
  "nhl": ["NHL Playoffs", "Stanley Cup Final"],
  "v8-supercars": ["Supercars"]
};

function nowIso() {
  return new Date().toISOString();
}

function providerTag(sourceName) {
  return {
    source: sourceName,
    logoSource: sourceName,
    logoUpdatedAt: ""
  };
}

function flagUrl(code) {
  return `https://flagcdn.com/w40/${code}.png`;
}

function buildStaticChannels() {
  return Object.fromEntries(LOCAL_CHANNELS.map(([name, file]) => [
    slugify(name),
    {
      name,
      logo: `assets/logos/channels/${file}`,
      source: "local-styled-channel-identifier",
      logoSource: "local-styled-channel-identifier",
      logoUpdatedAt: ""
    }
  ]));
}

function buildStaticFlags() {
  return Object.fromEntries(Object.entries(FLAG_CODES).map(([name, code]) => [
    slugify(name),
    {
      name,
      countryCode: code,
      logo: flagUrl(code),
      source: "FlagCDN",
      logoSource: "FlagCDN",
      logoUpdatedAt: ""
    }
  ]));
}

function buildStaticSports() {
  return Object.fromEntries(Object.entries(SPORT_FALLBACKS).map(([name, logo]) => [
    slugify(name),
    {
      name,
      logo,
      source: "local-sport-fallback",
      logoSource: "local-sport-fallback",
      logoUpdatedAt: ""
    }
  ]));
}

function mergeAssetBucket(existingBucket = {}, incomingBucket = {}) {
  const merged = { ...existingBucket };

  Object.entries(incomingBucket).forEach(([key, incomingAsset]) => {
    const existingAsset = merged[key];

    if (existingAsset?.manual || existingAsset?.source === "manual") {
      return;
    }

    merged[key] = {
      ...(existingAsset || {}),
      ...incomingAsset
    };
  });

  return Object.fromEntries(Object.entries(merged).sort(([first], [second]) => first.localeCompare(second)));
}

function addLeagueAliases(leagues) {
  Object.entries(LEAGUE_ALIASES).forEach(([canonicalKey, aliases]) => {
    const canonical = leagues[canonicalKey];

    if (!canonical) {
      return;
    }

    aliases.forEach((alias) => {
      const aliasKey = slugify(alias);

      if (!leagues[aliasKey]) {
        leagues[aliasKey] = {
          ...canonical,
          name: alias,
          aliasOf: canonical.name || canonicalKey
        };
      }
    });
  });
}

function comparableRegistry(registry) {
  const { updatedAt, ...rest } = registry || {};
  return JSON.stringify(rest);
}

export function lookupLogo(registry, bucket, value) {
  const key = slugify(value);
  return registry?.[bucket]?.[key] || null;
}

export function getRegistryLogo(registry, bucket, value) {
  return lookupLogo(registry, bucket, value)?.logo || "";
}

export function buildLogoRegistry({ existingRegistry = {}, providerRegistry = {} } = {}) {
  const nextRegistry = {
    version: LOGO_REGISTRY_VERSION,
    updatedAt: existingRegistry.updatedAt || "",
    sources: [
      {
        name: "TheSportsDB",
        type: "sports-data-api",
        role: "Team and league artwork URLs returned by the provider.",
        apiKey: "Uses THESPORTSDB_API_KEY when set, otherwise the documented public v1 key 123."
      },
      {
        name: "FlagCDN",
        type: "flag-cdn",
        role: "Country flag PNG URLs for World Cup matchup tiles."
      },
      {
        name: "Local channel identifiers",
        type: "repo-assets",
        role: "Small text-based SVG channel identifiers, not scraped official marks."
      }
    ],
    sports: mergeAssetBucket(existingRegistry.sports, buildStaticSports()),
    leagues: mergeAssetBucket(existingRegistry.leagues, providerRegistry.leagues),
    teams: mergeAssetBucket(existingRegistry.teams, providerRegistry.teams),
    channels: mergeAssetBucket(existingRegistry.channels, buildStaticChannels()),
    flags: mergeAssetBucket(existingRegistry.flags, buildStaticFlags()),
    notes: [
      "Generated by scripts/update-events.mjs.",
      "Manual entries can be preserved by setting manual: true or source: manual.",
      "Missing logos should fall back inside the UI rather than blocking rendering."
    ]
  };

  addLeagueAliases(nextRegistry.leagues);

  if (comparableRegistry(nextRegistry) !== comparableRegistry(existingRegistry)) {
    nextRegistry.updatedAt = nowIso();
  }

  return nextRegistry;
}

function assignIfMissing(target, field, value) {
  if (value && !target[field]) {
    target[field] = value;
  }
}

function logoSourceParts(...assets) {
  return [...new Set(assets
    .filter(Boolean)
    .map((asset) => asset.logoSource || asset.source)
    .filter(Boolean))];
}

function channelNames(value) {
  const normalized = String(value || "")
    .replace(/ESPN\+ PPV/gi, "ESPN+")
    .replace(/Amazon Prime/gi, "Prime Video")
    .split(/\s*\/\s*|\s*,\s*|\s+\+\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return normalized.length ? normalized : ["TBD"];
}

export function decorateEventLogos(event, registry) {
  const next = { ...event };
  const sportAsset = lookupLogo(registry, "sports", event.sport);
  const competitionAsset = lookupLogo(registry, "leagues", event.competition);
  const homeAsset = lookupLogo(registry, "teams", event.homeTeam);
  const awayAsset = lookupLogo(registry, "teams", event.awayTeam);
  const channelAsset = channelNames(event.tv)
    .map((channel) => lookupLogo(registry, "channels", channel))
    .find(Boolean);
  const sourceAssets = [sportAsset, competitionAsset, homeAsset, awayAsset, channelAsset];
  const teamLogos = { ...(event.teamLogos || {}) };
  const flagLogos = { ...(event.flagLogos || {}) };

  assignIfMissing(next, "sportLogo", sportAsset?.logo);
  assignIfMissing(next, "competitionLogo", competitionAsset?.logo);
  assignIfMissing(next, "homeTeamLogo", homeAsset?.logo);
  assignIfMissing(next, "awayTeamLogo", awayAsset?.logo);
  assignIfMissing(next, "channelLogo", channelAsset?.logo);

  [event.homeTeam, event.awayTeam, ...(event.teams || []), ...(event.participants || [])]
    .filter(Boolean)
    .forEach((teamName) => {
      const teamAsset = lookupLogo(registry, "teams", teamName);
      const flagAsset = lookupLogo(registry, "flags", teamName);

      if (teamAsset?.logo && !teamLogos[teamName]) {
        teamLogos[teamName] = teamAsset.logo;
        sourceAssets.push(teamAsset);
      }

      if (flagAsset?.logo && !flagLogos[teamName]) {
        flagLogos[teamName] = flagAsset.logo;
        sourceAssets.push(flagAsset);
      }
    });

  if (Object.keys(teamLogos).length) {
    next.teamLogos = teamLogos;
  }

  if (Object.keys(flagLogos).length) {
    next.flagLogos = flagLogos;
  }

  const sources = logoSourceParts(...sourceAssets);

  if (sources.length) {
    assignIfMissing(next, "logoSource", sources.join(", "));
    assignIfMissing(next, "logoUpdatedAt", registry.updatedAt);
  }

  return next;
}

export function decorateEventsWithLogos(events, registry) {
  return events.map((event) => decorateEventLogos(event, registry));
}

