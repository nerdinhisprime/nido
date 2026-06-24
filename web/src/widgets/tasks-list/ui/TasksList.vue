<script setup lang="ts">
import { ref } from 'vue';
import { useUpdateTasksList, useKeyPress } from '@/shared';

const {
  filesArr,
} = useUpdateTasksList()

const {
  editorContainer: secondECCopy,
  loadDataCurrentFile: secondLDCFCopy,
} = useUpdateTasksList()

const editorWindowRef = ref<HTMLElement | null>(null)
const tasksListRef = ref<HTMLElement | null>(null)
const currentFileName = ref('')

useKeyPress({
  'ctrl+u': () => {
    if (secondECCopy.value) {
      secondECCopy.value.focus();
    }
  },
  'ctrl+i': () => {
    if (tasksListRef.value) {
      const firstButton = tasksListRef.value.querySelector<HTMLButtonElement>('.files');
      if (firstButton) firstButton.focus()
      else tasksListRef.value.focus()
    }
  },
  'ctrl+l': () => {
    if (tasksListRef.value?.contains(document.activeElement)) {
      const buttons = Array.from(tasksListRef.value.querySelectorAll<HTMLButtonElement>('.files'));
      const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex]?.focus();
      }
    }
  },
  'ctrl+h': () => {
    if (tasksListRef.value?.contains(document.activeElement)) {
      const buttons = Array.from(tasksListRef.value.querySelectorAll<HTMLButtonElement>('.files'));
      const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (currentIndex !== -1) {
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[prevIndex]?.focus();
      }
    }
  }
});


</script>

<template>
  <article>
    <section ref="tasksListRef" class="files-list" tabindex="-1">
      <button
        v-for="file in filesArr"
        :key="file.name"
        class="files"
        @click="editorWindowRef.focus()"
        @focus="currentFileName = file.name; secondLDCFCopy(file.name)"
      >
        {{ file.name }}
      </button>
    </section>
  </article>

  <article ref="editorWindowRef" tabindex="-1" class="editor-window">
    <input type="text" v-model="currentFileName" class="filename-input">
    <section>
      <div
        ref="secondECCopy"
      ></div>
    </section>
  </article>
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
  border: none;
}

.editor-window {
  margin-top: 10px
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
