import specimensJson from "@/data/specimens.json";

export type Specimen = {
  id: string;
  common_name: string;
  scientific_name: string;
  class_phylum: string;
  collection_date: string;
  location: string;
  description: string;
  habitat: string;
  diet: string;
  conservation_status: string;
  notes: string;
  sources: string;
};

export const specimens = specimensJson as Specimen[];

export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id);
}

export function getAllSpecimenIds(): string[] {
  return specimens.map((s) => s.id);
}

/**
 * Turns a free-text "Class / Phylum" field into an ordered breadcrumb,
 * higher rank (phylum) first.
 */
export function taxonTrail(classPhylum: string): string[] {
  if (!classPhylum) return [];
  const parts = classPhylum
    .replace(/,/g, "/")
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return parts;

  const knownPhyla = [
    "chordata",
    "arthropoda",
    "mollusca",
    "annelida",
    "cnidaria",
    "echinodermata",
    "porifera",
    "nematoda",
  ];
  let [a, b] = parts;
  if (knownPhyla.includes(b.toLowerCase()) && !knownPhyla.includes(a.toLowerCase())) {
    [a, b] = [b, a];
  }
  return [a, b, ...parts.slice(2)];
}
