<script setup lang="ts">
  import { ref } from 'vue';
  const isShow = ref<boolean>(false);
</script>

<template>
  <div style="position: relative">
    <button @click.stop="isShow = !isShow" class="menu-toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        <circle cx="12" cy="5" r="1" fill="currentColor"/>
        <circle cx="12" cy="19" r="1" fill="currentColor"/>
      </svg>
    </button>
    <div v-if="isShow" class="menu-toggle__submenu">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.menu-toggle {
  background: transparent;
  width: 40px;
  aspect-ratio: 1;
  cursor: pointer;
  color: white;
}

.menu-toggle:hover {
  background-color: rgba(208, 208, 208, 0.3);
}

.menu-toggle__submenu {
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.submenu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 140px;
}
</style>
