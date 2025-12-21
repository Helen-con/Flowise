import React, { useState } from 'react'
import { Box, Paper, TextField, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

interface Note {
  id: string
  content: string
  timestamp: number
}

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'Shopping list: milk, eggs, bread', timestamp: Date.now() - 3600000 },
    { id: '2', content: 'Meeting at 3pm tomorrow', timestamp: Date.now() - 7200000 }
  ])
  const [currentNote, setCurrentNote] = useState('')

  const handleAddNote = () => {
    if (currentNote.trim()) {
      setNotes([
        {
          id: Date.now().toString(),
          content: currentNote,
          timestamp: Date.now()
        },
        ...notes
      ])
      setCurrentNote('')
    }
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#fafafa',
        overflow: 'auto'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: '#1976d2',
          color: 'white',
          borderRadius: 0
        }}
      >
        <Typography variant="h5">Notes</Typography>
      </Paper>

      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Write a note..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            variant="outlined"
          />
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleAddNote} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        </Paper>

        <List>
          {notes.map((note) => (
            <Paper key={note.id} sx={{ mb: 1, p: 2 }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteNote(note.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={note.content}
                  secondary={formatTime(note.timestamp)}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default NotesApp
