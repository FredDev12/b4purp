<template>
    <div v-if="isAuthenticated" class="dashboard">
      <NavBar :menuItems="filteredMenuItems" />
  
      <!-- Contenu principal -->
      <main class="dashboard-container">
        <div>
          <h1>Bienvenue sur le tableau de bord, {{ name }} ({{ role }}) !</h1>
        </div>
        <section class="user-profile">
        <h2>Profil Utilisateur</h2>
        <table>
          <tr>
            <th>Nom</th>
            <th>Rôle</th>
            <th>Contract</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>{{ store.userProfile!.name! }}</td> 
            <td>{{ store.userProfile!.role! }}</td>             
            <td>              
              <tr v-for="contract in userContract" :key="contract.id">
                <td>{{ contract.name || 'Pas de contrat' }}</td>
              </tr>              
            </td>
            <td>              
              <tr v-for="contract in store.userProfile!.contracts" :key="contract.id">
                <td>{{ contract.description || 'Pas de description' }}</td>
              </tr>              
            </td>           
          </tr>
        </table>
      </section>

      <!-- Section 2: Présentation des Clients -->
      <section class="user-profile" v-if="role !== 'Client'">
        <h2>Clients</h2>
        <table>
          <tr>
            <th>Nom</th>
            <th>Contrat</th>
            <th v-if="role !== 'Manager' && role !== 'Utilisateur' ">Actions</th>
          </tr>
          <tr v-for="client in clientList" :key="client.id">
            <td>{{ client.name }}</td>            
            <td>              
              <tr v-for="contract in client.contracts" :key="contract.id">
                <td>{{ contract.name || 'Pas de contrat' }}</td>
              </tr>              
            </td>
            <td>
              <button @click="editEntity(client.id)" class="edit-button" v-if="role !== 'Manager' && role !== 'Utilisateur' ">Éditer</button>
              <button @click="deleteEntity(client.id)" class="delete-button" v-if="role !== 'Manager' && role !== 'Utilisateur' ">Supprimer</button>
            </td>
          </tr>
        </table>
      </section>

      <!-- Section 3: Présentation des Managers -->
      <section class="user-profile" v-if="role !== 'Manager'">
        <h2>Managers</h2>
        <table>
          <tr>
            <th>Nom</th>
            <th>Contrat</th>
          </tr>
          <tr v-for="manager in managerList" :key="manager.id">
            <td>{{ manager.name }}</td>
            <td>              
              <tr v-for="contract in manager.contracts" :key="contract.id">
                <td>
                  {{ contract.name || 'Pas de contrat'}}
                  <!-- Action buttons for each contract -->
                  <button @click="editContract(contract.id)" class="edit-button">Éditer</button>
                  <button @click="deleteContract(contract.id)" class="delete-button">Supprimer</button>
                </td>
              </tr>              
            </td>            
          </tr>
        </table>
      </section>

      <!-- Section 4: Présentation des Utilisateurs -->
      <section class="user-profile" v-if="role !== 'Utilisateur'">
        <h2>Utilisateurs</h2>
        <table>
          <tr>
            <th>Nom</th>
            <th>Manager</th>
            <th>Contrat</th>
            <th>Tache</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          <tr v-for="user in utilisateurList" :key="user.id">
            <td>{{ user.name }}</td>
            <td>
              {{ store.users!.find(manager =>  user.managerId.includes(manager.id)) ? store.users!.find(manager => user.managerId.includes(manager.id))!.name : 'Manager Inconnu' }}
            </td>
            <td>
              <tr v-for="contract in user.contracts" :key="contract.id">
                <td>{{ contract.name || 'Pas de contrat' }}</td>
              </tr>
            </td>
            <td>{{ user.task || 'Pas de tache'}}</td>
            <td>{{ user.status }}</td>
            <td>
              <button @click="editEntity(user.id)" class="edit-button" >Éditer</button>
              <button @click="deleteEntity(user.id)" class="delete-button">Supprimer</button>
            </td>
          </tr>
        </table>
      </section>
      </main>
    </div>
    <div v-else class="dashboard">
      <p>Veuillez vous connecter pour accéder à cette page.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../store/Storage';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import SidebarComponent from '../components/SidebarComponent.vue';
  import NavBar from '../components/NavBar.vue';
  import { photo, listUsers } from '../api/serviceAPI';
  

  
  export default defineComponent({
    name: "Dashboard",
    components: {
      ButtonComponent,
      SidebarComponent,
      NavBar,
    },
    data() {
      return {
        filteredMenuItems: [],// Filtered based on role
        username: "Invité",
        role: "User", // Rôle par défaut
                
      };
    },
    
    setup() {
      const router = useRouter();
      const store = useStore();
  
      const entities = ref<any[]>([]);
      const entityTitle = ref("");
      
      
      // Récupérer les données utilisateur depuis localStorage
      const name = store.userProfile ? store.userProfile.name : 'Default Name';
      const role = localStorage.getItem('role') || "Utilisateur";  
      const token = localStorage.getItem('token');
      const isAuthenticated = store.isAuthenticated;
      
      
      let clientList;
      let managerList;
      let utilisateurList;

      


      const userContract = store.userProfile!.contracts!.map(contract => ({
                id: contract.id,
                name: contract.name,
                description: contract.description,
                userId: contract.userId,
            }) || []);

        const userDetailsArray = store.users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          clientId: user.clientId,
          managerId: user.managerId,
          utilisateurId : user.utilisateurId,
          status: user.status,            
          task: user.task,
          contracts: user.contracts!.map(contract => ({
              id: contract.id,
              name: contract.name,
              description: contract.description,
              userId: contract.userId,
          })) || [],
        }));

      // Check and filter the users list safely
      if (store.users!) {

          clientList = store.users!.filter(user => user.role === 'Client');
          managerList = store.users!.filter(user => user.role === 'Manager');
          utilisateurList = store.users!.filter(user => user.role === 'Utilisateur');

      } else {
          console.error('store.users is undefined');
          // Optionally initialize or fetch users
      }

      console.log('\n\n\n\n', userContract, '\n\n\n');
      console.log('\n\n\n\n client', clientList, '\n\n\n');
      console.log('\n\n\n\n', store.users!, '\n\n\n');
      //console.log('\n\n\n\n', userContract, '\n\n\n');
      
  
      // Définir les menus spécifiques à chaque rôle
      const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: "Mon Profil", link: '/profile', active: true, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
      ]);

      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      const filteredMenuItems = menuItems.value.filter(item => item.visibleTo.includes(role));
  
      onMounted(async() => {
        if (token) {
          console.log(name,'-' ,role);

          const response = await listUsers(role, token);
          entities.value = response;
          console.log('storage', response);
          
        } else {
          console.error("authentication token is missing");
          
        }

        /*try {
          let response;
          const entityType = role.value;
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
            
            // Les admins voient tous les utilisateurs, les autres rôles ne voient que ceux ayant le même managerID
           response 
            //response = await listUsers({ role: entityTitle.value, id: userId.value });

            
            console.log(response);
            
            
           
            // Initialisation des listes pour stocker les utilisateurs par rôle
            managerList.value = [];
            clientList.value = [];
            userList.value = [];
            //allUsers.value = response;

            console.log("allUsers", allUsers.value);
             
            
            const actifId = Number(userId.value);

            // Répartition des utilisateurs dans les listes correspondantes
            for (const user of response) {
                            
              if (user.role === entityTitle.value && user.id === Number(userId.value)) {
                  userActif.value.push(user);
                  console.log("actif ",userActif.value);

                  // Additional loop to find and add the manager and client linked to the active user
                  
                  
                  continue;  // Skip the switch statement if this condition is met
              }
                switch (user.role) {
                  case "Client":
                      clientList.value.push(user);
                      break;
                  case "Manager": 
                  if(user.utilisateurId.includes(String(userId.value))){
                    managerList.value.push(user);
                    break;   
                  }               
                  case "Utilisateur":
                  console.log("managers ",Number(user.managerId));
                  
                    if(Number(user.managerId )=== Number(userId.value) || Number(user.clientId) === Number(userId.value)){
                      userList.value.push(user);
                    }  
                                      
                    break;
                }
            }

           
        } catch (error) {
            console.error("Une erreur est survenue lors de la récupération des données.", error);
        }*/
      });

      const editEntity = (entityId: number) => {
        console.log("Edit entity:", entityId);
      };
  
      const deleteEntity = (entityId: number) => {
        console.log("Delete entity with ID:", entityId);
      };

      const editContract = (ContratId: number): void => {
        console.log('Editing client:', ContratId);
        // Implementation
      };
      const deleteContract = (ContratId: number): void => {
        console.log('Editing client:', ContratId);
        // Implementation
      };
  
      const logout = async () => {
        //await store.performLogout(store.token);
        router.push({ name: 'Login' });

      };
      
  
      return {
        name, role, menuItems, filteredMenuItems,utilisateurList,userContract,
        entities, entityTitle, editEntity,
        deleteEntity, editContract,deleteContract, isAuthenticated,
        logout, clientList, managerList,store
      };
    },
  });
  </script>
  
  