import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloProvider from "../utils/ApolloProvider";
import OverlayLoader from "../components/loader/OverlayLoader";
import { LoaderProvider } from "@/context/LoaderContext";
import { ThemeProvider } from "@/context/ThemeContext"; // Importamos el ThemeProvider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nairobi | Dashboard",
  description: "Dashboard to manage users and data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <LoaderProvider>
            {/* Renderiza el loader globalmente */}
            <OverlayLoader />
            <ApolloProvider>{children}</ApolloProvider>
          </LoaderProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
