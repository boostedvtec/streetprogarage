import { formatResolvedAmount, type Region } from "@/lib/region";

type Estimate = {
  low?: number;
  high?: number;
  breakdown?: { label: string; amount: number | null; display?: string }[];
};

const SERVICE_LABELS: Record<string, string> = {
  remote: "Remote tune",
  "rolling-road": "Rolling road dyno tune",
  both: "Remote tune + rolling road dyno",
};

const ECU_LABELS: Record<string, string> = {
  stock: "Stock ECU",
  standalone: "Aftermarket / standalone ECU",
  unsure: "Not sure",
};

/** Form fields grouped into the sections shown in the email, in display order. */
const SECTIONS: { title: string; fields: [key: string, label: string][] }[] = [
  {
    title: "Customer",
    fields: [
      ["name", "Name"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["address", "Address"],
      ["postcode", "Postcode"],
    ],
  },
  {
    title: "Vehicle & engine",
    fields: [
      ["vehicle", "Vehicle"],
      ["engineCode", "Engine code"],
      ["bottomEnd", "Bottom end"],
      ["cylinderHead", "Cylinder head"],
      ["aspiration", "Aspiration"],
      ["engineInternals", "Engine internals"],
      ["powerAdder", "Power adder"],
    ],
  },
  {
    title: "Fuel & ignition",
    fields: [
      ["ignition", "Ignition"],
      ["sparkPlugs", "Spark plugs"],
      ["injectorSizeBrand", "Injector size / brand"],
      ["injectorStatus", "Injector status"],
      ["fuelSystem", "Fuel system"],
      ["fuelType", "Fuel type"],
    ],
  },
  {
    title: "ECU & setup",
    fields: [
      ["ecuType", "ECU type"],
      ["ecuConfig", "ECU / configuration"],
      ["wideband", "Wideband"],
      ["catchCan", "Catch can"],
      ["oilSystem", "Oil system"],
    ],
  },
  {
    title: "Drivetrain & chassis",
    fields: [
      ["gearbox", "Gearbox"],
      ["gearboxCode", "Gearbox code"],
      ["chassisSuspension", "Chassis / suspension"],
      ["wheelsTires", "Wheels & tyres"],
    ],
  },
  {
    title: "Goals",
    fields: [
      ["vehicleApplication", "Vehicle use"],
      ["goals", "Goals"],
      ["specialRequirement", "Special requirements"],
    ],
  },
  {
    title: "Service requested",
    fields: [
      ["serviceType", "Service"],
      ["rollingRoadHours", "Dyno hours"],
      ["addOns", "Add-ons"],
      ["preDyno", "Pre-dyno tests"],
      ["declarationAccepted", "Declaration accepted"],
    ],
  },
];

const HANDLED_KEYS = new Set(["estimate", "region", "rollingRoadHoursTouched", ...SECTIONS.flatMap((s) => s.fields.map(([k]) => k))]);

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function show(key: string, value: unknown): string {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === undefined || value === null) return "";
  const s = String(value).trim();
  if (key === "serviceType") return SERVICE_LABELS[s] ?? s;
  if (key === "ecuType") return ECU_LABELS[s] ?? s;
  if (key === "engineInternals") return s === "built" ? "Built / forged" : s === "stock" ? "Stock" : s;
  return s;
}

function humanize(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim();
}

function priceText(est: Estimate | undefined, region: Region): string | null {
  if (!est || typeof est.low !== "number") return null;
  const high = typeof est.high === "number" ? est.high : est.low;
  return est.low === high
    ? formatResolvedAmount(est.low, region)
    : `${formatResolvedAmount(est.low, region)}–${formatResolvedAmount(high, region)}`;
}

function lineAmount(b: { amount: number | null; display?: string }, region: Region): string {
  return b.display ?? formatResolvedAmount(b.amount, region);
}

