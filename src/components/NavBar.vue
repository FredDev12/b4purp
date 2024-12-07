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

        <div class="menu" :class="{'active': isMenuOpen}">
            <ul>
                <li><a href="#" @click.prevent="logout">Déconnexion</a></li>
            </ul>
        </div>
  
      </header>
      
    </div>
  </template>
  
  <script lang="ts">
   import { defineComponent, PropType } from 'vue';
   import { useRouter } from 'vue-router';

  export default defineComponent ({
    name: 'NavbarComponent',
    props: {
        menuItems: {
        type: Array as PropType<Array<{ name: string; link: string; active: boolean }>>,
        required: true,
      },
    },
    setup() {
      const router = useRouter();

      const logout = () => {
        // Suppression du token JWT du stockage local
        localStorage.removeItem('token');
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        // Redirection vers la page de connexion
        router.push('/');
      };

      return {
        logout,
      };
    },
    data() {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      }
      
    }
  });
  </script>
  

  