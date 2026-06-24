<script setup lang="ts">
import { ref } from 'vue';
import { CustomDialog, useCodeMirror, initFS } from '@/shared';

const childRef = ref<InstanceType<typeof CustomDialog> | null>(null)
const { fromState, editorContainer } = useCodeMirror()
const { writeFile } = initFS()

</script>

<template>
  <button @click="childRef?.open()">create a task</button>
  <CustomDialog ref="childRef">
    <div>
      <input
        type="text"
        id="fileName"
        v-model="fromState.fileName"
      >
      <div
        id="fileContent"
        ref="editorContainer"
        class="editor-box"
      ></div>
      <button @click="writeFile(
        fromState.fileName,
        fromState.fileContent
      )">submit</button>
    </div>
  </CustomDialog>
</template>
