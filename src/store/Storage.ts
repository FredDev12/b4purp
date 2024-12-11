// src/store/authStore.ts
import { defineStore } from 'pinia';
import { login, register, getUserProfile, logoutUser, listUsers, getUsers } from '../api/serviceAPI';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;  // Assurez-vous que le mot de passe n'est pas exposé inutilement
  role: string;
  clientId: number[];
  managerId: number[];
  utilisateurId: number[];
  contracts: Contract[] | null;
  task: string;
  status: string;
  profilePictureUrl?: string;  // URL de la photo de profil
}

interface Contract {
  id: number;
  name: string;
  description: string;
  userId: number;
}


interface State {
  token: string | null;
  userProfile: User | null;
  users: User[];
  userList: User[];
  listClients: User[];
  listManagers: User[];
  listUtilisateurs: User[];
  isAuthenticated: boolean;
}

export const useStore = defineStore({
  id: 'auth',
  state: (): State => ({
    token: localStorage.getItem('token') || null,
    userProfile: null,
    users: [],
    userList:[],
    listClients: [],
    listManagers: [],
    listUtilisateurs: [],
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async performLogin(email: string, password: string) {
      try {
        const response = await login(email, password);
        const token = response.token
        const role = response.role
        this.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        this.isAuthenticated = true;
        // Fetch user profile upon successful login
        await this.fetchUserProfile(token);
        await this.fetchUsers(role ,token);
      } catch (error) {
        console.error('Authentication failed:', error);
        throw new Error('Login failed');
      }
    },

    async fetchUserProfile(token:string) {
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

    async fetchUsers(role: string, token: string){
      if (!token) {
        console.error('No token provided');
        return;
      }
      try {
        const response = await listUsers(role, token);
        console.log('storage', response);
        
        this.users = response;

        console.log(this.users);
        
        //this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        this.isAuthenticated = false;
      }

    },

    async fetchUsersBY(role: string, token: string){
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
      } catch (error) {
        console.error('Failed to logout:', error);
      }
    },

    async addUser(payload: FormData){

    },

    async fetchUsersByRole(role: string) {
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
