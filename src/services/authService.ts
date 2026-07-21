import axios from "axios";
import API from "./api";

export const registerUser = async (userData: any) => {
  const { data } = await axios.post(`${API}/users/register`, userData);
  return data;
};

export const loginUser = async (userData: any) => {
  const { data } = await axios.post(`${API}/users/login`, userData);

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

export const googleLogin = async (token: string) => {
  const { data } = await axios.post(`${API}/users/google`, {
    token,
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

export const sendOTP = async (email: string) => {
  const { data } = await axios.post(`${API}/password/send-otp`, {
    email,
  });

  return data;
};

export const verifyOTP = async (email: string, otp: string) => {
  const { data } = await axios.post(`${API}/password/verify-otp`, {
    email,
    otp,
  });

  return data;
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string,
) => {
  const { data } = await axios.post(`${API}/password/reset-password`, {
    email,
    otp,
    password,
  });

  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
