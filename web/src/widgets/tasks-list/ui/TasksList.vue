<script setup lang="ts">
import { useGridNavigation } from '../model';
import EditFile from '@features/edit-file';

const {
  metaarr,
  gridContainer,
  handleFileFocus,
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
</style>
