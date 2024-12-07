<template>
    <div class="image-upload-container">
      <input type="file" @change="handleFileUpload" 
             accept=".png, .jpg, .jpeg, .csv" 
             class="file-input" />
      
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    name: 'ImageUpload',
    emits: ['update:file'],
    setup(_, { emit }) {
        const handleFileUpload = (event: Event) => {
            const target = event.target as HTMLInputElement;
            const files = target.files;
            const file = files && files[0];
            if (file) {
                emit('update:file', file);
            }
        };

        return { handleFileUpload };
    },
  });
  </script>
  
  <style scoped>
  .image-upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .file-input {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .image-preview {
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .preview-img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  </style>
  