/** Plain-text version of a build list submission, grouped the same way as the HTML email. */
export function formatQuoteText(body: Record<string, unknown>): string {
  const region: Region = body.region === "pk" ? "pk" : "uk";
  const est = body.estimate as Estimate | undefined;
  const out: string[] = [];
  const price = priceText(est, region);
  if (price) out.push(`ESTIMATED PRICE: ${price}`, "");
  if (est?.breakdown?.length) {
    out.push("ESTIMATE BREAKDOWN");
    for (const b of est.breakdown) out.push(`  ${b.label}: ${lineAmount(b, region)}`);
    out.push("");
  }
  for (const section of SECTIONS) {
    const lines = section.fields
      .map(([k, label]) => [label, show(k, body[k])] as const)
      .filter(([, v]) => v !== "")
      .map(([label, v]) => `  ${label}: ${v}`);
    if (lines.length) out.push(section.title.toUpperCase(), ...lines, "");
  }
  const extra = Object.entries(body).filter(([k, v]) => !HANDLED_KEYS.has(k) && show(k, v) !== "");
  if (extra.length) out.push("OTHER DETAILS", ...extra.map(([k, v]) => `  ${humanize(k)}: ${show(k, v)}`), "");
  return out.join("\n").trim();
}

/** Branded HTML email for a build list submission: price summary, breakdown, then grouped details. */
export function renderQuoteEmail(title: string, body: Record<string, unknown>): string {
  const region: Region = body.region === "pk" ? "pk" : "uk";
  const est = body.estimate as Estimate | undefined;
  const price = priceText(est, region);

  const row = (label: string, value: string, i: number) => `
        <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f7f7f7"};">
          <td style="padding:9px 14px;border-bottom:1px solid #e5e5e5;font-weight:600;color:#111111;vertical-align:top;width:190px;font-size:14px;">${esc(label)}</td>
          <td style="padding:9px 14px;border-bottom:1px solid #e5e5e5;color:#333333;font-size:14px;white-space:pre-wrap;">${esc(value)}</td>
        </tr>`;

  const sectionHtml = (heading: string, rows: string) => `
            <tr>
              <td style="padding:18px 24px 0;">
                <h2 style="margin:0 0 8px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#cf5f1c;">${esc(heading)}</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">${rows}
                </table>
              </td>
            </tr>`;

  const priceBlock = price
    ? `
            <tr>
              <td style="padding:8px 24px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff4ec;border:1px solid #f3c9a8;border-radius:6px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8a4a1e;">Estimated price shown to customer</div>
                      <div style="margin-top:4px;font-size:28px;font-weight:700;color:#111111;">${esc(price)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
    : "";

  const breakdown = est?.breakdown?.length
    ? sectionHtml(
        "Estimate breakdown",
        est.breakdown
          .map(
            (b, i) => `
        <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f7f7f7"};">
          <td style="padding:9px 14px;border-bottom:1px solid #e5e5e5;color:#333333;font-size:14px;">${esc(b.label)}</td>
          <td style="padding:9px 14px;border-bottom:1px solid #e5e5e5;color:#111111;font-weight:600;font-size:14px;text-align:right;white-space:nowrap;">${esc(lineAmount(b, region))}</td>
        </tr>`
          )
          .join("")
      )
    : "";

  const sections = SECTIONS.map((section) => {
    const rows = section.fields
      .map(([k, label]) => [label, show(k, body[k])] as const)
      .filter(([, v]) => v !== "")
      .map(([label, v], i) => row(label, v, i))
      .join("");
    return rows ? sectionHtml(section.title, rows) : "";
  }).join("");

  const extra = Object.entries(body).filter(([k, v]) => !HANDLED_KEYS.has(k) && show(k, v) !== "");
  const extraHtml = extra.length ? sectionHtml("Other details", extra.map(([k, v], i) => row(humanize(k), show(k, v), i)).join("")) : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;max-width:640px;">
            <tr>
              <td style="background:#262626;padding:20px 24px;">
                <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.5px;">STREET <span style="color:#cf5f1c;">PRO</span> GARAGE</span>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 12px;">
                <h1 style="margin:0;font-size:20px;color:#111111;">${esc(title)}</h1>
                <p style="margin:6px 0 0;font-size:13px;color:#777777;">Submitted via streetprogarage.com</p>
              </td>
            </tr>${priceBlock}${breakdown}${sections}${extraHtml}
            <tr>
              <td style="padding:24px;">
                <p style="margin:0;font-size:12px;color:#999999;">Reply directly to this email to respond to the customer.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
