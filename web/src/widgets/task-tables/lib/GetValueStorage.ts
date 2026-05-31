interface TaskItem {
  taskDescription: string;
}

export const GetValueStorageFN = (key: string): string | null => {
  const rawData = localStorage.getItem(key);
  if (!rawData) return null;

  try {
    const item = JSON.parse(rawData) as TaskItem;
    return item.taskDescription;
  } catch (err) {
    console.error('ОШИБКА ПАРСИНГА: @widgets/task-tables/ui/TaskTables.vue');
    return null;
  };
};
