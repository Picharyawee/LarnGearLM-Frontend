import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import ChatPanel from '@/components/ChatPanel';
import ResourcePanel from '@/components/ResourcePanel';
import NotePanel from '@/components/NotePanel';
import Header from '@/components/Header';
import { ResourceProvider } from '@/contexts/ResourceContext';

export default function HomePage() {
  return (
    <ResourceProvider>
      <CssBaseline />
      <Header />
      <Box
        display="flex"
        overflow="hidden"
        height="calc(100vh - 100px)"
      >
        <ResourcePanel />
        <ChatPanel />
        <NotePanel />
      </Box>
    </ResourceProvider>
  );
}
