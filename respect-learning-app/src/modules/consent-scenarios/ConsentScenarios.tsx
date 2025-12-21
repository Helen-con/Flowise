import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { motion } from 'framer-motion'
import { analytics } from '@/utils/analytics'

interface Choice {
  text: string
  nextSceneId: string
  feedback: string
  isHealthy: boolean
}

interface Scene {
  id: string
  title: string
  description: string
  choices: Choice[]
  isEnding?: boolean
}

const scenarios: Scene[] = [
  {
    id: 'start',
    title: 'The Party',
    description: 'You\'re at a party with your partner. They\'ve had a few drinks and suggest going to a quieter room upstairs. You\'re not sure you want to, but they seem really into the idea.',
    choices: [
      {
        text: 'Say "I\'d rather stay here with everyone"',
        nextSceneId: 'respect',
        feedback: 'Great! You clearly communicated your boundary.',
        isHealthy: true
      },
      {
        text: 'Go along even though you\'re uncomfortable',
        nextSceneId: 'pressure',
        feedback: 'Remember: you always have the right to say no.',
        isHealthy: false
      }
    ]
  },
  {
    id: 'respect',
    title: 'Respected Boundary',
    description: 'Your partner says "No problem! Let\'s grab some snacks then." They respect your decision without making you feel bad.',
    choices: [
      {
        text: 'Thank them for understanding',
        nextSceneId: 'healthy_end',
        feedback: 'Perfect! Acknowledging respect strengthens healthy communication.',
        isHealthy: true
      }
    ]
  },
  {
    id: 'pressure',
    title: 'Feeling Pressured',
    description: 'Once upstairs, your partner starts getting more physical than you\'re comfortable with. You say you want to slow down.',
    choices: [
      {
        text: 'Clearly say "I need to stop. Let\'s go back downstairs."',
        nextSceneId: 'assert',
        feedback: 'Excellent! Clear communication about your boundaries.',
        isHealthy: true
      },
      {
        text: 'Stay quiet and hope they notice you\'re uncomfortable',
        nextSceneId: 'unclear',
        feedback: 'It\'s important to speak up. Silence isn\'t consent.',
        isHealthy: false
      }
    ]
  },
  {
    id: 'assert',
    title: 'Standing Firm',
    description: 'Your partner seems annoyed and says "Come on, we\'re already here. Don\'t you like me?"',
    choices: [
      {
        text: 'Repeat firmly: "I said I want to stop. This isn\'t about not liking you."',
        nextSceneId: 'firm_end',
        feedback: 'Perfect! Don\'t let guilt-tripping change your boundary.',
        isHealthy: true
      },
      {
        text: 'Give in because you don\'t want them to be upset',
        nextSceneId: 'unhealthy_end',
        feedback: 'Guilt-tripping is manipulation. Your boundaries matter more than their disappointment.',
        isHealthy: false
      }
    ]
  },
  {
    id: 'unclear',
    title: 'Mixed Signals',
    description: 'Your partner continues, not picking up on your discomfort. The situation escalates.',
    choices: [
      {
        text: 'Speak up now: "Stop. I\'m not comfortable with this."',
        nextSceneId: 'late_but_good',
        feedback: 'Good! It\'s never too late to assert your boundary.',
        isHealthy: true
      },
      {
        text: 'Continue to stay silent',
        nextSceneId: 'bad_end',
        feedback: 'Please remember: you can always say no, at any point.',
        isHealthy: false
      }
    ]
  },
  {
    id: 'healthy_end',
    title: 'Healthy Relationship',
    description: '✅ You both enjoyed the party together, and your boundaries were respected. This is what a healthy relationship looks like - mutual respect and communication.',
    choices: [],
    isEnding: true
  },
  {
    id: 'firm_end',
    title: 'Standing Your Ground',
    description: '✅ You stood firm on your boundary despite pressure. If your partner truly cares, they will respect your "no." This shows strength and self-respect.',
    choices: [],
    isEnding: true
  },
  {
    id: 'late_but_good',
    title: 'Better Late Than Never',
    description: '✅ You spoke up! It\'s never too late to assert your boundaries. Remember this for next time - speak up earlier when you feel uncomfortable.',
    choices: [],
    isEnding: true
  },
  {
    id: 'unhealthy_end',
    title: 'Unhealthy Pattern',
    description: '⚠️ Giving in to guilt-tripping creates an unhealthy pattern. Your comfort matters. A respectful partner would never make you feel guilty for saying no.',
    choices: [],
    isEnding: true
  },
  {
    id: 'bad_end',
    title: 'Remember Your Voice',
    description: '⚠️ Silence is not consent. In healthy relationships, both people actively communicate and respect each other\'s boundaries. You always have the right to say no.',
    choices: [],
    isEnding: true
  }
]

const ConsentScenarios: React.FC = () => {
  const navigate = useNavigate()
  const [currentSceneId, setCurrentSceneId] = useState('start')
  const [history, setHistory] = useState<string[]>(['start'])
  const [healthyChoices, setHealthyChoices] = useState(0)
  const [totalChoices, setTotalChoices] = useState(0)

  const currentScene = scenarios.find(s => s.id === currentSceneId)!

  const handleChoice = (choice: Choice) => {
    setHistory([...history, choice.nextSceneId])
    setCurrentSceneId(choice.nextSceneId)
    setTotalChoices(totalChoices + 1)
    if (choice.isHealthy) {
      setHealthyChoices(healthyChoices + 1)
    }

    analytics.track('consent_choice_made', 'consent-scenarios', {
      sceneId: currentSceneId,
      isHealthy: choice.isHealthy
    })

    if (scenarios.find(s => s.id === choice.nextSceneId)?.isEnding) {
      analytics.track('scenario_completed', 'consent-scenarios', {
        healthyChoices,
        totalChoices: totalChoices + 1
      })
    }
  }

  const restart = () => {
    setCurrentSceneId('start')
    setHistory(['start'])
    setHealthyChoices(0)
    setTotalChoices(0)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5">Consent Scenarios</Typography>
            </Box>
            <IconButton onClick={restart} sx={{ color: 'white' }}>
              <RestartAltIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          key={currentSceneId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Chip
                label={currentScene.isEnding ? 'Ending' : `Scene ${history.length}`}
                color={currentScene.isEnding ? 'primary' : 'default'}
                sx={{ mb: 2 }}
              />

              <Typography variant="h4" gutterBottom fontWeight="bold">
                {currentScene.title}
              </Typography>

              <Typography variant="body1" sx={{ my: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                {currentScene.description}
              </Typography>

              {currentScene.isEnding ? (
                <Box sx={{ mt: 4 }}>
                  <Alert severity={currentScene.description.includes('✅') ? 'success' : 'warning'} sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      You made {healthyChoices} out of {totalChoices} healthy choices in this scenario.
                    </Typography>
                  </Alert>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" onClick={restart} fullWidth>
                      Try Another Path
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/')} fullWidth>
                      Back to Home
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    What do you do?
                  </Typography>
                  {currentScene.choices.map((choice, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        onClick={() => handleChoice(choice)}
                        sx={{
                          mb: 2,
                          py: 2,
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          fontSize: '1rem',
                          border: 2
                        }}
                      >
                        {choice.text}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {!currentScene.isEnding && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
              <Typography variant="body2">
                💡 <strong>Remember:</strong> Consent is ongoing and can be withdrawn at any time.
                Clear communication and respect for boundaries are essential in all relationships.
              </Typography>
            </Box>
          )}
        </motion.div>
      </Container>
    </Box>
  )
}

export default ConsentScenarios
