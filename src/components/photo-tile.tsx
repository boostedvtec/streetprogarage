import { Camera } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

/**
 * Placeholder mosaic tile — swap for a real <Image src="/images/builds/..." />
 * once photos are provided. `label` documents which build/shot belongs here.
 */
export function PhotoTile({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-border-strong bg-surface-2 p-4 text-center",
        className
      )}
    >
      <Camera size={22} className="text-foreground-subtle" aria-hidden />
      <span className="text-xs font-medium text-foreground-subtle">{label}</span>
    </div>
  );
}
