"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import Image from "next/image";

export default function ChatPanel() {
  const [currentMessage, setCurrentMessage] = useState("");
  const[messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if(currentMessage.trim() !== ""){
      setMessages((prevMessages) => [...prevMessages, {id: Date.now(), sender: "You", text: currentMessage.trim()}]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      display="flex"
      width="50%"
      flexDirection="column"
      m={2}
      border={1}
      borderRadius={2}
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
      px={4}
      py={2}
      overflowY={'auto'}
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
        <IconButton>
          <Image
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
            '&:hover': {
              backgroundColor: '#1a202c'
            }
          }}
        >
          อัปโหลดแหล่งข้อมูล
        </Button>
      </Box>

      ) : (
        messages.map((msg) => (
          <Box
          key={msg.id}
          sx={{
            alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
            backgroundColor: msg.sender === "You" ? "#2d3748" : "#f0f0f0",
            borderRadius: '24px',
            py: 1.5,
            px: 2,
            mb: 1,
            maxWidth: '70%',
            wordBreak: 'break-word'
          }}
          >
            {/* <Typography variant="body2" fontWeight="bold" color="white"
            >
              {msg.sender}:
            </Typography> */}

            <Typography variant="body1" color="white">
              {msg.text}
            </Typography>
          </Box>
        ))
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
            placeholder="เริ่มพิมพ์..."
            variant="outlined"
            value={currentMessage}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            sx={{
              '&.MuiOutlinedInput-root': {
                borderRadius: 4
              }
            }}
          />

          <IconButton
            onClick={handleSendMessage}
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
            <Image
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