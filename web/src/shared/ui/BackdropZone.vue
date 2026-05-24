<script setup lang="ts">
  const emit = defineEmits(['close-menu']);
</script>

<template>
  <div @click="emit('close-menu', false)" class="backdrop-zone">
    <slot />
  </div>
</template>

<style scoped>
.backdrop-zone {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(red, green, blue, alpha);
  backdrop-filter: blur(8px);
}
</style>
