<script setup lang="ts">
  import { PickWorkDir } from '@/shared';
  import { CreateTask } from '@/shared/ui/create-task';
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
