"use client";

import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/components/ui/button";
import type { Specimen } from "@/lib/specimens";
import { SITE_URL } from "@/lib/site-config";

export function QrSheet({ specimens }: { specimens: Specimen[] }) {
  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap gap-2.5">
        <Button onClick={() => window.print()}>Print sheet</Button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] border-l border-t border-dashed border-border">
        {specimens.map((s) => {
          const url = `${SITE_URL}/specimens/${s.id}/`;
          return (
            <div
              key={s.id}
              className="break-inside-avoid border-b border-r border-dashed border-border bg-card px-3.5 py-[18px] text-center"
            >
              <div className="mb-2.5 flex justify-center">
                <QRCodeSVG
                  value={url}
                  size={132}
                  fgColor="#241f17"
                  bgColor="#f8f4e8"
                />
              </div>
              <div className="text-[0.68rem] tracking-wide text-accent">
                No. {s.id}
              </div>
              <div className="font-display text-[0.98rem] font-semibold">
                {s.common_name || "Untitled specimen"}
              </div>
              <div className="mt-1.5 break-all text-[0.62rem] text-muted-foreground">
                {url}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
