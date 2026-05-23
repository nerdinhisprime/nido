<script setup lang="ts">
  import { BaseUIMenu } from '@/shared';
  import { RemoveItemStorage } from '../lib/RemoveItemStorage';
  import { ModalUIMenu } from '@/shared';

  defineProps<{
    removeItemId: string | null,
    isOpen: boolean,
  }>();
  const emit = defineEmits(['close-menu'])
</script>

<template>
  <ModalUIMenu :isOpen="isOpen">
    <BaseUIMenu title="Deleting a task" class="deleting-menu">
      <label for="actions">Are you sure you want to delete this task? [Y/n]: </label>
      <div class="btns-container">
        <button @click="RemoveItemStorage(removeItemId)" id="actions">Yes</button>
        <button @click="emit('close-menu', false)">No</button>
      </div>
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
