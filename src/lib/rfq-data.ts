export interface RfqItem {
  id: string;
  name: string;
  grade: string;
  length: string;
  shape: string;
  qtyMt: number;
}

export interface RfqData {
  customer: string;
  customerLocation: string;
  deliveryAddress: string;
  rfqId: string;
  deadline: string;
  category: string;
  gstRate: number;
  items: RfqItem[];
}

export const rfq: RfqData = {
  customer: "J. Kumar Infrastructure",
  customerLocation: "Bandra East, Mumbai",
  deliveryAddress: "453, Wakad, Pune",
  rfqId: "HSYD-IUI-787",
  deadline: "Today, 6:00 PM",
  category: "Steel",
  gstRate: 0.18,
  items: [
    {
      id: "tmt-8",
      name: "MS TMT Bar 8mm",
      grade: "FE500D",
      length: "12 m",
      shape: "Straight",
      qtyMt: 600,
    },
    {
      id: "tmt-10",
      name: "MS TMT Bar 10mm",
      grade: "FE500D",
      length: "12 m",
      shape: "Straight",
      qtyMt: 400,
    },
    {
      id: "tmt-12",
      name: "MS TMT Bar 12mm",
      grade: "FE500D",
      length: "12 m",
      shape: "Straight",
      qtyMt: 500,
    },
    {
      id: "tmt-16",
      name: "MS TMT Bar 16mm",
      grade: "FE500D",
      length: "12 m",
      shape: "Straight",
      qtyMt: 250,
    },
  ],
};

export const totalQtyMt = rfq.items.reduce((sum, i) => sum + i.qtyMt, 0);

export interface RatePreset {
  label: string;
  value: number;
}

// A vendor's standing rates for materials they quote often — not typed fresh each time.
export const presetRates: Record<string, RatePreset[]> = {
  "tmt-8": [
    { label: "Standard", value: 52500 },
    { label: "Last quoted", value: 51800 },
  ],
  "tmt-10": [
    { label: "Standard", value: 53000 },
    { label: "Last quoted", value: 52600 },
  ],
  "tmt-12": [
    { label: "Standard", value: 54250 },
    { label: "Last quoted", value: 53900 },
  ],
  "tmt-16": [
    { label: "Standard", value: 55500 },
    { label: "Last quoted", value: 56100 },
  ],
};

export const demoRates: Record<string, number> = Object.fromEntries(
  Object.entries(presetRates).map(([id, presets]) => [id, presets[0].value])
);
