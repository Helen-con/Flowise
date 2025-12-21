import React, { useState, useEffect } from 'react'
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material'
import { motion } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FlagIcon from '@mui/icons-material/Flag'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { flagQuestions, FlagQuestion } from '@/data/flagQuizData'
import { analytics } from '@/utils/analytics'
import { storageService } from '@/utils/storage'

const FlagQuiz: React.FC = () => {
  const navigate = useNavigate()
  const [shuffledQuestions, setShuffledQuestions] = useState<FlagQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    // Shuffle questions for variety
    const shuffled = [...flagQuestions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
    analytics.track('module_started', 'flag-quiz')
  }, [])

  if (shuffledQuestions.length === 0) return null

  const currentQuestion = shuffledQuestions[currentIndex]
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100

  const handleAnswer = (selectedFlag: 'red' | 'green') => {
    const correct = selectedFlag === currentQuestion.flagType
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }

    setShowResult(true)

    analytics.track('quiz_answered', 'flag-quiz', {
      questionId: currentQuestion.id,
      correct
    })
  }

  const handleNext = async () => {
    setShowResult(false)

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Quiz completed
      await storageService.setUserProgress({
        flagQuiz: {
          score: score + (isCorrect ? 1 : 0),
          completed: true,
          answers: {}
        }
      })
      analytics.track('module_completed', 'flag-quiz', {
        score: score + (isCorrect ? 1 : 0),
        total: shuffledQuestions.length
      })
    }
  }

  const getScorePercentage = () => {
    return Math.round((score / shuffledQuestions.length) * 100)
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return { message: 'Excellent! You really know your flags!', emoji: '🌟' }
    if (percentage >= 70) return { message: 'Great job! You have a good understanding!', emoji: '👏' }
    if (percentage >= 50) return { message: 'Good effort! Keep learning!', emoji: '💪' }
    return { message: 'Keep practicing! Every bit of knowledge helps!', emoji: '📚' }
  }

  // Completion screen
  if (currentIndex >= shuffledQuestions.length && showResult) {
    const scoreMsg = getScoreMessage()

    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2 }}>{scoreMsg.emoji}</Typography>
          <Typography variant="h3" gutterBottom>
            Quiz Complete!
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            {score} / {shuffledQuestions.length}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {getScorePercentage()}% Correct
          </Typography>
          <Typography variant="body1" sx={{ my: 3 }}>
            {scoreMsg.message}
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => {
              setCurrentIndex(0)
              setScore(0)
              setShuffledQuestions([...flagQuestions].sort(() => Math.random() - 0.5))
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
      <Box sx={{ bgcolor: 'error.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Red/Green Flag Quiz</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Question {currentIndex + 1} of {shuffledQuestions.length} • Score: {score}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Chip
                label={currentQuestion.category}
                color="primary"
                sx={{ mb: 3 }}
              />

              <Typography variant="h5" gutterBottom sx={{ mb: 4, lineHeight: 1.6 }}>
                {currentQuestion.statement}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Is this a Red Flag or Green Flag?
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => handleAnswer('red')}
                      sx={{
                        py: 3,
                        bgcolor: '#f44336',
                        fontSize: '1.2rem',
                        '&:hover': {
                          bgcolor: '#d32f2f'
                        }
                      }}
                      startIcon={<FlagIcon />}
                    >
                      Red Flag
                    </Button>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => handleAnswer('green')}
                      sx={{
                        py: 3,
                        bgcolor: '#4caf50',
                        fontSize: '1.2rem',
                        '&:hover': {
                          bgcolor: '#388e3c'
                        }
                      }}
                      startIcon={<FlagIcon />}
                    >
                      Green Flag
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      <Dialog open={showResult} onClose={handleNext} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isCorrect ? (
              <>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h6" color="success.main">Correct!</Typography>
              </>
            ) : (
              <>
                <FlagIcon color="error" sx={{ fontSize: 40 }} />
                <Typography variant="h6" color="error.main">Not quite</Typography>
              </>
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Chip
            label={currentQuestion.flagType === 'red' ? 'Red Flag' : 'Green Flag'}
            color={currentQuestion.flagType === 'red' ? 'error' : 'success'}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1">
            {currentQuestion.explanation}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNext} variant="contained" fullWidth>
            {currentIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FlagQuiz
