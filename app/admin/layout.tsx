import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: { template: "%s · AJAX Command", default: "Command" },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
