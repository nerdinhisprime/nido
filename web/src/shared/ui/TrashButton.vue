<script setup lang="ts">
  defineProps({
    btnTitle: {
      type: String,
      required: false,
      default: '',
    },
  });
</script>

<template>
  <button class="trash-btn" aria-label="Delete this task">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
    </svg>
    <span>{{ btnTitle }}</span>
  </button>
</template>

<style scoped>
.trash-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  height: 40px;
  background-color: grey;
  cursor: pointer;
  color: white;
}

.trash-btn:hover {
  --background-color: rgba(208, 208, 208, 0.3);
  background-color: black;
}
</style>
