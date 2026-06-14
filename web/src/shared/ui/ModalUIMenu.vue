<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { TELEPORT_TARGET } from '../lib/teleports';
  import { BackdropZone } from '..';

  var model = defineModel<boolean>('isOpen', { default: false });

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
    <BackdropZone @click="model = !model" v-if="model">
      <slot />
    </BackdropZone>
  </Teleport>
</template>
