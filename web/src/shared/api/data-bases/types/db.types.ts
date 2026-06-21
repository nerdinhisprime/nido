import { DBSchema, IDBPDatabase } from "idb"

export interface BaseStrings {
  id: string
  content: string
}

export interface dirHandleTypes {
  id: string
  descriptor: FileSystemDirectoryHandle
}

export interface AppDBSchema extends DBSchema {
  main: {
    key: string
    value: BaseStrings
  }
  dirHandle: {
    key: string
    value: dirHandleTypes
  }
}

export type AppDBInstance = IDBPDatabase<AppDBSchema>
