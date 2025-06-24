"use client";

import React, { useState } from "react";
import { Box, Checkbox, Typography, IconButton } from '@mui/material';
import Image from "next/image";
import AddButton from "./common/AddButton";
import FileItem from "./custom/FileItem";
import UploadDialog from "./custom/UploadDialog";
import { FileProps } from "@/lib/types/FileProps";
import { useResource } from "@/lib/hooks/useResource";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    deleteFileById,
    getFileContentByUrl,
    previewFile,
    handlePreviewFile,
    handleClickOpen,
    handleClose,
    setPreviewFile,
  } = useResource();

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
    >
      <Box
      borderBottom={1}
      p={2}
      mb={1}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      >
        <Typography
          variant="h6"
          fontWeight={"bold"}
        >
          แหล่งข้อมูล
        </Typography>

        {previewFile && (
          <IconButton 
          sx={{ 
              width: '24px', 
              height: '24px' 
          }}  
          onClick={() => setPreviewFile(null)}
          >
              <ArrowBackIcon/>
          </IconButton>
        )}
      </Box>

      {!previewFile ? (
        <>
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
                px={6}
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
                my={1}
                sx={{
                  overflowY: 'scroll'
                }}
              >
                {uploadedFiles.map((fileProp: FileProps) => (
                  <FileItem
                    key={fileProp.id}
                    fileProps={fileProp}
                    toggleSelectFile={toggleFileSelection}
                    onDeleteFile={deleteFileById}
                    onPreviewFile={handlePreviewFile}
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
        </>
      ) : (
        <Box
          flexGrow={1}
          sx={{
            overflowY: 'scroll'
          }}
        >
          <Typography 
          variant="subtitle1" 
          fontWeight="bold" 
          px={2} 
          paddingBottom={1}
          alignItems={'center'}
          justifyContent={'center'}
          borderBottom={1}
          >
            {previewFile.filename}
          </Typography>

          {previewFile.contentType === "text" ? (
            <Typography 
            component="pre" 
            whiteSpace="pre-wrap"
            p={2}
            >
              {previewFile.content}
            </Typography>
          ) : (
            <iframe
              src={previewFile.blobUrl}
              width="100%"
              height="400px"
              style={{ border: "none" }}
              title={previewFile.filename}
            />
          )}
        </Box>
      )}
    </Box>
  );
}