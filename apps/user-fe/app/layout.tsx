import "./globals.css";

export const metadata = {
  title: "India's Got Latent",
  description: "A talent show for the latently talented",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
