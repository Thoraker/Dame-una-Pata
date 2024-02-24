import { create } from "zustand";

export const useStoreUser = create((set) => ({
  token: null,
  user: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setUserAndToken: (user, token) => set({ user, token }),
  clearUser: () => set({ user: null, token: null }),
}));
