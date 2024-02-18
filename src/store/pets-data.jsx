import { create } from "zustand";

export const usePetsData = create((set) => ({
  pet: {
    name: "",
    specie: "",
    age: "",
    size: "",
    description: "",
    for_adoption: false,
  },
  setPet: (pet) => set({ pet }),
  pets: [],
  setPets: (pets) => set({ pets }),
}));
