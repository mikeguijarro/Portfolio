import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster"
import { PHProvider } from './providers'
import { fontVariables } from "./fonts";
import { themeInitScript } from "./(landing)/theme";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { TooltipPortal } from "./tooltip-portal";
config.autoAddCss = false

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
    // The theme script may add a light/dark class before hydration, hence suppressHydrationWarning.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <PHProvider>
        <body>
          <TooltipPortal>
            {children}
          </TooltipPortal>
          <Toaster />
        </body>
      </PHProvider>
    </html >
  );
}
