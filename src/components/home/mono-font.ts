import { IBM_Plex_Mono } from "next/font/google";

/** Monospace face for the datalog and fuel-map visuals (read by the canvas drawing code). */
export const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
