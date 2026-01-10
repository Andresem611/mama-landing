import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mama - Stop asking your mom to make calls",
  description: "AI that makes the phone calls you hate. Dentist appointments, restaurant reservations, customer service. Just text Mama.",
  keywords: ["AI", "phone calls", "voice AI", "appointments", "Gen Z"],
  openGraph: {
    title: "Mama - Stop asking your mom to make calls",
    description: "AI that makes the phone calls you hate.",
    type: "website",
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
        {/* Righteous - display font for headlines */}
        <link
          href="https://fonts.googleapis.com/css2?family=Righteous&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${quicksand.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
