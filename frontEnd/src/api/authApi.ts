import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const loginUser  = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/login", credentials);
  return res.data;
};

export const refreshToken = async () => {
  const res = await api.post("/refresh");
  return res.data;
};

export const fetchUser = async (token: string) => {
  const res = await api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/logout");
  return res.data;
};
