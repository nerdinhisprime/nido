<script setup lang="ts">
  import { ref } from 'vue';
  import { ModalUIMenu, BaseUIMenu } from '@/shared';

  var newName = ref<string>('');
  var model = defineModel<boolean>('isOpen', { default: false });
  defineProps({
    editTaskTitle: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <ModalUIMenu v-model:isOpen="model">
    <BaseUIMenu title="Redact this task">
      <form @submit.prevent="console.log(newName)">
        <div>
          <label for="rename_task_name">task name: </label>
          <input
            v-model="newName"
            id="rename_task_name"
            type="text"
            :placeholder="editTaskTitle"
          >
        </div>
        <button type="submit">Rename</button>
      </form>
    </BaseUIMenu>
  </ModalUIMenu>
</template>
