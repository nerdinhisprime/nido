<script setup lang="ts">
  import { EditorState } from '@codemirror/state'
  import { EditorView, basicSetup } from 'codemirror';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { markdown } from '@codemirror/lang-markdown';
  import { vim } from '@replit/codemirror-vim';
  import { onBeforeUnmount, onMounted, ref, computed } from 'vue';

  const editorContainer = ref<HTMLDivElement | null>(null);
  const fileName = ref<string>('file.md');
  const fileContent = ref<string>('');
  const directoryHandle = ref<any | null>(null);
  const statusError = ref<boolean>(false);
  let editorView: EditorView | null = null;
  const myMenu = ref<HTMLDialogElement | null>(null);

  const statusMessage = computed(() => {
    if (directoryHandle.value) return `Доступ к дире ${directoryHandle.value.name}`;
    return statusError.value ? 'Ошибка доступа' : 'Директория не выбрана';
  });

  const chooseDirectory = async () => {
    try {
      statusError.value = false;
      directoryHandle.value = await (window as any).showDirectoryPicker({
        mode: 'readwrite',
      });
    } catch (error) {
      console.error(error);
      directoryHandle.value = null;
      statusError.value = true;
    }
  };

  const saveFile = async () => {
    if (!directoryHandle.value) return;
    const name = fileName.value.trim() || 'file.md';
    const content = fileContent.value;

    try {
      const fileHandle = await directoryHandle.value.getFileHandle(name, { create: true });
      const writable = await fileHandle.createWritable();

      await writable.write(content);
      await writable.close();
      console.log(`${name}`);
      alert(`Сохранено: ${name}`);
    } catch (error) {
      console.error(error);
      console.log(`err`);
    }
  };

  onMounted(() => {
    if (!editorContainer.value) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        fileContent.value = update.state.doc.toString();
      }
    });

    const startState = EditorState.create({
      extensions: [
        basicSetup,
        oneDark,
        vim(),
        markdown(),
        updateListener,
      ],
    });
    editorView = new EditorView({
      state: startState,
      parent: editorContainer.value,
    });
  });

  onBeforeUnmount(() => {
    if (editorView) {
      editorView.destroy();
    }
  });
</script>

<template>
  <div class="app-layout">
    <button class="btn-open" @click="myMenu?.showModal()">Createa task</button>

    <dialog ref="myMenu" @click="myMenu?.close()">
      <div @click.stop class="menu-content">
        <button @click="chooseDirectory">
          Choose a directory for save
        </button>
        <div class="input-field">
          <input 
            type="text"
            id="fileName"
            v-model="fileName"
            class="od-input"
          >
        </div>
        <div>
          <div
            id="fileContent"
            ref="editorContainer"
            class="editor-box"
          ></div>
        </div>
        <button
          @click="saveFile"
          :disabled="!directoryHandle"
          class="btn-save"
        >
          Just save the file on the directory
        </button>

        <p class="status-bar">
          status: <span>{{ statusMessage }}</span>
        </p>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.menu-content {
  --od-bg-editor: #282c34;
  --od-bg-panel: #21252b;
  --od-bg-active: #2c313c;
  --od-text-main: #abb2bf;
  --od-text-muted: #5c6370;
  --od-accent: grey;
  --od-accent-dim: rgba(82, 139, 255, 0.15);

  padding: 25px; 
  background-color: var(--od-bg-editor);
  width: 600px;
  max-width: 90vw;
  box-sizing: border-box;
}

.btn-open {
  background-color: black;
  color: white;
  cursor: pointer;
}

dialog {
  border: 1px solid var(--od-text-muted); 
  background-color: transparent;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.menu-content > button:first-of-type {
  background-color: var(--od-bg-panel);
  color: var(--od-text-main);
  padding: 8px 14px;
  font-family: monospace;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 15px;
}

.od-input {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--od-bg-panel);
  color: var(--od-text-main);
  border: 1px solid var(--od-text-muted);
  border-bottom: none;
  padding: 10px 14px;
  font-family: monospace;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}


.editor-box {
  overflow: hidden;
  border: 1px solid var(--od-text-muted);
  border-top: none;
}

:deep(.cm-editor) {
  height: 250px;
}

:deep(.cm-editor.cm-focused) {
  outline: none;
}

.btn-save {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  background-color: var(--od-accent);
  color: #ffffff;
  border: none;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save:disabled {
  background-color: var(--od-bg-panel);
  color: var(--od-text-muted);
  cursor: not-allowed;
  opacity: 0.5;
}

.status-bar {
  margin-top: 15px;
  font-family: monospace;
  font-size: 13px;
  color: var(--od-text-muted);
}

.status-bar span {
  color: var(--od-text-main);
}
</style>
