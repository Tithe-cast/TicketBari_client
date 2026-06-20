import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../contexts/ThemeProvider.jsx";
import QueryProvider from "../contexts/QueryProvider.jsx";
import AuthProvider from "../contexts/AuthProvider.jsx";
import ToasterClient from "../components/ToasterClient.jsx";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "TicketBari | Book Bus, Train, Launch & Flight Tickets",
  description:
    "TicketBari — discover and book bus, train, launch, and plane tickets across the country in a few clicks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="ticketbari">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              {children}
              <ToasterClient />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
