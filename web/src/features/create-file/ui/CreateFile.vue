<script setup lang="ts">
  import { ref } from 'vue';
  import AppDialog, { useKeyPress, useUpdateTasksList } from '@/shared';

  const { writeFile, updateList } = useUpdateTasksList()
  const modalRef = ref<InstanceType<typeof AppDialog> | null>()
  const inputStr = ref<string>('')

  useKeyPress({'ctrl+m': () => modalRef.value?.open()})
</script>

<template>
  <AppDialog ref="modalRef">
    <div class="file-name-form__container">
      <h3>make a file:</h3>
      <section>
        <input
          v-model="inputStr"
          type="text"
          placeholder="file name"
          @keyup.enter="
            writeFile(inputStr, '');
            modalRef?.close();
            updateList()
          "
        >
      </section>
    </div>
  </AppDialog>
</template>

<style scoped>
.file-name-form__container>* {
  margin: 0;
  padding: 0;
  background-color: #1a1c1e;
  color: #e3e2e6
}
</style>

