import axios from "axios";

export const enableMFA = async (userId) => {
  const res = await axios.post("/api/auth/enable-mfa", { userId });
  return res.data; // Returns QR code
};

export const verifyMFA = async (userId, token) => {
  const res = await axios.post("/api/auth/verify-mfa", { userId, token });
  return res.data;
};
