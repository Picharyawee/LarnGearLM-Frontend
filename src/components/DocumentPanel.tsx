import React from "react";
import { Box , Button , Typography } from '@mui/material';

export default function DocumentPanel() {
    return (
        <Box
        display="flex"
        width="25%"
        flexDirection="column"
        m={2}
        border={1}
        borderRadius={2}
        >
            <Box
            borderBottom={1}
            mb={1}
            p={2}
            >
                <Typography
                variant="h6"
                fontWeight={"bold"}
                >
                    แหล่งข้อมูล
                </Typography>
            </Box>

            <Box px={2}>
                <Button
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: '#2d3748',
                    borderRadius: '8px',
                    '&:hover':{
                        backgroundColor:'#1a202c'
                    },
                    gap:1,
                    mt:1,
                    py:1.5,
                }}

                startIcon={
                    <img 
                    src="/img/Plus.svg"
                    alt="Plus Icon"
                    width={24}
                    height={24}
                    />
                }
                >
                    <Typography sx={{color:'white'}}>
                        เพิ่มแหล่งข้อมูล
                    </Typography>
                </Button>
            </Box>

            <Box
            display={"flex"}
            flexDirection={"column"}
            flexGrow={1}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            color={"text.secondary"}
            px={4}
            gap={2}
            >
                <img
                src="/img/FileText.svg"
                alt="File Icon"
                width={80}
                height={80}
                />

                <Typography>
                    แหล่งข้อมูลที่บันทึกไว้จะปรากฏที่นี่ คลิก "เพิ่มแหล่งข้อมูล" ด้านบนเพื่อเพิ่มไฟล์ PDF
                </Typography>
            </Box>
        </Box>
    );
}