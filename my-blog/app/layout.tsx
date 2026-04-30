import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "My Blog App",
    template: "%s | My Blog App"
  },
  description: "Website contoh Next.js dengan SSR dan CSR",
  keywords: ["Next.js", "SSR", "CSR", "Blog", "React"],
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "My Blog App",
    description: "Website contoh Next.js dengan SSR dan CSR",
    siteName: "My Blog App",
    url: "https://blog-seo-ten.vercel.app",
    images: "https://blog-seo-ten.vercel.app/nextjs.jpg",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
