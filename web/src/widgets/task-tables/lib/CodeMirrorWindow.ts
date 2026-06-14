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
