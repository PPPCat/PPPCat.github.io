// stores/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    userInfo: null,
    token: null,
  }),
  actions: {
    login(userInfo, token) {
      this.isLoggedIn = true;
      this.userInfo = userInfo;
      this.token = token;
    },
    logout() {
      this.isLoggedIn = false;
      this.userInfo = null;
      this.token = null;
    },
  },
});
