<!-- RoleSelector.vue -->
<template>
    <div v-if="role === 'Admin'">
      <input type="radio" id="client" value="Client" v-model="selectedRole" name="role">
      <label for="client">Client</label>
      
    </div>
    <div>
      <input type="radio" id="manager" value="Manager" v-model="selectedRole" name="role">
      <label for="manager">Manager</label>
  
      <input type="radio" id="utilisateur" value="Utilisateur" v-model="selectedRole" name="role">
      <label for="utilisateur">Utilisateur</label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      role: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selectedRole: null  // Aucun rôle sélectionné par défaut
      };
    }
  }
  </script>
  