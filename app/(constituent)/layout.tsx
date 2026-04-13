import { ConstituentFooter } from "@/components/layout/constituent-footer";
import { ConstituentHeader } from "@/components/layout/constituent-header";
import { PublicThemeProvider } from "@/components/layout/public-theme";

/**
 * Calm layout for shareable educational pages — no announcement bar or full volunteer nav.
 */
export default function ConstituentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicThemeProvider>
      <div className="marketing-public-root flex min-h-screen flex-col">
        <ConstituentHeader />
        <div className="flex-1">{children}</div>
        <ConstituentFooter />
      </div>
    </PublicThemeProvider>
  );
}
