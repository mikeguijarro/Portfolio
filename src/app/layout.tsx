import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster"
import { PHProvider } from './providers'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { TooltipPortal } from "./tooltip-portal";
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Miguel Guijarro | SRE & DevOps Engineer",
  description: "SRE and DevOps engineer with nearly two years at Amazon (AWS and Kindle). Kubernetes, AWS, Terraform and production incident response.",
  openGraph: {
    title: "Miguel Guijarro | SRE & DevOps Engineer",
    description: "SRE and DevOps engineer with nearly two years at Amazon (AWS and Kindle). Kubernetes, AWS, Terraform and production incident response.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={inter.className}>
          <TooltipPortal>
            {children}
          </TooltipPortal>
          <Toaster />
        </body>
      </PHProvider>
    </html >
  );
}
