import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface ResidentHubDB extends DBSchema {
  cache: {
    key: string
    value: {
      data: unknown
      timestamp: number
      expiresAt: number
    }
  }
}

let dbInstance: IDBPDatabase<ResidentHubDB> | null = null

export const initDB = async (): Promise<IDBPDatabase<ResidentHubDB>> => {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<ResidentHubDB>('residenthub-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('cache')) {
        const store = db.createObjectStore('cache', { keyPath: 'key' })
        store.createIndex('expiresAt', 'expiresAt')
      }
    },
  })

  return dbInstance
}

export const db = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const database = await initDB()
      const result = await database.get('cache', key)
      if (!result) return null

      // Check if expired
      if (result.expiresAt < Date.now()) {
        await database.delete('cache', key)
        return null
      }

      return result.data as T
    } catch (error) {
      console.error('Error reading from IndexedDB:', error)
      return null
    }
  },

  async set<T>(key: string, data: T, ttl: number = 24 * 60 * 60 * 1000): Promise<void> {
    try {
      const database = await initDB()
      await database.put('cache', {
        key,
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + ttl,
      })
    } catch (error) {
      console.error('Error writing to IndexedDB:', error)
    }
  },

  async delete(key: string): Promise<void> {
    try {
      const database = await initDB()
      await database.delete('cache', key)
    } catch (error) {
      console.error('Error deleting from IndexedDB:', error)
    }
  },

  async clear(): Promise<void> {
    try {
      const database = await initDB()
      await database.clear('cache')
    } catch (error) {
      console.error('Error clearing IndexedDB:', error)
    }
  },
}

