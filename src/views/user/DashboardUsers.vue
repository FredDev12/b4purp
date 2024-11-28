<template>
    <div class="dashboard">
      
      <!-- Barre latérale -->
      <SidebarComponent :menuItems="menuItems" />
      
  
      <!-- Contenu principal -->
      <main class="dashboard-container">
        <div>
          <h1>Bienvenue sur le tableau de bord, {{ username }} !</h1>
          <ButtonComponent @click="logout">Se déconnecter</ButtonComponent>
        </div>
      </main>
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ButtonComponent from '../../components/ButtonComponent.vue';
  import SidebarComponent from '../../components/SidebarComponent.vue';
  import { useRouter } from 'vue-router';
  
  
  export default defineComponent({
    name: "DashboardUser",
    components: {
      ButtonComponent,
      SidebarComponent,
    },
    data() {
      return {
        menuItems: [
          { name: 'Tableau de Bord', link: '/dashboardUser', active: true },
          { name: "Profil d'utilisateur", link: '/profileUser', active: false },
          // Autres éléments du menu
        ],
      };
    },
    setup() {
      
      const router = useRouter();
      const username = localStorage.getItem("username") || 'Invité';

  
      onMounted(() => {
        
        if (username) {
          
          
        } else {
          // Si l'utilisateur n'est pas trouvé dans le store, on redirige vers la page de login
          router.push({ name: 'Login' });
        }
      
      });
  
      const saveProfile = () => {
        // Sauvegarder les modifications du profil
        console.log('Profil sauvegardé:', );
      };
  
      const logout = () => {
        localStorage.removeItem("username");
        router.push({ name: 'Login' });
      };
  
      return {
        username,
        saveProfile,
        logout,
      };
    },
  });
  </script>
  
  