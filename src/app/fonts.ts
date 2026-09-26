import localFont from "next/font/local";

/**
 * Display: Cabinet Grotesk (Fontshare, ITF FFL) — headings/hero, tight tracking.
 * Body:    Satoshi (Fontshare, ITF FFL) — descriptions.
 * Mono:    PP Neue Montreal Mono is commercial (Pangram Pangram) — NOT bundled.
 *          General Sans stands in as the tech-tag/number face until licensed.
 *          ponytail: swap ./fonts + this var when PP Neue Montreal Mono is bought.
 */
export const display = localFont({
  src: [
    { path: "../fonts/CabinetGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/CabinetGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/CabinetGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const body = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const mono = localFont({
  src: [
    { path: "../fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});
