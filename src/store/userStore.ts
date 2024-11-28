// src/store/userStore.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,  // Add username to state
  }),
  actions: {
    setUserData(token: string, username: string) {
      this.token = token;
      this.username = username;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    clearToken() {
      this.token = null;
      this.username = null;

      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});
