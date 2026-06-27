<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useCodeMirror, initFS } from '@/shared';

const props = defineProps<{
  fileName: string;
}>();

const { readFile } = initFS();
const { fromState, editorContainer, editorView } = useCodeMirror();

const loadContent = async () => {
  const content = await readFile(props.fileName);
  if (content !== null) {
    fromState.fileContent = content;
    fromState.fileName = props.fileName;
  }
};

onMounted(() => {
  loadContent();
});

watch(() => props.fileName, () => {
  loadContent();
});
const handleWrapperFocus = () => {
  if (editorContainer.value) {
    editorView.value?.focus()
  }
}
</script>

<template>
  <div class="itemsarr" tabindex="0" @focus="handleWrapperFocus">
    <div
      ref="editorContainer"
      style="code-editor-instance"
    >
    </div>
  </div>
</template>
