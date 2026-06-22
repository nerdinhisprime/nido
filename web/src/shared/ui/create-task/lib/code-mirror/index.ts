import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { oneDark } from '@codemirror/theme-one-dark';
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";

export const initCodeMirror = () => {
  const editorContainer = ref<HTMLDivElement | null>(null)

  const fromState = reactive({
    fileName: 'file.md',
    fileContent: '',
  })

  let editorView: EditorView | null = null

  onMounted(() => {
    if(!editorContainer.value) return

    const updateListener = EditorView.updateListener.of((update) => {
      if(update.docChanged) {
        fromState.fileContent = update.state.doc.toString()
      }
    })

    const startState = EditorState.create({
      extensions: [
        basicSetup,
        oneDark,
        vim(),
        markdown(),
        updateListener,
      ]
    })
    editorView = new EditorView({
      state: startState,
      parent: editorContainer.value,
    })
  })

  onBeforeUnmount(() => {
    if(editorView) {
      editorView.destroy()
    }
  })

  return {
    editorContainer,
    fromState,
    editorView,
  }
}
