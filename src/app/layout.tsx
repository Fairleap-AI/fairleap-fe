import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { DataSyncProvider } from "@/context/DataSyncContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "FairLeapAI - Empowering Gojek Drivers with Smarter Earnings & Real-Time Support",
    template: "%s | FairLeapAI",
  },
  description:
    "Empowers Gojek drivers with AI-driven earnings forecasts, welfare support, and personalized insights.",
  keywords: [
    "Gojek",
    "Driver Earnings",
    "AI Forecast",
    "Welfare Support",
    "Real-time Support",
    "Driver Insights",
    "FairLeapAI",
  ],
  authors: [{ name: "FairLeap Team" }],
  creator: "FairLeap",
  publisher: "FairLeap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fairleap.ai"),
  openGraph: {
    title:
      "FairLeapAI - Empowering Gojek Drivers with Smarter Earnings & Real-Time Support",
    description:
      "Empowers Gojek drivers with AI-driven earnings forecasts, welfare support, and personalized insights.",
    url: "https://fairleap.ai",
    siteName: "FairLeapAI",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "FairLeap Logo",
      },
      {
        url: "/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
        alt: "FairLeap Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "FairLeapAI - Empowering Gojek Drivers with Smarter Earnings & Real-Time Support",
    description:
      "Empowers Gojek drivers with AI-driven earnings forecasts, welfare support, and personalized insights.",
    images: ["/web-app-manifest-512x512.png"],
    creator: "@fairleap",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon1.png", type: "image/png", sizes: "32x32" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icon0.svg",
        color: "#00AA13",
      },
    ],
  },
  manifest: "/manifest.json",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataSyncProvider>
          <ToastProvider>{children}</ToastProvider>
        </DataSyncProvider>
      </body>
    </html>
  );
}
