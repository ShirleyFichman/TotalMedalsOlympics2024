import "./globals.css";
import React from "react";

export const metadata = {
  title: "Olympics 2024 Medal Tracker",
  description: "Track the total medals for countries in the 2024 Olympics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="m-6">
          <h1 className="font-bold text-2xl mb-4">Olympics 2024 Medal Tracker</h1>
          <h2>
          Find the rank of nations in the 2024 Olympics by medals per capita
          </h2>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
