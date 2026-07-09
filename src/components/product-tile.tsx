import { Wrench } from "@phosphor-icons/react/dist/ssr";

export function ProductImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={
        "flex items-center justify-center bg-surface-2 text-foreground-subtle " +
        (className ?? "")
      }
    >
      <Wrench size={36} aria-hidden />
    </div>
  );
}
