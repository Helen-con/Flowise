import React, { useState } from 'react'
import { Box, Paper, Button, Typography, Grid } from '@mui/material'

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num)
  }

  const handleOperation = (op: string) => {
    setPreviousValue(parseFloat(display))
    setOperation(op)
    setDisplay('0')
  }

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display)
      let result = 0

      switch (operation) {
        case '+':
          result = previousValue + current
          break
        case '-':
          result = previousValue - current
          break
        case '×':
          result = previousValue * current
          break
        case '÷':
          result = previousValue / current
          break
      }

      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
  }

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['C', '0', '=', '+']
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 320,
          p: 2,
          bgcolor: '#fff'
        }}
      >
        <Typography variant="h4" align="right" sx={{ mb: 2, p: 2, bgcolor: '#e0e0e0', borderRadius: 1 }}>
          {display}
        </Typography>
        <Grid container spacing={1}>
          {buttons.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((btn) => (
                <Grid item xs={3} key={btn}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      height: 60,
                      fontSize: 20,
                      bgcolor: ['÷', '×', '-', '+', '='].includes(btn) ? '#ff9800' : '#e0e0e0',
                      color: ['÷', '×', '-', '+', '='].includes(btn) ? '#fff' : '#000',
                      '&:hover': {
                        bgcolor: ['÷', '×', '-', '+', '='].includes(btn) ? '#f57c00' : '#bdbdbd'
                      }
                    }}
                    onClick={() => {
                      if (btn === 'C') handleClear()
                      else if (btn === '=') handleEquals()
                      else if (['÷', '×', '-', '+'].includes(btn)) handleOperation(btn)
                      else handleNumber(btn)
                    }}
                  >
                    {btn}
                  </Button>
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </Box>
  )
}

export default Calculator
