import { ref, computed } from 'vue';
import { GetKeysStorageArray } from '../lib/GetKeysStorage';

export var index = () => {
  var tasks = ref<string[]>(GetKeysStorageArray());
  var isOpenTask = ref<string | null>(null);
  var taskKeyRemove = ref<string>('');
  var taskKeyRedactor = ref<string>('');
  var openRemoveKeyMenu = ref(false);
  var openRedactorMenu = ref(false);
  var isCreatingTask = ref<boolean>(false);
  var draggedItemIndex = ref<number | null>(null);
  var isTaskMenuOpen = computed({
    get() {
      return isOpenTask.value !== null;
    },
    set(newValue) {
      if (!newValue) isOpenTask.value = null;
    },
  });

  var toggleCurrentKey = (key: string) => {
    isOpenTask.value = key;
    isCreatingTask.value = false;
  };

  var openDeleteMenu = (key: string) => {
    taskKeyRemove.value = key;
    openRemoveKeyMenu.value = true;
  }

  var toggleCreation = () => {
    isCreatingTask.value = !isCreatingTask.value;
    isOpenTask.value = null;
  };

  var onDragStart = (event: DragEvent, index: number) => {
    draggedItemIndex.value = index;
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  };

  var onDrop = (index: number) => {
    if (draggedItemIndex.value === null || draggedItemIndex.value === index) return;

    const draggedItem = tasks.value.splice(draggedItemIndex.value, 1)[0];

    tasks.value.splice(index, 0, draggedItem);

    draggedItemIndex.value = null;
  };

  return {
    tasks,
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
    onDragStart,
    onDrop,
  };
};
