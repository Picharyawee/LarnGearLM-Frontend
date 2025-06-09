"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import Image from "next/image";
import AddButton from "./common/AddButton";
import FileItem from "./custom/FileItem";
import UploadDialog from "./custom/UploadDialog";
import { uploadResource, getResources } from "@/lib/api/resource";

interface FileProps {
  filename: string;
  url: string;
  content_type: string;
  last_modified: string;
  size: number;
}

export default function ResourcePanel() {
  const [open, setOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // turn file into FormData
      const formData = new FormData();
      formData.append('uploaded_file', file);
      setUploadedFiles((prevFiles) => [...prevFiles, file]);
      uploadResource(formData)
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResources();
        if (response.data) {
          console.log("Fetched resources:", response.data.files);
          const files = await Promise.all(
            response.data.files.map(async (file: FileProps) => {
              return new File([file.url], file.filename, { type: file.content_type });
            })
          );
          setUploadedFiles(files);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);


  return (
    <Box
      display="flex"
      flexDirection="column"
      width="25%"
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

      <AddButton
        onClick={handleClickOpen}
      >
        <Typography
          color="white"
        >
          เพิ่มแหล่งข้อมูล
        </Typography>
      </AddButton>

      {/* List of resource */}
      {uploadedFiles.length !== 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          px={2}
          mt={1}
        >
          {uploadedFiles.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              index={index}
            />
          ))}
        </Box>
      ) : (
        <Box
          flexGrow={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          color={"text.secondary"}
          px={4}
          gap={2}
        >
          <Image
            src="/img/FileText.svg"
            alt="File Icon"
            width={80}
            height={80}
          />

          <Typography>
            แหล่งข้อมูลที่บันทึกไว้จะปรากฏที่นี่ คลิก &quot;เพิ่มแหล่งข้อมูล&quot; ด้านบนเพื่อเพิ่มไฟล์ PDF
          </Typography>
        </Box>
      )}

      <UploadDialog
        open={open}
        handleClose={handleClose}
        handleFileUpload={handleFileUpload}
      />
    </Box>
  );
}