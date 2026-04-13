import fs from "fs";
import path from "path";

import { PETITION_PDF_PUBLIC_PATH, petitionPdfCopy } from "@/content/petition-assets";
import { Card } from "@/components/ui/card";

function pdfExistsOnDisk(): boolean {
  try {
    const abs = path.join(process.cwd(), "public", PETITION_PDF_PUBLIC_PATH.replace(/^\//, ""));
    return fs.existsSync(abs);
  } catch {
    return false;
  }
}

export function PetitionOfficialPdf() {
  const hasPdf = pdfExistsOnDisk();

  return (
    <section className="space-y-4" aria-labelledby="official-pdf-heading">
      <h2 id="official-pdf-heading" className="font-display text-xl font-bold text-foreground">
        {petitionPdfCopy.title}
      </h2>
      <p className="text-sm text-muted-foreground">{petitionPdfCopy.description}</p>
      {hasPdf ? (
        <Card className="overflow-hidden rounded-2xl border-border/80 p-0 shadow-inner">
          <iframe
            title="Official Jacksonville petition PDF"
            src={`${PETITION_PDF_PUBLIC_PATH}#view=FitH`}
            className="min-h-[720px] w-full border-0 bg-muted/20"
          />
          <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
            Download or print from your browser menu if you need a paper copy for training.
          </p>
        </Card>
      ) : (
        <Card className="rounded-2xl border-dashed border-primary/25 bg-muted/30 p-6 text-sm text-muted-foreground">
          <p>{petitionPdfCopy.missingHint}</p>
          <p className="mt-3">
            File expected at: <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">{PETITION_PDF_PUBLIC_PATH}</code>
          </p>
        </Card>
      )}
    </section>
  );
}
