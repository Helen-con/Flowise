import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import FavoriteIcon from '@mui/icons-material/Favorite'
import QuizIcon from '@mui/icons-material/Quiz'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import MapIcon from '@mui/icons-material/Map'
import SecurityIcon from '@mui/icons-material/Security'
import PhoneIcon from '@mui/icons-material/Phone'
import PeopleIcon from '@mui/icons-material/People'
import ShieldIcon from '@mui/icons-material/Shield'
import { security } from '@/utils/security'
import { analytics } from '@/utils/analytics'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleActivateDisguise = (mode: string) => {
    security.activateDisguise()
    window.location.reload()
  }

  const modules = [
    {
      title: 'RESPECT Check',
      description: 'Swipe through relationship scenarios and learn about healthy relationships',
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      path: '/respect-check',
      color: '#E91E63'
    },
    {
      title: 'Red/Green Flags',
      description: 'Test your knowledge with our interactive quiz on relationship warning signs',
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      path: '/flag-quiz',
      color: '#F44336'
    },
    {
      title: 'Consent Scenarios',
      description: 'Navigate real-life situations and learn about consent through choices',
      icon: <AccountTreeIcon sx={{ fontSize: 40 }} />,
      path: '/consent-scenarios',
      color: '#9C27B0'
    },
    {
      title: 'Control Web Mapper',
      description: 'Identify patterns of controlling behavior in relationships',
      icon: <MapIcon sx={{ fontSize: 40 }} />,
      path: '/control-mapper',
      color: '#673AB7'
    },
    {
      title: 'Safety Planning',
      description: 'Create your personalized safety plan and find local support services',
      icon: <ShieldIcon sx={{ fontSize: 40 }} />,
      path: '/safety-planning',
      color: '#3F51B5'
    },
    {
      title: 'Digital Safety',
      description: 'Learn about deepfakes, sextortion, and online safety',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      path: '/digital-safety',
      color: '#2196F3'
    },
    {
      title: 'Get Support',
      description: 'Connect with helplines and find resources near you',
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      path: '/support',
      color: '#009688'
    },
    {
      title: 'Help a Friend',
      description: 'Learn how to support someone who may be in an unhealthy relationship',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/bystander',
      color: '#4CAF50'
    }
  ]

  const handleModuleClick = (path: string, title: string) => {
    analytics.track('module_opened', title)
    navigate(path)
  }

  return (
    <Box>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RESPECT Learning
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <SettingsIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleActivateDisguise('calculator')}>
              Disguise as Calculator
            </MenuItem>
            <MenuItem onClick={() => handleActivateDisguise('notes')}>
              Disguise as Notes App
            </MenuItem>
            <MenuItem onClick={() => handleActivateDisguise('period-tracker')}>
              Disguise as Period Tracker
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Learn About Healthy Relationships
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Interactive tools to help you understand respect, consent, and safety in relationships
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {modules.map((module, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: module.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {module.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {module.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleModuleClick(module.path, module.title)}
                    sx={{
                      bgcolor: module.color,
                      '&:hover': {
                        bgcolor: module.color,
                        opacity: 0.9
                      }
                    }}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: 3, bgcolor: 'info.light', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            🔒 Your Privacy Matters
          </Typography>
          <Typography variant="body2">
            All your data stays on your device. We don't collect any personal information.
            Use the Quick Exit button (top right) or press Escape 3 times to leave quickly.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Home
