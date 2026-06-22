<script setup lang="ts">
import { ref } from 'vue';
import { initCodeMirror } from '../lib/code-mirror';
import { initFS } from '@/shared/api';

const {
  fromState,
  editorContainer
} = initCodeMirror()

const {
  writeFile,
} = initFS()

const isVisibleMenu = ref<HTMLDialogElement | null>(null)
</script>

<template>
  <button @click="isVisibleMenu?.showModal()">Create a task</button>
  <dialog ref="isVisibleMenu" @click="isVisibleMenu?.close()">
    <article @click.stop class="article">
      <h2>Create a task</h2>
      <section>
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
      </section>
    </article>
  </dialog>
</template>

<style scoped>
dialog {
  background-color: transparent;
}
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px)
}
.article {
  display: flex;
  flex-direction: column;
  padding: 25px;
  width: 900px;
  height: 600px;
  background-color: pink;
  box-sizing: border-box;
}
.editor-box {
  overflow: hidden;
}
:deep(.cm-editor) {
  min-height: 400px;
  height: auto;
}

:deep(.cm-editor.cm-focused) {
  outline: none;
}
</style>
