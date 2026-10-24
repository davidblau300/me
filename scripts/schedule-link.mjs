#!/usr/bin/env node
// Prints the private link that loads a timetable onto her phone. The timetable stays out of the repo and the
// deployed app; it travels only in the URL fragment, which browsers never send to a server.
// Usage: node scripts/schedule-link.mjs [path/to/schedule.json]   (default: private/schedule.json)
import { readFile } from 'node:fs/promises';

const APP_URL = 'https://davidblau300.github.io/me/';
const SCHOOL_DAYS = 6;
const sourcePath = process.argv[2] ?? new URL('../private/schedule.json', import.meta.url);

const schedule = JSON.parse(await readFile(sourcePath, 'utf8'));
if (schedule.version !== 1 || !Array.isArray(schedule.slots)) throw new Error('schedule.json: expected { version: 1, slots: [...] }');
for (const slot of schedule.slots) {
  if (slot.kind === 'lessons' && slot.cells?.length !== SCHOOL_DAYS) throw new Error(`schedule.json: slot ${slot.time || slot.label} needs ${SCHOOL_DAYS} cells`);
}

const payload = Buffer.from(JSON.stringify(schedule), 'utf8').toString('base64url');
console.log(`${APP_URL}#schedule=${payload}`);
