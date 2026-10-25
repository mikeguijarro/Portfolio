import { Geist_Mono, Hanken_Grotesk, Newsreader } from "next/font/google";

// Font roles are defined in DESIGN.md: one optical-size serif for display and editorial text,
// a grotesk for body and UI, a mono for labels and meta. No italics are used, so none are loaded.

export const serif = Newsreader({
    subsets: ["latin"],
    axes: ["opsz"],
    style: ["normal"],
    variable: "--font-serif",
    display: "swap",
    fallback: ["Georgia", "serif"],
});

export const sans = Hanken_Grotesk({
    subsets: ["latin"],
    style: ["normal"],
    variable: "--font-sans",
    display: "swap",
});

export const mono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const fontVariables = [serif.variable, sans.variable, mono.variable].join(" ");
