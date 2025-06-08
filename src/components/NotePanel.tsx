"use client";

import React, { useState } from "react";
import { Box , Button , Typography , IconButton , TextField , Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotePanel() {
    const [notes, setNotes] = useState([]); //เก็บโน้ต
    const [newNoteContent , setNewNoteContent] = useState(""); //ข้อความใหม่
    const [isAddingNote, setIsAddingNote] = useState(false); //การแสดง textfield
    const [selectedNote, setSelectedNote] = useState(null); //โน้ตที่ถูกเลือก

    const handleAddNote = () => {
        if(newNoteContent.trim() !== "") {
            setNotes([...notes, {id: Date.now(), content: newNoteContent.trim()}])
            setNewNoteContent("");
            setIsAddingNote(false);
            setSelectedNote(null);
        }
    };

    const handleDeleteNoteByID = (idToDelete) => {
        setNotes(notes.filter(note => note.id !== idToDelete));
        setSelectedNote(null);
        setIsAddingNote(false);
        setNewNoteContent("");
    };

    const handleViewNote = (note) => {
        setSelectedNote(note);
        setNewNoteContent(note.content);
        setIsAddingNote(true);
    };

    const handleSaveEditNote = () => {
        if(selectedNote && newNoteContent.trim() !== ""){
            setNotes(notes.map(note =>
                note.id === selectedNote.id ? {...note, content: newNoteContent.trim()} : note
            ));
            setSelectedNote(null);
            setNewNoteContent("");
            setIsAddingNote(false);
        }
        else if(selectedNote === null && newNoteContent.trim() !== ""){
            handleAddNote();
        }
    };

    const handleCancelAction = () => {
        setIsAddingNote(false);
        setSelectedNote(null);
        setNewNoteContent("");
    };

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
                    sx={{ width: '24px' , height: '24px' }}  
                    onClick={handleCancelAction}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                )}
            </Box>

            {(isAddingNote || selectedNote) ? (
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
                    p={2}
                    borderBottom={1}
                    mt={-2}
                    mx={-2}
                    >
                        <Typography>
                            {selectedNote ? "แก้ไขโน้ต" : "โน้ตใหม่"}
                        </Typography>

                        {selectedNote && (
                            <IconButton 
                            sx={{ 
                                width: '24px', 
                                height: '24px' 
                            }} 
                            onClick={() => handleDeleteNoteByID(selectedNote.id)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        )}
                    </Box>
                
                    <TextField
                    fullWidth
                    multiline
                    placeholder="เริ่มพิมพ์..."
                    value={newNoteContent}
                    variant="outlined"
                    sx={{
                        flexGrow: 1, // ทำให้ TextField ขยายเต็มพื้นที่
                        '& .MuiOutlinedInput-root': {
                            height: '100%', // ทำให้ TextField สูงเต็ม Box
                            alignItems: 'flex-start', // จัดข้อความให้อยู่ด้านบน
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { border: 'none' },
                            '&.Mui-focused fieldset': { border: 'none' },
                        }
                    }}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    />

                    <Box
                    display={'flex'}
                    gap={1}
                    mb={1}
                    mt={2}
                    >
                        <Button
                        variant="contained"
                        onClick={selectedNote ? handleSaveEditNote : handleAddNote}
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
                        onClick={handleCancelAction}
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

                    onClick={selectedNote ? handleSaveEditNote : handleAddNote}

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
            ) : (
                <Box 
                px={2}
                flexGrow={1}
                display='flex'
                flexDirection='column'
                >
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
                        <img
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
                            <img
                            src='/img/NoteBook.svg'
                            alt='Notebook Icon'
                            width={80}
                            height={80}
                            />

                            <Typography>
                                โน้ตที่บันทึกไว้จะปรากฏที่นี่<br/>
                                บันทึกข้อความแชทเพื่อสร้างโน้ตใหม่หรือคลิกเพิ่มโน้ตด้านบน
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                        display='flex'
                        flexDirection='column'
                        //gap={1}
                        overflow='auto'
                        flexGrow={1}
                        >
                            {notes.map((note) => (
                                <Box 
                                key={note.id}
                                // elevation={1}
                                sx={{
                                    px: 2,
                                    py: 1.5,
                                    cursor: 'pointer',
                                    border: 1,
                                    display: 'flex',
                                    gap: 1,
                                    borderRadius: '4px',
                                    //color: '#2d3748'
                                }}
                                onClick={() => handleViewNote(note)}
                                >
                                    <img
                                    src='/img/NoteBook.svg'
                                    alt='Notebook Icon'
                                    width={24}
                                    height={24}
                                    />

                                    <Typography>
                                        {note.content.length > 10
                                        ? note.content.substring(0, 10) + '...'
                                        : note.content}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}