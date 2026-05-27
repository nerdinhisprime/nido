<script setup lang="ts">
  import { ref } from 'vue';
  import { ModalUIMenu, BaseUIMenu } from '@/shared';

  const newTaskTitle = ref<string>('');
  const model = defineModel<boolean>('isOpen', { default: false });
  const { editTaskTitle } = defineProps({
    editTaskTitle: {
      type: String,
      required: true,
    },
  });
  const fn = (): void => {
    localStorage.setItem(
      newTaskTitle.value,
      localStorage.getItem(editTaskTitle) || 'Нет данных: @features/edit-task-menu/ui/EditTaskMenu.vue'
    );
    localStorage.removeItem(editTaskTitle);
  };
</script>

<template>
  <ModalUIMenu v-model:isOpen="model">
    <BaseUIMenu title="Redact this task">
      <form @submit.prevent="fn">
        <div>
          <label for="rename_task_name">task name: </label>
          <input
            v-model="newTaskTitle"
            id="rename_task_name"
            type="text"
            :placeholder="editTaskTitle"
          >
        </div>
        <button type="submit">Rename</button>
      </form>
    </BaseUIMenu>
  </ModalUIMenu>
</template>
