import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ChatIcon from '@mui/icons-material/Chat'
import { analytics } from '@/utils/analytics'

const Bystander: React.FC = () => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const warningSignsCategory = [
    {
      category: 'Behavioral Changes',
      signs: [
        'Becoming withdrawn or distant',
        'Losing interest in activities they used to enjoy',
        'Seeming anxious or on edge',
        'Making excuses for a partner\'s behavior'
      ]
    },
    {
      category: 'Social Changes',
      signs: [
        'Seeing friends and family less often',
        'Always checking in with their partner',
        'Not being "allowed" to go places without their partner',
        'Partner answers for them or controls conversations'
      ]
    },
    {
      category: 'Physical Signs',
      signs: [
        'Unexplained injuries or bruises',
        'Dressing differently (covering up more)',
        'Partner monitors their phone/location constantly'
      ]
    }
  ]

  const conversationStarters = [
    '"I\'ve noticed you seem stressed lately. Is everything okay?"',
    '"You don\'t seem like yourself. I\'m here if you want to talk."',
    '"I\'m worried about you. Has something been bothering you?"',
    '"I care about you and I\'m here to listen, no judgment."',
    '"I noticed [specific behavior]. Are you feeling safe in your relationship?"'
  ]

  const dos = [
    'Listen without judgment',
    'Believe them',
    'Let them make their own decisions',
    'Offer specific help ("Can I help you call a helpline?")',
    'Keep checking in on them',
    'Learn about resources you can share',
    'Take care of your own wellbeing too'
  ]

  const donts = [
    'Don\'t force them to leave if they\'re not ready',
    'Don\'t confront their partner',
    'Don\'t give ultimatums ("Leave or we\'re not friends")',
    'Don\'t judge their choices',
    'Don\'t pressure them to report if they\'re not ready',
    'Don\'t share what they told you without permission',
    'Don\'t blame them for the abuse'
  ]

  const whenToGetHelp = [
    {
      situation: 'They\'re in immediate danger',
      action: 'Call 999 immediately',
      severity: 'emergency'
    },
    {
      situation: 'They mention suicide or self-harm',
      action: 'Contact a crisis helpline together or tell a trusted adult',
      severity: 'urgent'
    },
    {
      situation: 'You\'re worried about a minor (under 18)',
      action: 'Talk to a teacher, counselor, or call Childline for advice',
      severity: 'important'
    },
    {
      situation: 'You\'re feeling overwhelmed',
      action: 'Reach out to a support service for yourself',
      severity: 'important'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'info.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Help a Friend</Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            If you're worried about a friend who might be in an unhealthy relationship, this guide can help.
            <strong> Supporting someone takes courage - you're doing the right thing by being here.</strong>
          </Typography>
        </Alert>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🚩 Warning Signs to Look For</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {warningSignsCategory.map((category, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
                  {category.category}
                </Typography>
                <List>
                  {category.signs.map((sign, j) => (
                    <ListItem key={j}>
                      <ListItemIcon>
                        <WarningIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText primary={sign} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">💬 How To Start The Conversation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Choose a private, safe time and place. Here are some ways to begin:
            </Typography>
            <List>
              {conversationStarters.map((starter, i) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    <ChatIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={starter} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">✅ Do's and Don'ts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ mb: 2, bgcolor: 'success.light' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  ✅ DO
                </Typography>
                <List>
                  {dos.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'error.light' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  ❌ DON'T
                </Typography>
                <List>
                  {donts.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <WarningIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">🆘 When To Get Adult Help</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {whenToGetHelp.map((item, i) => (
              <Card key={i} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1 }}>
                      {item.situation}
                    </Typography>
                    <Chip
                      label={item.severity}
                      color={
                        item.severity === 'emergency' ? 'error' :
                        item.severity === 'urgent' ? 'warning' : 'info'
                      }
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2">
                    <strong>Action:</strong> {item.action}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>

        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💙 Taking Care of Yourself
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Supporting someone in an unhealthy relationship can be emotionally draining. Remember:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="• You can't force someone to leave a relationship" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• It's not your fault if they stay" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• You can set boundaries on how much you can help" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• You can seek support for yourself too" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              analytics.track('bystander_resources_accessed', 'bystander')
              navigate('/support')
            }}
          >
            Find Support Resources
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Bystander
