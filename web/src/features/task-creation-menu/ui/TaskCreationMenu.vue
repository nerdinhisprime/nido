<script setup lang="ts">
  import { ref } from 'vue';
  import { BaseUIMenu, ModalUIMenu } from '@/shared';
  import { SetItemStorage } from '../lib/SetItemStorage';

  defineProps<{ isOpen: boolean }>()

  var tasks_name = ref<string>('')
  var tasks_description = ref<string>('')
</script>

<template>
  <ModalUIMenu :isOpen="isOpen">
    <BaseUIMenu title="Crete task">
      <form @submit.prevent="SetItemStorage(tasks_name, tasks_description)">
        <div>
          <label for="tasks-name">Task's name</label>
          <input v-model="tasks_name" id="tasks-name" type="text" placeholder="...">
        </div>
        <div>
          <label for="tasks-description">Task's description</label>
          <input v-model="tasks_description" id="tasks-description" type="text" placeholder="...">
        </div>
        <button type="submit">Create the task</button>
      </form>
    </BaseUIMenu>
  </ModalUIMenu>
</template>
