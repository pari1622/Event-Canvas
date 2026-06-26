export type OptionField = {
  type:
    | "quantity"
    | "size"
    | "material"
    | "paper"
    | "lamination"
    | "printing"
    | "color"
    | "upload"
    | "notes";

  label: string;

  options?: string[];
};

export type ServiceConfiguration = {
  title: string;

  fields: OptionField[];
};

export const customizationFields: Record<string, ServiceConfiguration> = {
  "Magazine / Brochure": {
    title: "Magazine / Brochure",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Paper Type",
        options: ["Art Paper", "Gloss", "Matte", "Maplitho"],
      },
      {
        type: "size",
        label: "Size",
        options: ["A6", "A5", "A4", "A3", "Custom"],
      },
      {
        type: "lamination",
        label: "Lamination",
        options: ["None", "Gloss", "Matte"],
      },
      { type: "upload", label: "Upload Design" },
      { type: "notes", label: "Additional Notes" },
    ],
  },

  Certificate: {
    title: "Certificate",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Paper",
        options: ["250 GSM", "300 GSM", "Premium"],
      },
      {
        type: "size",
        label: "Size",
        options: ["A5", "A4", "Custom"],
      },
      { type: "upload", label: "Upload Design" },
      { type: "notes", label: "Additional Notes" },
    ],
  },

  Bookmark: {
    title: "Bookmark",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Paper",
        options: ["300 GSM", "Art Paper", "Premium"],
      },
      {
        type: "lamination",
        label: "Finish",
        options: ["Gloss", "Matte"],
      },
      { type: "upload", label: "Upload Artwork" },
    ],
  },

  Letterhead: {
    title: "Letterhead",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Paper",
        options: ["100 GSM", "120 GSM", "Premium Bond"],
      },
      {
        type: "printing",
        label: "Printing",
        options: ["Single Side", "Double Side"],
      },
      { type: "upload", label: "Upload Design" },
      { type: "notes", label: "Notes" },
    ],
  },

  Folder: {
    title: "Folder",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Material",
        options: ["300 GSM", "350 GSM", "Premium"],
      },
      {
        type: "lamination",
        label: "Finish",
        options: ["Gloss", "Matte", "Velvet"],
      },
      { type: "upload", label: "Upload Design" },
    ],
  },

  "Visiting Cards": {
    title: "Visiting Cards",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Card Stock",
        options: ["300 GSM", "350 GSM", "Luxury"],
      },
      {
        type: "lamination",
        label: "Finish",
        options: ["Gloss", "Matte", "Velvet"],
      },
      {
        type: "printing",
        label: "Printing",
        options: ["Single Side", "Double Side"],
      },
      { type: "upload", label: "Upload Design" },
      { type: "notes", label: "Special Instructions" },
    ],
  },

  "Flyers / Pamphlets": {
    title: "Flyers / Pamphlets",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Paper",
        options: ["130 GSM", "170 GSM", "250 GSM"],
      },
      {
        type: "size",
        label: "Size",
        options: ["A6", "A5", "A4", "DL", "Custom"],
      },
      {
        type: "printing",
        label: "Printing",
        options: ["Single Side", "Double Side"],
      },
      { type: "upload", label: "Upload Design" },
    ],
  },

  Posters: {
    title: "Posters",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Paper",
        options: ["170 GSM", "250 GSM", "Photo Paper"],
      },
      {
        type: "size",
        label: "Poster Size",
        options: ["A3", "A2", "A1", "Custom"],
      },
      {
        type: "lamination",
        label: "Finish",
        options: ["None", "Gloss", "Matte"],
      },
      { type: "upload", label: "Upload Poster Design" },
    ],
  },

  "Stickers / Labels": {
    title: "Stickers / Labels",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "material",
        label: "Material",
        options: ["Paper", "Vinyl", "Transparent"],
      },
      {
        type: "size",
        label: "Size",
        options: ["Small", "Medium", "Large", "Custom"],
      },
      {
        type: "lamination",
        label: "Finish",
        options: ["Gloss", "Matte"],
      },
      { type: "upload", label: "Upload Design" },
    ],
  },

  "Tickets / Coupons": {
    title: "Tickets / Coupons",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Paper",
        options: ["130 GSM", "170 GSM", "250 GSM"],
      },
      {
        type: "size",
        label: "Size",
        options: ["Small", "Medium", "Large", "Custom"],
      },
      {
        type: "printing",
        label: "Printing",
        options: ["Single Side", "Double Side"],
      },
      { type: "upload", label: "Upload Artwork" },
    ],
  },

  Tags: {
    title: "Tags",
    fields: [
      { type: "quantity", label: "Quantity" },
      {
        type: "paper",
        label: "Material",
        options: ["300 GSM", "350 GSM", "Kraft"],
      },
      {
        type: "size",
        label: "Tag Size",
        options: ["Small", "Medium", "Large", "Custom"],
      },
      { type: "upload", label: "Upload Design" },
      { type: "notes", label: "Special Instructions" },
    ],
  },
  default: {
    title: "Service",

    fields: [
      {
        type: "quantity",
        label: "Quantity",
      },

      {
        type: "upload",
        label: "Upload Design",
      },

      {
        type: "notes",
        label: "Additional Notes",
      },
    ],
  },
};
