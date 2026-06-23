<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { initFS, initCodeMirror, CustomDialog } from '@/shared';

const { status, readDirContents } = initFS()
const FilesArr = ref<any>([])
const customDialogRef = ref<InstanceType<typeof CustomDialog> | null>(null)
const updateList = async () => {
  FilesArr.value = await readDirContents()
}

const { fromState, editorContainer } = initCodeMirror()
const { writeFile, readFile } = initFS()

const loadDataCurrentFile = async (filename: string) => {
  fromState.fileName = filename
  fromState.fileContent = await readFile(filename) || ''
}

watch(status, () => {
  updateList()
})

onMounted(async () => {
  await updateList()
})
</script>

<template>
  <article>
    <h2>list: {{ status }}</h2>
    <section class="files-list">
      <div
        v-for="file in FilesArr"
        :key="file.name"
        class="files"
        @click="customDialogRef?.open(); loadDataCurrentFile(file.name)"
      >
        {{ file.name }}
      </div>
    </section>
  </article>
  <CustomDialog ref="customDialogRef">
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

<style scoped>
.files-list {
  display: flex;
  gap: 10px;
}
.files {
  width: 100px;
  height: 100px;
  background-color: #FFEFDF;
  color: black;
}
</style>
