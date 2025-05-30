import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import ChatPanel from '@/components/ChatPanel';
import DocumentPanel from '@/components/DocumentPanel';
import NotePanel from '@/components/NotePanel';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <CssBaseline />

      <Box 
      display="flex" 
      flexDirection="column" 
      height="100vh"
      >
        <Header />

        <Box 
        display="flex" 
        flexGrow={1} 
        overflow="hidden"
        >
          <Box 
          width="25%" 
          height="100%" 
          overflow="auto"
          >
            <DocumentPanel />
          </Box>

          <Box 
          flexGrow={1} 
          p={2} 
          overflow="auto"
          >
            <ChatPanel />
          </Box>

          <Box 
          width="25%" 
          height="100%"
          overflow="auto"
          >
            <NotePanel />
          </Box>
        </Box>
      </Box>
    </>
  );
}
