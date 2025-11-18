import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { draftMode } from "next/headers";
import Script from "next/script";
import { VisualEditing } from "next-sanity/visual-editing";
import { AppSidebar } from "@/components/AppSidebar";
import { ModeToggle } from "@/components/DarkModeToggle";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { FloatingDock } from "@/components/FloatingDock";
import SidebarToggle from "@/components/SidebarToggle";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "singleton-siteSettings"][0]{
  siteTitle,
  siteDescription,
  siteKeywords,
  ogImage,
  siteLogo,
  favicon,
  twitterHandle
}`);

export async function generateMetadata(): Promise<Metadata> {
  let settings: {
    siteTitle?: string;
    siteDescription?: string;
    siteKeywords?: string[];
    ogImage?: unknown;
    siteLogo?: unknown;
    favicon?: unknown;
    twitterHandle?: string;
  } | null = null;

  try {
    const result = await sanityFetch({ query: SITE_SETTINGS_QUERY });
    settings = result?.data || null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }

  const siteTitle = settings?.siteTitle || "Portfolio";
  const siteDescription =
    settings?.siteDescription || "Modern portfolio website";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://your-domain.com");

  // Build Open Graph image URL
  let ogImageUrl: string | undefined;
  if (settings?.ogImage) {
    try {
      ogImageUrl = urlFor(settings.ogImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .url();
    } catch (error) {
      console.error("Error generating OG image URL:", error);
    }
  }

  // Build favicon URL
  let faviconUrl: string | undefined;
  if (settings?.favicon) {
    try {
      faviconUrl = urlFor(settings.favicon).width(32).height(32).url();
    } catch (error) {
      console.error("Error generating favicon URL:", error);
    }
  }

  // Build logo URL for apple touch icon
  let appleTouchIconUrl: string | undefined;
  if (settings?.siteLogo) {
    try {
      appleTouchIconUrl = urlFor(settings.siteLogo)
        .width(180)
        .height(180)
        .url();
    } catch (error) {
      console.error("Error generating logo URL:", error);
    }
  }

  const metadata: Metadata = {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    keywords: settings?.siteKeywords || [],
    authors: [{ name: siteTitle }],
    creator: siteTitle,
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: siteTitle,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: siteTitle,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
      ...(settings?.twitterHandle && {
        creator: `@${settings.twitterHandle}`,
      }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      ...(faviconUrl && { icon: faviconUrl }),
      shortcut: faviconUrl || "/favicon.ico",
      ...(appleTouchIconUrl && { apple: appleTouchIconUrl }),
    },
  };

  return metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Script
              src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
              strategy="afterInteractive"
            />
            <SidebarProvider defaultOpen={false}>
              <SidebarInset>{children}</SidebarInset>
              <AppSidebar side="right" />
              <FloatingDock />
              <SidebarToggle />

              <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-20">
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <ModeToggle />
                </div>
              </div>
            </SidebarProvider>

            <SanityLive />

            {(await draftMode()).isEnabled && (
              <>
                <VisualEditing />
                <DisableDraftMode />
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
