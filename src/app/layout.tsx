
import type { Metadata, Viewport } from "next";
import { Cairo, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import dbConnect from "@/lib/db";
import { SiteContent } from "@/models/SiteContent";
import { siteConfig } from "@/lib/seo-utils";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();

  let titleSuffix = " | خياطة رواء";
  let description = "مشغل خياطة رواء المتخصص في تصميم وتفصيل أرقى الأزياء النسائية، فساتين السهرة، الجلابيات، وملابس الإحرام. دقة في التفصيل وجودة في الأقمشة لتناسب ذوقك الرفيع.";
  let keywordsStr = "خياطة, فساتين, جلابيات, الدمام, مشغل نسائي, تفصيل";

  try {
    const suffixDoc = await SiteContent.findOne({ key: 'seo_title_suffix' });
    if (suffixDoc && suffixDoc.value) titleSuffix = suffixDoc.value;

    const descDoc = await SiteContent.findOne({ key: 'seo_default_description' });
    if (descDoc && descDoc.value) description = descDoc.value;

    const keysDoc = await SiteContent.findOne({ key: 'seo_keywords' });
    if (keysDoc && keysDoc.value) keywordsStr = keysDoc.value;
  } catch (e) {
    console.error("Failed to fetch SEO settings", e);
  }

  const keywords = keywordsStr.split(',').map(k => k.trim());

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: `خياطة رواء${titleSuffix}`,
      template: `%s${titleSuffix}`,
    },
    description: description,
    keywords: keywords,
    alternates: {
      canonical: "./",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: `خياطة رواء${titleSuffix}`,
      description: description,
      url: siteConfig.siteUrl,
      siteName: "خياطة رواء",
      locale: "ar_SA",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "خياطة رواء",
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `خياطة رواء${titleSuffix}`,
      description: description,
      images: ["/og-image.jpg"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFFBF2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager (Placeholder) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MJ8X123'); 
          `,
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "additionalType": "fashion",
              name: "خياطة رواء",
              image: `${siteConfig.siteUrl}/logo.webp`,
              "@id": siteConfig.siteUrl,
              url: siteConfig.siteUrl,
              telephone: "+966500000000",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SA",
                addressRegion: "Saudi Arabia",
              },
              areaServed: ["Saudi Arabia"],
            }),
          }}
        />
      </head>
      <body
        className={`${cairo.variable} ${greatVibes.variable} antialiased font-sans`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJ8X123"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C5A038] focus:text-white focus:rounded"
        >
          تخطّي إلى المحتوى
        </a>

        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
