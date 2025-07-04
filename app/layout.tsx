import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/toaster";
import { StructuredData } from "@/components/seo/structured-data";
import "./globals.css";

const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "LaunchForge - AI Launch Script Factory for Indie Hackers | IndieBoost Your Product Launch",
  description: "Generate professional launch scripts for Product Hunt, Reddit, Hacker News, and X. Cool start script generator perfect for indie boost and successful product launches. LaunchForge helps indie hackers create compelling launch content.",
  keywords: "indie boost, launch forge, cool start script, product hunt launch, indie hackers, launch scripts, AI script generator, startup launch, product launch tools, reddit launch, hacker news launch, twitter launch scripts",
  authors: [{ name: "LaunchForge Team" }],
  openGraph: {
    title: "LaunchForge - AI Launch Script Factory",
    description: "Generate professional launch scripts for Product Hunt, Reddit, Hacker News, and X. Perfect for indie hackers.",
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "LaunchForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchForge - AI Launch Script Factory",
    description: "Generate professional launch scripts for Product Hunt, Reddit, Hacker News, and X. Perfect for indie hackers.",
    site: "@LaunchForge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Header user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
