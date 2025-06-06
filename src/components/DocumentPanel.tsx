import React from "react";
import { Box , Button , Typography } from '@mui/material';
import Image from "next/image";

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
            <Typography
            variant="h6"
            fontWeight={"bold"}
            borderBottom={1}
            p={2}
            mb={1}
            >
                แหล่งข้อมูล
            </Typography>

            <Button
            variant="contained"
            sx={{
                backgroundColor: '#2d3748',
                borderRadius: '8px',
                gap:1,
                my:1,
                py:1.5,
                mx: 2,
                '&:hover':{
                    backgroundColor:'#1a202c'
                },
            }}
            startIcon={
                <Image
                src='/img/Plus.svg'
                alt='Plus Icon'
                width={24}
                height={24}
                />
            }
            >
                <Typography>
                    เพิ่มแหล่งข้อมูล
                </Typography>
            </Button>

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
                <Typography>
                    แหล่งข้อมูลที่บันทึกไว้จะปรากฏที่นี่ คลิก "เพิ่มแหล่งข้อมูล" ด้านบนเพื่อเพิ่มไฟล์ PDF
                </Typography>
            </Box>
        </Box>
    );
}