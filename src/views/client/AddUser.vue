<template>
    <div class="register">
        <h1>Inscription</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <InputField id="name" label="Nom" v-model="form.fullName" type="text" placeholder="Nom" required />

                <InputField id="username" label="Nom d'utilisateur" v-model="form.username" type="text" placeholder="Nom d'utilisateur" required />

                <InputField id="email" label="Email" v-model="form.email" type="email" placeholder="Votre email" :error-message="emailError" required />

                <InputField id="password" label="Mot de passe" v-model="form.password" type="password" placeholder="Votre mot de passe" :error-message="passwordError" required />

                <InputField id="birthDate" label="Date de naissance" v-model="form.birthDate" type="date" placeholder="Votre date de naissance" required />

                <InputField id="phoneNumber" label="Téléphone" v-model="form.phoneNumber" type="number" placeholder="Votre numéro de téléphone" required />

                <SelectComponent id="gender" v-model="form.gender" :options="genderOptions" label="Genre" required />

                <SelectComponent id="role" v-model="form.role" :options="roleOptions" label="Role" required />

                <InputField id="address" label="Adresse" v-model="form.address" type="text" placeholder="Votre adresse" required />

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
             <router-link to="/dashboardClient">accueil</router-link>.
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { creatManager, creatUsers } from '../../api/authService';
import ButtonComponent from '../../components/ButtonComponent.vue';
import InputField from '../../components/InputField.vue';
import SelectComponent from '../../components/SelectComponent.vue';
import ImageUpload from '../../components/ImageUpload.vue';

export default defineComponent({
    name: "Register",
    components: {
        ButtonComponent,
        InputField,
        SelectComponent,
        ImageUpload,
    },
    setup() {
        const router = useRouter();
        const form = reactive({
            fullName: '',
            username: '',
            email: '',
            password: '',
            birthDate: '',
            phoneNumber: '',
            gender: '',
            address: '',
            file: null as File | null,
            role: ''
        });

        const selectedGender = ref("Homme");

        const genderOptions = ref([
            { value: 'Homme', label: 'Homme' },
            { value: 'Femme', label: 'Femme' },
        ]);

        const selectedRole = ref("Homme");

        const roleOptions = ref([
            { value: 'manager', label: 'manager' },            
            { value: 'user', label: 'user' },
        ]);

        const handleFile = (file: File) => {
            form.file = file;
        };
        

        const emailError = ref("");
        const passwordError = ref("");
        const apiError = ref("");
        const loading = ref(false);

       


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

            try {
                
                console.log(form);
                if (form.role === 'manager') {
                    const response = await creatManager(form);
                    router.push('/listManagerClient');
                } else if (form.role === 'user') {
                    const response = await creatUsers(form);
                    router.push('/listUsersClient');
                } else {
                    apiError.value ="Role non reconnu."
                    console.log("Role non reconnu.");                    
                } 
                
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
            handleRegister,
            form,
            emailError,
            handleFile,
            passwordError,
            apiError,
            loading,
            genderOptions,
            selectedGender,
            roleOptions,
            selectedRole
        };
    },
});
</script>
