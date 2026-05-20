<script setup lang="ts">
  var props = defineProps({
    title: {
      type: String,
      required: true, // Проп обязателен
      default: 'WHERE IS A TITLE???'
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  });
</script>

<template>
  <article class="base-ui-card">
    <h4>{{ props.title }}</h4>
    <section>
      <p>{{ props.description }}</p>
    </section>
  </article>
</template>

<style scoped>
.base-ui-card {
  width: 100px;
  aspect-ratio: 1;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
