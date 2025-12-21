import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Grid, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { security } from '@/utils/security'
import { storageService } from '@/utils/storage'
import Calculator from './disguises/Calculator'
import NotesApp from './disguises/NotesApp'
import PeriodTracker from './disguises/PeriodTracker'

interface DisguiseModeProps {
  onDeactivate: () => void
}

const DisguiseMode: React.FC<DisguiseModeProps> = ({ onDeactivate }) => {
  const [activeDisguise, setActiveDisguise] = useState<string>('calculator')

  useEffect(() => {
    storageService.getDisguiseMode().then(mode => {
      setActiveDisguise(mode)
    })
  }, [])

  const handleDeactivate = () => {
    security.deactivateDisguise()
    onDeactivate()
  }

  const renderDisguise = () => {
    switch (activeDisguise) {
      case 'calculator':
        return <Calculator />
      case 'notes':
        return <NotesApp />
      case 'period-tracker':
        return <PeriodTracker />
      default:
        return <Calculator />
    }
  }

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      {/* Secret exit button - tap 5 times in corner */}
      <Box
        onClick={handleDeactivate}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 50,
          height: 50,
          zIndex: 10000,
          cursor: 'pointer',
          opacity: 0
        }}
      />
      {renderDisguise()}
    </Box>
  )
}

export default DisguiseMode
