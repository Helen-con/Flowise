import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import ReportIcon from '@mui/icons-material/Report'
import LockIcon from '@mui/icons-material/Lock'
import { analytics } from '@/utils/analytics'

const DigitalSafety: React.FC = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)

  const deepfakeSpottingTips = [
    'Unnatural blinking patterns or no blinking at all',
    'Facial movements that don\'t match voice/audio',
    'Unusual lighting or shadows on the face',
    'Blurred or mismatched edges around the face',
    'Skin tone that looks too smooth or unnatural',
    'Background or edges that appear warped',
    'Audio that doesn\'t sync with mouth movements',
    'Check if the source is trustworthy'
  ]

  const sextortionSteps = [
    { title: 'Don\'t Panic', description: 'Take a deep breath. This happens to many people and there is help available.' },
    { title: 'Don\'t Pay or Send More', description: 'Giving in will not make them stop. They will likely ask for more.' },
    { title: 'Don\'t Delete Evidence', description: 'Take screenshots of messages before blocking. You may need them later.' },
    { title: 'Block Them', description: 'Block them on all platforms. Don\'t engage further.' },
    { title: 'Report It', description: 'Report to the platform, police (101), and organizations like Childline (0800 1111) or The Mix (0808 808 4994).' },
    { title: 'Tell Someone', description: 'Tell a trusted adult, teacher, or counselor. You\'re not alone and it\'s not your fault.' },
    { title: 'Protect Accounts', description: 'Change passwords, enable 2FA, review privacy settings.' }
  ]

  const privacyChecklist = [
    { platform: 'Instagram', checks: ['Account is private', 'Only accepted followers you know', 'Location services are off', 'Tagged photos require approval', 'Stories are set to "Friends" only'] },
    { platform: 'TikTok', checks: ['Account is private', 'Duet/Stitch limited to friends', 'Comments limited', 'Location sharing is off', 'Download restricted'] },
    { platform: 'Snapchat', checks: ['Ghost Mode enabled', 'Only friends can contact you', 'Snap Map is off or friends-only', 'Story privacy is set to friends', 'Quick Add is disabled'] },
    { platform: 'Facebook', checks: ['Posts are friends-only', 'Who can look you up is limited', 'Timeline review is on', 'Location is off', 'Tagged posts require approval'] }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'info.main', color: 'white', py: 2, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Digital Safety</Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }} variant="scrollable">
          <Tab label="Deepfakes" icon={<PhotoCameraIcon />} iconPosition="start" />
          <Tab label="Sextortion" icon={<ReportIcon />} iconPosition="start" />
          <Tab label="Privacy Audit" icon={<LockIcon />} iconPosition="start" />
        </Tabs>

        {tab === 0 && (
          <>
            <Alert severity="info" sx={{ mb: 3 }}>
              Deepfakes are AI-generated fake videos/images that can look very real. They're sometimes used to manipulate or harm people.
            </Alert>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔍 How to Spot Deepfakes
                </Typography>
                <List>
                  {deepfakeSpottingTips.map((tip, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⚠️ What To Do If You're Targeted
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Don't engage or share"
                      secondary="Don't respond to or share the content"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Document and report"
                      secondary="Screenshot, report to platform, and consider police report"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Get support"
                      secondary="Contact Childline (0800 1111) or The Mix (0808 808 4994)"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </>
        )}

        {tab === 1 && (
          <>
            <Alert severity="error" sx={{ mb: 3 }}>
              <strong>Sextortion</strong> is when someone threatens to share intimate images unless you pay money or send more images. <strong>It's a crime and it's not your fault.</strong>
            </Alert>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🆘 If This Happens To You
                </Typography>
                {sextortionSteps.map((step, i) => (
                  <Accordion key={i}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight="bold">
                        Step {i + 1}: {step.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{step.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🛡️ Prevention Tips
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="• Never send intimate images to anyone, even people you trust" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Be cautious of people you only know online" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Don't accept friend requests from strangers" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Keep accounts private" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Trust your instincts - if something feels wrong, it probably is" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate('/support')}
            >
              Get Immediate Support
            </Button>
          </>
        )}

        {tab === 2 && (
          <>
            <Alert severity="info" sx={{ mb: 3 }}>
              Review your social media privacy settings. Make sure you're only sharing what you want with who you want.
            </Alert>

            {privacyChecklist.map((platform, i) => (
              <Accordion key={i}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{platform.platform}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {platform.checks.map((check, j) => (
                      <ListItem key={j}>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={check} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  💡 General Privacy Tips
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="• Use strong, unique passwords for each account" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Enable two-factor authentication (2FA)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Don't share your location publicly" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Review app permissions regularly" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• Think before you post - it can last forever" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </Box>
  )
}

export default DigitalSafety
