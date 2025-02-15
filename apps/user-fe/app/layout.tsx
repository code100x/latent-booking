import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Manrope } from "next/font/google";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
export const metadata = {
  title: "Latent",
  description: "A talent show for the latently talented",
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} min-h-screen bg-background`}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
