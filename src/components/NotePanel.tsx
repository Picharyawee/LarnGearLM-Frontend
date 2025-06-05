"use client";

import React, { useState } from "react";
import { Box , Button , Typography , IconButton , TextField , Stack , Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotePanel() {
    const [notes, setNotes] = useState([]); //เก็บโน้ต
    const [newNoteContent , setNewNoteContent] = useState(""); //ข้อความใหม่
    const [isAddingNote, setIsAddingNote] = useState(false); //การแสดง textfield

    const handleAddNote = () => {
        if(newNoteContent.trim() !== "") {
            setNotes([...notes, {id: Date.now(), content: newNoteContent.trim()}])
            setNewNoteContent("");
            setIsAddingNote(false);
        }
    };

    const handleDeleteNote = (idToDelete) => {
        setNotes(notes.filter(note => note.id !== idToDelete));
    };

    return (
        <Box
        display={"flex"}
        flexDirection={"column"}
        height='calc(100vh - 100px)'
        //justifyContent={"flex-start"}
        //flexGrow={1}
        border={1}
        borderRadius={2}
        m={2}
        // minHeight={0}
        // height="100%"
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

                {isAddingNote && (
                    <IconButton 
                    sx={{ width: '24px' , height: '24px' }}  
                    onClick={() => {
                        setIsAddingNote(false);
                        setNewNoteContent("");
                    }}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                )}
            </Box>

            <Box
            px={2}
            display={'flex'}
            flexDirection={'column'}
            flexGrow={1}
            >
                {isAddingNote ? (
                    <Box
                    width={'100%'}
                    flexGrow={1}
                    display={'flex'}
                    flexDirection={'column'}
                    // mx={'auto'}
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
                                โน้ตใหม่
                            </Typography>

                            <IconButton 
                            sx={{ width: '24px' , height: '24px' }} 
                            onClick={() => {
                                setIsAddingNote(false);
                                setNewNoteContent("");
                            }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    
                        <Box
                        px={2}
                        display={'flex'}
                        flexDirection={'column'}
                        flexGrow={1}
                        //my={'auto'}
                        >
                            <TextField
                            fullWidth
                            multiline
                            //rows={5}
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
                            // slotProps={{
                            //     root: {
                            //         sx: {
                            //             '& .MuiOutlinedInput-notchedOutline': {
                            //                 border: 'none'
                            //             }
                            //         }
                            //     }
                            // }}
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
                            onClick={handleAddNote}
                            sx={{
                                backgroundColor: '#2d3748',
                                borderRadius: '8px',
                                '&:hover': { backgroundColor: '#1a202c' },
                                py: 1.5,
                                width: '50%'
                            }}
                            >
                                <Typography sx={{ color: 'white' }}>
                                    บันทึกโน้ต
                                </Typography>
                            </Button>

                            <Button
                            variant="outlined"
                            onClick={() => {
                                setIsAddingNote(false);
                                setNewNoteContent("");
                            }}
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

                            onClick={handleAddNote}

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
                    </Box>
                ) : (
                    <Box px={2}>
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#2d3748',
                            borderRadius: '8px',
                            '&:hover': { backgroundColor: '#1a202c' },
                            justifyContent: 'center',
                            gap: 1,
                            py: 1.5
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
                    </Box>
                )}
            </Box>

            {!isAddingNote && (
                <Box
                display={"flex"}
                flexDirection={"column"}
                flexGrow={1}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                textAlign={"center"}
                //mx={"auto"}
                gap={2}
                px={4}
                width={'100%'}
                color={"text.secondary"}
                overflow={'auto'}
                minHeight={0}
                >
                    {notes.length === 0 ? (
                        <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={"center"}
                        // justifyContent={"center"}
                        // textAlign={"center"}
                        //flexGrow={1}
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
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'flex-start'}
                        alignContent={'flex-start'}
                        //alignItems={'flex-start'}
                        gap={2}
                        sx={{
                            width: '100%',
                            //mx: 'auto'
                        }}
                        >
                            {notes.map((note) => (
                                <Paper 
                                key={note.id}
                                elevation={1}
                                sx={{
                                    p: 2,
                                }}
                                >
                                    <Typography>
                                        {note.content.length > 10
                                        ? note.content.substring(0, 10) + '...'
                                        : note.content}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}