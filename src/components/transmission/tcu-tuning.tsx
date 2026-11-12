import { ArrowUpRight, CheckCircle, Clock, Info } from "@phosphor-icons/react/dist/ssr";
import { BrandLogo } from "@/components/brand-logo";
import { ecuBrandLogos } from "@/lib/site-config";
import { tcuSetups, tcuUpcoming } from "@/lib/tcu-tuning";

/** The Haltech A340E and ZF 8HP setup cards for the TCU tuning page. */
export function TcuSetupCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {tcuSetups.map((s) => {
        const logo = s.logo ? ecuBrandLogos.find((l) => l.name === s.logo) : undefined;
        return (
          <article key={s.id} id={s.id} className="flex scroll-mt-24 flex-col border border-border bg-surface p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-accent">{s.eyebrow}</p>
                <h3 className="font-display mt-2 text-3xl leading-none sm:text-4xl">{s.title}</h3>
              </div>
              {logo && (
                <div className="hidden w-28 shrink-0 sm:block">
                  <BrandLogo {...logo} />
                </div>
              )}
            </div>

            {s.tag && (
              <p className="font-mono-tech mt-4 inline-flex items-center gap-2 self-start border border-accent/50 bg-accent-soft px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-accent">
                <CheckCircle size={14} weight="fill" aria-hidden />
                {s.tag}
              </p>
            )}

            <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">{s.summary}</p>

            <h4 className="font-mono-tech mt-6 text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
              {s.coverTitle}
            </h4>
            <ul className="mt-3 grid gap-2.5 text-sm text-foreground">
              {s.covers.map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-6 border border-border-strong bg-surface-2 p-4">
              <h4 className="font-mono-tech flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">
                <Info size={14} aria-hidden />
                {s.checkTitle}
              </h4>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-foreground-muted">
                {s.checks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap gap-x-6 pt-5">
              {s.sources.map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent hover:text-accent-hover"
                >
                  {src.label} <ArrowUpRight size={14} weight="bold" aria-hidden />
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Haltech's announced Ti8HP, shown as upcoming and not yet released. */
export function TcuUpcomingCard() {
  const u = tcuUpcoming;
  const logo = ecuBrandLogos.find((l) => l.name === u.logo);
  const lists = [
    { title: u.whatTitle, items: u.what },
    { title: u.needTitle, items: u.need },
    { title: u.laterTitle, items: u.later },
  ];
  return (
    <article id={u.id} className="mt-6 scroll-mt-24 border border-dashed border-accent/50 bg-surface p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-accent">{u.eyebrow}</p>
          <h3 className="font-display mt-2 text-3xl leading-none sm:text-4xl">{u.title}</h3>
        </div>
        {logo && (
          <div className="hidden w-28 shrink-0 sm:block">
            <BrandLogo {...logo} />
          </div>
        )}
      </div>

      <p className="font-mono-tech mt-4 inline-flex items-center gap-2 border border-accent/50 bg-accent-soft px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-accent">
        <Clock size={14} weight="bold" aria-hidden />
        {u.tag}
      </p>

      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-foreground-muted">{u.summary}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {lists.map((l) => (
          <div key={l.title}>
            <h4 className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-foreground-subtle">{l.title}</h4>
            <ul className="mt-3 grid gap-2.5 text-sm text-foreground">
              {l.items.map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2 border border-border-strong bg-surface-2 p-4 text-sm leading-relaxed text-foreground-muted">
        <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
        <span>{u.note}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6">
        {u.sources.map((src) => (
          <a
            key={src.url}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent hover:text-accent-hover"
          >
            {src.label} <ArrowUpRight size={14} weight="bold" aria-hidden />
          </a>
        ))}
      </div>
    </article>
  );
}
