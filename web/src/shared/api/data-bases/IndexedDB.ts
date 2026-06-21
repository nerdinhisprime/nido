import { openDB } from "idb";
import { AppDBInstance } from "./types/db.types";
import {
  DB_NAME,
  DB_VERSION,
  OBJ_STORE_MAIN,
  OBJ_STORE_DIR_HANDLE
} from "./types/db.variables";

export const initDB = async (): Promise<AppDBInstance> => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if(!db.objectStoreNames.contains(OBJ_STORE_MAIN)) {
        db.createObjectStore(OBJ_STORE_MAIN, { keyPath: 'id' })
      }
      if(!db.objectStoreNames.contains(OBJ_STORE_DIR_HANDLE)) {
        db.createObjectStore(OBJ_STORE_DIR_HANDLE, { keyPath: 'id' })
      }
    }
  })
}
