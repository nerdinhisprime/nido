<script setup lang="ts">
  import { reactive } from 'vue';
  import { BaseUIMenu, ModalUIMenu, TrashButton, PenButton } from '@/shared';
  import { DeleteTaskMenu } from '@/features/delete-task-menu';
  import { EditTaskMenu } from '@/features/edit-task-menu';
  import { GetItemDescription } from '../lib/GetItemDescription';

  var open = reactive({
    removeTaskMenu: false,
    editTaskMenu: false,
  });

  var model = defineModel('isOpen', { default: false });
  defineProps({
    title: {
      type: String,
      required: false,
      default: 'EMPTY TITLE'
    },
  });
</script>

<template>
  <ModalUIMenu v-model:isOpen="model">
    <BaseUIMenu :title="title">
      <p>{{ GetItemDescription(title) }}</p>
      <TrashButton @click="open.removeTaskMenu = true" />
      <PenButton @click="open.editTaskMenu = true" />
    </BaseUIMenu>
  </ModalUIMenu>
  <DeleteTaskMenu v-model:isOpen="open.removeTaskMenu" :removeItemId="title" />
  <EditTaskMenu v-model:isOpen="open.editTaskMenu" :editTaskTitle="title"/>
</template>
