<script setup lang="ts">
  import { BaseUIMenu, ModalUIMenu } from '@/shared';
  import { GetItemStorage } from '../lib/GetItemStorage';

  var model = defineModel('isOpen', { default: false });

  var props = defineProps({
    title: {
      type: String,
      required: false,
      default: 'EMPTY TITLE'
    },
    description: {
      type: String,
      required: false,
      default: 'EMPTY DESCRIPTION'
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  });
</script>

<template>
  <ModalUIMenu v-model:isOpen="model">
    <BaseUIMenu :title="props.title">
      <p>{{ GetItemStorage(props.title) }}</p>
    </BaseUIMenu>
  </ModalUIMenu>
</template>
