import React, { useState } from 'react'
import { Box, Paper, Typography, Grid, Button, Chip } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

const PeriodTracker: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDate())
  const [trackedDays, setTrackedDays] = useState<number[]>([5, 6, 7, 8, 9])

  const daysInMonth = 30
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handleDayClick = (day: number) => {
    if (trackedDays.includes(day)) {
      setTrackedDays(trackedDays.filter(d => d !== day))
    } else {
      setTrackedDays([...trackedDays, day])
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#fce4ec',
        overflow: 'auto'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: '#e91e63',
          color: 'white',
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <CalendarMonthIcon />
        <Typography variant="h5">Period Tracker</Typography>
      </Paper>

      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Cycle Information
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Chip label="Cycle Day: 12" color="secondary" />
            <Chip label="Next Period: ~18 days" />
          </Box>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <Grid item xs={12 / 7} key={i}>
                <Typography align="center" variant="caption" fontWeight="bold">
                  {day}
                </Typography>
              </Grid>
            ))}
            {days.map((day) => (
              <Grid item xs={12 / 7} key={day}>
                <Button
                  fullWidth
                  variant={trackedDays.includes(day) ? 'contained' : 'outlined'}
                  onClick={() => handleDayClick(day)}
                  sx={{
                    minWidth: 0,
                    p: 1,
                    bgcolor: trackedDays.includes(day) ? '#e91e63' : 'transparent',
                    borderColor: day === currentDay ? '#e91e63' : '#ccc',
                    borderWidth: day === currentDay ? 2 : 1,
                    '&:hover': {
                      bgcolor: trackedDays.includes(day) ? '#c2185b' : '#f8bbd0'
                    }
                  }}
                >
                  <Typography variant="body2">{day}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  )
}

export default PeriodTracker
