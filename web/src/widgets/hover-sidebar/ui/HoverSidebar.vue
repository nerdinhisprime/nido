<script setup lang="ts">
    import { PlusButton, TrashButton, PenButton } from '@/shared';
</script>

<template>
  <article class="hover-sidebar">
    <h2>sidebar</h2>
    <section>
      <PlusButton>Create task</PlusButton>
      <TrashButton />
      <PenButton />
    </section>
  </article>
</template>

<style scoped>
.hover-sidebar {
  position: fixed;
  top: 20vh;
  left: 0;
  display: inline-block;
  --min-width: 50px;
  width: 50px;
  height: 60vh;
  background-color: #333;
  transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
}
.hover-sidebar:hover {
  width: 260px;
}
</style>
