// app/layout.tsx
import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Sussex-Alive | Connect with Students",
  description: "Sussex-Alive is a social network platform for Sussex University students to connect, share, and thrive.",
  openGraph: {
    title: "Sussex-Alive | Connect with Students",
    description: "Meet and collaborate with fellow students on Sussex-Alive.",
    url: "https://sussex-alive.vercel.app/",
    siteName: "Sussex-Alive",
    images: [
      {
        url: "https://sussex-alive.vercel.app/sussex-logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sussex-Alive",
    description: "Connect with Sussex students online!",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{String(metadata.title)}</title>
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}




