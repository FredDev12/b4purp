// types.ts

// Interface pour les informations de l'utilisateur
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// État du module d'authentification
export interface AuthState {
  token: string | null;
  userInfo: User | null;
  isLoggedIn: boolean;
}
