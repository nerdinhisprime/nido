import { taskDataTypes } from '@/shared/model';

export var SetItemStorage = (key: string, value: taskDataTypes): void => localStorage.setItem(key, JSON.stringify(value));
