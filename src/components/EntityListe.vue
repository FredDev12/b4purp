<template>
    <div class="entity-list">
      <ul v-if="entities.length > 0" class="list">
        <li v-for="entity in entities" :key="entity.id" class="list-item">
          <span>{{ entity.name }}</span> <!-- Nom de l'entité -->
          <div class="actions">
            <ButtonComponent @click="$emit('edit', entity.id)">Éditer</ButtonComponent>
            <ButtonComponent @click="$emit('delete', entity.id)">Supprimer</ButtonComponent>
          </div>
        </li>
      </ul>
      <p v-else>Aucune entité trouvée.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      entities: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .entity-list {
    margin: 20px 0;
  }
  
  .list {
    list-style-type: none;
    padding: 0;
  }
  
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  </style>
  