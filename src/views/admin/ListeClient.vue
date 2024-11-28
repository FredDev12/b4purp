<template>
    <div class="dashboard">
      
      <!-- Barre latérale -->
      <SidebarComponent :menuItems="menuItems" />
      
  
      <!-- Contenu principal -->
      <main class="client-container">
        <h1>Liste des Clients</h1>
        <ButtonComponent @click="addUser()">Ajouter</ButtonComponent>
        <table v-if="clients.length > 0" class="client-table">
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
                <tr v-for="client in clients" :key="client.id">
                    <td>{{ client.fullName }}</td>
                    <td>{{ client.username }}</td>
                    <td>{{ client.email }}</td>
                    <td>{{ client.phoneNumber }}</td>
                    <td>{{ client.gender }}</td>
                    <td>{{ client.role }}</td>
                    <td>
                        <ButtonComponent @click="editClient(client.id)">Éditer</ButtonComponent>
                        <ButtonComponent @click="deleteClient(client.id)">Supprimer</ButtonComponent>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Aucun client trouvé <router-link to="/addUser">Ajouter ici</router-link>.</p>

      </main>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ButtonComponent from '../../components/ButtonComponent.vue';
  import SidebarComponent from '../../components/SidebarComponent.vue';
  import { useRouter } from 'vue-router';
  import { listClient } from '../../api/authService';
import router from '../../router';

  
  
  export default defineComponent({
    name: "ListClient",
    components: {
      ButtonComponent,
      SidebarComponent,
    },
    data() {
      return {
        menuItems: [
        { name: 'Tableau de Bord', link: '/dashboardAdmin', active: false },
          { name: 'Liste Client', link: '/listClient', active: true },
          { name: 'Liste Manager', link: '/listManager', active: false },
          { name: "Liste User", link: '/listUsers', active: false },
          { name: "Profil d'utilisateur", link: '/profileAdmin', active: false },
          // Autres éléments du menu
        ],
      };
    },
    setup() {
        const clients = ref<any[]>([]);
        const router = useRouter();    
  
      onMounted(async () =>  {
        try {
            
            const response = await listClient();
            if (response && Array.isArray(response)) {
                clients.value = response; // Assuming API response has a `data` field
                                
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
        clients,
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
            router.push("/addUser")
           
        }
    }
  });
  </script>
  
  