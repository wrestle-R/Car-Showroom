import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Search } from "lucide-react";




export const metadata: Metadata = {
  title: "Car Hub",
  description: "Searching for a place to buy a car? Look no further!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= 'relative'>
        <Header />
        {children}
        <Footer/>
        
      </body>
    </html>
  );
}
