import { ref,  type Ref, nextTick } from "vue";
import { type BaseUICard } from '@/shared';

interface KeyHooksArgs {
  cardRefs: Ref<InstanceType<typeof BaseUICard>[]>;
  arrOfTaskKeys: Ref<string[]>;
  taskKeyRemove: Ref<string>;
  openRemoveKeyMenu: Ref<boolean>;
  openRedactorMenu: Ref<boolean>;
  isCreatingTask: Ref<boolean>;
  isOpenTask: Ref<string | null>;
  toggleCurrentKey: (key: string) => void;
  toggleCreation: () => void;
}

export const KeyHooks = (args: KeyHooksArgs) => {
  const activeIndex = ref<number>(0);

  const scrollToActiveCardFN = () => {
    nextTick(() => {
      const activeCardComponent = args.cardRefs.value[activeIndex.value];
      const element = activeCardComponent?.$el || activeCardComponent;

      if (element && typeof element.scrollIntoView === "function") {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    });
  };

  const keyHooksFN = (e: KeyboardEvent) => {
    const modifers = [];
    if (e.ctrlKey) modifers.push('ctrl');
    if (e.altKey) modifers.push('alt');
    modifers.push(e.key.toLowerCase());

    const shortcut = modifers.join('+');

    const actions: Record<string, () => void> = {
      'alt+l': () => {
        if (activeIndex.value < args.arrOfTaskKeys.value.length) {
          activeIndex.value++;
          scrollToActiveCardFN();
        };
      },
      'alt+h': () => {
        if (activeIndex.value > 0) {
          activeIndex.value--;
          scrollToActiveCardFN();
        };
      },
      'ctrl+alt+a': () => args.toggleCreation(),
      'ctrl+alt+d': () => {
        const current = args.arrOfTaskKeys.value[activeIndex.value - 1];
        if (activeIndex.value > 0 && current) {
          args.taskKeyRemove.value = current;
          args.openRemoveKeyMenu.value = true;
        };
      },
      'enter': () => {
        const current = args.arrOfTaskKeys.value[activeIndex.value - 1];
        if (activeIndex.value > 0 && current) args.toggleCurrentKey(current);
      },
      'escape': () => {
        args.openRemoveKeyMenu.value = false;
        args.openRedactorMenu.value = false;
        args.isCreatingTask.value = false;
        args.isOpenTask.value = null;
      },
    };
    if(actions[shortcut]) {
      e.preventDefault();
      actions[shortcut]();
    }
  };

  return {
    activeIndex,
    keyHooksFN,
  };
};
