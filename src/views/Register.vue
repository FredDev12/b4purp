<template>
    <div class="register">
        <NavBar :menuItems="filteredMenuItems" />

        <h1>Inscription</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <InputField id="name" label="Nom" v-model="form.name" type="text" placeholder="Nom" required />

                <InputField id="email" label="Email" v-model="form.email" type="email" placeholder="Votre email" :error-message="emailError" required />

                <InputField id="password" label="Mot de passe" v-model="form.password" type="password" placeholder="Votre mot de passe" :error-message="passwordError" required />
                
                <InputField id="password" label="Confirmez le Mot de passe" v-model="form.confirmPassword" type="password" placeholder="Confirmez le mot de passe" :error-message="passwordError" required />


                <SelectComponent id="role" v-model="form.role" :options="roleOptions" label="role" required />

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
        
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../api/serviceAPI';
import ButtonComponent from '../components/ButtonComponent.vue';
import InputField from '../components/InputField.vue';
import SelectComponent from '../components/SelectComponent.vue';
import ImageUpload from '../components/ImageUpload.vue';
import NavBar from '../components/NavBar.vue';
  

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
                
      };
    },
    
    setup() {
        const router = useRouter();
        const role = ref(localStorage.getItem("role") || "User");

        const form = reactive({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            file: null as File | null,
            role: ''
        });

        const roleOptions = ref([
            { value: 'Manager', label: 'Manager' },
            { value: 'Utilisateur', label: 'Utilisateur' },
        ]);

        const handleFile = (file: File) => {
            form.file = file;
        };
        

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
  


        const handleRegister = async () => {
            
            console.log(form.file);
            
            
            loading.value = true;
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

            if (form.password !== form.confirmPassword){
                passwordError.value = "Le mot de passe different";
                loading.value = false;
                return;
            }

            try {
                
                console.log(form);
                
                await register(form);
                router.push('/dashboard');
            } catch (error) {
                apiError.value = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
            } finally {
                loading.value = false;
            }
        };

        const validateEmail = (email: string): boolean => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email.trim());
        };

        return {
            handleRegister, form, filteredMenuItems,
            emailError,  handleFile, role,
            passwordError, apiError,
            loading, roleOptions,
            
        };
    },
});
</script>
