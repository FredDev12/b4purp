<template>
    <NavBar :menuItems="filteredMenuItems" />

    <div class="register">

        <h1>Ajouter un utilisateur</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
            <label>Type d'utilisateur:</label>
            <div v-if="role === 'Client'">
                <input type="radio" id="user" value="Utilisateur" v-model="userType" @change="updateUserType('Utilisateur')">
                <label for="user">Utilisateur</label>
                
                <input type="radio" id="manager" value="Manager" v-model="userType" @change="updateUserType('Manager')">
                <label for="manager">Manager</label>
            </div>
            <div v-else>
                <p>{{ userType }}</p> <!-- Display userType directly -->
            </div>


            <InputField id="name" label="Nom" v-model="formdata.name" type="text" placeholder="Nom" required />

            <InputField id="email" label="Email" v-model="formdata.email" type="email" placeholder="Votre email" :error-message="emailError" required />

            <InputField id="password" label="Mot de passe" v-model="formdata.password" type="password" placeholder="Votre mot de passe" :error-message="passwordError" required />
            
            <InputField id="confirmpassword" label="Confirmez le Mot de passe" v-model="formdata.confirmPassword" type="password" placeholder="Confirmez le mot de passe" :error-message="passwordError" required />


            <SelectComponent
                v-if="userType === 'Utilisateur'"
                label="Sélectionnez un Manager"
                v-model="formdata.managerId"
                :options="managerOptions"
                placeholder="Sélectionnez un Manager" />

            <SelectComponent
                v-if="userType === 'Manager'"
                label="Sélectionnez un Client"
                v-model="formdata.clientId"
                :options="clientOptions"
                placeholder="Sélectionnez un Client" />

            <InputField v-if="userType === 'Utilisateur'" id="task" label="tache" v-model="formdata.task" type="text" placeholder="Confirmez le mot de passe" :options="managerOptions" :error-message="passwordError" required />
            <InputField v-if="userType === 'Utilisateur'" id="etat" label="status" v-model="formdata.etat" type="text" placeholder="Confirmez le mot de passe" :options="managerOptions" :error-message="passwordError" required />
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

<script>
import { defineComponent, reactive, ref, watch, computed, onMounted } from 'vue';
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
 
    setup() {
        const router = useRouter();
        const store = useStore();
        const role = ref(localStorage.getItem('role') || "Utilisateur");
        const token = ref(localStorage.getItem('token'));
        const userType = ref("Utilisateur");

        const formdata = reactive({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            photo: File | null,
            role: '',
            managerId: '',
            clientId: '',
            utilisateurId: '',
            task: '',
            etat: '',
        });

        const managerOptions = ref([]);
        const clientOptions = ref([]);
        

        function onFileChange(event) {
            const target = event.target ;
            if (target.files) {
                formdata.photo = target.files[0];
            }
        }
        

        const emailError = ref("");
        const passwordError = ref("");
        const apiError = ref("");
        const loading = ref(false);  
        
        const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: 'Liste des contract', link: '/contract', active: true, visibleTo: ['Admin', 'Client'] },
      ]);

        // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
        const filteredMenuItems = computed(() => menuItems.value.filter(item => item.visibleTo.includes(role.value)));
   
        
        async function fetchManagers() {
            try {                
                const users = await store.users; // Assumed asynchronous fetch function
                
                
                if (!users || !Array.isArray(users)) return []; // Ajout d'une vérification pour s'assurer que users est bien un tableau.
                return users.filter(user => user.role === 'Manager').map(manager => ({ value: manager.id.toString(), label: manager.name }));
            } catch (error) {
                console.error('Failed to fetch managers:', error);
                return [];
            }
        };

        async function fetchClients() {
            try {     
                const users = await store.users; // Assumed asynchronous fetch function
                
                if (!users || !Array.isArray(users)) return []; // Ajout d'une vérification pour s'assurer que users est bien un tableau.
                return users.filter(user => user.role === 'Client').map(client => ({ value: client.id.toString(), label: client.name }));
                            
            } catch (error) {
                console.error('Failed to fetch clients:', error);
                return [];
            }

        };

        
        onMounted(async () => {
            
            if (token.value) {
                await store.fetchUsers(role.value, token.value);
            }
            managerOptions.value = await fetchManagers();
        
            clientOptions.value = await fetchClients();
            
        });

        console.log("\n\n\n option manager", managerOptions.value);
        
        
        function updateUserType(selectedType) {
            // Si le type sélectionné est déjà sélectionné, désélectionnez-le
            
            userType.value = selectedType;
            console.log("\n\n valeur", userType.value);
            
        }
      
        async function handleRegister() {            
            console.log(formdata);
            
            
            loading.value = true;
            emailError.value = "";
            passwordError.value = "";
            apiError.value = "";

            

            const data = new FormData();
            data.append('name', formdata.name);
            data.append('email', formdata.email);
            data.append('password', formdata.password);
            data.append('role', userType.value);
            data.append('managerId', formdata.managerId);
            data.append('clientId', formdata.clientId);
            data.append('utilisateurId', formdata.utilisateurId);
            data.append('task', formdata.task);
            data.append('etat', formdata.etat);
            if (formdata.photo) {
                data.append('photo', formdata.photo);
            }

            try {
                
                console.log(formdata);
                await register(data);
                router.push({ name: 'liste' });
            } catch (error) {
                console.error('Registration failed:', error);
                apiError.value = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
            } finally {
                loading.value = false;
            }
        };

      
        return {
            handleRegister, formdata, filteredMenuItems,
            emailError,  onFileChange, role,
            passwordError, apiError, userType,
            loading, managerOptions, clientOptions,
            updateUserType
            
        };
    },
});
</script>
