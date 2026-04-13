import type { Metadata } from "next";
import { Montserrat, Open_Sans, Plus_Jakarta_Sans } from "next/font/google";

import { AjaxAssistantDock } from "@/components/assistant/ajax-assistant-dock";
import { AssistantProvider } from "@/components/assistant/assistant-context";
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

const fontPublic = Plus_Jakarta_Sans({
  variable: "--font-public",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ajax-volunteer-hub.netlify.app"),
  title: {
    default: "AJAX Volunteer Hub",
    template: "%s · AJAX Volunteer Hub",
  },
  description:
    "Jacksonville’s campaign for ward-based representation — a welcoming public site with clear paths to learn, sign, volunteer, and get answers from the AJAX Guide.",
  icons: {
    icon: site.brand.logoSrc,
    apple: site.brand.logoSrc,
  },
  openGraph: {
    title: "AJAX Volunteer Hub",
    description:
      "Learn the petition, sign with confidence, or volunteer — with a guided path and the AJAX Guide for questions.",
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
      "Ward-based representation for Jacksonville — guided paths to learn, sign, and volunteer.",
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
        className={`${display.variable} ${sans.variable} ${fontPublic.variable} relative min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <AssistantProvider>
          <div className="ajax-page-backdrop" aria-hidden />
          <div className="ajax-page-grid" aria-hidden />
          {children}
          <AjaxAssistantDock />
        </AssistantProvider>
      </body>
    </html>
  );
}
