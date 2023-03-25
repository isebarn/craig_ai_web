import { defineStore, skipHydrate } from "pinia";
import { api } from "boot/axios";
import { useLocalStorage } from "@vueuse/core";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    token: useLocalStorage("auth", "token"),
    loading: false,
    failedLogin: false,
    failedSignup: false,
  }),

  hydrate(state) {
    state.token = useLocalStorage("auth", "token");
  },

  getters: {},

  actions: {
    async login(email, password) {
      this.loading = true;
      api
        .post("/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.message == "failed") {
            this.failedLogin = true;
          } else {
            this.failedLogin = false;
            api.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.token;
            localStorage.setItem("auth", response.data.token);
            this.router.push("/prompts");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    signup(email, password) {
      this.loading = true;
      api
        .post("/sign_up", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.message == "failed") {
            this.failedSignup = true;
          } else {
            this.failedSignup = false;
            this.router.push("/login");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    logout() {
      localStorage.removeItem("auth");
      api.defaults.headers.common["Authorization"] = "";
      this.router.push("/login");
    },
  },
});
