<script setup lang="ts">
  import { ref } from 'vue';
  import { BaseUICard } from '@/shared';
  import { TaskCreationMenu } from '@/features/task-creation-menu';

  var isOpen = ref<boolean>(false);
</script>

<template>
  <h3>table</h3>
  <BaseUICard @click="isOpen = !isOpen" title="+" />
  <Teleport v-if="isOpen" to="body">
    <TaskCreationMenu />
  </Teleport>
</template>
