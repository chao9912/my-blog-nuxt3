export const storage = {
  localStorage: {
    set: <T>(key: string, value: T): void => {
      try {
        const serialized = JSON.stringify(value)
        window.localStorage.setItem(key, serialized)
      } catch (error) {
        console.error('localStorage set error:', error)
      }
    },

    get: <T>(key: string, defaultValue?: T): T | undefined => {
      try {
        const item = window.localStorage.getItem(key)
        if (item === null) {
          return defaultValue
        }
        return JSON.parse(item) as T
      } catch (error) {
        console.error('localStorage get error:', error)
        return defaultValue
      }
    },

    remove: (key: string): void => {
      try {
        window.localStorage.removeItem(key)
      } catch (error) {
        console.error('localStorage remove error:', error)
      }
    },

    clear: (): void => {
      try {
        window.localStorage.clear()
      } catch (error) {
        console.error('localStorage clear error:', error)
      }
    },

    has: (key: string): boolean => {
      try {
        return window.localStorage.getItem(key) !== null
      } catch (error) {
        console.error('localStorage has error:', error)
        return false
      }
    },

    getKey: (index: number): string | null => {
      try {
        return window.localStorage.key(index)
      } catch (error) {
        console.error('localStorage getKey error:', error)
        return null
      }
    },

    length: (): number => {
      try {
        return window.localStorage.length
      } catch (error) {
        console.error('localStorage length error:', error)
        return 0
      }
    }
  },

  sessionStorage: {
    set: <T>(key: string, value: T): void => {
      try {
        const serialized = JSON.stringify(value)
        window.sessionStorage.setItem(key, serialized)
      } catch (error) {
        console.error('sessionStorage set error:', error)
      }
    },

    get: <T>(key: string, defaultValue?: T): T | undefined => {
      try {
        const item = window.sessionStorage.getItem(key)
        if (item === null) {
          return defaultValue
        }
        return JSON.parse(item) as T
      } catch (error) {
        console.error('sessionStorage get error:', error)
        return defaultValue
      }
    },

    remove: (key: string): void => {
      try {
        window.sessionStorage.removeItem(key)
      } catch (error) {
        console.error('sessionStorage remove error:', error)
      }
    },

    clear: (): void => {
      try {
        window.sessionStorage.clear()
      } catch (error) {
        console.error('sessionStorage clear error:', error)
      }
    },

    has: (key: string): boolean => {
      try {
        return window.sessionStorage.getItem(key) !== null
      } catch (error) {
        console.error('sessionStorage has error:', error)
        return false
      }
    },

    getKey: (index: number): string | null => {
      try {
        return window.sessionStorage.key(index)
      } catch (error) {
        console.error('sessionStorage getKey error:', error)
        return null
      }
    },

    length: (): number => {
      try {
        return window.sessionStorage.length
      } catch (error) {
        console.error('sessionStorage length error:', error)
        return 0
      }
    }
  }
}

export type StorageKey = 'localStorage' | 'sessionStorage'

export const useStorage = (type: StorageKey = 'localStorage') => {
  return storage[type]
}

export const local = storage.localStorage
export const session = storage.sessionStorage
