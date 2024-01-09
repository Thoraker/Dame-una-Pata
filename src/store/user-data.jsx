import { create } from "zustand";

export const useStoreUser = create((set) => {
  return {
    user: {
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      avatar: "",
    },
    login: async ({ loginData }) => {
      const data = await fetch(loginData);
      set((store)=> store.user = data)
      return data;
    },
  };
});
