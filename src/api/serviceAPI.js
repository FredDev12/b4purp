// src/api/authService.ts
import axios from 'axios';

// Base URL pour les endpoints
const API_URL = 'https://api.wadoria.com/auth';
const API_URL_PROTECTED = 'https://api.wadoria.com/api';

//const API_URL = 'http://localhost:3010/auth';
//const API_URL_PROTECTED = 'http://localhost:3010/api';


// Créer une instance Axios pour configurer les en-têtes communs
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json', },
    timeout: 10000
});

export const apiClientProtected = axios.create({
    baseURL: API_URL_PROTECTED,
    headers: { 'Content-Type': 'multipart/form-data', },
    timeout: 10000
});

export const apiClientProtected2 = axios.create({
    baseURL: API_URL_PROTECTED,
    headers: { 'Content-Type': 'application/json', },
    timeout: 10000
});


// Ajouter un intercepteur pour inclure automatiquement le token JWT
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClientProtected.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Fonction pour gérer les erreurs (sans opérateur optionnel)
const handleError = (error) => {
    const errorMessage = error.response && error.response.data ? error.response.data : error.message;
    console.error('Erreur API :', errorMessage);
    throw errorMessage;
};

// Service d'inscription
export const register = async (Data) => {
    try {
        console.log(Data); // Affiche le fichier dans les logs
        
        const response = await apiClientProtected.post('/register', Data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const registerContract = async (Data) => {
    try {
        console.log(Data); // Affiche le fichier dans les logs
        
        const response = await apiClientProtected.post('/registerContract', Data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Service de connexion
export const login = async (email, password ) =>  {
    try {
        const response = await apiClient.post('/login', {email, password});
        console.log("login response :",response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Déconnexion
export const logoutUser = async (token) => {
    try {
        const response = await apiClient.post('/logout', {}, {
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getUserProfile = async (token ) => {
    try {
        
        const response = await apiClientProtected.get('/user/profile', {
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        console.log('api reponse profile : ',response.data);
        
        return response.data;
    } catch (error) {
        handleError(error); // Fonction pour gérer les erreurs
        throw error; // Rethrow l'erreur si nécessaire
    }
};

// Méthode : demander un lien de réinitialisation de mot de passe
export const requestPasswordReset = async (email) => {
    try {
        const response = await apiClient.post("/request-password-reset", { email });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response && error.response.data
                ? error.response.data.message
                : "Erreur lors de la demande de réinitialisation.";
            throw new Error(errorMessage);
        }
        throw new Error("Une erreur inconnue s'est produite.");
    }
};

// Méthode : réinitialiser le mot de passe avec un token
export const resetPassword = async (token , newPassword )  => {
    try {
        const response = await apiClient.post("/reset-password", {
            token,
            newPassword,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response && error.response.data
                ? error.response.data.message
                : "Erreur lors de la réinitialisation du mot de passe.";
            throw new Error(errorMessage);
        }
        throw new Error("Une erreur inconnue s'est produite.");
    }
    
};

export const photo = async(formData) => {
    try {
        const response = await apiClientProtected.post("/upload", formData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response && error.response.data
                ? error.response.data.message
                : "Erreur lors de la réinitialisation du mot de passe.";
            throw new Error(errorMessage);
        }
        throw new Error("Une erreur inconnue s'est produite.");
    }
    
};

//-----------------------------------------------------------

// Liste des utilisateurs (protégée)

export const listUsers = async (role , token  ) => {
    try {
        const response = await apiClientProtected.get("/users",{
            params:{
                role: role
            },
            headers:{
                Authorization : `Bearer ${token}`
            }
        });        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getUsers = async (role , token  ) => {
    try {
        const response = await apiClientProtected.get("/listusers",{
            params:{
                role: role
            },
            headers:{
                Authorization : `Bearer ${token}`
            }
        });        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getContract = async (role , token) => {
    try {
        const response = await apiClientProtected.get("/listContract",{
            params:{
                role: role
            },
            headers:{
                Authorization : `Bearer ${token}`
            }
        });        
        return response.data;
    } catch (error) {
        handleError(error); // Fonction pour gérer les erreurs
        throw error; // Rethrow l'erreur si nécessaire
    }
};

//-----------------------------------------------------------



export const updateUserProfile = async (data, token ) => {
    try {
        
        const response = await apiClient.put(`${API_URL_PROTECTED}/user/profile`,data, {
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        console.log('api reponse profile update : ',response);
        
        return response.data;
    } catch (error) {
        handleError(error); // Fonction pour gérer les erreurs
        throw error; // Rethrow l'erreur si nécessaire
    }
};



//-----------------------------------------------------------
// cree des utilisateurs (protégée)
export const creatUsers = async (Data) => {
    try {
        const response = await apiClient.post(`${API_URL_PROTECTED}/user`, Data);        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

//-----------------------------------------------------------
// update des utilisateurs (protégée)
export const updateClient = async (id) => {
    try {
        const response = await apiClient.put(`${API_URL_PROTECTED}/client/${id}`);        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUsers = async (id, data) => {
    try {
        if (!id || isNaN(Number(id))) {
            console.error("ID Contract invalide :", id);
            throw new Error("ID Contract invalide. Veuillez fournir un entier valide.");
        }
        
        const response = await apiClientProtected2.put("/users",data,{
            params:{
                id: Number(id)
            }
        });       
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
export const updateContract = async (id, data) => {
    try {
        if (!id || isNaN(Number(id))) {
            console.error("ID Contract invalide :", id);
            throw new Error("ID Contract invalide. Veuillez fournir un entier valide.");
        }
        console.log(data);
        
        
        const response = await apiClientProtected2.put("/contract",data,{
            params:{
                id: Number(id)
            }
        });      
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du contrat :", error);
        handleError(error);
    }
};

//-----------------------------------------------------------
// supprimer des utilisateurs (protégée)
export const deleteUser = async (id) => {
    try {
        if (!id || isNaN(Number(id))) {
            console.error("ID Contract invalide :", id);
            throw new Error("ID Contract invalide. Veuillez fournir un entier valide.");
        }
        const response = await apiClientProtected.delete("/users",{
            params:{
                id: Number(id)
            }
        });        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
export const deleteContractId = async (id) => {
    try {
        if (!id || isNaN(Number(id))) {
            console.error("ID Contract invalide :", id);
            throw new Error("ID Contract invalide. Veuillez fournir un entier valide.");
        }
        
        const response = await apiClientProtected.delete("/contract",{
            params:{
                id: Number(id)
            }
        });        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

//-----------------------------------------------------------

// Mettre à jour le profil
export const updateProfile = async (data, id ) => {
    try {
        const response = await apiClient.put(`${API_URL_PROTECTED}/users/${id}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};




