<script setup lang="ts">
  import { ref } from 'vue';
  import { BaseUIMenu, ModalUIMenu, TrashButton } from '@/shared';
  import { GetItemDescription } from '../lib/GetItemDescription';
  import { RemoveItemMenu } from '@/features/remove-item-menu';

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
    </BaseUIMenu>
  </ModalUIMenu>
  <RemoveItemMenu v-model:isOpen="openRemoveItemMenu" :removeItemId="props.title" />
</template>
