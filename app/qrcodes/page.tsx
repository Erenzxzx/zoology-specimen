import { SiteRail } from "@/components/site-rail";
import { QrSheet } from "@/components/qr-sheet";
import { specimens } from "@/lib/specimens";

export const metadata = {
  title: "QR Code Sheet — Zoology Lab Specimen Catalog",
};

export default function QrCodesPage() {
  return (
    <>
      <SiteRail
        right={
          <span className="text-primary-foreground/80">
            QR sheet · {specimens.length} specimens
          </span>
        }
      />
      <div className="mx-auto max-w-[1000px] px-5 py-9 pb-16">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold">
            Printable QR Codes
          </h1>
          <p className="mt-1 text-[0.9rem] text-muted-foreground">
            Each code links straight to that specimen&apos;s page. Print this
            sheet, cut along the dashed lines, and attach one label per jar
            or mount.
          </p>
        </div>
        <QrSheet specimens={specimens} />
      </div>
    </>
  );
}
