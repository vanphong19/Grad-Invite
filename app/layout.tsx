import type { Metadata, Viewport } from "next";
import { Geist, Lora } from "next/font/google";
import { invitation } from "@/config/invitation";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

const editorial = Lora({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-editorial",
  display: "swap",
});

const title = `${invitation.fullName} — Graduation ${invitation.graduationYear}`;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: invitation.invitationMessage,
  applicationName: "Graduation Invitation",
  openGraph: {
    title,
    description: invitation.invitationMessage,
    type: "website",
    locale: "vi_VN",
    siteName: "Graduation Invitation",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: invitation.invitationMessage,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#041B38",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Browser tools can inject root attributes (e.g. mdl-js) before hydration.
  // Limit this escape hatch to html; descendants must still report mismatches.
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geist.variable} ${editorial.variable}`}>{children}</body>
    </html>
  );
}
