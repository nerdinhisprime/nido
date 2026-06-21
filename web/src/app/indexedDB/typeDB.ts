import { DBSchema } from "idb";

export interface CustomDBSchema extends DBSchema {
  something: {
    key: string,
    value: any,
  };
};
