import React, { useEffect } from 'react'
import { Fab, Tooltip } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { security } from '@/utils/security'
import { analytics } from '@/utils/analytics'

interface QuickExitProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const QuickExit: React.FC<QuickExitProps> = ({ position = 'top-right' }) => {
  const positionStyles = {
    'top-right': { top: 16, right: 16 },
    'top-left': { top: 16, left: 16 },
    'bottom-right': { bottom: 16, right: 16 },
    'bottom-left': { bottom: 16, left: 16 }
  }

  const handleQuickExit = () => {
    analytics.track('quick_exit_used')
    security.quickExit()
  }

  // Keyboard shortcut: Escape key 3 times quickly
  useEffect(() => {
    let escapeCount = 0
    let escapeTimer: NodeJS.Timeout

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        escapeCount++

        clearTimeout(escapeTimer)

        if (escapeCount === 3) {
          handleQuickExit()
        }

        escapeTimer = setTimeout(() => {
          escapeCount = 0
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <Tooltip title="Quick Exit (or press Escape 3x)" placement="left">
      <Fab
        color="error"
        aria-label="quick exit"
        onClick={handleQuickExit}
        sx={{
          position: 'fixed',
          ...positionStyles[position],
          zIndex: 9999
        }}
      >
        <ExitToAppIcon />
      </Fab>
    </Tooltip>
  )
}

export default QuickExit
