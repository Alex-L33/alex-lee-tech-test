// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({ weight: "700", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D11 Tech Test",
  description: "Next 13 single page application for the Pokédex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main className="flex min-h-screen flex-col p-16 bg-amber-200">
          <div className="w-full max-w-5xl lg:flex">
            <h2 className="text-4xl font-bold">Pokédex</h2>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
