export type DeliveryOption = {
  id: string;
  region: "UK" | "Europe" | "Rest of World";
  name: string;
  price: number;
};

/** Shared with the Delivery Information page — keep both in sync. */
export const deliveryOptions: DeliveryOption[] = [
  { id: "uk-small", region: "UK", name: "Small items under £10", price: 3.5 },
  { id: "uk-royal-mail", region: "UK", name: "Royal Mail 1st Class", price: 6 },
  { id: "uk-next-day", region: "UK", name: "Next Day Courier", price: 10 },
  { id: "eu-under-250", region: "Europe", name: "Orders under £250", price: 20 },
  { id: "eu-standard", region: "Europe", name: "Standard Delivery", price: 30 },
  { id: "eu-courier", region: "Europe", name: "Courier Delivery", price: 40 },
  { id: "row-small", region: "Rest of World", name: "Small Item Delivery", price: 40 },
  { id: "row-courier-5kg", region: "Rest of World", name: "Courier — under 5kg", price: 50 },
  { id: "row-large", region: "Rest of World", name: "Large Items — over 5kg", price: 90 },
];

export const defaultDeliveryOptionId = "uk-royal-mail";

export function getDeliveryOption(id: string): DeliveryOption | undefined {
  return deliveryOptions.find((o) => o.id === id);
}
