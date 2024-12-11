<template>
    <div class="login-container">
      <!-- Logo Section -->
      <img src="../assets/wadoria.png" alt="Logo" class="logo" />

      <h1>Connexion</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          
          <InputField type="email" id="email" v-model="email" label="Email" :error-message="emailError" placeholder="Entrez votre email" required />
                 
          <InputField type="password" id="password" v-model="password" label="Mot de passe" :error-message="passwordError" placeholder="Entrez votre mot de passe" required />
          
        </div>
        <ButtonComponent
            type="submit"
            class="btn-primary"
            :disabled="loading"
        >
            <template v-if="loading">Chargement...</template>
            <template v-else>Se connecter</template>
        </ButtonComponent>
        <p v-if="apiError" class="error">{{ apiError }}</p>
      </form>
      <p>
        <router-link to="/requestPasswordReset">Mot de passe oublié ?</router-link>
      </p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from "vue";
  import { useRouter } from "vue-router";  
  import { useStore } from '../store/Storage';
  import ButtonComponent from '../components/ButtonComponent.vue';
  import InputField from '../components/InputField.vue';
  

  export default defineComponent({
    name: "Login",
    components: {
      ButtonComponent,
      InputField,
    },
    setup() {
      const router = useRouter();
      const authStore = useStore();     
      const email = ref('');
      const password = ref('');
      const emailError = ref("");
      const passwordError = ref("");
      const apiError = ref("");
      const loading = ref(false);
  
      const handleLogin = async () => {
        loading.value = true;
        // Réinitialiser les erreurs
        emailError.value = "";
        passwordError.value = "";
        apiError.value = "";

        // Valider l'email
        if (!validateEmail(email.value)) {
            emailError.value = "Veuillez entrer une adresse email valide.";
            loading.value = false;
            return;
        }
        // Valider le mot de passe
        if (password.value.length < 6) {
            passwordError.value = "Le mot de passe doit contenir au moins 6 caractères.";
            loading.value = false;
            return;
        }
        
        try {  
          await authStore.performLogin(email.value, password.value);
                  
          router.push({ name: 'Dashboard' });                    
          
        } catch (error) {
          console.error(error);          
          apiError.value = (error as Error).message || "Role non reconnu.";          
        } finally {
          loading.value = false;
        }
      };

      const validateEmail = (email: string) => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email);
        };
  
      return { email, password, emailError, passwordError, apiError, handleLogin, loading };
    },
  });
  </script>