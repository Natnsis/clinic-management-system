import { create } from "zustand";
import axios from "axios";

// Generic store type
type EntityStore<T> = {
  items: T[];
  isLoading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<T, "id">) => Promise<void>;
  updateItem: (id: string, item: Partial<T>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  fetchItemsById: (id: string) => Promise<void>;
};

// API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Factory to create a store for any entity
function createEntityStore<T>(endpoint: string) {
  return create<EntityStore<T>>((set, get) => ({
    items: [],
    isLoading: false,
    error: null,

    fetchItems: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await api.get(`/${endpoint}`);
        set({ items: res.data, isLoading: false });
      } catch (err: any) {
        set({
          error: err.message || `Failed to fetch ${endpoint}`,
          isLoading: false,
        });
      }
    },

    fetchItemsById: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const res = await api.get(`/${endpoint}/${id}`);
        set({ items: [res.data], isLoading: false });
      } catch (err: any) {
        set({
          error: err.message || `Failed to fetch ${endpoint}`,
          isLoading: false,
        });
      }
    },

    addItem: async (item: Omit<T, "id">) => {
      set({ isLoading: true, error: null });
      try {
        const res = await api.post(`/${endpoint}`, item);
        set({ items: [...get().items, res.data], isLoading: false });
      } catch (err: any) {
        set({
          error: err.message || `Failed to add ${endpoint}`,
          isLoading: false,
        });
      }
    },

    updateItem: async (id: string, item: Partial<T>) => {
      set({ isLoading: true, error: null });
      try {
        const res = await api.put(`/${endpoint}/${id}`, item);
        set({
          items: get().items.map((i: any) => (i.id === id ? res.data : i)),
          isLoading: false,
        });
      } catch (err: any) {
        set({
          error: err.message || `Failed to update ${endpoint}`,
          isLoading: false,
        });
      }
    },

    deleteItem: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        await api.delete(`/${endpoint}/${id}`);
        set({
          items: get().items.filter((i: any) => i.id !== id),
          isLoading: false,
        });
      } catch (err: any) {
        set({
          error: err.message || `Failed to delete ${endpoint}`,
          isLoading: false,
        });
      }
    },
  }));
}

//entities
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

export type Patient = {
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

export type Prescription = {
  id: string;
  patientId: string;
  staffId: string;
  medication: string;
  detail: string;
  duration: string;
  refills: string;
  frequency: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  staffId: string;
  reason: string;
  status: string;
  note: string;
  location: string;
};

export type Feedback = {
  id: string;
  patientId: string;
  staffId: string;
  status: string;
  content: string;
  rate: number;
};

// Stores
export const useStaffStore = createEntityStore<Staff>("staff");
export const usePatientStore = createEntityStore<Patient>("patients");
export const useAppointmentStore =
  createEntityStore<Appointment>("appointments");
export const useFeedbackStore = createEntityStore<Feedback>("feedbacks");
export const usePrescriptionStore =
  createEntityStore<Prescription>("prescriptions");
