import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Sans_3 } from "next/font/google";

import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sans = Source_Sans_3({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajax-volunteer-hub.netlify.app"),
  title: {
    default: "AJAX Volunteer Hub",
    template: "%s · AJAX Volunteer Hub",
  },
  description:
    "The official volunteer home base for the AJAX campaign to replace Jacksonville’s at-large voting system with ward-based representation.",
  icons: {
    icon: "/logos/ajax-logo.svg",
  },
  openGraph: {
    title: "AJAX Volunteer Hub",
    description:
      "Learn the petition. Sign with confidence. Volunteer with purpose — Jacksonville’s grassroots campaign for ward-based representation.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/logos/ajax-logo.svg", width: 520, height: 360, alt: "AJAX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJAX Volunteer Hub",
    description:
      "Grassroots volunteer home for fairer representation in Jacksonville.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme">
      <body
        className={`${display.variable} ${sans.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
