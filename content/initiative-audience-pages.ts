/** Focused pages for canvassers and notaries (hooks from petition hotspots). */

export const canvasserPageMeta = {
  title: "Canvasser instructions",
  description:
    "What circulators must verify, witness, and swear to — in plain language. Follow coordinator training and the official petition.",
};

export const canvasserPage = {
  intro:
    "The bottom-left affidavit is for the canvasser’s sworn statement. It exists so election officials can see that circulation rules were followed.",
  bullets: [
    "Verify the signer’s identity using photo identification as required.",
    "Inform signers that petition fraud is a criminal offense where the instructions say so.",
    "Witness each signature in your presence; do not accept signatures that violate the rules.",
    "Keep the popular name, ballot title, and full text attached during circulation as the form requires.",
  ],
  legalNote:
    "Complete the affidavit truthfully and obtain notarization as specified. Your training materials and the official instruction sheet are authoritative.",
  relatedHref: "/initiative/instructions#canvassers" as const,
};
