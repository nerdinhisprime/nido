import { reactive, ref, watch } from 'vue';
import { useUpdateTasksList, useKeyPress } from '@/shared';
import { EditorView } from 'codemirror';

interface GridItem {
  id: string;
  label?: string;
  focus: () => void;
}

export const useGridNavigation = (getEditorView: () => EditorView | null) => {
  const { filesArr } = useUpdateTasksList();
  const metaarr = reactive<GridItem[][]>([]);

  const currentCoords = reactive({
    x: 0,
    y: 0
  });

  const gridContainer = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);

  const initStaticRows = () => {
    metaarr[1] = [{
      id: 'global-input',
      focus: () => {
        inputRef.value?.focus();
      }
    }];
    metaarr[2] = [{
      id: 'editor',
      focus: () => {
        const view = getEditorView();
        if (view) {
          view.focus();
        }
      }
    }];
  };
  initStaticRows();

  watch(filesArr, (newFiles) => {
    if (!newFiles || newFiles.length === 0) return;

    metaarr[0] = newFiles.map((file, index) => ({
      id: `file-${index}`,
      label: file.name,
      focus: () => {
        const rows = gridContainer.value?.querySelectorAll('.x_container');
        const fileRow = rows?.[0];
        const cells = fileRow?.querySelectorAll('.itemsarr') as NodeListOf<HTMLElement>;
        cells?.[index]?.focus();
      }
    }));
  }, { immediate: true, deep: true });

  const onFocusCell = (yIdx: number, xIdx: number) => {
    currentCoords.y = yIdx;
    currentCoords.x = xIdx;
  };

  const moveFocus = (deltaY: number, deltaX: number) => {
    let newY = currentCoords.y + deltaY;
    if (newY < 0) newY = 0;
    if (newY >= metaarr.length) newY = metaarr.length - 1;

    let newX = currentCoords.x + deltaX;
    if (newX < 0) newX = 0;
    if (metaarr[newY] && newX >= metaarr[newY].length) newX = metaarr[newY].length - 1;

    currentCoords.y = newY;
    currentCoords.x = newX;

    const targetItem = metaarr[newY]?.[newX];
    if (targetItem) {
      targetItem.focus();
    }
  };

  useKeyPress({
    'ctrl+h': () => moveFocus(0, -1),
    'ctrl+l': () => moveFocus(0, 1),
    'ctrl+j': () => moveFocus(1, 0),
    'ctrl+k': () => moveFocus(-1, 0),
  });

  return {
    metaarr,
    inputRef,
    gridContainer,
    onFocusCell
  };
};
