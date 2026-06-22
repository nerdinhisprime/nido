<script setup lang="ts">
  import { initFS } from '@/shared/api';
  const { status, pickDirPath } = initFS()
</script>

<template>
  <button @click="pickDirPath">{{ status }}</button>
</template>
