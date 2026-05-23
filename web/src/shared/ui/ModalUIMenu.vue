<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { TELEPORT_TARGET } from '../config/teleports';
  defineProps<{ isOpen: boolean }>();

  onBeforeMount(() => {
    const targetId = TELEPORT_TARGET.MODAL.replace('#', '')
    if(!document.getElementById(targetId)) {
      var el = document.createElement('div');
      el.id = targetId;
      document.body.appendChild(el);
    };
  });
</script>

<template>
  <Teleport :to="TELEPORT_TARGET.MODAL">
    <div v-if="isOpen">
      <slot />
    </div>
  </Teleport>
</template>
