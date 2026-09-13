// Converts data/specimens.csv -> data/specimens.json.
// Runs automatically before `npm run dev` and `npm run build` (see package.json).
// A small hand-rolled parser is used so no extra dependency is required;
// it supports quoted fields, embedded commas, and escaped "" quotes.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, "..", "data", "specimens.csv");
const JSON_PATH = path.join(__dirname, "..", "data", "specimens.json");

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && next === "\n") i++;
        row.push(field);
        field = "";
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function main() {
  const text = readFileSync(CSV_PATH, "utf-8");
  const rows = parseCSV(text).filter((r) => r.some((cell) => cell.trim() !== ""));
  const header = rows[0].map((h) => h.trim());
  const specimens = rows
    .slice(1)
    .map((r) => {
      const obj = {};
      header.forEach((key, i) => {
        obj[key] = (r[i] ?? "").trim();
      });
      return obj;
    })
    .filter((s) => s.id)
    .sort((a, b) => a.id.localeCompare(b.id));

  writeFileSync(JSON_PATH, JSON.stringify(specimens, null, 2));
  console.log(`Built data/specimens.json with ${specimens.length} specimen(s).`);
}

main();
