import { create } from "zustand";

export const useStoreUser = create((set) => ({
  token: null,
  user: null,

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
      redirect: "follow",
    };
    const response = await fetch(
      "http://localhost:5000/register",
      requestOptions
    );
    const data = await response.json();
    if (data.token) {
      set({ token: data.token });
    }
  },
  login: async (values) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      name: values.name,
      password: values.password,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch("http://localhost:5000/login", requestOptions);
    const data = await response.json();
    if (data.token) {
      set({ token: data.token, user: data.user });
    }
  },
}));
