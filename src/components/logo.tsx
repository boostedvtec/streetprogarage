import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type LogoProps = {
  className?: string;
  imgClassName?: string;
};

export function Logo({ className, imgClassName }: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx("flex shrink-0 items-center group", className)}
      aria-label="Street Pro Garage home"
    >
      <Image
        src="/images/Logo-dark.png"
        alt="Street Pro Garage"
        width={1713}
        height={589}
        priority
        className={clsx(
          "w-auto shrink-0 object-contain transition-transform group-hover:scale-105 [aspect-ratio:1713/589]",
          imgClassName ?? "h-14"
        )}
      />
    </Link>
  );
}
