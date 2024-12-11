<template>
    <NavBar :menuItems="filteredMenuItems" />
    
    <div v-if="isAuthenticated" class="profile-container">
      <main>
        <img v-if="imageUrl || defaultImage" src="../assets/user.png" alt="Profile Image" class="profile-image"/>
              
        <h1>Profil de l'utilisateur</h1>
        <p> <strong>Nom :</strong> {{ name }}</p>
        <p> <strong>Email :</strong> {{ email }}</p>
        <p > <strong>Role :</strong> {{ role }}</p>

        <ButtonComponent
            type="submit"
            class="btn-primary"
        >
            Update
        </ButtonComponent>

        
        
      </main>
    </div>
    <div v-else class="profile">
      <p>Veuillez vous connecter pour modifier votre profil.</p>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref} from 'vue';
  import SidebarComponent from '../components/SidebarComponent.vue';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import NavBar from '../components/NavBar.vue';
import InputField from '../components/InputField.vue';
import SelectComponent from '../components/SelectComponent.vue';
import ImageUpload from '../components/ImageUpload.vue';

  import { useRouter } from 'vue-router';
  import { useStore } from '../store/Storage';
  
  
  
  export default defineComponent({
    name: "Profile",
    components: {
        SidebarComponent,
        ButtonComponent,
        InputField,
        SelectComponent,
        ImageUpload,
        NavBar
    },
    props: {
      entityType: {
        type: String,
        required: true,
      },
      
    },
    setup(props) {
      
      const store = useStore();
      const role = localStorage.getItem('role') || "Utilisateur";  
      const token = localStorage.getItem('token');
      const entities = ref([]);
        const users = ref([]);
        const router = useRouter();
        
        const name = ref(store.userProfile.name);
        const email = ref(store.userProfile.email);
            
        const isAuthenticated = store.isAuthenticated;
        const imageUrl = ref('');
        const defaultImageUrl = ref('../assets/user.png');

        const previewImage = null ;
        const defaultImage = ref("../assets/user.png");

        

        

    function submitForm() {
      // Ici, logique pour soumettre le reste des données du formulaire si nécessaire
      console.log('Form submitted');
    }

  
    const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: 'Liste des contract', link: '/contract', active: true, visibleTo: ['Admin', 'Client'] },
      ]);

       
        // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
        const filteredMenuItems = menuItems.value.filter(item => item.visibleTo.includes(role));
        
        
  
        return {
            role, isAuthenticated,
            menuItems, name, email,
            users, entities,            
            previewImage,
            defaultImage,
            filteredMenuItems,
            imageUrl, submitForm, defaultImageUrl
        };
    },
  });
  </script>
  