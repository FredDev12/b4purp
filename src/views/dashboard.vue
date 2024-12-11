<template>
    <div  class="dashboard">
      <NavBar :menuItems="filteredMenuItems" />
  
      <!-- Contenu principal -->
      <main class="dashboard-container">
        
        <section class="user-profile">
        <h2>Profil Utilisateur</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Rôle</th>
              <th>Contract</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ store.userProfile.name }}</td> 
              <td>{{ store.userProfile.role }}</td>             
              <td>              
                <tr v-for="contract in userContract" :key="contract.id">
                  <td>{{ contract.name || 'Pas de contrat' }}</td>
                </tr>              
              </td>
              <td>              
                <tr v-for="contract in userContract" :key="contract.id">
                  <td>{{ contract.description || 'Pas de description' }}</td>
                </tr>              
              </td>           
            </tr>
          </tbody>
        </table>
        </section>

        <!-- Section 2: Présentation des Contract -->
        <section class="user-profile" v-if="role !== 'Manager' && role !== 'Utilisateur'">
          <h2>Contract</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contract in contractList" :key="contract.id">
                <td>{{ contract.name }}</td>            
                <td>{{ contract.description }}</td> 
                <td>
                  <button @click="editContract(contract.id)" class="edit-button" >Éditer</button>
                  <button @click="deleteContract(contract.id)" class="delete-button" >Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Section 2: Présentation des Clients -->
        <section class="user-profile" v-if="role !== 'Client'">
          <h2>Clients</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Contrat</th>
                <th v-if="role !== 'Manager' && role !== 'Utilisateur' ">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clientList" :key="client.id">
                <td>{{ client.name }}</td>            
                <td>              
                  <tr v-for="contract in contractForManager" :key="contract.id">
                    <td>{{ contract.name || 'Pas de contrat' }}</td>
                    
                  </tr>              
                </td>
                <td>
                  <button @click="editEntity(client.id)" class="edit-button" v-if="role !== 'Manager' && role !== 'Utilisateur' ">Éditer</button>
                  <button @click="deleteEntity(client.id)" class="delete-button" v-if="role !== 'Manager' && role !== 'Utilisateur' ">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Section 3: Présentation des Managers -->
        <section class="user-profile" v-if="role !== 'Manager'">
          <h2>Managers</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Contrat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="manager in managerList" :key="manager.id">
                <td>{{ manager.name }}</td>
                <td>              
                  <tr v-for="contract in manager.contracts" :key="contract.id">
                    <td>
                      {{ contract.name || 'Pas de contrat'}}
                      <!-- Action buttons for each contract -->
                      <button @click="editEntity(contract.id)"  v-if="role !== 'Utilisateur'" class="edit-button">Éditer</button>
                      <button @click="deleteEntity(contract.id)" v-if="role !== 'Utilisateur'" class="delete-button">Supprimer</button>
                    </td>
                  </tr>              
                </td>            
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Section 4: Présentation des Utilisateurs -->
        <section class="user-profile" v-if="role !== 'Utilisateur'">
          <h2>Utilisateurs</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Manager</th>
                <th>Contrat</th>
                <th>Tache</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="role !== 'Manager'">
              <tr v-for="user in utilisateurList" :key="user.id">
                <td>{{ user.name }}</td>
                <td>
                {{ store.users.find(manager => manager.id === Number(user.managerId)) ? store.users.find(manager => manager.id === Number(user.managerId)).name : 'Manager Inconnu' }}
                  
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
            </tbody>
            <tbody v-else>
              <tr v-for="user in utilisateurForManager" :key="user.id">
                <td>{{ user.name }}</td>
                <td>
                  {{ nameManager}}
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
            </tbody>
          </table>
        </section>

        <!-- Modal d'édition -->
        <div v-if="isEditModalVisible" class="modal-overlay">
            <form @submit.prevent="confirmEdit" class="modal-content" >
              <h3>Modifier {{ currentEntity?.name }}</h3>
              <div>
                <label for="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  v-model="editForm.name"
                  required
                />
              </div>
              <div>
                <label for="description">Description</label>
                <textarea
                  id="description"
                  v-model="editForm.description"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" :disabled="isDeleting">
                {{ isDeleting ? "Enregistrement en cours..." : "Enregistrer" }}
              </button>
              <button type="button" @click="closeModal">Annuler</button>
              <p v-if="deleteError" class="error-message">{{ deleteError }}</p>
            </form>
          
        </div>

        <!-- Modal d'édition pour les utilisateurs -->
        <div v-if="isEditUserModalVisible" class="modal-overlay">
          <form @submit.prevent="confirmUserEdit" class="modal-content">
            <h3>Modifier {{ currentUser?.name }}</h3>
            <div>
              <label for="name">Nom</label>
              <input
                type="text"
                id="name"
                v-model="userEditForm.name"
                required
              />
            </div>
            <div>
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="userEditForm.email"
                required
              />
            </div>
            <div>
              <label for="role">Rôle</label>
              <select id="role" v-model="userEditForm.role">
                <option value="Client">Client</option>
                <option value="Manager">Manager</option>
                <option value="Utilisateur">Utilisateur</option>
              </select>
            </div>
            <div>
              <label for="status">tache</label>
              <input
                type="text"
                id="task"
                v-model="userEditForm.task"
              />
            </div>
            <div>
              <label for="status">Statut</label>
              <input
                type="text"
                id="status"
                v-model="userEditForm.status"
              />
            </div>
            <button type="submit">Enregistrer</button>
            <button type="button" @click="closeModal">Annuler</button>
          </form>          
        </div>

        <!-- Modal de suppression -->
        <div v-if="isDeleteModalVisible" class="modal-overlay" role="dialog" aria-labelledby="modal-title">
          <div class="modal-content">
            <h3 id="modal-title">Supprimer {{ currentEntity?.name }}</h3>
            <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
            <div class="modal-buttons">
              <button @click="confirmDelete" :disabled="isDeleting">Confirmer</button>
              <button @click="closeModal" :disabled="isDeleting">Annuler</button>
            </div>
            <p v-if="deleteError" class="error-message">{{ deleteError }}</p>
          
          </div>
        </div>

        <!-- Modal de suppression -->
        <div v-if="isDeleteUserModalVisible" class="modal-overlay" role="dialog" aria-labelledby="modal-title">
          <div class="modal-content">
            <h3 id="modal-title">Supprimer {{ currentEntity?.name }}</h3>
            <p>Êtes-vous sûr de vouloir supprimer cet Utilisateur ?</p>
            <div class="modal-buttons">
              <button @click="confirmDeleteUser" :disabled="isDeleting">Confirmer</button>
              <button @click="closeModal" :disabled="isDeleting">Annuler</button>
            </div>
            <p v-if="deleteError" class="error-message">{{ deleteError }}</p>
          
          </div>
        </div>
      </main>
    </div>
    
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../store/Storage';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import SidebarComponent from '../components/SidebarComponent.vue';
  import NavBar from '../components/NavBar.vue';
  import { deleteUser, deleteContractId, getContract, listUsers, updateContract, updateUsers } from '../api/serviceAPI';
  

  
  export default defineComponent({
    name: "Dashboard",
    mounted() {
      document.title = 'Dashboard';
    },
    components: {
      ButtonComponent,
      SidebarComponent,
      NavBar,
    },
    mutations: {
      removeContract(state, id) {
        state.listContract = state.listContract.filter((contract) => contract.id !== id);
      },
    },
    data() {
      return {
        filteredMenuItems: [],// Filtered based on role
        username: "Invité",
        role: "User", // Rôle par défaut
        isEditModalVisible: false,
        isEditUserModalVisible: false,
        isDeleteUserModalVisible: false,
        isDeleteModalVisible: false,
        currentEntity: null, // L'entité actuellement sélectionnée pour édition/suppression
        deleteError: null,
        isDeleting: false,

        editForm: {
          name: "",
          description: "",
        },
        userEditForm: {
          name: "",
          email: "",
          role: "",
          task:"",
          status: "",
        },
                
      };
    },
    
    setup() {
      const router = useRouter();
      const store = useStore();
  
      const entities = ref([]);
      const entityTitle = ref("");
      
      
      // Récupérer les données utilisateur depuis localStorage
      const username = store.userProfile ? store.userProfile.name : 'Default Name';
      const role = localStorage.getItem('role') || "Utilisateur";  
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');
      const isAuthenticated = store.isAuthenticated;
      
      
      let clientList;
      let managerList;
      let utilisateurList;
      let utilisateurForManager;
      let nameManager;
      const contractList  = ref([]);

      
      let contractForManager;

      


      const userContract = store.userProfile.contracts.map(contract => ({
                id: contract.id,
                name: contract.name,
                description: contract.description,
                userId: contract.userId,
            }) || []);

       

      // Check and filter the users list safely
      if (store.users) {

          clientList = store.users.filter(user => user.role === 'Client');
          managerList = store.users.filter(user => user.role === 'Manager');
          utilisateurList = store.users.filter(user => user.role === 'Utilisateur');

          
          // Vérifie si l'utilisateur avec l'ID spécifié existe dans la liste
          utilisateurForManager = utilisateurList.filter((user) => user.managerId?.includes(userId));
          // Vérifier s'il y a des utilisateurs associés au manager
          if (utilisateurForManager.length > 0) {
              // Récupérer le nom du manager
              const manager = managerList.find(manager => manager.id === Number(userId));
              nameManager = manager ? manager.name : "Manager Inconnu";

              console.log("Nom du Manager :", nameManager);
          } else {
              console.log("Aucun utilisateur trouvé pour ce manager.");
          }

          // Logs pour vérifier les résultats
          console.log("Liste des utilisateurs :", utilisateurList);
          console.log("Utilisateurs pour le manager spécifié :", utilisateurForManager);
          console.log("Nom du Manager :", nameManager);
          
        
          // Parcourir les clients
          clientList.forEach(clientItem => {
            if (clientItem.contracts) {
              const listConctractInClient = clientItem.contracts; // Liste des contrats du client

              // Vérifier quels contrats dans listConctractInClient correspondent à userContract
              const matchingContracts = listConctractInClient.filter(clientContract =>
                userContract.some(userC => userC.id === clientContract.id) // Comparaison par ID
              );

              // Afficher les contrats correspondants
              if (matchingContracts.length > 0) {
                
                contractForManager = matchingContracts;
                
              } else {
                console.log('\n\n Aucun contrat correspondant trouvé pour ce client.');
              }
            }
          });

          let managerID =[];
          let utilID =[];
         
          utilisateurList.forEach(manager =>{
            
            if (manager.managerId) {
              managerID = managerID.concat(manager.managerId);
              utilID = utilID.concat(manager.id);
            }
          })

      } else {
          console.error('store.users is undefined');
          // Optionally initialize or fetch users
      }

      console.log('\n\n user actif ', userContract, '\n\n');      
      console.log('\n\n client', clientList, '\n\n');
      console.log('\n\n Manager', managerList, '\n\n');
      console.log('\n\n utilisateur',utilisateurForManager, '\n\n');
      //console.log('\n\n\n\n', userContract, '\n\n\n');


      
  
      // Définir les menus spécifiques à chaque rôle
      const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: 'Liste des contract', link: '/contract', active: true, visibleTo: ['Admin', 'Client'] },
      ]);

      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      const filteredMenuItems = menuItems.value.filter(item => item.visibleTo.includes(role));
  
      onMounted(async() => {
        if (token) {
          console.log(username,'-' ,role);

          const response = await listUsers(role, token);
          entities.value = response;
          console.log('storage', response);

          contractList.value = await getContract(role, token);
          
        } else {
          console.error("authentication token is missing");
          
        }

        
      });

      function editEntity(entityId) {
        const user = store.users.find((u) => u.id === entityId);
        this.currentUser = user;
        this.userEditForm.name = user.name;
        this.userEditForm.email = user.email;
        this.userEditForm.role = user.role;
        this.userEditForm.task = user.task;
        this.userEditForm.status = user.status || "";
        this.isEditUserModalVisible = true;
      };

      function editContract(entityId) {
        const entity = store.listContract.find((e) => e.id === entityId);
        this.currentEntity = entity;
        this.editForm.name = entity.name;
        this.editForm.description = entity.description;
        this.isEditModalVisible = true;
      };
      
      function deleteEntity(entityId) {
        const entity = store.users.find((e) => e.id === entityId);        
        if (entity) {
          this.currentEntity = entity;
          this.isDeleteUserModalVisible = true;
        }       
        
      };

      function deleteContract(entityId) {
        // Trouve l'entité et ouvre la modale
        const entity = store.listContract.find((e) => e.id === entityId);
        if (entity) {
          this.currentEntity = entity;
          this.isDeleteModalVisible = true;
        }
        
        
      };

      function closeModal() {
        this.isEditModalVisible = false;
        this.isDeleteModalVisible = false;
        this.isEditUserModalVisible = false;
        this.isDeleteUserModalVisible = false;
        this.currentEntity = null;
        this.deleteError = null;
      };
      async function confirmEdit() {
         // Logique pour sauvegarder les modifications
        
        if (!this.currentEntity || !this.currentEntity.id) {
          console.error("Aucune entité valide sélectionnée pour la suppression.");
          this.deleteError = "Aucune entité valide sélectionnée.";
          return;
        }
        console.log("Updating entity:", this.currentEntity.id, this.editForm);

        this.isDeleting = true;
        this.deleteError = null;

        try {          
          // Appel à la fonction d'API pour supprimer l'entité
          await updateContract(this.currentEntity.id, {
            name: this.editForm.name,
            description: this.editForm.description,
          });

          // Mettre à jour localement la liste des contrats
          contractList.value = await getContract(role, token);
          
          this.closeModal();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          this.deleteError = "Échec de la suppression. Veuillez réessayer.";
        } finally {
          this.isDeleting = false;
        }
      };

      async function confirmUserEdit() {
        if (!this.currentEntity || !this.currentEntity.id) {
          console.error("Aucune entité valide sélectionnée pour la suppression.");
          this.deleteError = "Aucune entité valide sélectionnée.";
          return;
        }
        console.log("Updating user:", this.currentUser.id, this.userEditForm);

        this.isDeleting = true;
        this.deleteError = null;

        try {          
          // Appel à la fonction d'API pour supprimer l'entité
          await updateUsers(this.currentEntity.id, {
            // Mettre à jour l'utilisateur localement ou via une API
            name: this.userEditForm.name,
            email : this.userEditForm.email,
            role : this.userEditForm.role,
            task : this.userEditForm.task,
            status : this.userEditForm.status,
          });

          // Mettre à jour localement la liste des contrats
          utilisateurList = store.users.filter(user => user.role === 'Utilisateur');
          
          this.closeModal();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          this.deleteError = "Échec de la suppression. Veuillez réessayer.";
        } finally {
          this.isDeleting = false;
        }

      };

      async function confirmDelete() {
       
        if (!this.currentEntity || !this.currentEntity.id) {
          console.error("Aucune entité valide sélectionnée pour la suppression.");
          this.deleteError = "Aucune entité valide sélectionnée.";
          return;
        }
        console.log("Deleting entity:", this.currentEntity.id);

        this.isDeleting = true;
        this.deleteError = null;

        try {          
          // Appel à la fonction d'API pour supprimer l'entité
          await deleteContractId(this.currentEntity.id);

          // Mettre à jour localement la liste des contrats
          contractList.value = await getContract(role, token);
          
          this.closeModal();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          this.deleteError = "Échec de la suppression. Veuillez réessayer.";
        } finally {
          this.isDeleting = false;
        }
      };

      async function confirmDeleteUser() {
       
       if (!this.currentEntity || !this.currentEntity.id) {
         console.error("Aucune entité valide sélectionnée pour la suppression.");
         this.deleteError = "Aucune entité valide sélectionnée.";
         return;
       }
       console.log("Deleting entity:", this.currentEntity.id);

       this.isDeleting = true;
       this.deleteError = null;

       try {          
         // Appel à la fonction d'API pour supprimer l'entité
         await deleteUser(this.currentEntity.id);
         this.closeModal();
       } catch (error) {
         console.error("Erreur lors de la suppression :", error);
         this.deleteError = "Échec de la suppression. Veuillez réessayer.";
       } finally {
         this.isDeleting = false;
       }
     };

      
  
      const logout = async () => {
        //await store.performLogout(store.token);
        router.push({ name: 'Login' });

      };
      
  
      return {
        username, role, menuItems, filteredMenuItems,utilisateurList, utilisateurForManager,userContract,
        entities, entityTitle, editEntity, closeModal, confirmEdit, confirmDelete,contractForManager,contractList,
        deleteEntity, isAuthenticated,logout, clientList, managerList,store,nameManager,
        editContract,deleteContract, confirmUserEdit,confirmDeleteUser
      };
    },
  });
  </script>
  
  