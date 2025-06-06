import React from "react";
import { Box , TextField , Button , Typography ,IconButton } from "@mui/material";

export default function ChatPanel() {
    return (
        <Box
        display="flex"
        flexDirection="column"
        height="calc(100vh - 100px)"
        border={1}
        borderRadius={2}
        >
            <Box
            borderBottom={1}
            p={2}
            mb={1}
            >
                <Typography
                variant="h6"
                fontWeight="bold"
                >
                    แชท
                </Typography>
            </Box>

            <Box
            display={"flex"}
            flexDirection={"column"}
            flexGrow={1}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            color="text.secondary"
            gap={2}
            >
                <IconButton>
                    <img
                    src="/img/UploadedIcon.svg"
                    alt="Uploaded Icon"
                    width={48}
                    height={48}
                    />
                </IconButton>

                <Typography>เพิ่มแหล่งข้อมูลเพื่อเริ่มต้น</Typography>

                <Button
                variant="contained"
                sx={{
                    backgroundColor: '#2d3748',
                    borderRadius: '8px',
                    '&:hover':{
                        backgroundColor:'#1a202c'
                    }
                }}
                >
                    อัปโหลดแหล่งข้อมูล
                </Button>
            </Box>

            <Box p={2}>
                <Box
                display="flex"
                alignItems="center"
                gap={1}
                maxWidth="500px"
                mx="auto"
                >
                    <TextField
                    fullWidth
                    size="small"
                    placeholder="เริ่มพิมพ์..."
                    variant="outlined"
                    sx={{
                        '&.MuiOutlinedInput-root' : {
                            borderRadius: 4
                        }
                    }}
                    />

                    <IconButton
                    sx={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        width:48,
                        height:48,
                        p:0.5,
                        // backgroundColor: '#2d3748',
                        // '&:hover':{
                        //     backgroundColor:'rgb(115, 122, 137)'
                        // }
                    }}
                    >
                        <img
                        src={"/img/SentIcon.svg"}
                        alt="Sent Icon"
                        width={48}
                        height={48}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}