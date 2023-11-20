import { create } from "zustand";

export const useStoreUser = create((set) => ({
  user: {
    userName: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  },
  login: async (user, pass) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_name: user,
      password: pass,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        set({
          user: {
            userName: result.user_name,
            email: result.email,
            first_name: result.first_name,
            last_name: result.last_name,
            avatar: result.avatar,
          },
        });
      })
      .catch((error) => console.log("error", error));
  },
}));
