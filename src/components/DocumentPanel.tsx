"use client";

import React, { useState } from "react";
import { Box , Button , Typography , IconButton , Checkbox , Dialog , DialogTitle , DialogContent , DialogActions , TextField } from '@mui/material';
import Image from "next/image";

export default function DocumentPanel() {
    const [open , setOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setUploadedFiles((prev) => [...prev, file]);
        setOpen(false);
        }
    };

    const toggleSelectFile = (index: number) => {
        setSelectedFiles((prev) =>
            prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
    };

    const toggleSelectAll = () => {
        if (selectedFiles.length === uploadedFiles.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(uploadedFiles.map((_, i) => i));
        }
    };

    const FileItem = ({ file, index }: { file: File; index: number }) => (
        <Box
        key={index}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={0.5}
        border={1}
        sx={{
            backgroundColor: "white",
            borderRadius: "2px",
        }}
        >
            <Typography color="#2d3748" noWrap>
                {file.name}
            </Typography>

            <Checkbox
                checked={selectedFiles.includes(index)}
                onChange={() => toggleSelectFile(index)}
            />
        </Box>
    );

    return (
        <Box
        display="flex"
        width="25%"
        flexDirection="column"
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

            <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
                backgroundColor: '#2d3748',
                borderRadius: '8px',
                gap:1,
                my:1,
                py:1.5,
                mx: 2,
                '&:hover':{
                    backgroundColor:'#1a202c'
                },
            }}
            startIcon={
                <Image
                src='/img/Plus.svg'
                alt='Plus Icon'
                width={24}
                height={24}
                />
            }
            >
                <Typography>
                    เพิ่มแหล่งข้อมูล
                </Typography>
            </Button>
            {/* List of resource */}
            {uploadedFiles.length !== 0 && (
                <Box
                px={2}
                mt={1}
                >
                    <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={2}
                    py={0.5}
                    borderRadius={1}
                    sx={{ 
                        backgroundColor: "white" 
                    }}
                    >
                        <Typography>
                            เลือกแหล่งข้อมูลทั้งหมด
                        </Typography>

                        <Checkbox
                        checked={selectedFiles.length === uploadedFiles.length && uploadedFiles.length > 0}
                        indeterminate={
                            selectedFiles.length > 0 && selectedFiles.length < uploadedFiles.length
                        }
                        onChange={toggleSelectAll}
                        />
                    </Box>

                    {uploadedFiles.map((file, index) => (
                        <FileItem 
                        key={index} 
                        file={file} 
                        index={index} 
                        />
                    ))}
                </Box>
            )}

            {/* Upload Page */}
            <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            >
                <DialogTitle
                borderBottom={1}
                mb={2}
                >
                    เพิ่มแหล่งข้อมูล
                </DialogTitle>

                <DialogContent
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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

                        {/* <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                            setFile(file);
                            }
                        }}
                        /> */}
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

            {uploadedFiles.length === 0 && (
                <Box
                display={"flex"}
                flexDirection={"column"}
                flexGrow={1}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                color={"text.secondary"}
                px={4}
                gap={2}
                >
                    <img
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
        </Box>
    );
}