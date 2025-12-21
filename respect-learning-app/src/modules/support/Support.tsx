import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'
import MapIcon from '@mui/icons-material/Map'
import { analytics } from '@/utils/analytics'

const Support: React.FC = () => {
  const navigate = useNavigate()

  const helplines = [
    {
      name: 'Childline',
      number: '0800 1111',
      description: '24/7 confidential support for anyone under 19',
      ages: 'Under 19',
      hasChat: true,
      chatUrl: 'https://www.childline.org.uk'
    },
    {
      name: 'The Mix',
      number: '0808 808 4994',
      description: 'Free confidential support for under 25s',
      ages: 'Under 25',
      hasChat: true,
      chatUrl: 'https://www.themix.org.uk'
    },
    {
      name: "Women's Aid",
      number: '0808 2000 247',
      description: '24/7 National Domestic Violence Helpline',
      ages: 'All ages',
      hasChat: true,
      chatUrl: 'https://www.womensaid.org.uk'
    },
    {
      name: 'Refuge',
      number: '0808 2000 247',
      description: '24/7 domestic abuse helpline',
      ages: 'All ages',
      hasChat: false
    },
    {
      name: "Men's Advice Line",
      number: '0808 8010 327',
      description: 'For men experiencing domestic abuse',
      ages: 'Men, all ages',
      hasChat: false
    },
    {
      name: 'Galop LGBT+ Helpline',
      number: '0800 999 5428',
      description: 'Support for LGBT+ people experiencing abuse',
      ages: 'LGBT+ community',
      hasChat: true,
      chatUrl: 'https://galop.org.uk'
    },
    {
      name: 'Samaritans',
      number: '116 123',
      description: '24/7 emotional support',
      ages: 'All ages',
      hasChat: true,
      chatUrl: 'https://www.samaritans.org'
    }
  ]

  const handleCallClick = (name: string, number: string) => {
    analytics.track('helpline_selected', 'support', { name, number })
  }

  const handleChatClick = (name: string, url: string) => {
    analytics.track('chat_opened', 'support', { name })
    window.open(url, '_blank')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'success.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Get Support</Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight="bold">
            🚨 In immediate danger? Call 999
          </Typography>
          <Typography variant="body2">
            If you or someone you know is in immediate danger, call emergency services right away.
          </Typography>
        </Alert>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📞 24/7 Helplines
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              All calls are free and confidential. You don't have to give your name.
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {helplines.map((helpline, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary">
                  {helpline.name}
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ my: 1 }}>
                  {helpline.number}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {helpline.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  For: {helpline.ages}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    href={`tel:${helpline.number.replace(/\s/g, '')}`}
                    onClick={() => handleCallClick(helpline.name, helpline.number)}
                  >
                    Call Now
                  </Button>
                  {helpline.hasChat && helpline.chatUrl && (
                    <Button
                      variant="outlined"
                      startIcon={<ChatIcon />}
                      onClick={() => handleChatClick(helpline.name, helpline.chatUrl)}
                    >
                      Live Chat
                    </Button>
                  )}
                </Box>
                {i < helplines.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🏥 Local Support Services
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Find shelters, counseling, and support groups in your area
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<MapIcon />}
              onClick={() => {
                analytics.track('local_services_clicked', 'support')
                alert('In a real app, this would show a map of local support services based on your location')
              }}
            >
              Find Services Near Me
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💬 What To Expect When You Call
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="• You don't have to give your name"
                  secondary="All helplines are confidential"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="• They're there to listen, not judge"
                  secondary="Trained counselors who understand what you're going through"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="• They can help you make a plan"
                  secondary="Whether you want to talk, get advice, or make a safety plan"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="• You're in control"
                  secondary="You can hang up anytime, and you decide what to share"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Support
