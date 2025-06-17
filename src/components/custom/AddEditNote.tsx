import React from 'react';
import { Box, Button, Typography, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Note } from "@/lib/hooks/useNotes";

interface AddEditNoteProps {
  selectedNote: Note | null;
  newNoteContent: string;
  newNoteTitle: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
}

export default function AddEditNote({
  selectedNote,
  newNoteContent,
  newNoteTitle,
  onContentChange,
  onTitleChange,
  onSave,
  onCancel,
  onDelete,
}: AddEditNoteProps) {
  return (
    <Box
      flexGrow={1}
      display={'flex'}
      flexDirection={'column'}
      px={2}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        textAlign={'center'}
        //p={2}
        px={2}
        borderBottom={1}
        mt={-2}
        mx={-2}
      >
        {/* <Typography>
          {selectedNote ? "แก้ไขโน้ต" : "โน้ตใหม่"}
        </Typography> */}

        <TextField
        fullWidth
        placeholder='ชื่อโน้ต'
        value={newNoteTitle}
        //variant='outlined'
        sx={{
          '& .MuiOutlinedInput-root': {
          height: '100%',
          alignItems: 'flex-start',
          '& fieldset': { border: 'none' },
          '&:hover fieldset': { border: 'none' },
          '&.Mui-focused fieldset': { border: 'none' },
        }
        }}
        onChange={onTitleChange}
        />

        {selectedNote && (
          <IconButton
            sx={{
              width: '24px',
              height: '24px'
            }}
            onClick={() => onDelete(selectedNote.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      {/* <TextField
      fullWidth
      placeholder='ชื่อโน้ต'
      value={newNoteTitle}
      variant='outlined'
      onChange={onTitleChange}
      /> */}

      <TextField
      fullWidth
      multiline
      placeholder="เริ่มพิมพ์..."
      value={newNoteContent}
      variant="outlined"
      sx={{
        flexGrow: 1,
        '& .MuiOutlinedInput-root': {
          height: '100%',
          alignItems: 'flex-start',
          '& fieldset': { border: 'none' },
          '&:hover fieldset': { border: 'none' },
          '&.Mui-focused fieldset': { border: 'none' },
        }
      }}
      onChange={onContentChange}
      />

      <Box
        display={'flex'}
        gap={1}
        mb={1}
        mt={2}
      >
        <Button
          variant="contained"
          onClick={onSave}
          sx={{
            backgroundColor: '#2d3748',
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#1a202c' },
            py: 1.5,
            width: '50%'
          }}
        >
          <Typography sx={{ color: 'white' }}>
            {selectedNote ? "บันทึกการแก้ไข" : "บันทึกโน้ต"}
          </Typography>
        </Button>

        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            borderRadius: '8px',
            py: 1.5,
            borderColor: '#d3d3d3',
            color: '#2d3748',
            '&:hover': {
              borderColor: '#1a202c',
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            },
            flexGrow: 1
          }}
        >
          <Typography>
            ยกเลิก
          </Typography>
        </Button>
      </Box>

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
          mx: 'auto',
          mb: 2
        }}
        onClick={onSave}
        startIcon={
          <img
            src='/img/Plus.svg'
            alt='Plus Icon'
            width={24}
            height={24}
          />
        }
      >
        <Typography sx={{ color: 'white' }}>
          แปลงโน้ตเป็นแหล่งข้อมูล
        </Typography>
      </Button>
    </Box>
  );
}