import { create } from "zustand";
import axios from "axios";
import { set } from "zod";

//staff types
export type Staff = {
  id: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
  department: string;
  role: string;
  availability: string;
  phoneNumber: string;
};

type StaffStore = {
  staffList: Staff[];
  isLoading: boolean;
  error: string | null;

  fetchStaff: () => Promise<void>;
  addStaff: (staff: Omit<Staff, "id">) => Promise<void>;
  updateStaff: (id: string, staff: Partial<Staff>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
};


//api definition
const api = axios.create({
  baseURL: import.meta.env.API_URL,
});

export const useStaffStore = create<StaffStore>((set, get) => ({
  staffList: [],
  isLoading: false,
  error: null,

  fetchStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/staff");
      set({ staffList: res.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch staff", isLoading: false });
    }
  },

  addStaff: async (staff) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/staff", staff);
      set({ staffList: [...get().staffList, res.data], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to add staff", isLoading: false });
    }
  },

  updateStaff: async (id, staff) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/staff/${id}`, staff);
      set({
        staffList: get().staffList.map((s) => (s.id === id ? res.data : s)),
        isLoading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to update staff", isLoading: false });
    }
  },

  deleteStaff: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/staff/${id}`);
      set({
        staffList: get().staffList.filter((s) => s.id !== id),
        isLoading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to delete staff", isLoading: false });
    }
  },
}));

export const usePatientStore = create((set.get)=>({

}))
