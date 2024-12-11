<template>
    <div class="forgot-password">
        <h1>Mot de passe oublié</h1>
        <p>
            Entrez votre adresse email ci-dessous, et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>
        <form @submit.prevent="handleForgotPassword">
            <div class="form-group">
                <InputField
                    id="email"
                    v-model="email"
                    type="email"
                    label="Email"
                    placeholder="Votre email"
                    required
                />
                <span v-if="emailError" class="error-message">{{ emailError }}</span>
            </div>

            <ButtonComponent type="submit" class="btn-primary" :disabled="loading">
                {{ loading ? "Envoi en cours..." : "Envoyer le lien" }}
            </ButtonComponent>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
            <p v-if="apiError" class="error-message">{{ apiError }}</p>
        </form>
        <p>
            <router-link to="/">Retour à la connexion</router-link>
        </p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { requestPasswordReset } from '../api/serviceAPI';
import ButtonComponent from '../components/ButtonComponent.vue';
import InputField from '../components/InputField.vue';
  

export default defineComponent({
    name: "resetPassword",
    components: {
      ButtonComponent,
      InputField,
    },
    data() {
        return {
            email: "",
            emailError: '',
            apiError: '',
            successMessage: '',
            loading: false,
        };
    },
    methods: {
        async handleForgotPassword() {
            
            // Réinitialiser les erreurs
            this.emailError = null;
            this.apiError = null;
            this.successMessage = null;

            // Validation de l'email
            if (!this.validateEmail(this.email)) {
                this.emailError = "Veuillez entrer une adresse email valide.";
                return;
            }
            try {
                this.loading = true;
                // Envoi de l'email au serveur pour réinitialisation
                const response = await requestPasswordReset(this.email);
                console.log(response);
                
                // Afficher un message de succès
                this.successMessage = "Un lien de réinitialisation a été envoyé à votre adresse email.";
                this.email = '';
            } catch (error) {
                console.error('Erreur lors de la demande de réinitialisation :', error);
                this.apiError = "Une erreur est survenue. Veuillez vérifier l'adresse email et réessayer.";
            } finally {
                this.loading = false;
            }
        },
        validateEmail(email) {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email);
        },
    },
});
</script>
