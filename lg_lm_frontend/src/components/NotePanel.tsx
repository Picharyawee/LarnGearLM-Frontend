import React from "react";
import { Box , Button , Stack, Typography } from '@mui/material';

export default function NotePanel() {
    return (
        <Box
        display={"flex"}
        flexDirection={"column"}
        height='calc(100vh - 100px)'
        border={1}
        borderRadius={2}
        m={2}
        >
            <Box
            borderBottom={1}
            p={2}
            mb={2}
            >
                <Typography 
                variant="h6" 
                fontWeight={"bold"}
                >
                    โน้ต
                </Typography>
            </Box>

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

            {/* <Box px={2}>
                <Stack spacing={2}>
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
                </Stack>
            </Box> */}
        </Box>
    );
}