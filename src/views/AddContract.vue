<template>
    <NavBar :menuItems="filteredMenuItems" />

    <div class="register">

        <h1>Ajouter un Contract</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
            
            <InputField id="name" label="Nom" v-model="formdata.name" type="text" placeholder="Nom" required />

            <InputField id="description" label="description" v-model="formdata.description" type="text" placeholder="Votre description" required />

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
import { registerContract } from '../api/serviceAPI';
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
            description: '',
            
        });

        
        

        const apiError = ref("");
        const loading = ref(false);  
        
        const menuItems = ref([
          { name: 'Tableau de Bord', link: '/dashboard', active: false, visibleTo: ['Admin', 'Client', 'Manager', 'Utilisateur'] },
          { name: 'Liste des Utilisateurs', link: '/liste', active: false, visibleTo: ['Admin', 'Client', 'Manager'] },
          { name: 'Liste des Contract', link: '/contract', active: true, visibleTo: ['Admin', 'Client'] },
      ]);

        // Filtrer les éléments du menu en fonction du rôle de l'utilisateur
        const filteredMenuItems = computed(() => menuItems.value.filter(item => item.visibleTo.includes(role.value)));
   
      
        async function handleRegister() {            
            console.log(formdata);
            
            
            loading.value = true;
            apiError.value = "";

            

            const data = new FormData();
            data.append('name', formdata.name);
            data.append('description', formdata.description);

            try {
                
                console.log(formdata);
                await registerContract(data);
                router.push({ name: 'contract' });
            } catch (error) {
                console.error('Registration failed:', error);
                apiError.value = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
            } finally {
                loading.value = false;
            }
        };

      
        return {
            handleRegister, formdata, filteredMenuItems,
            role, apiError,
            loading,
            
        };
    },
});
</script>
