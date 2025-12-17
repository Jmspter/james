import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D0D0D",
};

export const metadata: Metadata = {
  title: {
    default: "James Peter | Desenvolvedor Backend & Full-Stack",
    template: "%s | James Peter",
  },
  description: "Desenvolvedor Backend especializado em arquitetura de sistemas, APIs escaláveis e práticas DevOps. Confira meu portfólio de projetos e artigos técnicos.",
  metadataBase: new URL("https://jamespeter.dev"),
  keywords: [
    "desenvolvedor backend",
    "full-stack developer",
    "arquitetura de sistemas",
    "APIs REST",
    "DevOps",
    "Node.js",
    "Python",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "James Peter",
    "portfólio desenvolvedor",
  ],
  authors: [{ name: "James Peter", url: "https://jamespeter.dev" }],
  creator: "James Peter",
  publisher: "James Peter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://jamespeter.dev",
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
  openGraph: {
    title: "James Peter | Desenvolvedor Backend & Full-Stack",
    description: "Desenvolvedor Backend especializado em arquitetura de sistemas, APIs escaláveis e práticas DevOps.",
    url: "https://jamespeter.dev",
    siteName: "James Peter",
    images: [
      {
        url: "https://jamespeter.dev/about-photo.jpg",
        width: 1200,
        height: 630,
        alt: "James Peter - Desenvolvedor Backend",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Peter | Desenvolvedor Backend & Full-Stack",
    description: "Desenvolvedor Backend especializado em arquitetura de sistemas, APIs escaláveis e práticas DevOps.",
    images: ["https://jamespeter.dev/about-photo.jpg"],
    creator: "@jmspter",
  },
  verification: {
    // google: "seu-codigo-google-search-console",
    // yandex: "seu-codigo-yandex",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "James Peter",
    url: "https://jamespeter.dev",
    image: "https://jamespeter.dev/about-photo.jpg",
    sameAs: [
      "https://github.com/Jmspter",
      "https://linkedin.com/in/jmspter",
      "https://x.com/jmspter",
    ],
    jobTitle: "Desenvolvedor Backend",
    worksFor: {
      "@type": "Organization",
      name: "Freelancer",
    },
    description: "Desenvolvedor Backend especializado em arquitetura de sistemas, APIs escaláveis e práticas DevOps.",
    knowsAbout: [
      "Backend Development",
      "System Architecture",
      "DevOps",
      "Node.js",
      "Python",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/about-photo.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-cream text-warm-black font-sans`}
      >
        {children}
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  );
}
