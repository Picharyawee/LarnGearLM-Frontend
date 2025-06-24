"use client"

import React from "react";
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoteList from "./custom/NoteList";
import AddEditNote from "./custom/AddEditNote";
import { useNoteContext } from "@/lib/contexts/NoteContext";

export default function NotePanel() {
  const {
    isAddingNote,
    selectedNote,
    handleCancelAction,
  } = useNoteContext();


  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
    // width="25%"
    // border={1}
    // borderRadius={2}
    // m={2}
    >
      <Box
        borderBottom={1}
        p={2}
        mb={2}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography
          variant="h6"
          fontWeight={"bold"}
        >
          โน้ต
        </Typography>

        {(isAddingNote || selectedNote) && (
          <IconButton
            sx={{
              width: '24px',
              height: '24px'
            }}
            onClick={handleCancelAction}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
      </Box>

      {(isAddingNote || selectedNote) ? (
        <AddEditNote />
      ) : (
        <NoteList />
      )}
    </Box>
  );
}