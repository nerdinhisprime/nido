<script setup lang="ts">
import { useGridNavigation } from '../model';
import EditFile from '@features/edit-file';
import AppDialog from '@/shared'

const {
  metaarr,
  gridContainer,
  modalRef,
  handleFileFocus,
  delFile,
} = useGridNavigation();

</script>

<template>
  <article>
    <section ref="gridContainer" class="y_container">
      <div v-if="metaarr[0]" class="x_container">
        <EditFile
          v-for="(value, xIdx) in metaarr[0]"
          :key="value.label"
          :fileName="value.label as string"
          :autofocus="xIdx === 0"
          @focus="handleFileFocus(xIdx as number, value.label as string)"
        />
      </div>
    </section>
  </article>
  <AppDialog ref="modalRef">
    <dir class="delite-file-menu">
      <p>trash current file?</p>
      <div>
        <button
          @click="delFile"
          @keydown.y="delFile"
        >[Y]es</button>
      </div>
    </dir>
  </AppDialog>
</template>

<style scoped>
.y_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.x_container {
  display: flex;
  margin: auto;
  gap: 10px;
}
.delite-file-menu {
  margin: 0;
  padding: 0;
  background-color: #1a1c1e;
  color: #e3e2e6
}
</style>
