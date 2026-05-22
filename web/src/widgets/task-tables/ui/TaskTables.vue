<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { BaseUICard } from '@/shared';
  import { TaskCreationMenu } from '@/features/task-creation-menu';
  import { ViewTaskMenu } from '@/features/view-task-menu';
  import { GetKeysStorageArray } from '../lib/GetKeysStorage';

  const tasks = computed(() => GetKeysStorageArray());
  const isOpenTask = ref<string | null>(null);
  const isCreatingTask = ref<boolean>(false);
  const draggedItemIndex = ref<number | null>(null);

  const toggleCurrentKey = (key: string) => {
    isOpenTask.value = key;
    isCreatingTask.value = false;
  };

  const toggleCreation = () => {
    isCreatingTask.value = !isCreatingTask.value;
    isOpenTask.value = null;
  };

  var onDragStart = (event: DragEvent, index: number) => {
    draggedItemIndex.value = index;
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  };

  var onDrop = (index: number) => {
    if (draggedItemIndex.value === null || draggedItemIndex.value === index) return;

    const draggedItem = tasks.value.splice(draggedItemIndex.value, 1)[0];

    tasks.value.splice(index, 0, draggedItem);

    draggedItemIndex.value = null;
  };
</script>

<template>
  <article>
    <h2>task table</h2>
    <section class="task-table">
      <BaseUICard title="+" @click="toggleCreation" />
      <BaseUICard
        v-for="(value, index) in tasks"
        :key="value"
        :title="value"
        @click="toggleCurrentKey(value)"
        draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover.prevent
        @drop="onDrop(index)"
        :class="{ 'is-dragging': draggedItemIndex === index}"
      />
    </section>
    <Teleport v-if="isCreatingTask || isOpenTask" to="body">
      <TaskCreationMenu v-if="isCreatingTask" />
      <ViewTaskMenu
        v-else-if="isOpenTask !== null"
        :title="isOpenTask" 
      />
    </Teleport>
  </article>
</template>

<style scoped>
.task-table {
  display: flex;
  column-gap: 1em;
  flex-wrap: wrap;
}
.is-dragging {
  opacity: 0.5;
  border: 2px solid #ccc;
}
</style>
