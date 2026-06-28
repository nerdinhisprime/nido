import { onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from "vue";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import { customMaterialTheme } from "./theme";

export const useCodeMirror = () => {
  const editorContainer = ref<HTMLDivElement | null>(null)

  const fromState = reactive({
    fileName: '',
    fileContent: '',
  })

  const editorView = shallowRef<EditorView | null>(null)

  watch(() => fromState.fileContent, (newContent) => {
    if(!editorView.value) return

    const currentContent = editorView.value.state.doc.toString()
    if(newContent !== currentContent) {
      editorView.value.dispatch({
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

    editorView.value = new EditorView({
      state: startState,
      parent: editorContainer.value,
    })
  })

  onBeforeUnmount(() => {
    if(editorView.value) {
      editorView.value.destroy()
    }
  })

  return {
    editorContainer,
    fromState,
    editorView,
  }
}
