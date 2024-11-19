import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloProvider from "../lib/ApolloProvider";
import OverlayLoader from "./components/loader/OverlayLoader";
import { LoaderProvider } from "@/context/LoaderContext";

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
  title: "Dashboard ADMIN",
  description: "Dashboard to manage users and data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
