"use client";

import * as React from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import type { Specimen } from "@/lib/specimens";

export function CatalogGrid({ specimens }: { specimens: Specimen[] }) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return specimens;
    return specimens.filter((s) =>
      `${s.common_name} ${s.scientific_name} ${s.class_phylum}`
        .toLowerCase()
        .includes(q),
    );
  }, [specimens, query]);

  return (
    <div>
      <Input
        placeholder="Search by name, species, or class…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3 max-w-md"
      />
      <p className="mb-4 text-[0.78rem] text-muted-foreground">
        {filtered.length} specimen{filtered.length === 1 ? "" : "s"}
        {query && ` matching "${query}"`}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5">
        {filtered.map((s) => (
          <Link
            key={s.id}
            href={`/specimens/${s.id}/`}
            className="block border border-border bg-card p-[18px] transition-colors hover:border-accent"
          >
            <div className="mb-2 text-[0.7rem] tracking-wider text-accent">
              No. {s.id}
            </div>
            <div className="font-display text-[1.15rem] font-semibold leading-tight">
              {s.common_name || "Untitled specimen"}
            </div>
            <div className="text-[0.82rem] italic text-muted-foreground">
              {s.scientific_name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
