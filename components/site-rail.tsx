import Link from "next/link";

export function SiteRail({ right }: { right?: React.ReactNode }) {
  return (
    <div className="no-print flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 bg-primary px-5 py-3.5 text-[0.78rem] tracking-wide text-primary-foreground">
      <Link href="/" className="hover:underline">
        Zoology Lab Specimen Catalog
      </Link>
      {right}
    </div>
  );
}
