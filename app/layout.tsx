import Header from "@/components/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Today's Flag - Devinez le drapeau du jour",
  description:
    "Today's Flag est une application web qui consiste à deviner chaque jour un drapeau ou une capitale. Améliorez votre culture générale quotidiennement avec ce jeu éducatif.",

  icons: {
    icon: "/assets/fav.ico",
    apple: "/assets/fav.ico",
    shortcut: "/assets/fav.ico",
  },

  applicationName: "Today's Flag",
  authors: [{ name: "Clément Maillet", url: "https://maillet.bzh" }],
  creator: "Clément Maillet",

  keywords: [
    "drapeau",
    "quiz",
    "géographie",
    "culture générale",
    "jeu éducatif",
    "pays",
    "capitales",
    "apprentissage",
  ],
  category: "Jeux et divertissement",

  openGraph: {
    title: "Today's Flag - Le quiz quotidien sur les drapeaux du monde",
    description:
      "Testez votre connaissance des drapeaux et capitales du monde entier avec un nouveau défi chaque jour",
    url: "https://todays-flag.maillet.bzh",
    siteName: "Today's Flag",
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Today's Flag - Devinez le drapeau du jour",
    description:
      "Un nouveau drapeau à deviner chaque jour pour améliorer votre culture géographique",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://todays-flag.maillet.bzh",
    languages: {
      "fr-FR": "https://todays-flag.maillet.bzh",
    },
  },

  assets: ["https://todays-flag.maillet.bzh/assets"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html className="h-full" lang="fr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground bg-[url('/assets/heroSection.png')] bg-cover bg-center bg-no-repeat
          flex flex-col h-full`}
        >
          <Header />
          <main className="flex-grow">{children}</main>
        </body>
      </html>
    </QueryProvider>
  );
}
