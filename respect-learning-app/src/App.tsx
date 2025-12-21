import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import QuickExit from './components/QuickExit/QuickExit'
import DisguiseMode from './components/DisguiseMode/DisguiseMode'
import Home from './pages/Home'
import RespectCheck from './modules/respect-check/RespectCheck'
import FlagQuiz from './modules/flag-quiz/FlagQuiz'
import ConsentScenarios from './modules/consent-scenarios/ConsentScenarios'
import ControlMapper from './modules/control-mapper/ControlMapper'
import SafetyPlanning from './modules/safety-planning/SafetyPlanning'
import DigitalSafety from './modules/digital-safety/DigitalSafety'
import Support from './modules/support/Support'
import Bystander from './modules/bystander/Bystander'
import { security } from './utils/security'
import { analytics } from './utils/analytics'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EA',
      light: '#9D46FF',
      dark: '#0A00B6'
    },
    secondary: {
      main: '#03DAC6',
      light: '#66FFF5',
      dark: '#00A896'
    },
    error: {
      main: '#B00020'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  }
})

function App() {
  const [disguiseActive, setDisguiseActive] = useState(false)

  useEffect(() => {
    // Check if disguise mode should be active
    setDisguiseActive(security.shouldDisguise())

    // Track app launch
    analytics.track('app_launched')

    // Check if in private mode and warn user
    security.isPrivateMode().then(isPrivate => {
      if (isPrivate) {
        console.log('Private browsing detected - good for privacy!')
      }
    })
  }, [])

  if (disguiseActive) {
    return <DisguiseMode onDeactivate={() => setDisguiseActive(false)} />
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <QuickExit position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/respect-check" element={<RespectCheck />} />
            <Route path="/flag-quiz" element={<FlagQuiz />} />
            <Route path="/consent-scenarios" element={<ConsentScenarios />} />
            <Route path="/control-mapper" element={<ControlMapper />} />
            <Route path="/safety-planning" element={<SafetyPlanning />} />
            <Route path="/digital-safety" element={<DigitalSafety />} />
            <Route path="/support" element={<Support />} />
            <Route path="/bystander" element={<Bystander />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
