<template>
    <aside class="sidebar">
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.name" :class="{ active: item.active }">
            <a :href="item.link">{{ item.name }}</a>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script>
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'SidebarComponent',
    props: {
      menuItems: {
        type: Array,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .sidebar {
    width: 20%;
    background-color: #28a745;
    padding: 20px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin: 15px 0;
  }
  
  .sidebar ul li a {
    color: #fff;
    text-decoration: none;
  }
  
  .sidebar ul li.active a {
    font-weight: bold;
  }
  </style>
  