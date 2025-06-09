"use client"

import React from "react";
import { Box , Typography , IconButton } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NoteList from "./custom/NoteList";
import AddEditNote from "./custom/AddEditNote";
import useNotes from "@/lib/hooks/useNotes";

export default function NotePanel() {
    const {
        notes,
        newNoteContent,
        isAddingNote,
        selectedNote,
        setNewNoteContent,
        handleAddNote,
        handleDeleteNoteByID,
        handleViewNote,
        handleSaveEditNote,
        handleCancelAction,
        setIsAddingNote,
    } = useNotes();

    return (
        <Box
        display="flex"
        flexDirection="column"
        height='calc(100vh - 100px)'
        border={1}
        borderRadius={2}
        m={2}
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
                        <ArrowBackIcon/>
                    </IconButton>
                )}
            </Box>

            {(isAddingNote || selectedNote) ? (
                <AddEditNote
                selectedNote={selectedNote}
                newNoteContent={newNoteContent}
                onContentChange={(e) => setNewNoteContent(e.target.value)}
                onSave={handleSaveEditNote}
                onCancel={handleCancelAction}
                onDelete={handleDeleteNoteByID}
                />
            ) : (
                <NoteList
                notes={notes}
                onAddNoteClick={() => setIsAddingNote(true)}
                onSelectNote={handleViewNote}
                />
            )}
        </Box>
    );
}