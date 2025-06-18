"use client";

import React from "react";
import { Box, Checkbox, Typography } from '@mui/material';
import Image from "next/image";
import AddButton from "./common/AddButton";
import FileItem from "./custom/FileItem";
import UploadDialog from "./custom/UploadDialog";
import { FileProps } from "@/lib/types/FileProps";
import { useResource } from "@/lib/hooks/useResource";

export default function ResourcePanel() {
  const {
    openModal,
    setOpenModal,
    uploadedFiles,
    handleFileUpload,
    isSelectAll,
    isSelectSome,
    toggleFileSelection,
    toggleSelectAll,
  } = useResource();


  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  }

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
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={4}
            py={1}
            borderRadius={1}
            bgcolor="white"
          >
            <Typography>
              เลือกแหล่งข้อมูลทั้งหมด
            </Typography>

            <Checkbox
              checked={isSelectAll()}
              indeterminate={isSelectSome()}
              onChange={toggleSelectAll}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            px={2}
            mt={1}
          >
            {uploadedFiles.map((fileProp: FileProps) => (
              <FileItem
                key={fileProp.id}
                fileProps={fileProp}
                toggleSelectFile={toggleFileSelection}
              />
            ))}
          </Box>
        </>
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
        open={openModal}
        handleClose={handleClose}
        handleFileUpload={handleFileUpload}
      />
    </Box>
  );
}