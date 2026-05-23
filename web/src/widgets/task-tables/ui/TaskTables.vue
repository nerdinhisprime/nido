<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { BaseUICard } from '@/shared';
  import { TaskCreationMenu } from '@/features/task-creation-menu';
  import { ViewTaskMenu } from '@/features/view-task-menu';
  import { GetKeysStorageArray } from '../lib/GetKeysStorage';
  import { RemoveItemStorage } from '@/features/remove-item-storage';
  import { RemoveItemMenu } from '@/features/remove-item-menu';

  const tasks = computed(() => GetKeysStorageArray());
  const isOpenTask = ref<string | null>(null);
  const isCreatingTask = ref<boolean>(false);
  const draggedItemIndex = ref<number | null>(null);
  var isOpenTest = ref(false)

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
  var closeRemoveItemMenu = (msg: boolean) => isOpenTest.value = msg;
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
        :class="{ 'is-dragging': draggedItemIndex === index}"
        draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover.prevent
        @drop="onDrop(index)"
      >
        <RemoveItemStorage @click.prevent.stop="isOpenTest = !isOpenTest" />
      </BaseUICard>
    </section>

    <TaskCreationMenu :isOpen="isCreatingTask" />
    <ViewTaskMenu :isOpen="isOpenTask !== null" v-if="isOpenTask !== null" :title="isOpenTask" />
    <RemoveItemMenu :isOpen="isOpenTest" @close-menu="closeRemoveItemMenu" :removeItemId="isOpenTask" />
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
