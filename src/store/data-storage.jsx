import { create } from "zustand";

export const useStore = create((set) => ({
  token: undefined,
  user: undefined,
  pets: [],

  createUser: async (values) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: values.user,
      email: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      avatar: values.avatar,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "manual",
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/register",
        requestOptions
      );
      await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  login: async (values) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: values.user,
      password: values.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "manual",
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/login",
        requestOptions
      );
      const result = await response.json();
      set({ token: result.token, user: result.user });
    } catch (error) {
      console.error(error);
    }
  },
  // logout: () => {
  //   set({ token: null, user: null });
  // },
}));
