<script setup lang="ts">
  import { BaseUIMenu, ModalUIMenu } from '@/shared';
  import { RemoveItemStorage } from '../lib/RemoveItemStorage';

  var model = defineModel<boolean>('isOpen', { default: false })

  defineProps<{ removeItemId: string | null }>();
</script>

<template>
  <ModalUIMenu v-model:isOpen="model">
    <BaseUIMenu title="Deleting a task" class="deleting-menu">
      <label for="actions">Are you sure you want to delete this task? [Y/n]: </label>
      <div class="btns-container">
        <button @click="RemoveItemStorage(removeItemId)" id="actions">Yes</button>
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
