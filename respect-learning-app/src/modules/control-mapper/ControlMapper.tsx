import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
  Divider,
  Chip
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import WarningIcon from '@mui/icons-material/Warning'
import { analytics } from '@/utils/analytics'

interface ControlBehavior {
  id: string
  category: string
  behavior: string
  severity: 'mild' | 'moderate' | 'severe'
}

const controlBehaviors: ControlBehavior[] = [
  { id: '1', category: 'Digital Control', behavior: 'Checks your phone messages without permission', severity: 'severe' },
  { id: '2', category: 'Digital Control', behavior: 'Demands passwords to your accounts', severity: 'severe' },
  { id: '3', category: 'Digital Control', behavior: 'Tracks your location constantly', severity: 'severe' },
  { id: '4', category: 'Digital Control', behavior: 'Controls who you follow/talk to online', severity: 'moderate' },
  { id: '5', category: 'Social Isolation', behavior: 'Gets upset when you spend time with friends', severity: 'severe' },
  { id: '6', category: 'Social Isolation', behavior: 'Makes you feel guilty about seeing family', severity: 'severe' },
  { id: '7', category: 'Social Isolation', behavior: 'Criticizes your friends/family', severity: 'moderate' },
  { id: '8', category: 'Social Isolation', behavior: 'Wants to be with you all the time', severity: 'mild' },
  { id: '9', category: 'Autonomy Control', behavior: 'Tells you what to wear', severity: 'moderate' },
  { id: '10', category: 'Autonomy Control', behavior: 'Controls how you style your hair/makeup', severity: 'moderate' },
  { id: '11', category: 'Autonomy Control', behavior: 'Makes decisions for you without asking', severity: 'moderate' },
  { id: '12', category: 'Financial Control', behavior: 'Controls how you spend your money', severity: 'severe' },
  { id: '13', category: 'Financial Control', behavior: 'Makes you ask permission to buy things', severity: 'severe' },
  { id: '14', category: 'Financial Control', behavior: 'Takes your money', severity: 'severe' },
  { id: '15', category: 'Emotional Control', behavior: 'Threatens to hurt themselves if you leave', severity: 'severe' },
  { id: '16', category: 'Emotional Control', behavior: 'Makes you feel guilty for their feelings', severity: 'moderate' },
  { id: '17', category: 'Emotional Control', behavior: 'Puts you down or calls you names', severity: 'severe' },
  { id: '18', category: 'Emotional Control', behavior: 'Gives silent treatment as punishment', severity: 'moderate' }
]

const ControlMapper: React.FC = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const getSeverityCount = () => {
    const severeBehaviors = selected.filter(id =>
      controlBehaviors.find(b => b.id === id)?.severity === 'severe'
    )
    return {
      severe: severeBehaviors.length,
      moderate: selected.filter(id =>
        controlBehaviors.find(b => b.id === id)?.severity === 'moderate'
      ).length,
      mild: selected.filter(id =>
        controlBehaviors.find(b => b.id === id)?.severity === 'mild'
      ).length
    }
  }

  const getRiskLevel = () => {
    const counts = getSeverityCount()
    if (counts.severe >= 3) return 'high'
    if (counts.severe >= 1 || counts.moderate >= 3) return 'medium'
    if (selected.length > 0) return 'low'
    return 'none'
  }

  const getRiskMessage = () => {
    const level = getRiskLevel()
    const messages = {
      high: '🚨 High concern: Multiple severe controlling behaviors detected. Please consider reaching out for support.',
      medium: '⚠️ Moderate concern: Some controlling behaviors detected. This relationship may not be healthy.',
      low: '💛 Low concern: Some behaviors to watch. Healthy relationships respect boundaries.',
      none: '✅ No concerning behaviors selected. Remember to watch for these signs.'
    }
    return messages[level]
  }

  const categories = Array.from(new Set(controlBehaviors.map(b => b.category)))

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'warning.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Control Web Mapper</Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Check the behaviors you've experienced in your relationship. This tool helps identify patterns of controlling behavior.
            <strong> All information stays private on your device.</strong>
          </Typography>
        </Alert>

        {selected.length > 0 && (
          <Card sx={{ mb: 3, bgcolor: getRiskLevel() === 'high' ? 'error.light' : getRiskLevel() === 'medium' ? 'warning.light' : 'info.light' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assessment
              </Typography>
              <Typography variant="body1" gutterBottom>
                {getRiskMessage()}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {getSeverityCount().severe > 0 && (
                  <Chip label={`${getSeverityCount().severe} Severe`} color="error" size="small" />
                )}
                {getSeverityCount().moderate > 0 && (
                  <Chip label={`${getSeverityCount().moderate} Moderate`} color="warning" size="small" />
                )}
                {getSeverityCount().mild > 0 && (
                  <Chip label={`${getSeverityCount().mild} Mild`} color="info" size="small" />
                )}
              </Box>
            </CardContent>
          </Card>
        )}

        {categories.map(category => (
          <Card key={category} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                {category}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {controlBehaviors
                .filter(b => b.category === category)
                .map(behavior => (
                  <FormControlLabel
                    key={behavior.id}
                    control={
                      <Checkbox
                        checked={selected.includes(behavior.id)}
                        onChange={() => handleToggle(behavior.id)}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{behavior.behavior}</Typography>
                        {behavior.severity === 'severe' && (
                          <WarningIcon color="error" fontSize="small" />
                        )}
                      </Box>
                    }
                    sx={{ display: 'flex', mb: 1 }}
                  />
                ))}
            </CardContent>
          </Card>
        ))}

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              analytics.track('control_mapper_assessed', 'control-mapper', {
                totalSelected: selected.length,
                riskLevel: getRiskLevel()
              })
              navigate('/safety-planning')
            }}
          >
            {selected.length > 0 ? 'Create Safety Plan' : 'Skip to Safety Planning'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/support')} fullWidth>
            Get Support
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default ControlMapper
