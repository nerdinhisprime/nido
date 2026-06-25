<script setup lang="ts">
import { useGridNavigation } from '../model';
import { useCodeMirror, initFS } from '@/shared';

const {
  readFile,
} = initFS()
const {
  fromState,
  editorContainer,
  editorView,
} = useCodeMirror()

const {
  metaarr,
  inputRef,
  codemirrorRef,
  gridContainer,
  onFocusCell
} = useGridNavigation(() => editorView.value);

const handleFileFocus = async (xIdx: number, fileName: string) => {
  onFocusCell(0, xIdx);

  const content = await readFile(fileName);

  if (content !== null) {
    fromState.fileContent = content;
    fromState.fileName = fileName;
  }
};
</script>

<template>
  <article>
    <section ref="gridContainer" class="y_container">
      <!--<div 
        v-for="(row, yIdx) in metaarr" 
        :key="yIdx" 
        class="x_container"
>-->
      <div v-if="metaarr[0]" class="x_container">
        <button
          v-for="(value, xIdx) in metaarr[0]"
          :key="xIdx"
          class="itemsarr"
          tabindex="0"
          :autofocus="xIdx === 0"
          @focus="handleFileFocus(xIdx as number, value.label as string)"
        >
          {{ value.label }}
        </button>
      </div>
      <div v-if="metaarr[1]" class="x_container">
        <input
          ref="inputRef"
          type="text"
          placeholder="file name"
          tabindex="0"
          @focus="onFocusCell(1, 0)"
        >
      </div>
      <div v-if="metaarr[2]" class="x_container">
        <div
          ref="editorContainer"
          style="width: 80vw;"
          tabindex="0"
          @focus="onFocusCell(2, 0)"
        >
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.itemsarr {
  height: 75px;
  background-color: navajowhite;
  color: black;
  outline: none;
}
.itemsarr:focus {
  background-color: papayawhip;
}
.y_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  padding-block: 25vh;
  box-sizing: border-box;
}

.x_container {
  display: flex;
  margin-inline: auto;
  gap: 10px;
}
</style>
