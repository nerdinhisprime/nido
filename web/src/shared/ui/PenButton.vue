<script setup lang="ts">
  defineProps({
    btnTitle: {
      type: String,
      requiest: false,
      default: '',
    },
  });
</script>

<template>
  <button class="pen-btn" aria-label="Edit this task">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
    </svg>
    <span>{{ btnTitle }}</span>
  </button>
</template>

<style scoped>
.pen-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  height: 40px;
  background: gray;
  cursor: pointer;
  color: white;
}

.pen-btn:hover {
  --background-color: rgba(208, 208, 208, 0.3);
  background-color: black;
}
</style>
