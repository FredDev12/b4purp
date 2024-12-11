<template>
  <div>
    <label for="select" class="select-label">{{ label }}</label>
    <select v-model="selectedOption" class="gender-select" :id="uniqueId">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import { defineComponent, PropType, computed } from "vue";

export default defineComponent({
  name: "SelectComponent",
  props: {
    modelValue: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: "Sélectionnez une option",
    },
    id: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // Générer un ID unique si aucun n'est fourni
    const uniqueId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`);

    const selectedOption = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return { selectedOption, options: props.options, uniqueId };
  },
});
</script>

<style scoped>
.gender-select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  width: 100%;
}

.gender-select:focus {
  border-color: #006eff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 110, 255, 0.5);
}

.gender-select option {
  padding: 4px 10px;
}

.select-label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 14px;
}
</style>
