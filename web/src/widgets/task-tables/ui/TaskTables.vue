<script setup lang="ts">
  import { BaseUICard } from '@/shared';
  import { TaskCreationMenu } from '@/features/task-creation-menu';
  import { ViewTaskMenu } from '@/features/view-task-menu';
  import { RemoveItemStorage } from '@/features/remove-item-storage';
  import { RemoveItemMenu } from '@/features/remove-item-menu';
  import { index } from '../lib/index';
  import { computed } from 'vue';

// Имя переменной isOpenTask у тебя уже есть, создаем computed рядом:
const isTaskMenuOpen = computed({
  get() {
    return isOpenTask.value !== null;
  },
  set(newValue) {
    if (!newValue) {
      isOpenTask.value = null; // Когда модель становится false, сбрасываем таску
    }
  }
});

  const {
    tasks,
    isOpenTask,
    isOpenTest,
    isCreatingTask,
    draggedItemIndex,
    toggleCurrentKey,
    toggleCreation,
    onDragStart,
    onDrop,
    closeRemoveItemMenu,
  } = index();
</script>

<template>
  <article>
    <h2>task table</h2>
    <section class="task-table">
      <BaseUICard title="+" @click="toggleCreation" />
      <BaseUICard
        v-for="(v, i) in tasks"
        :key="v"
        :title="v"
        @click="toggleCurrentKey(v)"
        :class="{ 'is-dragging': draggedItemIndex === i}"
        draggable="true"
        @dragstart="onDragStart($event, i)"
        @dragover.prevent
        @drop="onDrop(i)"
        :showCreationDate="true"
      >
        <RemoveItemStorage @click.prevent.stop="isOpenTest = !isOpenTest" />
      </BaseUICard>
    </section>

    <TaskCreationMenu v-model:isOpen="isCreatingTask" />
    <ViewTaskMenu v-model:isOpen="isTaskMenuOpen" v-if="isOpenTask !== null" :title="isOpenTask" />
    <RemoveItemMenu v-model:isOpen="isOpenTest" :removeItemId="isOpenTask" />
  </article>
</template>

<style scoped>
.task-table {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
}
.is-dragging {
  opacity: 0.5;
  border: 2px solid #ccc;
}
</style>
