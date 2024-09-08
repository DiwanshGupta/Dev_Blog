import {Montserrat } from "next/font/google";
import Navbar from "../components/navbar/navbar";
import "./globals.css";
import Footer from "../components/footer/footer";
import {ReduxProvider} from "../redux/provider"

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
        {children}
        </div>
        <Footer/>
        </ReduxProvider>
        </body>
    </html>
  );
}
