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
      className={clsx("flex items-center group", className)}
      aria-label="Street Pro Garage home"
    >
      <Image
        src="/images/Logo.png"
        alt="Street Pro Garage"
        width={1200}
        height={389}
        priority
        className={clsx(
          "w-auto shrink-0 transition-transform group-hover:scale-105",
          imgClassName ?? "h-14"
        )}
      />
    </Link>
  );
}
