import type { Metadata } from "next";
import { Montserrat, Raleway } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/Navbar";

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

export const metadata: Metadata = {
  title: "Vipula Cargo Service",
  description: "Shipping cargo from Milan to Sri Lanka and beyond.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vipula Cargo Service</title>
        {/* Add any other meta tags or links here */}
      </head>
      <body className={`flex flex-col min-h-screen bg-gray-100 ${raleway.className}`}>
        <Navbar/>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-[#112D4E] text-white py-8 mt-auto">
          <div className="container mx-auto text-center">
            <p className="text-lg mb-2">Contact Us</p>
            <p className="text-md mb-2">
              Email: <a href="mailto:info@vipulacargo.com" className="underline">info@vipulacargo.com</a>
            </p>
            <p className="text-md mb-2">Phone: +39 02 1234 5678</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}