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

//patientTypes
type patient = {
  id: string;
  fName: string;
  lName: string;
  studentId: string;
  password: string;
  email: string;
  lastVisit: string;
  createdAt: string;
  updatedAt: string;
};

type PatientStore = {
  patients: patient[];
  isLoading: boolean;
  error: null;
  fetchPatients: () => Promise<void>;
  updatePatients: (id: string, patient: Partial<patient>) => Promise<void>;
  deletePatients: (id: string) => Promise<void>;
};

//appointment types
type appointment = {
  patientId: string;
  staffId: string;
  reason: string;
  status: string;
  note: string;
  location: string;
};

type AppointmentStore = {
  appointments: appointment[];
  isLoading: boolean;
  error: null;
  addAppointment: (appointment: appointment) => Promise<void>;
  fetchAppointment: () => Promise<void>;
  updateAppointment: (id: string, appointment: appointment) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
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

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: [],
  isLoading: false,
  error: null,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/patients");
      set({ patients: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch patients",
        isLoading: false,
      });
    }
  },

  updatePatients: async (id, patient) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/patients/${id}`, patient);
      set({
        patients: get().patients.map((p) => (p.id === id ? res.data : p)),
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to update patient",
        isLoading: false,
      });
    }
  },

  deletePatients: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/patients/${id}`);
      set({
        patients: get().patients.filter((p) => p.id !== id),
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to delete patient",
        isLoading: false,
      });
    }
  },
}));

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  isLoading: false,
  error: null,

  fetchAppointment: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/appointments");
      set({ appointments: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch appointments",
        isLoading: false,
      });
    }
  },

  addAppointment: async (appointment: appointment) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/appointments", appointment);
      set({
        appointments: [...get().appointments, res.data],
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to add appointment",
        isLoading: false,
      });
    }
  },

  updateAppointment: async (id: string, data: appointment) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/appointments/${id}`, data);
      set({
        appointments: get().appointments.map((a) =>
          a.id === id ? res.data : a
        ),
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to update appointment",
        isLoading: false,
      });
    }
  },

  deleteAppointment: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/appointments/${id}`);
      set({
        appointments: get().appointments.filter((a) => a.id !== id),
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to delete appointment",
        isLoading: false,
      });
    }
  },
}));
