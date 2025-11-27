import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'
import { usePWA } from '@hooks/usePWA'
import { Modal, Button } from './common'

export const PWAInstallPrompt = () => {
  const { isInstallable, isInstalled, install } = usePWA()
  const [showPrompt, setShowPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (isInstallable && !isInstalled && !dismissed) {
      // Show prompt after a delay
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInstallable, isInstalled, dismissed])

  const handleInstall = async () => {
    const installed = await install()
    if (installed) {
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  if (!showPrompt || isInstalled) return null

  return (
    <Modal
      isOpen={showPrompt}
      onClose={handleDismiss}
      title="Install ResidentHub"
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Install ResidentHub on your device for a better experience and offline access.
        </p>
        <div className="flex space-x-2">
          <Button variant="primary" onClick={handleInstall} fullWidth>
            <Download className="w-4 h-4 mr-2" />
            Install
          </Button>
          <Button variant="ghost" onClick={handleDismiss} fullWidth>
            Maybe Later
          </Button>
        </div>
      </div>
    </Modal>
  )
}

