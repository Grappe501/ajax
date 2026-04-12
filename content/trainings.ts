export type TrainingStatus = "available" | "coming soon";

export type TrainingModule = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
  status: TrainingStatus;
};

export const trainings: TrainingModule[] = [
  {
    slug: "petition-basics",
    title: "Petition Basics",
    description:
      "What the petition does, how it fits into the process, and how to explain it in one minute.",
    minutes: 12,
    status: "available",
  },
  {
    slug: "signing-rules",
    title: "Signing Rules",
    description:
      "Who can sign, what witnessing means from first signature to notarized turn-in, and how to help someone complete paperwork correctly.",
    minutes: 18,
    status: "available",
  },
  {
    slug: "canvassing-basics",
    title: "Canvassing Basics",
    description:
      "Friendly scripts, safety practices, and how to leave literature with respect.",
    minutes: 22,
    status: "coming soon",
  },
  {
    slug: "tabling-basics",
    title: "Tabling Basics",
    description:
      "Setup, signage, crowd flow, and how to run a calm, organized signing table.",
    minutes: 16,
    status: "coming soon",
  },
  {
    slug: "church-outreach",
    title: "Church Outreach Basics",
    description:
      "Relationship-first outreach, scheduling, and supporting faith communities.",
    minutes: 20,
    status: "coming soon",
  },
  {
    slug: "power-of-five",
    title: "Power of 5 Organizing",
    description:
      "A simple model: invite five people, support five conversations, build five leaders.",
    minutes: 25,
    status: "coming soon",
  },
];
