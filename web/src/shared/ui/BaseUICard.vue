<script setup lang="ts">
import { GetCreationDate } from "../lib/GetCreationDate";
interface Props {
	title?: string;
	description?: string | null;
	showCreationDate?: boolean;
}

const {
	title = "WHERE IS MY TITLE???!",
	description = "",
	showCreationDate = false,
} = defineProps<Props>();
</script>

<template>
  <article class="base-ui-card">
    <nav class="base-ui-card__container">
      <h2 class="base-ui-card__title">{{ title }}</h2>
      <div
        style="display: flex; align-items: center; column-gap: 40px;"
      >
        <p class="base-ui-card__time" v-if="showCreationDate">
          Created: <time datetime="2026-05-23">{{ GetCreationDate(title) }}</time>
        </p>
        <slot />
      </div>
    </nav>
    <section class="base-ui-card__description">
      <p>{{ description }}</p>
    </section>
  </article>
</template>

<style scoped>
.base-ui-card {
  padding: 10px;
  min-width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.base-ui-card__container {
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;
  background-color: #111;
}
.base-ui-card__title
.base-ui-card__time {
  display: inline;
}
.base-ui-card__description {
  height: calc(100% - 110px);
  background-color: #111;
}
.base-ui-card:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
