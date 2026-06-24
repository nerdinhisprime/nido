<script setup lang="ts">
import { ref } from 'vue';

const dialogRef = ref<HTMLDialogElement | null>(null)
const open = () => dialogRef.value?.showModal()
const close = () => dialogRef.value?.showModal()

defineExpose({
  open,
  close,
})
</script>

<template>
  <dialog ref="dialogRef" @click="dialogRef?.close()">
    <article @click.stop class="article">
      <h2>Create a task</h2>
      <section>
        <slot></slot>
      </section>
    </article>
  </dialog>
</template>

<style scoped>
.article {
  display: flex;
  flex-direction: column;
  width: 96vw;
  height: 96vh;
  background-color: pink;
  box-sizing: border-box;
}
.editor-box {
  overflow: hidden;
}
:deep(.cm-editor) {
}

:deep(.cm-editor.cm-focused) {
  outline: none;
}
</style>

