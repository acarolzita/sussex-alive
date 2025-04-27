import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar"; // <- Import the Navbar

export const metadata: Metadata = {
  title: "Sussex-Alive",
  description: "Your student social network",
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
          <Navbar /> {/* <- Add Navbar here */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}


