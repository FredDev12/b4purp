<template>
      <NavBar :menuItems="filteredMenuItems" />

  <div class="register">

      <h1>Ajouter un User</h1>
      <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Type d'utilisateur:</label>
              <select v-model="userType">
                  <option value="">Sélectionnez le type</option>
                  <option value="Utilisateur">Utilisateur</option>
                  <option value="Manager">Manager</option>
              </select>

              <InputField id="name" label="Nom" v-model="form.name" type="text" placeholder="Nom" required />

              <InputField id="email" label="Email" v-model="form.email" type="email" placeholder="Votre email" :error-message="emailError" required />

              <InputField id="password" label="Mot de passe" v-model="form.password" type="password" placeholder="Votre mot de passe" :error-message="passwordError" required />
              
              <InputField id="password" label="Confirmez le Mot de passe" v-model="form.confirmPassword" type="password" placeholder="Confirmez le mot de passe" :error-message="passwordError" required />



              

              <SelectComponent
                  v-if="userType === 'Utilisateur'"
                  label="Sélectionnez un Manager"
                  v-model="form.managerId"
                  :options="managerOptions"
                  placeholder="Sélectionnez un Manager" />

              <SelectComponent
                  v-if="userType === 'Manager'"
                  label="Sélectionnez un Client"
                  v-model="form.clientId"
                  :options="clientOptions"
                  placeholder="Sélectionnez un Client" />

                  <InputField v-if="userType === 'Utilisateur'" id="task" label="tache" v-model="form.task" type="text" placeholder="Confirmez le mot de passe" :options="managerOptions" :error-message="passwordError" required />


                  <InputField v-if="userType === 'Utilisateur'" id="etat" label="status" v-model="form.etat" type="text" placeholder="Confirmez le mot de passe" :options="managerOptions" :error-message="passwordError" required />


              

                  <input type="file" @change="onFileChange">
          </div>

          <ButtonComponent
              type="submit"
              class="btn-primary"
              :disabled="loading"
          >
              <template v-if="loading">Chargement...</template>
              <template v-else>Ajouter</template>
          </ButtonComponent>

          <p v-if="apiError" class="error">{{ apiError }}</p>
      </form>
      
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../api/serviceAPI';
import ButtonComponent from '../components/ButtonComponent.vue';
import InputField from '../components/InputField.vue';
import SelectComponent from '../components/SelectComponent.vue';
import ImageUpload from '../components/ImageUpload.vue';
import NavBar from '../components/NavBar.vue';
import { useStore } from '../store/Storage';



export default defineComponent({
  name: "Register",
  components: {
      ButtonComponent,
      InputField,
      SelectComponent,
      ImageUpload,
      NavBar
  },
  data() {
    return {
      filteredMenuItems: [],// Filtered based on role
      username: "Invité",
      role: "User", // Rôle par défaut
      userRole: 'User'
              
    };
  },
  
  setup() {
      const router = useRouter();
      const store = useStore();
      const role = ref(localStorage.getItem("role") || "User");
      const userType = ref('');

      const form = reactive({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          photo: null as File | null,
          role: '',
          managerId: '',
          clientId: '',
          utilisateurId: '',
          task: '',
          etat: '',
      });

      const managerOptions = ref<{ value: string; label: string }[]>([]);
      const clientOptions = ref<{ value: string; label: string }[]>([]);
      

      function onFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        form.photo = target.files[0];
      }
    }
      

      const emailError = ref("");
      const passwordError = ref("");
      const apiError = ref("");
      const loading = ref(false);  
      
      const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: "Mon Profil", link: '/profile', active: true, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
      ]);

      // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
      const filteredMenuItems = menuItems.value.filter(item => item.visibleTo.includes(role.value));


      const fetchManagers = async () => {
          try {
              return store.users!.map(manager => ({ value: manager.id.toString(), label: manager.name }));
          } catch (error) {
              console.error('Failed to fetch managers:', error);
          }
      };

      const fetchClients = async () => {
          try {              
              return store.users!.map(client => ({ value: client.id.toString(), label: client.name }));
          } catch (error) {
              console.error('Failed to fetch clients:', error);
          }
      };

      // Watcher pour charger les données appropriées
      watch(userType, async (newType) => {
          if (newType === 'user') {
              managerOptions.value = await fetchManagers() || [];
          } else if (newType === 'manager') {
              clientOptions.value = await fetchClients() || [];
          }
      });      

      
      const handleRegister = async () => {
          
          console.log(form);
          
          
          loading.value = true;
          emailError.value = "";
          passwordError.value = "";
          apiError.value = "";

          
          const payload = { ...form, userType: userType.value };

          const data = new FormData();
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('password', form.password);
      data.append('role', form.role);
      data.append('managerId', form.managerId);
      data.append('clientId', form.clientId);
      data.append('utilisateurId', form.utilisateurId);
      data.append('task', form.task);
      data.append('etat', form.etat);
      if (form.photo) {
        data.append('photo', form.photo);
      }
          try {
              //const response = await store.addUser(payload);
              //console.log('Registration successful:', response);
            
              
              console.log(form);
              
              await register(data);
              //router.push('/dashboard');
          } catch (error) {
            console.error('Registration failed:', error);
              apiError.value = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
          } finally {
              loading.value = false;
          }
      };

      
      return {
          handleRegister, form, filteredMenuItems,
          emailError,  onFileChange, role,
          passwordError, apiError, userType,
          loading, managerOptions, clientOptions,
          
      };
  },
});
</script>
