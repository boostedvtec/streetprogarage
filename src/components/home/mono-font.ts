import { IBM_Plex_Mono } from "next/font/google";

/**
 * Monospace face for labels, readouts, the datalog and fuel-map visuals. The
 * CSS variable feeds the `font-mono-tech` utility; canvas drawing code reads
 * the resolved family from the element's computed style.
 */
export const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
});
