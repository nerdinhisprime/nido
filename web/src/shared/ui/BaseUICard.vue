<script setup lang="ts">
  import { getDateData } from '../lib/BaseUICard';
  interface Props {
    title?: string;
    description?: string;
    showCreationDate?: boolean;
  }

  const {
    title = 'WHERE IS MY TITLE???!',
    description,
    showCreationDate = false
  } = defineProps<Props>();
</script>

<template>
  <article class="base-ui-card">
    <h4>{{ title }}</h4>
    <section>
      <p>{{ description }}</p>
      <slot />
      <p v-if="showCreationDate">
        Created: <time datetime="2026-05-23">{{ getDateData(title) }}</time>
      </p>
    </section>
  </article>
</template>

<style scoped>
.base-ui-card {
  width: 230px;
  height: 170px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.base-ui-card:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
