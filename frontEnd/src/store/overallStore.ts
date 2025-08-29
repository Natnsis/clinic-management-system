import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// fName: staffData.fName,
//         lName: staffData.lName,
//         email: staffData.email,
//         password: hashedPassword,
//         department: staffData.department,
//         role: staffData.role,
//         status: staffData.status,
//         availability: staffData.availability,
//         phoneNumber: parseInt(staffData.phoneNumber),
