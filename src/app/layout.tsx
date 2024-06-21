import { Roboto } from "next/font/google";
import "./globals.css";
import UserContextProvider from "../context/userContext";
import Footer from "@/components/footer";
import { Header } from "@/components/header";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="bg-gray-900">
      <body className={`${roboto.className} flex flex-col min-h-screen`}>
        <UserContextProvider>
          <Header />
          <main className="flex-grow">{children}</main>
        </UserContextProvider>
        <Footer />
      </body>
    </html>
  );
}
