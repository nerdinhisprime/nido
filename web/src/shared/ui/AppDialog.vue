<script setup lang="ts">
import { ref } from 'vue';

const dialogRef = ref<HTMLDialogElement | null>(null)
const open = () => dialogRef.value?.showModal()
const close = () => dialogRef.value?.close()

defineExpose({open, close,})
</script>

<template>
  <dialog ref="dialogRef" @click="dialogRef?.close()">
    <article @click.stop class="article">
      <slot></slot>
    </article>
  </dialog>
</template>
