<script setup lang="ts">
  import { ref } from 'vue';
  import { BaseUICard } from '@/shared';
  import { TaskCreationMenu } from '@/features/task-creation-menu';
  import { ViewTaskMenu } from '@/features/view-task-menu';
  import { GetKeysStorageArray } from '../api/GetKeysStorage';

  const isOpenTask = ref<string | null>(null);
  const isCreatingTask = ref<boolean>(false);

  const toggleCurrentKey = (key: string) => {
    isOpenTask.value = key;
    isCreatingTask.value = false;
  };

  const toggleCreation = () => {
    isCreatingTask.value = !isCreatingTask.value;
    isOpenTask.value = null;
  };
</script>

<template>
  <article>
    <h3>table</h3>
    <section class="task-table">
      <BaseUICard title="+" @click="toggleCreation" />
      <BaseUICard 
        v-for="value in GetKeysStorageArray()" 
        :key="value"
        :title="value" 
        @click="toggleCurrentKey(value)" 
      />
      <Teleport v-if="isCreatingTask || isOpenTask" to="body">
        <TaskCreationMenu v-if="isCreatingTask" />
        <ViewTaskMenu
          v-else-if="isOpenTask !== null"
          :title="isOpenTask" 
        />
      </Teleport>
    </section>
  </article>
</template>

<style scoped>
.task-table {
  display: flex;
  column-gap: 1em;
}
</style>
