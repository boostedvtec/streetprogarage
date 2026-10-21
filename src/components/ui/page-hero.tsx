import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { DynoLines } from "@/components/home/dyno-lines";

/**
 * Shared header for inner pages: a real project photo graded dark, the same
 * hairline grid as the homepage, and large display type. Pass the page's own
 * eyebrow, h1, intro and CTAs as children; the h1 is scaled up here.
 */
export function PageHero({
  image,
  position = "50% 50%",
  children,
}: {
  image: string;
  /** CSS object-position for the photo crop. */
  position?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden border-b border-border">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover opacity-50 saturate-[0.8] brightness-90"
        style={{ objectPosition: position }}
      />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#09090b_0%,rgba(9,9,11,0.88)_40%,rgba(9,9,11,0.45)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,#09090b_0%,rgba(9,9,11,0)_45%)]" />
      <div aria-hidden className="absolute inset-0 -z-10">
        <DynoLines />
      </div>
      <Container className="relative py-16 sm:py-24 lg:py-28 [&_h1]:text-6xl [&_h1]:leading-[0.9] sm:[&_h1]:text-7xl lg:[&_h1]:text-8xl">
        {children}
      </Container>
    </div>
  );
}
