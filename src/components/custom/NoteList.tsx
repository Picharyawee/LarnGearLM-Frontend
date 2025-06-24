import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useNoteContext } from '@/lib/contexts/NoteContext';

export default function NoteList() {
  const { notes, setIsAddingNote, handleViewNote } = useNoteContext();
  return (
    <Box 
    px={2}
    flexGrow={1} 
    display='flex' 
    flexDirection='column'>
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#2d3748',
          borderRadius: '8px',
          '&:hover': { backgroundColor: '#1a202c' },
          justifyContent: 'center',
          gap: 1,
          py: 1.5,
          mb: 2
        }}
        onClick={() => setIsAddingNote(true)}
        startIcon={
          <Image
            src='/img/Plus.svg'
            alt='Plus Icon'
            width={24}
            height={24}
          />
        }
      >
        <Typography sx={{ color: 'white' }}>
          เพิ่มโน้ต
        </Typography>
      </Button>

      {notes.length === 0 ? (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          flexGrow={1}
          justifyContent='center'
          textAlign='center'
          color='text.secondary'
        >
          <Image
            src='/img/NoteBook.svg'
            alt='Notebook Icon'
            width={80}
            height={80}
          />
          <Typography>
            โน้ตที่บันทึกไว้จะปรากฏที่นี่<br />
            บันทึกข้อความแชทเพื่อสร้างโน้ตใหม่หรือคลิกเพิ่มโน้ตด้านบน
          </Typography>
        </Box>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          overflow='auto'
          flexGrow={1}
        >
          {notes.map((note) => (
            <Box
              key={note.id}
              sx={{
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                border: 1,
                display: 'flex',
                gap: 1,
                borderRadius: '4px',
                mb: 0.1
              }}
              onClick={() => handleViewNote(note)}
            >
              <Image
                src='/img/NoteBook.svg'
                alt='Notebook Icon'
                width={24}
                height={24}
              />
              <Typography>
                {note.title}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}