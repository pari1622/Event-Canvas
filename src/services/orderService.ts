import axios from "axios";
import API from "./api";

const getToken = () => localStorage.getItem("token");

export const placeOrder = async () => {
  const { data } = await axios.post(
    `${API}/orders`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return data;
};

export const getOrders = async () => {
  const { data } = await axios.get(`${API}/orders`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data.orders;
};
