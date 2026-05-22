import { ref, type Ref } from 'vue';

export var useRef =  (tasks: Ref<string[]>, onOrderChange?: (newTasks: string[]) => void) => {
  const draggedItemIndex = ref<number | null>(null);

  var onDragStart = (event: DragEvent, index: number) => {
    draggedItemIndex.value = index;
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  };

  var onDrop = (index: number) => {
    if (draggedItemIndex.value === null || draggedItemIndex.value === index) return;

    const updatedTasks = [...tasks.value];
    const [draggedItem] = updatedTasks.splice(draggedItemIndex, 1)
    updatedTasks.splice(index, 0, draggedItem);

    tasks.value = updatedTasks;
    draggedItemIndex.value = null;

    if (onOrderChange) draggedItemIndex.value = null;
  }

  var onDragEnd = () => draggedItemIndex.value = null;

  return {
    draggedItemIndex,
    onDragStart,
    onDrop,
    onDragEnd,
  };
};
