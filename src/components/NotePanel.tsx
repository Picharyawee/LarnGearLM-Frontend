"use client";

import React, { useState } from "react";
import { Box , Button , Typography , IconButton , TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotePanel() {
    const [isNoteEditing, setIsNoteEditing] = useState(false);
    const [noteText, setNoteText] = useState("");

    const handleAddNote = () => {
        setIsNoteEditing(true);
    };

    const handleDeleteNote = () => {
        setNoteText("");
        setIsNoteEditing(false);
    }

    return (
        <Box
        display={"flex"}
        flexDirection={"column"}
        height='calc(100vh - 100px)'
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

                {isNoteEditing && (
                    <IconButton 
                    sx={{ width: '24px' , height: '24px' }}  
                    onClick={handleDeleteNote}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                )}
            </Box>

            {!isNoteEditing && (
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
                            เพิ่มโน้ต
                        </Typography>
                    </Button>
                </Box>
            )}

            {isNoteEditing && (
                <Box
                width={'100%'}
                flexGrow={1}
                display={'flex'}
                flexDirection={'column'}
                mx={'auto'}
                >
                    <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    textAlign={'center'}
                    p={2}
                    borderBottom={1}
                    mt={-2}
                    >
                        <Typography>
                            โน้ตใหม่
                        </Typography>

                        <IconButton 
                        sx={{ width: '24px' , height: '24px' }} 
                        onClick={handleDeleteNote}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                
                    <Box
                    px={2}
                    display={'flex'}
                    flexDirection={'column'}
                    flexGrow={1}
                    >
                        <TextField
                        fullWidth
                        multiline
                        placeholder="เริ่มพิมพ์..."
                        value={noteText}
                        variant="outlined"
                        sx={{
                            mb: 2
                        }}
                        slotProps={{
                            root: {
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    }
                                }
                            }
                        }}
                        onChange={(e) => setNoteText(e.target.value)}
                        />

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
                            mt: 'auto',
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
            )}

            {!isNoteEditing && (
                <Box
                display={"flex"}
                flexDirection={"column"}
                flexGrow={1}
                alignItems={"center"}
                justifyContent={"center"}
                textAlign={"center"}
                mx={"auto"}
                gap={2}
                px={4}
                color={"text.secondary"}
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
            )}
        </Box>
    );
}