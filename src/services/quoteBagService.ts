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

export const addToQuoteBag = async (
  productId: string,
  quantity = 1,
  notes = "",
) => {
  const { data } = await axios.post(
    `${API}/quotebag`,
    {
      productId,
      quantity,
      notes,
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
