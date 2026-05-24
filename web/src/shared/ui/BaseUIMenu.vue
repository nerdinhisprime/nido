<script setup lang="ts">
  var props = defineProps({
    title: {
      type: String,
      required: true,
      default: 'Empty TITLE'
    },
    description: {
      type: String || undefined ,
      required: false,
    },
  });
</script>

<template>
  <article class="base-ui-menu">
    <h2>{{ props.title }}</h2>
    <section>
      <p v-if="props.description">{{ props.description }}</p>
      <slot v-else />
    </section>
  </article>
</template>

<style scoped>
.base-ui-menu {
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
