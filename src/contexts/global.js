import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    user: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  },
  setUser: (user) => set({ user }),
}));
export default useStore;
