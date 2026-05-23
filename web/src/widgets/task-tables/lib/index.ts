import { ref } from 'vue';
import { GetKeysStorageArray } from '../lib/GetKeysStorage';

export var index = () => {
  var tasks = ref<string[]>(GetKeysStorageArray());
  var isOpenTask = ref<string | null>(null);
  var isOpenTest = ref(false)
  var isCreatingTask = ref<boolean>(false);
  var draggedItemIndex = ref<number | null>(null);

  var toggleCurrentKey = (key: string) => {
    isOpenTask.value = key;
    isCreatingTask.value = false;
  };

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
  var closeRemoveItemMenu = (msg: boolean) => isOpenTest.value = msg;

  return {
    tasks,
    isOpenTask,
    isOpenTest,
    isCreatingTask,
    draggedItemIndex,
    toggleCurrentKey,
    toggleCreation,
    onDragStart,
    onDrop,
    closeRemoveItemMenu,
  };
};
