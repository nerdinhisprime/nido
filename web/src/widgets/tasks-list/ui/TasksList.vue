<script setup lang="ts">
import { useGridNavigation } from '../model';

const {
  metaarr,
  gridContainer,
  onFocusCell
} = useGridNavigation();
</script>

<template>
  <article>
    <section ref="gridContainer" class="y_container">
      <div 
        v-for="(row, yIdx) in metaarr" 
        :key="yIdx" 
        class="x_container"
      >
        <button
          v-for="(value, xIdx) in row"
          :key="xIdx"
          class="itemsarr"
          tabindex="0"
          :autofocus="yIdx === 0 && xIdx === 0"
          @focus="onFocusCell(yIdx, xIdx as number)"
        >
          {{ value }}
        </button>
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
