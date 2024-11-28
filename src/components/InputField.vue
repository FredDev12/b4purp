<template>
  <div class="input-field">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="input"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputField',
  props: {
    id: {
      type: String,
      required: true,
      
    },
    label: {
      type: String,
      required: true,
      
    },
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
      
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxlength: {
      type: Number,
      required: false,
    },
    minlength: {
      type: Number,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
      
    },
  },
});
</script>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.input-label {
  margin-bottom: 8px;
  font-weight: bold;
}

.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}
</style>
