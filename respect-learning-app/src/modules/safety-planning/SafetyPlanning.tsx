import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Alert,
  Divider
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import MapIcon from '@mui/icons-material/Map'
import { storageService } from '@/utils/storage'
import { analytics } from '@/utils/analytics'

interface SafetyPlan {
  safeContacts: string[]
  safePlace: string
  importantDocuments: string[]
  emergencyBag: string[]
  codeWord: string
  notes: string
}

const SafetyPlanning: React.FC = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [plan, setPlan] = useState<SafetyPlan>({
    safeContacts: ['', '', ''],
    safePlace: '',
    importantDocuments: [],
    emergencyBag: [],
    codeWord: '',
    notes: ''
  })

  useEffect(() => {
    storageService.getSafetyPlan().then(savedPlan => {
      if (savedPlan) setPlan(savedPlan)
    })
  }, [])

  const savePlan = async () => {
    await storageService.setSafetyPlan(plan)
    analytics.track('safety_plan_saved', 'safety-planning')
    alert('Safety plan saved securely on your device')
  }

  const essentialDocuments = [
    'ID / Passport',
    'Birth certificate',
    'Social security card',
    'Bank statements',
    'Medications list',
    'Important photos',
    'School records'
  ]

  const emergencyBagItems = [
    'Change of clothes',
    'Phone charger',
    'Cash/cards',
    'Medications',
    'Keys',
    'Important documents',
    'Comfort items'
  ]

  const supportServices = [
    { name: 'Childline', number: '0800 1111', description: '24/7 support for anyone under 19' },
    { name: 'The Mix', number: '0808 808 4994', description: 'Support for under 25s' },
    { name: "Women's Aid", number: '0808 2000 247', description: '24/7 domestic abuse helpline' },
    { name: 'Refuge', number: '0808 2000 247', description: '24/7 domestic abuse helpline' },
    { name: 'National Domestic Violence Helpline', number: '0808 2000 247', description: '24/7 freephone helpline' },
    { name: "Men's Advice Line", number: '0808 8010 327', description: 'For men experiencing domestic abuse' },
    { name: 'Galop LGBT+ Helpline', number: '0800 999 5428', description: 'Support for LGBT+ people' }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5">Safety Planning</Typography>
            </Box>
            <IconButton onClick={savePlan} sx={{ color: 'white' }}>
              <SaveIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Important:</strong> If you're in immediate danger, call 999. This tool helps you prepare, but professional help is crucial.
          </Typography>
        </Alert>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Exit Plan" />
          <Tab label="Support Services" />
        </Tabs>

        {tab === 0 && (
          <>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🤝 Safe Contacts
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  People you can trust and contact in an emergency
                </Typography>
                {[0, 1, 2].map(i => (
                  <TextField
                    key={i}
                    fullWidth
                    label={`Contact ${i + 1} (Name & Phone)`}
                    value={plan.safeContacts[i] || ''}
                    onChange={(e) => {
                      const newContacts = [...plan.safeContacts]
                      newContacts[i] = e.target.value
                      setPlan({ ...plan, safeContacts: newContacts })
                    }}
                    sx={{ mb: 2 }}
                  />
                ))}
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🏠 Safe Place
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Where can you go if you need to leave quickly?
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Safe location (friend, family, shelter)"
                  value={plan.safePlace}
                  onChange={(e) => setPlan({ ...plan, safePlace: e.target.value })}
                />
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📄 Important Documents
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Keep these ready or know where they are
                </Typography>
                <List>
                  {essentialDocuments.map((doc, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={`• ${doc}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎒 Emergency Bag
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Keep a bag ready with essentials
                </Typography>
                <List>
                  {emergencyBagItems.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={`• ${item}`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔑 Code Word
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  A secret word to tell trusted people you need help
                </Typography>
                <TextField
                  fullWidth
                  label="Your code word"
                  value={plan.codeWord}
                  onChange={(e) => setPlan({ ...plan, codeWord: e.target.value })}
                />
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📝 Additional Notes
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Other important information"
                  value={plan.notes}
                  onChange={(e) => setPlan({ ...plan, notes: e.target.value })}
                />
              </CardContent>
            </Card>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={savePlan}
            >
              Save Safety Plan
            </Button>
          </>
        )}

        {tab === 1 && (
          <>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📞 24/7 Helplines
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                  {supportServices.map((service, i) => (
                    <ListItem key={i} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {service.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {service.number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<MapIcon />}
              onClick={() => alert('In a real app, this would show local services on a map')}
            >
              Find Local Support Services
            </Button>
          </>
        )}
      </Container>
    </Box>
  )
}

export default SafetyPlanning
