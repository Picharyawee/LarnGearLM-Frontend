import { Dialog, DialogTitle, DialogContent, Box, IconButton, Typography, Button, TextField } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react";

export default function UploadDialog({
  open,
  handleClose,
  handleFileUpload,
  handleCreateYoutubeTranscript
}: {
  open: boolean;
  handleClose: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateYoutubeTranscript: (url: string) => void;
}) {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleYouTubeSubmit = () => {
    if(youtubeUrl.trim()){
      handleCreateYoutubeTranscript(youtubeUrl);
      setYoutubeUrl("");
      handleClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        onClick={handleClose}
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
