import { reactive, ref, watch } from 'vue';
import { useUpdateTasksList, useKeyPress } from '@/shared';

export const useGridNavigation = () => {
  const { filesArr } = useUpdateTasksList();
  const metaarr = reactive<any[]>([]);

  const currentCoords = reactive({
    x: 0,
    y: 0
  });

  const gridContainer = ref<HTMLElement | null>(null);

  watch(filesArr, (newFiles) => {
    if (!newFiles || newFiles.length === 0) return;

    const namesArr = newFiles.map(file => file.name);

    if (metaarr[0]) {
      metaarr[0] = namesArr;
    } else {
      metaarr.push(namesArr);
      metaarr.push(namesArr);
      //metaarr.push(namesArr) // добавление еще масива для перемещения по y кордам
    }
  }, { immediate: true, deep: true });

  const onFocusCell = (yIdx: number, xIdx: number) => {
    currentCoords.y = yIdx;
    currentCoords.x = xIdx;
  };

  const moveFocus = (deltaY: number, deltaX: number) => {
    if (!gridContainer.value) return;

    let newY = currentCoords.y + deltaY;
    let newX = currentCoords.x + deltaX;

    if (newY < 0) newY = 0;
    if (newY >= metaarr.length) newY = metaarr.length - 1;

    if (newX < 0) newX = 0;
    if (metaarr[newY] && newX >= metaarr[newY].length) newX = metaarr[newY].length - 1;

    const rows = gridContainer.value.querySelectorAll('.x_container');
    const targetRow = rows[newY];
    if (targetRow) {
      const cells = targetRow.querySelectorAll('.itemsarr') as NodeListOf<HTMLElement>;
      const targetCell = cells[newX];
      if (targetCell) {
        targetCell.focus();
        targetCell.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
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
    gridContainer,
    onFocusCell
  };
};
