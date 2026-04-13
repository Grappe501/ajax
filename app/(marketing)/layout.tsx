import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicThemeProvider } from "@/components/layout/public-theme";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicThemeProvider>
      <div className="marketing-public-root">
        <AnnouncementBar />
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </PublicThemeProvider>
  );
}
