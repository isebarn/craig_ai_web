import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    _user: 0,
    subscriptionFailed: false,
    loadingUser: false,
    loadingBasic: false,
    loadingPro: false,
  }),

  getters: {
    user(state) {
      return state._user;
    },
  },

  actions: {
    fetchUser() {
      this.loadingUser = true;
      api
        .get("/user")
        .then((response) => {
          this._user = response.data;
        })
        .finally(() => {
          this.loadingUser = false;
        });
    },

    handleSubscription(subscriptionResponse) {
      if (subscriptionResponse.message === "failed") {
        this.subscriptionFailed = true;
      } else {
        this.subscriptionFailed = false;

        // try 10 times to fetch the user with this.fetchUser(); waiting 1 second between each try
        // and if the user has user.last_payment_success === true then stop trying
        let tries = 0;
        const interval = setInterval(() => {
          this.fetchUser();
          tries++;
          if (this._user.last_payment_success || tries > 10) {
            clearInterval(interval);
          }
        });
        this.subscriptionFailed = !this._user.last_payment_success;
      }
    },

    // cancelSubscription calls cancel_subscription endpoint and updates the user store with the response
    cancelSubscription() {
      api.post("/cancel_subscription").then((response) => {
        this.fetchUser();
      });
    },

    // subscribeBasic calls the subscribe/basic endpoint with card and billing_details
    // and updates the user store with the response by calling fetchUser
    subscribeBasic(card, billing_details) {
      this.loadingBasic = true;

      api
        .post("/subscribe/basic", {
          card,
          billing_details,
        })
        .then((response) => {
          this.handleSubscription(response.data);
        })
        .finally(() => {
          this.loadingBasic = false;
        });
    },

    // subscibePro calls the subscribe/pro endpoint with card and billing_details
    // and updates the user store with the response by calling fetchUser
    subscribePro(card, billing_details) {
      this.loadingPro = true;
      api
        .post("/subscribe/pro", {
          card,
          billing_details,
        })
        .then((response) => {
          this.handleSubscription(response.data);
        })
        .finally(() => {
          this.loadingPro = false;
        });
    },
  },
});
