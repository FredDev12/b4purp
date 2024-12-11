<template>
    <NavBar :menuItems="filteredMenuItems" />
    
    <div v-if="isAuthenticated" class="profile-container">
      <main>
        <img v-if="imageUrl || defaultImage" src="../assets/user.png" alt="Profile Image" class="profile-image"/>
        <button class="btn" @change="changePicture">changer la photo</button>
              
        <h1>Profil de l'utilisateur</h1>
        <p> <strong>Nom :</strong> {{ form.name }}</p>
        <p> <strong>Email :</strong> {{ form.email }}</p>
        <p > <strong>Role :</strong> {{ form.role }}</p>

        <ButtonComponent
            type="submit"
            class="btn-primary"
            :disabled="loading"
        >
            <template v-if="loading">Chargement...</template>
            <template v-else>Update</template>
        </ButtonComponent>

        <p v-if="apiError" class="error">{{ apiError }}</p>
        
      </main>
    </div>
    <div v-else class="profile">
      <p>Veuillez vous connecter pour modifier votre profil.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, reactive, computed} from 'vue';
  import SidebarComponent from '../components/SidebarComponent.vue';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import NavBar from '../components/NavBar.vue';
import InputField from '../components/InputField.vue';
import SelectComponent from '../components/SelectComponent.vue';
import ImageUpload from '../components/ImageUpload.vue';

  import { useRouter } from 'vue-router';
  import { useStore } from '../store/Storage';
  import { photo, getUserProfile } from '../api/serviceAPI';
  
  
  
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
      const entities = ref<any[]>([]);
        const users = ref<any[]>([]);
        const router = useRouter();
        const form = reactive({
            name: store.userProfile!.name!,
            email: store.userProfile!.email!,
            password: '',
            confirmPassword: '',   
            file: null as File | null,
            role: role
        });
        const isAuthenticated = store.isAuthenticated;
        const imageUrl = ref('');
        const defaultImageUrl = ref('../assets/user.png');

        const previewImage = null ;
        const defaultImage = ref("../assets/user.png");


        const handleFile = (file: File) => {
            form.file = file;
        };

        const emailError = ref("");
        const passwordError = ref("");
        const apiError = ref("");
        const loading = ref(false);

        async function handleFileUpload(event: Event) {
      const file = (event.target as HTMLInputElement).files![0];
      const formData = new FormData();
      formData.append('photo', file);
      try {
        const response = photo(formData)
        // Mettre à jour l'URL de l'image pour la prévisualisation
        
        //imageUrl.value = `http://localhost:3000/uploads/${response.fileName}`;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    function submitForm() {
      // Ici, logique pour soumettre le reste des données du formulaire si nécessaire
      console.log('Form submitted');
    }

  
  
      onMounted(async () => {
        if (token) {
          const response = await getUserProfile(token); 
          entities.value = response;  
          console.log(entities.value);
               
          
        } else {
          console.error('Authentication token is missing');
        }
        
      });

        const updateProfile = () => {
            /*loading.value = true;
            emailError.value = "";
            passwordError.value = "";
            apiError.value = "";

            // Validation de l'email
            if (!validateEmail(form.email)) {
                emailError.value = "Veuillez entrer une adresse email valide.";
                loading.value = false;
                return;
            }

            // Validation du mot de passe
            if (form.password.length < 6) {
                passwordError.value = "Le mot de passe doit contenir au moins 6 caractères.";
                loading.value = false;
                return;
            }
            console.log("Mise à jour du profil :", form);
            // Ajoutez ici la logique pour sauvegarder les modifications, par exemple en appelant une API.
            */
            if (store.token) {
              try {
                //await apiUpdateProfile({ email: email.value }, authStore.token);
                alert('Profile updated successfully!');
              } catch (error) {
                console.error('Failed to update profile:', error);
                alert('Failed to update profile.');
              }
            } else {
              console.error('Authentication token is missing');
            }
        };
        const changePicture = () => {
      // Implémenter la logique de changement de photo de profil
      console.log('Change profile picture');
    }

        const validateEmail = (email: string): boolean => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email.trim());
        };
  
        const menuItems = ref([
            { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
            { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
            { name: "Mon Profil", link: '/profile', active: true, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
        ]);

       
        // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
        const filteredMenuItems = menuItems.value.filter(item => item.visibleTo.includes(role));
        
        
  
        return {
            role, changePicture, isAuthenticated,
            menuItems,
            users,
            form,
            updateProfile,
            emailError,
            handleFile,
            passwordError,
            apiError,
            loading,
            previewImage,
            defaultImage,
            filteredMenuItems,
            handleFileUpload, imageUrl, submitForm, defaultImageUrl
        };
    },
  });
  </script>
  