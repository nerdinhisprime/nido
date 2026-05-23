<script setup lang="ts">
  import { BaseUIMenu, ModalUIMenu } from '@/shared';
  import { GetItemStorage } from '../lib/GetItemStorage';
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
  <ModalUIMenu :isOpen="isOpen">
    <BaseUIMenu :title="props.title">
    <p>{{ GetItemStorage(props.title) }}</p>
    </BaseUIMenu>
  </ModalUIMenu>
</template>
