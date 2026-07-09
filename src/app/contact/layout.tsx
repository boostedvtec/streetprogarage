import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Street PRO Garage",
  description: "Get in touch with Street PRO Garage about tuning, parts, or bookings.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
