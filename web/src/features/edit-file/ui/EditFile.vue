<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { useCodeMirror, initFS } from '@/shared';

const props = defineProps<{ fileName: string }>();

const { readFile, writeFile } = initFS(); 
const { fromState, editorContainer, editorView } = useCodeMirror();

const initialContent = ref<string>('');

const loadContent = async () => {
  const content = await readFile(props.fileName);
  if (content !== null) {
    fromState.fileContent = content;
    fromState.fileName = props.fileName;
    initialContent.value = content;
  }
};

onMounted(() => loadContent());

watch(() => props.fileName, () => loadContent());

const saveCurrentFile = async () => {
  if (!editorView.value) return;

  const currentContent = editorView.value.state.doc.toString();

  if (currentContent !== initialContent.value) {
    await writeFile(props.fileName, currentContent);
    initialContent.value = currentContent;
  }
};

const handleFocusOut = (event: FocusEvent) => {
  const wrapper = event.currentTarget as HTMLElement;
  const newTarget = event.relatedTarget as Node;

  if (!wrapper.contains(newTarget)) {
    saveCurrentFile();
  }
};

const handleWrapperFocus = () => {
  if (editorContainer.value) {
    editorView.value?.focus();
  }
};
</script>

<template>
  <div 
    class="itemsarr"
    tabindex="0"
    @focus="handleWrapperFocus"
    @focusout="handleFocusOut"
  >
    <div
      ref="editorContainer"
      style="code-editor-instance"
    >
    </div>
  </div>
</template>
