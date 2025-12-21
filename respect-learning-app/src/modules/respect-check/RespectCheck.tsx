import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { respectScenarios, RespectScenario } from '@/data/respectScenarios'
import { analytics } from '@/utils/analytics'
import { storageService } from '@/utils/storage'

const RespectCheck: React.FC = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [resultData, setResultData] = useState<{ correct: boolean; explanation: string } | null>(null)
  const [direction, setDirection] = useState(0)
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([])

  const currentScenario = respectScenarios[currentIndex]
  const progress = ((currentIndex + 1) / respectScenarios.length) * 100

  const handleAnswer = (optionIndex: number) => {
    const option = currentScenario.options[optionIndex]

    if (option.isHealthy) {
      setScore(score + 1)
    }

    setResultData({
      correct: option.isHealthy,
      explanation: option.explanation
    })
    setShowResult(true)

    analytics.track('scenario_answered', 'respect-check', {
      scenarioId: currentScenario.id,
      correct: option.isHealthy
    })
  }

  const handleNext = async () => {
    setShowResult(false)
    setResultData(null)

    const newCompleted = [...completedScenarios, currentScenario.id]
    setCompletedScenarios(newCompleted)

    if (currentIndex < respectScenarios.length - 1) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
    } else {
      // Save progress
      await storageService.setUserProgress({
        respectCheck: {
          completed: newCompleted,
          currentScenario: 0
        }
      })
      // Show completion
      analytics.track('module_completed', 'respect-check', { score })
    }
  }

  const handleSwipe = (offset: number, optionIndex: number) => {
    if (Math.abs(offset) > 100) {
      handleAnswer(optionIndex)
    }
  }

  const swipeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  }

  if (currentIndex >= respectScenarios.length) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            You scored {score} out of {respectScenarios.length}
          </Typography>
          <Typography variant="body1" sx={{ my: 3 }}>
            You've completed all RESPECT scenarios. Remember: healthy relationships are built on trust, respect, and equality.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
            <Button variant="contained" onClick={() => {
              setCurrentIndex(0)
              setScore(0)
              setCompletedScenarios([])
            }}>
              Try Again
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </Box>
        </Box>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">RESPECT Check</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Scenario {currentIndex + 1} of {respectScenarios.length}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Chip
                  label={currentScenario.respectPrinciple}
                  color="primary"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {currentScenario.title}
                </Typography>
                <Typography variant="body1" sx={{ my: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  {currentScenario.scenario}
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    What do you think?
                  </Typography>
                  {currentScenario.options.map((option, index) => (
                    <motion.div
                      key={index}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, info: PanInfo) => handleSwipe(info.offset.x, index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        onClick={() => handleAnswer(index)}
                        sx={{
                          mb: 2,
                          py: 2,
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          fontSize: '1rem'
                        }}
                      >
                        {option.text}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          💡 Tip: You can swipe the options left or right on touch devices
        </Typography>
      </Container>

      <Dialog open={showResult} onClose={handleNext} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {resultData?.correct ? (
              <>
                <CheckCircleIcon color="success" />
                <Typography variant="h6" color="success.main">Correct!</Typography>
              </>
            ) : (
              <>
                <CancelIcon color="error" />
                <Typography variant="h6" color="error.main">Not quite</Typography>
              </>
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {resultData?.explanation}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNext} variant="contained" fullWidth>
            {currentIndex < respectScenarios.length - 1 ? 'Next Scenario' : 'See Results'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RespectCheck
