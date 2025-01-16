import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Manrope , Figtree } from 'next/font/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Latent",
  description: "India's Got Latent",
};

const manrope = Manrope({
  weight: ['400', '600' , '700' , '500'], // Specify the font weights you intend to use
  subsets: ['latin'],     // Specify the subsets you intend to use
});

const figtree = Figtree({
  weight: ['400', '600' , '700' , '500'], // Specify the font weights you intend to use
  subsets: ['latin'],     // Specify the subsets you intend to use
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${manrope.className} ${figtree.className}`}>
        {children}
      </body>
    </html>
  );
}
