import "./globals.css";
import { Manrope } from "next/font/google";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/app/_components/ui/sooner";

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
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
