import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "DevStore",
  description: "A place to find all the developer resources like icons, AI models and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en">
      <body>
          <div className="h-screen w-screen">
            {children}
            <Toaster />
          </div>

      </body>
    </html>
  );
}
