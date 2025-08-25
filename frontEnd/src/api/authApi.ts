import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

// export const loginUser  = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   const res = await api.post("/login", credentials);
//   return res.data;
// };
