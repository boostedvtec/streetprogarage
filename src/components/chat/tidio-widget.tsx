import Script from "next/script";

/**
 * Embeds the Tidio chat widget (free tier, includes Lyro AI up to its
 * monthly conversation cap). No-ops until NEXT_PUBLIC_TIDIO_PUBLIC_KEY is
 * set — get it from Tidio > Settings > Developer > Tidio embed code, it's
 * the id in the script src (code.tidio.co/<this-part>.js).
 */
export function TidioWidget() {
  const publicKey = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY;
  if (!publicKey) return null;

  return <Script src={`//code.tidio.co/${publicKey}.js`} strategy="afterInteractive" async />;
}
