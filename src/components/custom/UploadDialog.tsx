import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, IconButton, Typography, Button, TextField } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close"
import { useResourceContext } from "@/lib/contexts/ResourceContext";

export default function UploadDialog({open}: {open: boolean}) {
  const { 
    setOpenModal,
    handleFileUpload,
    handleCreateYoutubeTranscript,
    handleCreateWebsiteText,
    handleTextUpload
  } = useResourceContext();

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  return (
    <Dialog
      open={open}
      onClose={() => setOpenModal(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottom={1}
        mb={2}
      >
        <Typography variant="h6">
          เพิ่มแหล่งข้อมูล
        </Typography>

        <IconButton
          onClick={() => setOpenModal(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          minHeight: '60vh'
        }}
      >
        <Box
          gap={2}
          sx={{
            border: '2px dashed #CBD5E0',
            borderRadius: '8px',
            width: '100%',
            minHeight: '400px',
            //height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            p: 4
          }}

          onClick={() => document.getElementById('upload-input')?.click()}
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
            component="label"
            sx={{
              backgroundColor: '#2d3748',
              '&:hover': { backgroundColor: '#1a202c' },
              color: '#fff',
              borderRadius: '8px',
              px: 7
            }}
          >
            อัปโหลดไฟล์

            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={handleFileUpload}
            />
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            ประเภทไฟล์ที่รองรับ: PDF
          </Typography>
        </Box>

        <TextField
        fullWidth
        placeholder="วางข้อความที่นี่"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === 'Enter'){
            handleTextUpload(text);
            setText('');
          }
        }}
        />

        <Box
        display={'flex'}
        sx={{
          width: '100%'
        }}
        gap={2}
        >
          <TextField
          fullWidth
          placeholder="วาง YouTube Link ที่นี่"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              handleCreateYoutubeTranscript(youtubeUrl);
              setYoutubeUrl('');
            }
          }}
          />

          <TextField
          fullWidth
          placeholder="วาง Website Link ที่นี่"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              handleCreateWebsiteText(url);
              setUrl('');
            }
          }}
          />
        </Box>
      </DialogContent>

      {/* <DialogActions>
                    <Button
                    onClick={handleClose}
                    >
                        ยกเลิก
                    </Button>

                    <Button
                    variant="contained"
                    onClick={handleClose}
                    >
                        บันทึก
                    </Button>
                </DialogActions> */}
    </Dialog>
  );
}
