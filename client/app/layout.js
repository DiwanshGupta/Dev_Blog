import {Montserrat } from "next/font/google";
import Navbar from "../components/navbar/navbar";
import "./globals.css";
import Footer from "../components/footer/footer";

const inter = Montserrat({ subsets: ["latin"] });
export const metadata = {
  title: "EchoThreads",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="pt-10">
        {children}
        </div>
        <Footer/>
        </body>
    </html>
  );
}
