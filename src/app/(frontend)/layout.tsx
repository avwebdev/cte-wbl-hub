import { cn } from "src/utilities/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import type { Metadata } from "next";

import { draftMode } from "next/headers";
import React from "react";
import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/components/Footer/Component";
import { Header } from "@/components/Header/Component";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Providers } from "@/providers";

import "./globals.css";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

const UntitledSans = localFont({
  src: [
    {
      path: "../../../public/fonts/UntitledSans-Black.woff2",
      weight: "900",
    },
    {
      path: "../../../public/fonts/UntitledSans-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../../public/fonts/UntitledSans-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../../public/fonts/UntitledSans-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../../public/fonts/UntitledSans-Light.woff2",
      weight: "300",
    },
    {
      path: "../../../public/fonts/UntitledSans-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../../public/fonts/UntitledSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/UntitledSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/UntitledSans-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/UntitledSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-untitled-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        UntitledSans.variable,
        UntitledSans.className,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col justify-between">
            <div>
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
              <LivePreviewListener />

              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
