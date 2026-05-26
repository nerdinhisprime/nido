<script setup lang="ts">
  import { ref } from 'vue';
  import { BaseUIMenu, ModalUIMenu } from '@/shared';
  import { GetItemDescription } from '../lib/GetItemDescription';
  import { RemoveItemStorage } from '@/features/remove-item-storage';
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
      <RemoveItemStorage @click="openRemoveItemMenu = true" />
    </BaseUIMenu>
  </ModalUIMenu>
  <RemoveItemMenu v-model:isOpen="openRemoveItemMenu" :removeItemId="props.title" />
</template>
