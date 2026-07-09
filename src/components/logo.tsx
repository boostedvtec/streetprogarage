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
        src="/images/Logo.jpeg"
        alt="Street Pro Garage"
        width={1254}
        height={1254}
        priority
        className={clsx(
          "w-auto shrink-0 rounded-md transition-transform group-hover:scale-105",
          imgClassName ?? "h-14"
        )}
      />
    </Link>
  );
}
