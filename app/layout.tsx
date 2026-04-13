import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";

import { site } from "@/content/site";

import "./globals.css";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const sans = Open_Sans({
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
    icon: site.brand.logoSrc,
    apple: site.brand.logoSrc,
  },
  openGraph: {
    title: "AJAX Volunteer Hub",
    description:
      "Learn the petition. Sign with confidence. Volunteer with purpose — Jacksonville’s grassroots campaign for ward-based representation.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: site.brand.logoSrc,
        width: site.brand.logoWidth,
        height: site.brand.logoHeight,
        alt: "AJAX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AJAX Volunteer Hub",
    description:
      "Grassroots volunteer home for fairer representation in Jacksonville.",
    images: [site.brand.logoSrc],
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
        className={`${display.variable} ${sans.variable} relative min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <div className="ajax-page-backdrop" aria-hidden />
        <div className="ajax-page-grid" aria-hidden />
        {children}
      </body>
    </html>
  );
}
