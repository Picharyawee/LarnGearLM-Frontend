import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import ChatPanel from '@/components/ChatPanel';
import ResourcePanel from '@/components/ResourcePanel';
import NotePanel from '@/components/NotePanel';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        display="flex"
        overflow="hidden"
        height="calc(100vh - 100px)"
        flex={1}
        gap={2}
        m={2}
      >
        <Box 
        display={'flex'} 
        flexGrow={1} 
        flex={1} 
        border={1} 
        borderRadius={2}
        >
          <ResourcePanel />
        </Box>

        <Box 
        display={'flex'} 
        flexGrow={1} 
        flex={2} 
        border={1} 
        borderRadius={2} 
        >
          <ChatPanel />
        </Box>

        <Box 
        display={'flex'} 
        flexGrow={1} 
        flex={1} 
        border={1} 
        borderRadius={2}
        >
          <NotePanel />
        </Box>
      </Box>
    </>
  );
}
