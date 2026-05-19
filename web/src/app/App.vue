<script setup lang="ts">
  import { ref } from 'vue';
  var variable = ref<string>('something interesting');
</script>
<template>
  <article>
    <h1>{{ variable }}</h1>
  </article>
</template>
