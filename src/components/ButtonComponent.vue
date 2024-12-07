<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="onClick"
    class="button"
    :class="{ 'button--disabled': disabled }"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      required: false,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['click'],
  methods: {
    onClick(event: Event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    },
  },
});
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.button:active {
  background-color: #003f7f;
}

.button--disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
