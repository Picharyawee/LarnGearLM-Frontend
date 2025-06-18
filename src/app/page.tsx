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
      >
        <ResourcePanel />
        <ChatPanel />
        <NotePanel />
      </Box>
    </>
  );
}
