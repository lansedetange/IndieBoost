export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LaunchForge",
    "alternateName": "LaunchForge AI Launch Script Factory",
    "description": "AI-powered launch script generator for indie hackers. Create professional Product Hunt, Reddit, Hacker News, and Twitter launch content instantly.",
    "url": "https://launchforge.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "19",
      "priceCurrency": "USD",
      "description": "Basic Launch Kit - Essential launch scripts for 3 platforms"
    },
    "author": {
      "@type": "Organization",
      "name": "LaunchForge Team"
    },
    "keywords": "indie boost, launch forge, cool start script, product hunt launch, indie hackers, launch scripts, AI script generator, startup launch, product launch tools",
    "featureList": [
      "AI-powered script generation",
      "Multi-platform support (Product Hunt, Reddit, Hacker News, Twitter, Discord)",
      "Professional templates",
      "Multiple export formats (Markdown, PDF, Notion)",
      "One-time purchase model"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}