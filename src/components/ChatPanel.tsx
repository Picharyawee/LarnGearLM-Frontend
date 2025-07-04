"use client";

import React from "react";
import { Box , TextField , Typography , IconButton , CircularProgress , Button } from "@mui/material";
import Image from "next/image";
import { useResourceContext } from "@/lib/contexts/ResourceContext";
import { useNoteContext } from "@/lib/contexts/NoteContext";
import { useChatContext } from "@/lib/contexts/ChatContext";

export default function ChatPanel() {
  const {
    currentMessage,
    messages,
    responseBufferMessage,
    isLoading,
    handleMessageChange,
    handleSendMessage,
    handleKeyPress,
  } = useChatContext();

  const {
    handleNoteToTextResource
  } = useResourceContext();

  const {
    setNoteTitleBuffer,
    setNoteContentBuffer,
    handleAddNote,
    handleAddNoteDirect
  } = useNoteContext();

  return (
    <Box
      display="flex"
      // width="50%"
      flexDirection="column"
      // m={2}
      // border={1}
      // borderRadius={2}
      //minHeight={'100%'}
      //height={'100%'}
      flexGrow={1}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        borderBottom={1}
        p={2}
        mb={1}
      >
        แชท
      </Typography>
      
      <Box
      display={'flex'}
      flexDirection={'column'}
      flexGrow={1}
      //minHeight={'100%'}
      px={4}
      py={2}
      sx={{
        overflowY:'auto'
      }}
      >
        {messages.length === 0 ? (
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
            {/* <IconButton>
              <Image
                src="/img/UploadedIcon.svg"
                alt="Uploaded Icon"
                width={48}
                height={48}
              />
            </IconButton> */}

            {/* <Image
              src="/img/FileText.svg"
              alt="File Icon"
              width={80}
              height={80}
            /> */}

            <Typography>โปรดเพิ่มแหล่งข้อมูลเพื่อเริ่มต้น</Typography>

            {/* <Button
            variant="contained"
            sx={{
              backgroundColor: '#2d3748',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#1a202c'
              }
            }}
            >
              อัปโหลดแหล่งข้อมูล
            </Button> */}
          </Box>
        ) : (
          messages.map((msg) => (
            <>
              <Box
              key={msg.id}
              sx={{
                alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                borderRadius: '24px',
                py: 1.5,
                px: 2,
                mb: 1,
                maxWidth: '70%',
                wordBreak: 'break-word',
                ...(msg.type === "user" && {
                    backgroundColor: '#2d3748', 
                }),
                ...(msg.type === "ai" && {
                    backgroundColor: 'white', 
                    border: 1
                }),
                ...(msg.type === "error" && {
                    backgroundColor: '#ffebee', 
                }),
              }}
              >
                {/* <Typography variant="body2" fontWeight="bold" color="white"
                >
                  {msg.sender}:
                </Typography> */}

                <Typography 
                variant="body1"
                sx={{
                  ...(msg.type === "ai" && {
                    color: '#2d3748',
                  }),
                  ...(msg.type === "error" && {
                    color: '#d32f2f',
                  }),
                  ...(msg.type === "user" && {
                    color: 'white', 
                  }),
                }}
                >
                  {msg.text}
                </Typography>
              </Box>

              {msg.type === "ai" && (
                //<Box mt={1}>
                  <Button
                    key={`${msg.id}-button`} // ให้ key ไม่ซ้ำ
                    size="small"
                    sx={{
                      px: 2,
                      alignSelf:"flex-start",
                      // border: 1,
                      // borderRadius: 2,
                      //backgroundColor: 'lightblue',
                      //color: 'gray'
                    }}
                    onClick={() => {
                      const title = msg.text.slice(0, 10); // ตัด 10 ตัวอักษรแรก
                      const content = msg.text;
                      
                      handleAddNoteDirect(title, content);
                    }}
                  >
                    บันทึกลงในโน้ต
                  </Button>
                //</Box>
              )}
            </>
          ))
        )}

        {isLoading && ( //แสดง CircularProgress เมื่อกำลังโหลด
          <Box 
          display={'flex'} 
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ 
            alignSelf: 'flex-start', 
            mb: 1, p: 1.5 
          }}
          >
            <CircularProgress size={24} sx={{color: '#2d3748'}}/>
            <Typography variant="body2" color="text.primary" sx={{ml: 1}}>
                {responseBufferMessage || "กำลังประมวลผล..."}
            </Typography>
          </Box>
        )}
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
          placeholder={isLoading ? "กำลังประมวลผล..." : "เริ่มพิมพ์..."}
          variant="outlined"
          value={currentMessage}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          multiline
          sx={{
            '&.MuiOutlinedInput-root': {
              borderRadius: 4
            }
          }}
          />

          <IconButton
          onClick={handleSendMessage}
          disabled={isLoading || currentMessage.trim() === ""}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            p: 0.5,
            // backgroundColor: '#2d3748',
            // '&:hover':{
            //     backgroundColor:'rgb(115, 122, 137)'
            // }
          }}
          >
            {isLoading ? ( //แสดง CircularProgress แทนรูปไอคอนเมื่อกำลังโหลด
                <CircularProgress size={24} sx={{color: '#2d3748'}} />
            ) : (
              <Image
                src={"/img/SentIcon.svg"}
                alt="Sent Icon"
                width={48}
                height={48}
              />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}