<template>
    <div class="dashboard">
      <!-- Barre latérale -->
      <NavBar :menuItems="filteredMenuItems" />
  
      <!-- Contenu principal -->
      <main class="client-container">
        <h1>Liste des Utilisateurs</h1>
        <ButtonComponent @click="addUser()">Ajouter</ButtonComponent>
        <table v-if="entities.length > 0" class="client-table">
          <thead>
            <tr>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Tache</th>
              <th>Status</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entity in entities" :key="entity.id">
              <td>{{ entity.name }}</td>
              <td>{{ entity.email }}</td>
              <td>{{ entity.task }}</td>
              <td>{{ entity.status }}</td>
              <td>{{ entity.role }}</td>
              <td>
                <button @click="editEntity(entity.id)" class="edit-button">Éditer</button>
                <button @click="deleteEntity(entity.id)"  class="delete-button">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Aucun {{ entityTitle.toLowerCase() }} trouvé <router-link to="/addUser">Ajouter ici</router-link>.</p>
      </main>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import SidebarComponent from '../components/SidebarComponent.vue';
  import NavBar from '../components/NavBar.vue';
  import { useRouter } from 'vue-router';
  import { getUsers } from '../api/serviceAPI';
  import { useStore } from '../store/Storage';
  
  export default defineComponent({
    name: "List",
    components: {
      ButtonComponent,
      SidebarComponent,
      NavBar
    },    
    setup() {
      
      const store = useStore();
      const entities = ref<any[]>([]);
      const entityTitle = ref("");
      const role = localStorage.getItem('role') || "Utilisateur";  
      const token = localStorage.getItem('token');
      

  
      // Définir les menus spécifiques à chaque rôle
      const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: "Mon Profil", link: '/profile', active: true, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
      ]);

      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      const filteredMenuItems = menuItems.value.filter(item => item.visibleTo.includes(role));

  
      const router = useRouter();
  
      onMounted(async () => {
        try {
          let response;
          const entityType = role;
          switch (entityType) {
              case "Admin":
              entityTitle.value = "Admin";
              break;
              case "Client":
              entityTitle.value = "Client";
              break;
              case "Manager":
              entityTitle.value = "Manager";
              break;
              case "Utilisateur":
              entityTitle.value = "Utilisateur";
              break;
              default:
              console.warn(`Type d'entité inconnu: ${entityType}`);
              return;
          }
          console.log(entityTitle.value);

          // Only call listUsers once, since it is used in every case
          if (token) {                   
          
          const response = await getUsers(role, token);
          console.log(role);
          
          entities.value = response;
          
          
        } else {
          console.error("authentication token is missing");
          
        }
          
      } catch (error) {
          console.error("Une erreur est survenue lors de la récupération des données.", error);
      }
      });
  
      const editEntity = (entityId: number) => {
        console.log("Edit entity:", entityId);
      };
  
      const deleteEntity = (entityId: number) => {
        console.log("Delete entity with ID:", entityId);
      };
  
      const addUser = () => {
        router.push("/addUser");
      };
  
      return {
        entities,
        entityTitle,
        menuItems,
        editEntity,
        deleteEntity,
        addUser,
        filteredMenuItems,
        role
      };
    },
  });
  </script>
  