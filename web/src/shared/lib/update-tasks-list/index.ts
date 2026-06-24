import { ref, watch, onMounted } from 'vue';
import { initFS, useCodeMirror } from '@/shared';

export const useUpdateTasksList = () => {
  const { fromState, editorContainer } = useCodeMirror()
  const { status, readDirContents, writeFile, readFile } = initFS()

  const filesArr = ref<{ name: string }[]>([])

  const updateList = async () => {
    filesArr.value = await readDirContents()
  }
  const loadDataCurrentFile = async (filename: string) => {
    fromState.fileName = filename
    fromState.fileContent = await readFile(filename) || ''
  }

  watch(status, () => {
    updateList()
  }, { immediate: true })

  onMounted(async () => {
    await updateList()
  })
  return {
    status,
    fromState,
    filesArr,
    editorContainer,
    updateList,
    loadDataCurrentFile,
    writeFile,
  }
}
