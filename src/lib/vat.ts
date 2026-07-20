/** UK standard VAT rate. */
export const UK_VAT_RATE = 0.2;

export function vatAmount(exVatPrice: number): number {
  return Math.round(exVatPrice * UK_VAT_RATE * 100) / 100;
}

/**
 * The price to show a shopper on listings — VAT-inclusive where the base
 * price excludes VAT, per the UK Price Marking Order (consumer-facing
 * prices must show the actual amount payable, not an ex-VAT figure).
 */
export function displayPrice(price: number, exVat: boolean): number {
  return exVat ? price + vatAmount(price) : price;
}
