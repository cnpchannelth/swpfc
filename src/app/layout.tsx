import type { Metadata } from "next";
import { Noto_Sans_Thai, Oswald } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { isAuthenticated } from "@/lib/auth";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ตำรวจสวรรคโลก เอฟซี | Police Sawankhalok FC",
  description:
    "เว็บไซต์อย่างเป็นทางการของสโมสรฟุตบอลตำรวจสวรรคโลก จังหวัดสุโขทัย - ข่าวสาร ตารางแข่งขัน ผลการแข่งขัน สถิติ และข้อมูลนักเตะ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminLoggedIn = await isAuthenticated();

  return (
    <html lang="th" className={`${notoSansThai.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar isAdmin={adminLoggedIn} />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
