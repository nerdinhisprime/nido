<script setup lang="ts">
  import { BaseUIMenu } from '@/shared';
  import { GetItemStorage } from '../api/GetItemStorage';
  var props = defineProps({
    title: {
      type: String,
      required: true,
      default: 'ПУСТОЙ TITLE'
    },
    description: {
      type: String,
      required: false,
      default: 'ПУСТОЙ TITLE'
    },
  });
</script>

<template>
  <BaseUIMenu :title="props.title" :description="GetItemStorage(props.title)" />
</template>
