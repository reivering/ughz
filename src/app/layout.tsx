import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactPopup } from "@/components/ContactPopup";
import { ContactProvider } from "@/context/ContactContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZEYNO | Strategic Design",
  description: "A global branding agency for brands ready to evolve.",
  metadataBase: new URL("https://zeyno.my"),
  openGraph: {
    title: "ZEYNO | Strategic Design",
    description: "A global branding agency for brands ready to evolve, stand out, and dominate their market.",
    url: "https://zeyno.my",
    siteName: "ZEYNO",
    images: [
      {
        url: "/icon.jpeg",
        width: 1200,
        height: 630,
        alt: "ZEYNO Strategic Design Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEYNO | Strategic Design",
    description: "A global branding agency for brands ready to evolve.",
    images: ["/icon.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0a] text-[#f5f5f5]`}>
        <ContactProvider>
          <SmoothScrolling>
            <Navbar />
            <ContactPopup />
            {children}
            <Footer />
          </SmoothScrolling>
        </ContactProvider>
      </body>
    </html>
  );
}
