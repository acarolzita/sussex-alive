import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Sussex-Alive | Connect with Students",
  description: "Sussex-Alive is a social network platform for Sussex University students to connect, share, and thrive.",
  openGraph: {
    title: "Sussex-Alive | Connect with Students",
    description: "Meet and collaborate with fellow students on Sussex-Alive.",
    url: "https://your-frontend-url.com", // <-- UPDATE THIS
    siteName: "Sussex-Alive",
    images: [
      {
        url: "https://your-frontend-url.com/og-image.png", // <-- Optional custom preview image
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
    creator: "@your_twitter", // optional
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



