<script setup lang="ts">
import { ref } from 'vue';
import { useUpdateTasksList, CustomDialog } from '@/shared';
const {
  filesArr,
  fromState,
  editorContainer,
  loadDataCurrentFile,
  writeFile
} = useUpdateTasksList()
const {
  editorContainer: secondECCopy,
  loadDataCurrentFile: secondLDCFCopy,
} = useUpdateTasksList()

const customDialogRef = ref<InstanceType<typeof CustomDialog> | null>(null)
const currentFileName = ref('')
</script>

<template>
  <article>
    <section class="files-list">
      <button
        v-for="file in filesArr"
        :key="file.name"
        class="files"
        @click="customDialogRef?.open(); loadDataCurrentFile(file.name)"
        @focus="currentFileName = file.name; secondLDCFCopy(file.name)"
      >
        {{ file.name }}
      </button>
    </section>
  </article>

  <article class="editor-window">
    <input type="text" v-model="currentFileName" class="filename-input">
    <section>
      <div ref="secondECCopy"></div>
    </section>
  </article>
  <CustomDialog ref="customDialogRef">
    <div>
      <input type="text" v-model="fromState.fileName">
      <div ref="editorContainer"></div>
      <button @click="writeFile(
        fromState.fileName,
        fromState.fileContent
      )">submit</button>
    </div>
  </CustomDialog>
</template>

<style scoped>
.files-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.files {
  width: 100px;
  aspect-ratio: 1;
}
.editor-window {
  display: flex;
  flex-direction: column;
  background-color: #1a1c1e;
  border-radius: 12px;
}
.filename-input {
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #e3e2e6;
  background-color: transparent;
  font-family: JetBrains Mono, Fira Code, monospace;
  border: none;
  outline: none;
}
</style>
