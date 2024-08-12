import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Total Medals Olympics 2024 App",
  description: "Track the total medals for countries in the 2024 Olympics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Olympics 2024 Medal Tracker</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
