<script setup lang="ts">
  import { BaseUIMenu, ModalUIMenu } from '@/shared';
  import { DeleteTaskFn } from '../lib/DeleteTaskFn';

  var model = defineModel<boolean>('isOpen', { default: false })
  defineProps<{ removeItemId: string | null }>();
</script>

<template>
  <ModalUIMenu v-model:isOpen="model">
    <BaseUIMenu title="Delete this task" class="deleting-menu">
      <label for="actions">Are you sure you want to delete this task? [Y/n]: </label>
      <button @click="DeleteTaskFn(removeItemId)" id="actions">Delete</button>
    </BaseUIMenu>
  </ModalUIMenu>
</template>

<style scoped>
.deleting-menu {
  display: inline-grid;
  z-index: 9999;
}
.btns-container {
  text-align: center;
}
</style>
