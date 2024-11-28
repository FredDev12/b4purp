<template>
    <div class="dashboard">
      
      <!-- Barre latérale -->
      <SidebarComponent :menuItems="menuItems" />
      
  
      <!-- Contenu principal -->
      <main class="client-container">
        
      </main>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ButtonComponent from '../../components/ButtonComponent.vue';
  import SidebarComponent from '../../components/SidebarComponent.vue';
  import { useRouter } from 'vue-router';
  import { listUsers } from '../../api/authService';
  
  
  export default defineComponent({
    name: "ProfileClient",
    components: {
      ButtonComponent,
      SidebarComponent,
    },
    data() {
      return {
        menuItems: [
        { name: 'Tableau de Bord', link: '/dashboardClient', active: false },
          { name: 'Liste Manager', link: '/listManagerClient', active: false },
          { name: "Liste User", link: '/listUsersClient', active: false },
          { name: "Profil d'utilisateur", link: '/profileClient', active: true },
          // Autres éléments du menu
        ],
      };
    },
    setup() {
        const users = ref<any[]>([]);
        const router = useRouter();    
  
      onMounted(async () =>  {
        try {
            
            const response = await listUsers();
            console.log(response);
            if (response && Array.isArray(response.data)) {
                users.value = response.data; // Assuming API response has a `data` field
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
        users,
        saveProfile,
        
        
      };
    },
  });
  </script>
  
  