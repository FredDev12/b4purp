// src/store/authStore.ts
import { defineStore } from 'pinia';
import { login, register, getUserProfile, logoutUser, listUsers, getUsers, getContract } from '../api/serviceAPI';


export const useStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('token') || null,
    userProfile: null,
    users: [],
    userList:[],
    listContract: [],
    listClients: [],
    listManagers: [],
    listUtilisateurs: [],
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async performLogin(email, password) {
      try {
        const response = await login(email, password);
        const token = response.token
        const role = response.role
        const userId = response.id
        this.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', userId);
        this.isAuthenticated = true;
        // Fetch user profile upon successful login
        await this.fetchUserProfile(token);
        await this.fetchUsers(role ,token);
        await this.fetchContract(role, token);
      } catch (error) {
        console.error('Authentication failed:', error);
        throw new Error('Login failed');
      }
    },

    async fetchUserProfile(token) {
      if (!token) {
        console.error('No token provided');
        return;
      }
      try {
        const response = await getUserProfile(token);
        this.userProfile = response;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        this.isAuthenticated = false;
      }
    },

    async fetchUsers(role, token){
      if (!token) {
        console.error('No token provided');
        return;
      }
      try {
        const response = await listUsers(role, token);
        console.log('storage', response);
        
        this.users = response;

        console.log(this.users);
        
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        this.isAuthenticated = false;
      }

    },

    async fetchUsersBY(role, token){
      if (!token) {
        console.error('No token provided');
        return;
      }
      try {
        const response = await getUsers(role, token);
        console.log('storage', response);
        
        this.userList = response;

        console.log('liste ',this.userList);
        
        //this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        this.isAuthenticated = false;
      }

    },

    async fetchContract(role, token){
      if (!token) {
        console.error('No token provided');
        return;
      }
      try {
        const response = await getContract(role, token);
        console.log('storage', response);
        
        this.listContract = response;

        console.log('liste ',this.listContract);
        
        //this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        this.isAuthenticated = false;
      }

    },
    
    async performLogout() {
      if (!this.token) {
        console.error('No token provided');
        return;
      }
      try {
        await logoutUser(this.token);
        this.isAuthenticated = false;
        this.userProfile = null;
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
      } catch (error) {
        console.error('Failed to logout:', error);
      }
    },

    async addUser(payload){

    },

    async fetchUsersByRole(role) {
      if (!this.token) {
        console.error('No token provided');
        return;
      }
      try {
        const users = await listUsers( role, this.token);
        if (role === 'client') {
          this.listClients = users;
        } else if (role === 'manager') {
          this.listManagers = users;
        } else {
          this.listUtilisateurs = users;
        }
      } catch (error) {
        console.error(`Failed to fetch ${role}s:`, error);
      }
    }
  },
});
