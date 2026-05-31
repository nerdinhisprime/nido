<script setup lang="ts">
  import { BaseUICard, PenButton, TrashButton, MenuToggle } from '@/shared';
  import { CreateTaskMenu } from '@/features/create-task-menu';
  import { ViewTaskMenu } from '@/features/view-task-menu';
  import { DeleteTaskMenu } from '@/features/delete-task-menu';
  import { EditTaskMenu } from '@/features/edit-task-menu';
  import { index } from '../lib/index';

  const {
    tasks,
    isOpenTask,
    openRemoveKeyMenu,
    openRedactorMenu,
    taskKeyRemove,
    taskKeyRedactor,
    isCreatingTask,
    draggedItemIndex,
    isTaskMenuOpen,
    toggleCurrentKey,
    toggleCreation,
    onDragStart,
    onDrop,
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
        @click.stop="toggleCurrentKey(v)"
        :class="{ 'is-dragging': draggedItemIndex === i}"
        draggable="true"
        @dragstart="onDragStart($event, i)"
        @dragover.prevent
        @drop="onDrop(i)"
        :showCreationDate="true"
      >
        <MenuToggle>
          <TrashButton
            @click.stop="taskKeyRemove = v; openRemoveKeyMenu = true"
            btn-title="Delete"
          />
          <PenButton
            @click.stop="taskKeyRedactor = v; openRedactorMenu = true"
            btn-title="Change the title"
          />
        </MenuToggle>
      </BaseUICard>
    </section>

    <CreateTaskMenu v-model:isOpen="isCreatingTask" />
    <ViewTaskMenu v-model:isOpen="isTaskMenuOpen" v-if="isOpenTask !== null" :title="isOpenTask" />
    <DeleteTaskMenu v-model:isOpen="openRemoveKeyMenu" :removeItemId="taskKeyRemove" />
    <EditTaskMenu v-model:isOpen="openRedactorMenu" :editTaskTitle="taskKeyRedactor" />
  </article>
</template>

<style scoped>
.task-table {
  display: flex;
  gap: 1em;
  --flex-wrap: wrap;
  width: 100vh;
  height: 80vh
}
.is-dragging {
  opacity: 0.5;
  border: 2px solid #ccc;
}
</style>
