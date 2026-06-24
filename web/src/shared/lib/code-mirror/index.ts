import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import { customMaterialTheme } from "./theme";

export const useCodeMirror = () => {
  const editorContainer = ref<HTMLDivElement | null>(null)

  const fromState = reactive({
    fileName: 'file.md',
    fileContent: '',
  })

  let editorView: EditorView | null = null

  watch(() => fromState.fileContent, (newContent) => {
    if(!editorView) return

    const currentContent = editorView.state.doc.toString()
    if(newContent !== currentContent) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: currentContent.length,
          insert: newContent,
        }
      })
    }
  })

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
        customMaterialTheme,
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
