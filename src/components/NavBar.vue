<template>
    <div>
      <!-- Navbar (Header) -->
      <header class="navbar">
        <!-- Logo -->
        <div class="logo">
          <a href="/">MonLogo</a>
        </div>
  
        <!-- Menu -->
        <div class="menu" :class="{'active': isMenuOpen}">
          <ul>
            <li v-for="item in menuItems" :key="item.name" :class="{ active: item.active }">                
                <router-link class="link" :to="item.link">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Dropdown Action Bubble -->
        <div class="action-bubble">
           <h1 class="welcom" >Bonjour, {{ username }} !</h1>
        
          <button @click="toggleDropdown" class="action-button">
            <img src="../assets/user1.png" alt="Profile" class="profile-picture" />
          </button>
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <ul>
              <li><a href="#" @click.prevent="profil">Mon profil</a></li>
              <li><a href="#" @click.prevent="logout">Se déconnecter</a></li>
            </ul>
          </div>
        </div>
  
      </header>
      
    </div>
  </template>
  
  <script>
   import { defineComponent, PropType } from 'vue';
   import { useRouter } from 'vue-router';
   import { useStore } from '../store/Storage';

  export default defineComponent ({
    name: 'NavbarComponent',
    props: {
        menuItems: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const router = useRouter();
      const store = useStore();
      const username = store.userProfile ? store.userProfile.name : 'Default Name';

      const logout = () => {
        // Suppression du token JWT du stockage local
        localStorage.removeItem('token');
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        // Redirection vers la page de connexion
        router.push('/');
      };
      const profil = () => {        
        router.push({ name: 'profile' });
      };

      return {
        logout,profil,username
      };
    },
    data() {
      return {
        isMenuOpen: false,
        isDropdownOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      },
    }
  });
  </script>
  

  