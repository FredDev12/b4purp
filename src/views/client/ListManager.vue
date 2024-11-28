<template>
    <div class="dashboard">
      
      <!-- Barre latérale -->
      <SidebarComponent :menuItems="menuItems" />
      
  
      <!-- Contenu principal -->
      <main class="client-container">
        <h1>Liste des Managers</h1>
        <ButtonComponent @click="addUser()">Ajouter</ButtonComponent>
        <table v-if="managers.length > 0" class="client-table">
            <thead>
                <tr>
                    <th>Nom complet</th>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Genre</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="manager in managers" :key="manager.id">
                    <td>{{ manager.fullName }}</td>
                    <td>{{ manager.username }}</td>
                    <td>{{ manager.email }}</td>
                    <td>{{ manager.phoneNumber }}</td>
                    <td>{{ manager.gender }}</td>
                    <td>{{ manager.role }}</td>
                    <td>
                        <ButtonComponent @click="editClient(manager.id)">Éditer</ButtonComponent>
                        <ButtonComponent @click="deleteClient(manager.id)">Supprimer</ButtonComponent>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Aucun manager trouvé <router-link to="/addUserClient">Ajouter ici</router-link>.</p>
      </main>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ButtonComponent from '../../components/ButtonComponent.vue';
  import SidebarComponent from '../../components/SidebarComponent.vue';
  import { useRouter } from 'vue-router';
  import { listManager } from '../../api/authService';
  import router from '../../router';
  
  
  export default defineComponent({
    name: "ListManager",
    components: {
      ButtonComponent,
      SidebarComponent,
    },
    data() {
      return {
        menuItems: [
        { name: 'Tableau de Bord', link: '/dashboardClient', active: false },
          { name: 'Liste Manager', link: '/listManagerClient', active: true },
          { name: "Liste User", link: '/listUsersClient', active: false },
          { name: "Profil d'utilisateur", link: '/profileClient', active: false },
          // Autres éléments du menu
        ],
      };
    },
    setup() {
        const managers = ref<any[]>([]);
        const router = useRouter();    
  
      onMounted(async () =>  {
        try {
            
            const response = await listManager();
            console.log(response);
            if (response && Array.isArray(response)) {
                managers.value = response; // Assuming API response has a `data` field
            } else {
                console.warn("Aucune donnée reçue pour la liste des clients.");
            }
            
            //router.push('/');
        } catch (error) {
            console.error("Une erreur est survenue lors de l'inscription. Veuillez réessayer.", error);
            
        }
      });
  
      const saveProfile = () => {
        // Sauvegarder les modifications du profil
        console.log('Profil sauvegardé:', );
      };
  
      return {
        managers,
        saveProfile,
        
        
      };
    },
    methods: {
        editClient(clientId: number) {
            // Redirection ou logique pour éditer le client
            console.log("Edit client:", clientId);
        },
        deleteClient(clientId: number) {
            // Logique pour supprimer le client
            console.log("Delete client with ID:", clientId);
        },
        addUser() {
            // Logique pour ajouter le client
            router.push("/addUserClient")
           
        }
    }
  });
  </script>
  
  