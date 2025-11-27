import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UIState } from '@types'
import { storage, STORAGE_KEYS } from '@utils/storage'

interface UIStore extends UIState {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  setBottomNavVisible: (visible: boolean) => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: (storage.get<'light' | 'dark'>(STORAGE_KEYS.THEME) || 'light') as 'light' | 'dark',
      bottomNavVisible: true,

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }))
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open })
      },

      setTheme: (theme) => {
        set({ theme })
        storage.set(STORAGE_KEYS.THEME, theme)
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          storage.set(STORAGE_KEYS.THEME, newTheme)
          document.documentElement.classList.toggle('dark', newTheme === 'dark')
          return { theme: newTheme }
        })
      },

      setBottomNavVisible: (visible) => {
        set({ bottomNavVisible: visible })
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
)

