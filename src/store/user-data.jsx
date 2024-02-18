import { create } from "zustand";

export const useStoreUser = create((set) => ({
  user: {
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
  },
  setUser: (user) => set({ user }),
}));
