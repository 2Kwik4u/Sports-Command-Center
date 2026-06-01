const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const target = process.argv[2] ? path.resolve(root, process.argv[2]) : path.join(root, "events.json");
const allowedStatuses = new Set(["Must-watch", "Good TV weekend", "Possible road trip", "Already attending", "Skip"]);

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isStringList(value) {
  if (value === undefined) {
    return true;
  }

  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNumberInRange(value, minimum, maximum) {
  return value === undefined || (Number.isFinite(value) && value >= minimum && value <= maximum);
}

function validateEvent(event, index) {
  const label = `events[${index}]`;
  const errors = [];

  if (!isPlainObject(event)) {
    return [`${label} must be an object.`];
  }

  ["id", "title", "sport", "date"].forEach((field) => {
    if (typeof event[field] !== "string" || !event[field].trim()) {
      errors.push(`${label}.${field} must be a non-empty string.`);
    }
  });

  if (typeof event.date === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
    errors.push(`${label}.date must use YYYY-MM-DD format.`);
  }

  if (event.startTime !== undefined && (typeof event.startTime !== "string" || (event.startTime && !/^\d{2}:\d{2}$/.test(event.startTime)))) {
    errors.push(`${label}.startTime must use HH:MM format or be an empty string.`);
  }

  if (!isNumberInRange(event.importance, 1, 10)) {
    errors.push(`${label}.importance must be a number from 1 to 10.`);
  }

  if (!isNumberInRange(event.personalImportance, 1, 10)) {
    errors.push(`${label}.personalImportance must be a number from 1 to 10.`);
  }

  if (event.status !== undefined && !allowedStatuses.has(event.status)) {
    errors.push(`${label}.status must be one of: ${[...allowedStatuses].join(", ")}.`);
  }

  ["teams", "drivers", "competitionTags", "favoriteTags"].forEach((field) => {
    if (!isStringList(event[field])) {
      errors.push(`${label}.${field} must be an array of strings when provided.`);
    }
  });

  if (event.trip !== undefined && !isPlainObject(event.trip)) {
    errors.push(`${label}.trip must be an object when provided.`);
  }

  if (isPlainObject(event.trip)) {
    if (!isNumberInRange(event.trip.myInterest, 1, 10)) {
      errors.push(`${label}.trip.myInterest must be a number from 1 to 10.`);
    }

    if (!isNumberInRange(event.trip.friendInterest, 1, 10)) {
      errors.push(`${label}.trip.friendInterest must be a number from 1 to 10.`);
    }

    if (event.trip.hotelNeeded !== undefined && typeof event.trip.hotelNeeded !== "boolean") {
      errors.push(`${label}.trip.hotelNeeded must be true or false.`);
    }
  }

  return errors;
}

function main() {
  const raw = fs.readFileSync(target, "utf8");
  const parsed = JSON.parse(raw);
  const events = Array.isArray(parsed) ? parsed : parsed.events;
  const errors = [];

  if (!Array.isArray(events)) {
    errors.push("File must contain an events array or be an array of events.");
  } else {
    const ids = new Set();

    events.forEach((event, index) => {
      errors.push(...validateEvent(event, index));

      if (event && typeof event.id === "string") {
        if (ids.has(event.id)) {
          errors.push(`events[${index}].id duplicates "${event.id}".`);
        }

        ids.add(event.id);
      }
    });
  }

  if (errors.length) {
    console.error(`Event validation failed for ${path.relative(root, target)}:`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(`Event validation passed for ${path.relative(root, target)}. ${events.length} event${events.length === 1 ? "" : "s"} checked.`);
}

try {
  main();
} catch (error) {
  console.error(`Event validation failed: ${error.message}`);
  process.exitCode = 1;
}
