import axios from "axios";
import API from "./api";

const getToken = () => localStorage.getItem("token");

export const getQuoteBag = async () => {
  const { data } = await axios.get(`${API}/quotebag`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data.bag;
};

export type AddToQuoteBagPayload = {
  productId: string;
  quantity?: number;
  notes?: string;
  needDesign?: boolean;
  deliveryDate?: string | null;
  referenceImage?: string;
  customization?: Record<string, any>;
};

export const addToQuoteBag = async ({
  productId,
  quantity = 1,
  notes = "",
  needDesign = false,
  deliveryDate = null,
  referenceImage = "",
  customization = {},
}: AddToQuoteBagPayload) => {
  console.log("NEW FRONTEND SERVICE", {
    productId,
    quantity,
    notes,
    needDesign,
    deliveryDate,
    referenceImage,
    customization,
  });
  const { data } = await axios.post(
    `${API}/quotebag`,
    {
      productId,
      quantity,
      notes,
      needDesign,
      deliveryDate,
      referenceImage,
      customization,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return data;
};

export const removeFromQuoteBag = async (id: string) => {
  const { data } = await axios.delete(`${API}/quotebag/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data;
};
