<script setup lang="ts">
  import { reactive } from 'vue';
  import { BaseUIMenu, ModalUIMenu } from '@/shared';
  import { SetItemStorage } from '../lib/SetItemStorage';
  import { taskDataTypes } from '@/shared/lib';

  defineProps<{ isOpen: boolean }>();

  var taskData = reactive<taskDataTypes>({
    taskName: '',
    taskDescription: '',
    taskCreationData: new Intl.DateTimeFormat('en-CA').format(new Date()),
  });
</script>

<template>
  <ModalUIMenu :isOpen="isOpen">
    <BaseUIMenu title="Crete task">
      <form @submit.prevent="SetItemStorage(taskData.taskName, taskData)">
        <div>
          <label for="tasks-name">Task's name</label>
          <input v-model="taskData.taskName" id="tasks-name" type="text" placeholder="...">
        </div>
        <div>
          <label for="tasks-description">Task's description</label>
          <input v-model="taskData.taskDescription" id="tasks-description" type="text" placeholder="...">
        </div>
        <button type="submit">Create the task</button>
      </form>
    </BaseUIMenu>
  </ModalUIMenu>
</template>
