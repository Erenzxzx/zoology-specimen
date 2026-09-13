import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteRail } from "@/components/site-rail";
import { SpecimenTag } from "@/components/specimen-tag";
import { getAllSpecimenIds, getSpecimen } from "@/lib/specimens";

export function generateStaticParams() {
  return getAllSpecimenIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const specimen = getSpecimen(params.id);
  return {
    title: specimen
      ? `${specimen.common_name} — Zoology Lab Specimen Catalog`
      : "Specimen not found",
  };
}

export default function SpecimenPage({ params }: { params: { id: string } }) {
  const specimen = getSpecimen(params.id);
  if (!specimen) notFound();

  return (
    <>
      <SiteRail
        right={<span className="text-muted-foreground/80">No. {specimen.id}</span>}
      />
      <div className="mx-auto max-w-[760px] px-5 py-9 pb-16">
        <SpecimenTag specimen={specimen} />
        <Link
          href="/"
          className="mt-6 inline-block text-[0.82rem] text-primary hover:underline"
        >
          &larr; Back to catalog
        </Link>
      </div>
    </>
  );
}
