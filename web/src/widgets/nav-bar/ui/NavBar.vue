<script setup lang="ts">
  import { PickWorkDir, CreateTask } from '@/shared';
</script>

<template>
  <nav>
    <div>
      <CreateTask />
    </div>
    <PickWorkDir />
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
</style>
