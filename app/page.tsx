import Link from "next/link";

import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { SiteRail } from "@/components/site-rail";
import { CatalogGrid } from "@/components/catalog-grid";
import { specimens } from "@/lib/specimens";
import { BASE_PATH } from "@/lib/site-config";

// Original textures (procedurally drawn for this catalog, not stock
// photography) standing in for real specimen photos until the lab has
// its own. Swap these for actual photos in specimens.csv + this array
// once you've photographed the collection.
const HERO_TEXTURES = [
  "scale-pattern",
  "feather-pattern",
  "honeycomb-pattern",
  "wing-vein-pattern",
  "shell-spiral-pattern",
  "leaf-vein-pattern",
  "fur-texture-pattern",
  "coral-branch-pattern",
].map((name) => ({
  src: `${BASE_PATH}/hero/${name}.svg`,
  alt: "",
}));

export default function HomePage() {
  return (
    <>
      <SiteRail
        right={
          <Link href="/qrcodes/" className="hover:underline">
            QR sheet
          </Link>
        }
      />

      <ImageStreamHero
        images={HERO_TEXTURES}
        className="h-[420px] w-full border-b border-border bg-primary sm:h-[500px]"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
          <div className="px-6">
            <h1 className="font-display text-balance text-4xl font-medium tracking-tight text-primary-foreground sm:text-5xl">
              Every specimen,
              <br />
              its own page.
            </h1>
          </div>
          <p className="max-w-md text-balance px-6 text-sm text-primary-foreground/80">
            Scan the QR label on any jar or mount and it opens straight to
            that specimen&apos;s record — species, habitat, diet, and notes.
          </p>
        </div>
      </ImageStreamHero>

      <div className="mx-auto max-w-[900px] px-5 py-9 pb-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold">
            Specimen Catalog
          </h2>
          <p className="mt-1 text-[0.9rem] text-muted-foreground">
            Browse the collection below, or print labels from the{" "}
            <Link href="/qrcodes/" className="text-primary hover:underline">
              QR sheet
            </Link>
            .
          </p>
        </div>
        <CatalogGrid specimens={specimens} />
      </div>
    </>
  );
}
