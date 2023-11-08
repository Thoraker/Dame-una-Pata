import { create } from "zustand";

const useUser = create((set) => ({
  user: {
    user: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  },
  setUser: () => set((state) => ({ user: state.user })),
}));
export default useUser;
