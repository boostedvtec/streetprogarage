import Image from "next/image";
import clsx from "clsx";
import type { EcuBrandLogo } from "@/lib/site-config";

export function BrandLogo({ name, src, onDark, crop }: EcuBrandLogo) {
  return (
    <div
      className={clsx(
        "flex h-20 items-center justify-center rounded-lg border p-4",
        onDark
          ? "border-foreground bg-foreground"
          : "border-border bg-white"
      )}
      title={name}
    >
      {crop ? (
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "100% 200%",
            backgroundPosition: crop === "top" ? "top" : "bottom",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label={name}
        />
      ) : src.endsWith(".svg") ? (
        // Next/Image's optimizer rejects local SVGs by default; SVGs are
        // already resolution-independent so a plain <img> is correct here.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-contain" />
      ) : (
        <Image
          src={src}
          alt={name}
          width={160}
          height={64}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}
