<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { index } from "../lib/index";
import { BaseUICard, PenButton, TrashButton, MenuToggle } from "@/shared";
import { CreateTaskMenu } from "@/features/create-task-menu";
import { ViewTaskMenu } from "@/features/view-task-menu";
import { DeleteTaskMenu } from "@/features/delete-task-menu";
import { EditTaskMenu } from "@/features/edit-task-menu";
import { GetValueStorageFN } from "../lib/GetValueStorage";
import { KeyHooks } from "../lib/KeyHooks";

const {
  arrOfTaskKeys,
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
  onDragStartFN,
  onDropEndFN,
} = index();

const cardRefs = ref<InstanceType<typeof BaseUICard>[]>([]);
const { activeIndex, keyHooksFN } = KeyHooks({
  cardRefs,
  arrOfTaskKeys,
  taskKeyRemove,
  openRemoveKeyMenu,
  openRedactorMenu,
  isCreatingTask,
  isOpenTask,
  toggleCurrentKey,
  toggleCreation
})

onMounted(() => {
  window.addEventListener("keydown", keyHooksFN);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keyHooksFN);
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
        v-for="(v, i) in arrOfTaskKeys"
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
        @dragstart="onDragStartFN($event, i)"
        @dragover.prevent
        @drop="onDropEndFN(i)"
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
