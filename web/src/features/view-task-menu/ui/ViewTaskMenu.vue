<script setup lang="ts">
  import { ref } from 'vue';
  import { BaseUIMenu, ModalUIMenu, TrashButton, PenButton } from '@/shared';
  import { GetItemDescription } from '../lib/GetItemDescription';
  import { DeleteTaskMenu } from '@/features/delete-task-menu';

  var openRemoveItemMenu = ref(false);
  var model = defineModel('isOpen', { default: false });
  var props = defineProps({
    title: {
      type: String,
      required: false,
      default: 'EMPTY TITLE'
    },
  });
</script>

<template>
  <ModalUIMenu v-model:isOpen="model">
    <BaseUIMenu :title="props.title">
      <p>{{ GetItemDescription(props.title) }}</p>
      <TrashButton @click="openRemoveItemMenu = true" />
      <PenButton />
    </BaseUIMenu>
  </ModalUIMenu>
  <DeleteTaskMenu v-model:isOpen="openRemoveItemMenu" :removeItemId="props.title" />
</template>
