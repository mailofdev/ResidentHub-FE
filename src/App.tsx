import { useEffect } from 'react'
import { AppRouter } from '@/router'
import { useUIStore } from '@store/ui.store'
import { PWAInstallPrompt } from '@components/PWAInstallPrompt'
import '@/index.css'

function App() {
  const { theme, setTheme } = useUIStore()

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme || 'light'
    setTheme(initialTheme)
  }, [setTheme])

  useEffect(() => {
    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <>
      <AppRouter />
      <PWAInstallPrompt />
    </>
  )
}

export default App

