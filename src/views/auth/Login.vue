<template>
    <div class="login-container">
      <!-- Logo Section -->
      <img src="../../assets/wadoria.png" alt="Logo" class="logo" />

      <h1>Connexion</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          
          <InputField type="email" id="email" v-model="form.email" label="Email" :error-message="emailError" placeholder="Entrez votre email" required />
                 
          <InputField type="password" id="password" v-model="form.password" label="Mot de passe" :error-message="passwordError" placeholder="Entrez votre mot de passe" required />
          
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
        <p>
            Vous n'avez pas de compte ? <router-link to="/register">Inscrivez-vous ici</router-link>.
        </p>
      
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from "vue";
  import { useRouter } from "vue-router";  
  import { login } from '../../api/authService';
  import ButtonComponent from '../../components/ButtonComponent.vue';
  import InputField from '../../components/InputField.vue';
  

  export default defineComponent({
    name: "Login",
    components: {
      ButtonComponent,
      InputField,
    },
    setup() {
      const router = useRouter();
      const form = reactive({            
            email: '',
            password: ''
        });
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
        if (!validateEmail(form.email)) {
            emailError.value = "Veuillez entrer une adresse email valide.";
            loading.value = false;
            return;
        }
        // Valider le mot de passe
        if (form.password.length < 6) {
            passwordError.value = "Le mot de passe doit contenir au moins 6 caractères.";
            loading.value = false;
            return;
        }
        
        try {  
          const response = await login(form);        
          console.log("valide ",response.message);
          
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem("username", response.userInfo.username);
            console.log("login",response.userInfo);
            if (response.userInfo.role === "admin") {
              router.push({
                path:"/dashboardAdmin",
                query: { username: response.userInfo.username },
              });
            } else if (response.userInfo.role === "client") {
              router.push("/dashboardClient");
            } else if (response.userInfo.role === "manager") {
              router.push("/dashboardManager");
            } else if (response.userInfo[0] === "user") {
              router.push("/dashboardUser");
            } else {
              // Handle other cases or log an error as needed
              apiError.value ="Role non reconnu."
              console.log("Role non reconnu.");
            }
          }
          
        } catch (error) {
          console.error(error);
          console.log(form);
          apiError.value = (error as Error).message;
          
        } finally {
          loading.value = false;
        }
      };

      const validateEmail = (email: string) => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email);
        };
  
      return { form, emailError, passwordError, apiError, handleLogin, loading };
    },
  });
  </script>