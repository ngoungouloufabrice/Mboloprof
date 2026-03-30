import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MboloProf | Mise en relation Profs & Élèves",
  description: "Trouvez le meilleur professeur pour vos cours de soutien au Gabon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ToastProvider>
          <AuthProvider>
            <main className="flex-grow">
              {children}
            </main>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
