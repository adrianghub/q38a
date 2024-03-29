import { ThemeProvider } from "@/core/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Nunito_Sans } from "next/font/google";
import React from "react";
import "../core/styles/prism.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Q38A",
  description: "Questions and Answers",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${nunito.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
