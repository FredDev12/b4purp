<template>
    <div class="dashboard">
      <!-- Barre latérale -->
      <NavBar :menuItems="filteredMenuItems" />
  
      <!-- Contenu principal -->
      <main class="table-container">
        <h1>Liste des Contract</h1>
        <button class="add-button" @click="addContract()">Ajouter</button>
        <table v-if="entities.length > 0" class="client-table">
          <thead>
            <tr>
              <th>Nom complet</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entity in entities" :key="entity.id">
              <td>{{ entity.name }}</td>
              <td>{{ entity.description }}</td>
              <td>
                <button @click="editEntity(entity.id)" class="edit-button">Éditer</button>
                <button @click="deleteEntity(entity.id)"  class="delete-button">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Aucun {{ entityTitle.toLowerCase() }} trouvé <router-link to="/addContract">Ajouter ici</router-link>.</p>
      </main>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import SidebarComponent from '../components/SidebarComponent.vue';
  import NavBar from '../components/NavBar.vue';
  import { useRouter } from 'vue-router';
  import { getContract } from '../api/serviceAPI';
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
      const entities = ref([]);
      const entityTitle = ref("");
      const role = localStorage.getItem('role') || "Utilisateur";  
      const token = localStorage.getItem('token');
      

  
      // Définir les menus spécifiques à chaque rôle
      const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: 'Liste des Contract', link: '/contract', active: true, visibleTo: ['Admin', 'Client'] },
      ]);

      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      const filteredMenuItems = menuItems.value.filter(item => item.visibleTo.includes(role));

  
      const router = useRouter();
  
      onMounted(async () => {
        try {
          
          // Only call listUsers once, since it is used in every case
          if (token) {                   
          
          const response = await getContract(role, token);
          console.log(role);
          
          entities.value = response;
          
          
        } else {
          console.error("authentication token is missing");
          
        }
          
      } catch (error) {
          console.error("Une erreur est survenue lors de la récupération des données.", error);
      }
      });
  
      const editEntity = (entityId) => {
        console.log("Edit entity:", entityId);
      };
  
      const deleteEntity = (entityId) => {
        console.log("Delete entity with ID:", entityId);
      };
  
      const addContract = () => {
        router.push("/addContract");
      };
  
      return {
        entities,
        entityTitle,
        menuItems,
        editEntity,
        deleteEntity,
        addContract,
        filteredMenuItems,
        role
      };
    },
  });
  </script>
  