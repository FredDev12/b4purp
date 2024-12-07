<template>
    <div class="register">
      <h1>Inscription</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <InputField
            id="name"
            label="Nom"
            v-model="form.name"
            type="text"
            placeholder="Nom"
            required
          />
          <InputField
            id="username"
            label="Nom d'utilisateur"
            v-model="form.username"
            type="text"
            placeholder="Nom d'utilisateur"
            required
          />
          <InputField
            id="email"
            label="Email"
            v-model="form.email"
            type="email"
            placeholder="Votre email"
            :error-message="emailError"
            required
          />
          <InputField
            id="password"
            label="Mot de passe"
            v-model="form.password"
            type="password"
            placeholder="Votre mot de passe"
            :error-message="passwordError"
            required
          />
          <InputField
            id="birthDate"
            label="Date de naissance"
            v-model="form.birthDate"
            type="date"
            placeholder="Votre date de naissance"
            required
          />
          <InputField
            id="phoneNumber"
            label="Téléphone"
            v-model="form.phoneNumber"
            type="number"
            placeholder="Votre numéro de téléphone"
            required
          />
          <SelectComponent
            id="gender"
            v-model="form.gender"
            :options="genderOptions"
            label="Genre"
            required
          />
          <SelectComponent
            id="role"
            v-model="form.role"
            :options="roleOptions"
            label="Rôle"
            required
          />
          <InputField
            id="address"
            label="Adresse"
            v-model="form.address"
            type="text"
            placeholder="Votre adresse"
            required
          />
          <ImageUpload @update:file="handleFile" required />
        </div>
        <ButtonComponent
          type="submit"
          class="btn-primary"
          :disabled="loading"
        >
          <template v-if="loading">Chargement...</template>
          <template v-else>S'inscrire</template>
        </ButtonComponent>
        <p v-if="apiError" class="error">{{ apiError }}</p>
      </form>
      <p>
        <router-link to="/dashboardAdmin">Accueil</router-link>.
      </p>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, reactive, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { creatUsers } from '../api/serviceAPI';
import ButtonComponent from './ButtonComponent.vue';
import InputField from './InputField.vue';
import SelectComponent from './SelectComponent.vue';
import ImageUpload from './ImageUpload.vue';

export default defineComponent({
  name: "AddUserForm",
  components: {
    ButtonComponent,
    InputField,
    SelectComponent,
    ImageUpload,
  },
  setup() {
    const router = useRouter();
    const currentUserId = ref<number | null>(localStorage.getItem("id") ? parseInt(localStorage.getItem("id")!) : null);
    const currentUserRole = ref<string | null>(localStorage.getItem("role") ? localStorage.getItem("role") : null);   
   

    const form = reactive({
      name: '',
      username: '',
      email: '',
      password: '',
      birthDate: '',
      phoneNumber: '',
      gender: '',
      address: '',
      file: null as File | null,
      role: '',
      createdBy: currentUserId.value, // Associer l'ID utilisateur
    });

    const genderOptions = ref([
      { value: 'Homme', label: 'Homme' },
      { value: 'Femme', label: 'Femme' },
    ]);

    // Dynamically filter role options based on currentUserRole
    const roleOptions = computed(() => {
      switch (currentUserRole.value) {
        case 'admin':
          return [
            { value: 'client', label: 'Client' },
            { value: 'manager', label: 'Manager' },
            { value: 'user', label: 'User' },
          ];
        case 'client':
          return [
            { value: 'manager', label: 'Manager' },
            { value: 'user', label: 'User' },
          ];
        case 'manager':
          form.role = 'user';
          return [{ value: 'user', label: 'User' }];
        default:
          return [];
      }
    });

    const emailError = ref("");
    const passwordError = ref("");
    const apiError = ref("");
    const loading = ref(false);

    const handleFile = (file: File) => {
      form.file = file;
    };

    const validateEmail = (email: string): boolean => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
      return re.test(email.trim());
    };

    const handleRegister = async () => {
      loading.value = true;
      emailError.value = "";
      passwordError.value = "";
      apiError.value = "";

      if (!validateEmail(form.email)) {
        emailError.value = "Veuillez entrer une adresse email valide.";
        loading.value = false;
        return;
      }

      if (form.password.length < 6) {
        passwordError.value = "Le mot de passe doit contenir au moins 6 caractères.";
        loading.value = false;
        return;
      }

      form.createdBy = currentUserId.value; // Mettre à jour l'ID utilisateur dans le formulaire


      try {
        let response;
        // Simplify by calling creatUsers once, as all cases are the same
        if (['client', 'manager', 'user'].includes(form.role)) {
          response = await creatUsers(form);
        } else {
          apiError.value = "Rôle non reconnu.";
          console.error(`Rôle non reconnu: ${form.role}`);
          return;
        }

        console.log("Utilisateur ajouté par ID:", form.createdBy);
        router.push(`/liste`);
      } catch (error) {
        apiError.value = "Une erreur est survenue lors de l'inscription.";
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      handleRegister,
      form,
      emailError,
      passwordError,
      apiError,
      loading,
      genderOptions,
      roleOptions,
      handleFile
    };
  },
});
</script>
