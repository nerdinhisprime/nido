import { IDBPDatabase, openDB } from "idb"
import { CustomDBSchema } from "./typeDB";

const DB_NAME = 'nido-database';
const DB_VERSION = 67;

export type BaseDB = IDBPDatabase<CustomDBSchema>

const initDB = async (): Promise<BaseDB> => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains('something')) {
        db.createObjectStore('something')
      };
    },
  });
};

let dbInstance: BaseDB | null = null;
export const getDB = async (): Promise<BaseDB> => {
  if(!dbInstance) dbInstance = await initDB()
  return dbInstance;
};
