<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { BaseUICard, PenButton, TrashButton, MenuToggle } from '@/shared';
import { CreateTaskMenu } from '@/features/create-task-menu';
import { ViewTaskMenu } from '@/features/view-task-menu';
import { DeleteTaskMenu } from '@/features/delete-task-menu';
import { EditTaskMenu } from '@/features/edit-task-menu';
import { index } from '../lib/index';
import { GetValueStorageFN } from '../lib/GetValueStorage';

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


const activeIndex = ref<number>(0);

const cardRefs = ref<InstanceType<typeof BaseUICard>[]>([]);

const scrollToActiveCard = () => {
  nextTick(() => {
    const activeCardComponent = cardRefs.value[activeIndex.value];
    const element = activeCardComponent?.$el || activeCardComponent;

    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    };
  });
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.altKey && e.ctrlKey && e.key === 'l') {
    if (activeIndex.value < tasks.value.length) {
      activeIndex.value++;
      scrollToActiveCard();
    }
  };

  if (e.altKey && e.ctrlKey && e.key === 'h') {
    if (activeIndex.value > 0) {
      activeIndex.value--;
      scrollToActiveCard();
    }
  };

  if (e.altKey && e.ctrlKey && e.key === 'a') toggleCreation();

  if (e.altKey && e.ctrlKey && e.key === 'd') {
    if (activeIndex.value > 0 && tasks.value[activeIndex.value - 1]) {
      taskKeyRemove.value = tasks.value[activeIndex.value - 1];
      openRemoveKeyMenu.value = true;
    };
  };

  if (
    e.key === 'Enter' &&
    activeIndex.value > 0 &&
    tasks.value[activeIndex.value - 1]
  ) toggleCurrentKey(tasks.value[activeIndex.value - 1])

  if (e.key === 'Escape') {
    openRemoveKeyMenu.value = false;
    openRedactorMenu.value = false;
    isCreatingTask.value = false;
    isOpenTask.value = null;
  };
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});


</script>

<template>
  <article>
    <h2>task table</h2>
    <section class="task-table">
      <BaseUICard 
        ref="cardRefs"
        title="+" 
        @click="toggleCreation" 
        :class="{ 'active': activeIndex === 0 }"
      />

      <BaseUICard
        v-for="(v, i) in tasks"
        :key="v"
        ref="cardRefs"
        :title="v"
        @click.stop="toggleCurrentKey(v); activeIndex = i + 1"
        :class="{ 
          'is-dragging': draggedItemIndex === i,
          'active': activeIndex === i + 1 
        }"
        :description="GetValueStorageFN(v)"
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
  flex-direction: row;
  gap: 1em;
  width: 100vw;
  height: 80vh;
  flex-wrap: nowrap;
}

.is-dragging {
  opacity: 0.5;
  border: 2px solid #ccc;
}

.task-table :deep(.window-pane.active), 
.task-table :deep(.active) {
  outline: 2px solid #42b883;
  box-shadow: 0 0 10px rgba(66, 184, 131, 0.5);
  transition: all 0.2s ease;
}
</style>
