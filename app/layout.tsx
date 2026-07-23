// app/layout.tsx

import { VisitorTracker } from './components/VisitorTracker';
import React, { Suspense } from "react";
import { 
  Plus_Jakarta_Sans, 
  Syne, 
  Playfair_Display, 
  Sora, 
  Instrument_Serif, 
  Cormorant_Garamond, 
  Inter 
} from 'next/font/google';
import './globals.css'; // Make sure your globals are imported

// 1. Combine all Plus Jakarta Sans instances into ONE variable font
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap', // No weights specified means it loads the tiny variable version!
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Changed to variable font for performance
  display: 'swap',
});

import type { Metadata, Viewport } from "next";


import "./globals.css";
import "./navbar.css";
import "./hero.css";
import "./responsive.css";

const SITE_NAME = "DentalNova";
const SITE_URL = "https://www.dentalnova.com"; // Replace
const DEFAULT_TITLE = "DentalNova | Cosmetic & Family Dentistry";
const DESCRIPTION =
  "Premium cosmetic, restorative, and family dentistry with modern technology. Book your appointment for veneers, implants, whitening, Invisalign, smile makeovers, and preventive dental care.";



  
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DESCRIPTION,

  applicationName: SITE_NAME,

  referrer: "origin-when-cross-origin",

  keywords: [
    "Cosmetic Dentist",
    "Dentist",
    "Dental Clinic",
    "Family Dentist",
    "Smile Makeover",
    "Teeth Whitening",
    "Dental Implants",
    "Dental Veneers",
    "Dental Crowns",
    "Dental Bridges",
    "Root Canal",
    "Dental Cleaning",
    "Preventive Dentistry",
    "Emergency Dentist",
    "Orthodontics",
    "Invisalign",
    "Dental Care",
    "Dental Practice",
    "Oral Health",
    "Smile Design",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,

  publisher: SITE_NAME,

  category: "Healthcare",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DESCRIPTION,

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DentalNova Cosmetic Dentistry",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
    creator: "@DentalNova",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
      },
    ],

    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
    yandex: "YANDEX_VERIFICATION_CODE",
    yahoo: "YAHOO_VERIFICATION_CODE",
    other: {
      bing: ["BING_VERIFICATION_CODE"],
    },
  },

  other: {
    "theme-color": "#ffffff",
    "color-scheme": "light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-TileColor": "#ffffff",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
  colorScheme: "light",
};




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.className} ${serif.className}`}>
      <body>
        <Suspense fallback={null}>
          <VisitorTracker />
        </Suspense>
        {children}</body>
    </html>
  );
}
