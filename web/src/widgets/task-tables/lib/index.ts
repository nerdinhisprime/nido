import { ref, computed } from 'vue';
import { GetKeysStorageArray } from '../lib/GetKeysStorage';

export const index = () => {
  const arrOfTaskKeys = ref<string[]>(GetKeysStorageArray());

  const isOpenTask = ref<string | null>(null);
  const isCreatingTask = ref<boolean>(false);
  const isTaskMenuOpen = computed({
    get() {
      return isOpenTask.value !== null;
    },
    set(newValue) {
      if (!newValue) isOpenTask.value = null;
    },
  });

  const taskKeyRemove = ref<string>('');
  const taskKeyRedactor = ref<string>('');
  const openRemoveKeyMenu = ref(false);
  const openRedactorMenu = ref(false);

  const draggedItemIndex = ref<number | null>(null);

  const toggleCurrentKey = (key: string) => {
    isOpenTask.value = key;
    isCreatingTask.value = false;
  };

  const openDeleteMenu = (key: string) => {
    taskKeyRemove.value = key;
    openRemoveKeyMenu.value = true;
  }

  const toggleCreation = () => {
    isCreatingTask.value = !isCreatingTask.value;
    isOpenTask.value = null;
  };

  const onDragStartFN = (event: DragEvent, index: number) => {
    draggedItemIndex.value = index;
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  };

  const onDropEndFN = (index: number) => {
    if (draggedItemIndex.value === null || draggedItemIndex.value === index) return;

    const draggedItem = arrOfTaskKeys.value.splice(draggedItemIndex.value, 1)[0];

    arrOfTaskKeys.value.splice(index, 0, draggedItem);

    draggedItemIndex.value = null;
  };

  return {
    arrOfTaskKeys,
    isOpenTask,
    openRemoveKeyMenu,
    openRedactorMenu,
    taskKeyRemove,
    taskKeyRedactor,
    isCreatingTask,
    draggedItemIndex,
    isTaskMenuOpen,
    openDeleteMenu,
    toggleCurrentKey,
    toggleCreation,
    onDragStartFN,
    onDropEndFN,
  };
};
