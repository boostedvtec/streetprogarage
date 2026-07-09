import type { ReactNode } from "react";

const inputClass =
  "min-h-11 rounded-md border border-border-strong bg-surface-2 px-3 py-2 text-foreground outline-none focus:border-accent";

export function FieldWrap({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-foreground-subtle">{hint}</span>}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      required={required}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass + " resize-y"}
    />
  );
}

export function CheckboxGroup({
  options,
  values,
  onChange,
}: {
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]
    );
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = values.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            aria-pressed={active}
            className={`min-h-11 cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-accent bg-accent-soft text-accent"
                : "border-border-strong bg-surface-2 text-foreground-muted hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <label
            key={opt}
            className={`min-h-11 flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-accent bg-accent-soft text-accent"
                : "border-border-strong bg-surface-2 text-foreground-muted hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={active}
              onChange={() => onChange(opt)}
              className="accent-[color:var(--color-accent)]"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}
