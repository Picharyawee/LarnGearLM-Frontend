import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, IconButton, Typography, Button, TextField } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from '@mui/icons-material/Search';
import { useResourceContext } from "@/lib/contexts/ResourceContext";
import { queryResources } from "@/lib/api/lms";

export default function UploadDialog({open}: {open: boolean}) {
  const { 
    setOpenModal,
    handleFileUpload,
    handleCreateYoutubeTranscript,
    handleCreateWebsiteText,
    handleTextUpload
  } = useResourceContext();

  type ResourceResult = {
    metadata?: {
      source?: string;
    };
  };

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [view, setView] = useState<"default" | "lms">("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultQuery, setResultQuery] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const results = await queryResources(searchQuery);
      console.log(results);
      const stringResults = results.map((item: any) => item.metadata.name);
      console.log(stringResults);
      setResultQuery(stringResults);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการค้นหา:", error);
      setResultQuery([]);
    }
  };

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

        <Box>
          <Button
          variant="contained"
          sx={{
            backgroundColor: '#2d3748',
            '&:hover': { backgroundColor: '#1a202c' },
            color: '#fff',
            borderRadius: '8px',
            px: 2,
            mx: 1
          }}
          onClick={() => setView(view === "default" ? "lms" : "default")}
          >
            {view === "default" ? "ค้นหาจากระบบ LMS" : "ค้นหาจากบนเครื่อง"}
          </Button>
          <IconButton
            onClick={() => setOpenModal(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
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
        {view === "default" ? (
          <>
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
          </>
        ) : (
          <Box
          width={'100%'}
          minHeight={'400px'}
          display={'flex'}
          flexDirection={'column'}
          //border={1}
          mb={2}
          >
            <Box
            width={'100%'}
            mb={2}
            display={'flex'}
            //border={1}
            alignSelf={'flex-start'}
            justifyContent={'center'}
            alignItems={'center'}
            >
              <TextField
              fullWidth
              placeholder="ค้นหา.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  handleSearch();
                  setSearchQuery('');
                }
              }}
              />

              <IconButton
              sx={{
                width: "48px",
                height: "48px",
                ml: 2,
                border: 1,
                color: "white",
                backgroundColor: '#2d3748'
              }}
              onClick={handleSearch}
              >
                <SearchIcon/>
              </IconButton>
            </Box>

            <Box 
            width="100%"
            display={'flex'}
            flexDirection={'column'}
            flexGrow={1}
            sx={{
              overflowY: 1
            }}
            paddingBottom={2}
            >
              {resultQuery.length > 0 ? (
                resultQuery.map((result, idx) => (
                  <Box
                  key={idx}
                  sx={{
                    width: '100%',
                    px: 2,
                    py: 1.5,
                    border: 1,
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  >
                    <Typography>{result}</Typography>

                    <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#2d3748',
                      '&:hover': { backgroundColor: '#1a202c' },
                      color: '#fff',
                      borderRadius: '8px',
                      px: 2,
                      mx: 1
                    }}
                    >
                      ใช้ไฟล์นี้
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography
                variant="body2"
                color="text.secondary"
                display={'flex'}
                flexGrow={1}
                justifyContent={'center'}
                alignItems="center"
                //border={1}
                >
                  {searchQuery ? "ไม่พบผลลัพธ์ที่เกี่ยวข้อง" : "พิมพ์คำเพื่อค้นหา"}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
