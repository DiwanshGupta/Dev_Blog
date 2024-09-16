import {Montserrat } from "next/font/google";
import "../globals.css";
import { ReduxProvider } from "../../redux/provider";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { Suspense } from "react";

const inter = Montserrat({ subsets: ["latin"] });
export const metadata = {
  title: "EchoThreads",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
        <Navbar/>
        <div className="pt-10">
        <Suspense>
        {children}
        </Suspense>
        </div>
        <Footer/>
        </ReduxProvider>
        </body>
    </html>
  );
}
