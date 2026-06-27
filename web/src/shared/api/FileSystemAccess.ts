import { ref } from "vue"
import { AppDBInstance, dirHandleTypes } from "./types/db.types"
import { initDB } from "./IndexedDB"
import { OBJ_STORE_DIR_HANDLE } from "@shared/config"

const idHandle = 'access'

const dirHandle = ref<FileSystemDirectoryHandle | null>(null)
const status = ref<string | null>(null)
let isRestoring: Promise<void> | null = null

export const initFS = () => {

  const pickDirPath = async () => {
    try {
      const rawHandle = await window.showDirectoryPicker({ mode: 'readwrite' })
      dirHandle.value = rawHandle

      const DB: AppDBInstance = await initDB()
      await DB.put(OBJ_STORE_DIR_HANDLE, {
        id: idHandle,
        descriptor: rawHandle,
      })
      status.value = `Успешно получен дескриптор директории ${rawHandle.name}`
    } catch(err) {
      console.error(err);
    }
  }

  const restoreAccess = async () => {
    if (isRestoring) return isRestoring;
    isRestoring = (async () => {
      try {
        const DB: AppDBInstance = await initDB()
        const gotRecord: dirHandleTypes | undefined = await DB.get(OBJ_STORE_DIR_HANDLE, idHandle)

        if(!gotRecord || !gotRecord.descriptor) {
          status.value = `Pick a work dir`
          return
        }

        const handle = gotRecord.descriptor
        dirHandle.value = handle
        const currentPermission = await handle.queryPermission({ mode: 'readwrite' })
        if(currentPermission === 'granted') {
          status.value = handle.name
        } else {
          status.value = `Директория ${handle.name} найдена, но прав на доступ нет`
        }
      } catch(err) {
        console.error(err);
        status.value = `Выбери директорию заново`
      }
    })();

    return isRestoring;
  }

  const activateAccess = async () => {
    if(!dirHandle.value) return
    try {
      const permission = await dirHandle.value.requestPermission({ mode: 'readwrite' })
      if(permission === 'granted') {
        status.value = 'Доступ восстановлен'
      } else {
        status.value = 'Повтори подтверждение доступа'
      }
    } catch(err) {
      console.error(err);
    }
  }

  const writeFile = async (fileName: string, content: string) => {
    if(!dirHandle.value) return
    try {
      const fileHandle: FileSystemFileHandle = await dirHandle.value.getFileHandle(fileName, { create: true })
      const writable = await fileHandle.createWritable()
      await writable.write(content)
      await writable.close()
      status.value = `Файл ${fileHandle.name} сохранен`
    } catch(err) {
      console.error(err);
      status.value = `Файл не сохранен`
    }
  }

  const readFile = async (fileName: string) => {
    if (!dirHandle.value && isRestoring) {
      await isRestoring;
    }
    if (!dirHandle.value) return null

    try {
      const fileHandle = await dirHandle.value.getFileHandle(fileName)
      const file = await fileHandle.getFile()
      return await file.text()
    } catch (err) { return null }
  }

  const createDir = async (dirName: string) => {
    if(!dirHandle.value) return
    try {
      await dirHandle.value.getDirectoryHandle(dirName, { create: true })
    } catch(err) {
      console.error(err);
      status.value = 'Не удалось создать директорию'
    }
  }

  const readDirContents = async () => {
    if (!dirHandle.value && isRestoring) {
      await isRestoring;
    }
    if (!dirHandle.value) return []

    try {
      const items = []
      for await (const [name, handle] of dirHandle.value.entries()) {
        items.push({
          name,
          kind: handle.kind
        })
      }
      return items
    } catch (err) {
      console.error(err)
      status.value = 'Ошибка чтения директории'
      return []
    }
  }

  const delEntry = async (name: string, isDirectory: boolean = false) => {
    if (!dirHandle.value) return
    try {
      await dirHandle.value.removeEntry(name, { recursive: isDirectory })
      status.value = `${name} удале${isDirectory ? 'на' : 'н'}`
    } catch (err) {
      console.error(err)
      status.value = 'Ошибка удаления'
    }
  }

  restoreAccess()

  return {
    dirHandle,
    status,
    pickDirPath,
    restoreAccess,
    activateAccess,
    writeFile,
    readFile,
    createDir,
    readDirContents,
    delEntry
  }
}
