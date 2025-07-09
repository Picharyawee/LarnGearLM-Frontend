"use client";

import React, { useState } from "react";
import { Box , TextField , Typography , IconButton , CircularProgress , Button } from "@mui/material";
import Image from "next/image";
import { useResourceContext } from "@/lib/contexts/ResourceContext";
import { useNoteContext } from "@/lib/contexts/NoteContext";
import { useChatContext } from "@/lib/contexts/ChatContext";
import ArticleDialog from "./custom/ArticleDialog";

export default function ChatPanel() {
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    currentMessage,
    messages,
    responseBufferMessage,
    isLoading,
    handleMessageChange,
    handleSendMessage,
    handleKeyPress,
    handleGenerateArticle,
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

  const handleClickGenerateArticle = async () => {
    setIsGenerating(true);
    try {
      await handleGenerateArticle();
    } finally {
      setIsGenerating(false);
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{title:string,tags:string,expectedDuration:number,content:string}>({title: "",tags: "",expectedDuration: 0,content: ""});

  const handleOpenDialog = (text: string) => {
    const titleMatch = text.match(/Title\s*:\s*(.*)/);
    const tagsMatch = text.match(/Tags\s*:\s*(.*)/);
    const durationMatch = text.match(/Expected\s*duration\s*:\s*(\d+)/);
    const contentMatch = text.match(/Content\s*:\s*([\s\S]*)/);

    setSelectedArticle({
      title: titleMatch ? titleMatch[1].trim() : "ไม่ระบุ",
      tags: tagsMatch ? tagsMatch[1].trim() : "ไม่ระบุ",
      expectedDuration: durationMatch ? parseInt(durationMatch[1]) : 0,
      content: contentMatch ? contentMatch[1].trim() : "ไม่ระบุ",
    });

    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleConfirm = () => {
    console.log("Confirmed using article", selectedArticle);
    setOpenDialog(false);
  };

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
      <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
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

        <Button
        onClick={handleClickGenerateArticle}
        sx={{
          p: 0
        }}
        >
          สร้างบทความ
        </Button>
      </Box>
      
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
        {messages.length === 0 && !isGenerating ? (
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

              <Box
              display={'flex'}
              gap={1}
              >
                {msg.type === "ai" && (
                  <Button
                    key={`${msg.id}-button`} // ให้ key ไม่ซ้ำ
                    size="small"
                    sx={{
                      alignSelf:"flex-start",
                    }}
                    onClick={() => {
                      const title = msg.text.slice(0, 10); // ตัด 10 ตัวอักษรแรก
                      const content = msg.text;
                      
                      handleAddNoteDirect(title, content);
                    }}
                  >
                    บันทึกลงในโน้ต
                  </Button>
                )}
                
                {msg.type === "ai" && msg.text.startsWith("Title :") && 
                  <Button
                  size="small"
                  sx={{
                    alignSelf:"flex-start",
                  }}
                  onClick={() => handleOpenDialog(msg.text)}
                  >
                    ใช้บทความนี้
                  </Button>
                }
              </Box>
            </>
          ))
        )}

        <ArticleDialog
          open={openDialog}
          article={selectedArticle}
          onClose={handleCloseDialog}
          onConfirm={handleConfirm}
        />

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