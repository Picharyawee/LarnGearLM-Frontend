import { Box, Typography, Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import { FileProps } from "@/lib/types/FileProps";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";

export default function FileItem({
  fileProps,
  toggleSelectFile,
  onDeleteFile
}: {
  fileProps: FileProps;
  toggleSelectFile: (id: string) => void;
  onDeleteFile: (fileId: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDeleteFile(fileProps.id);
    handleMenuClose();
  };

  return (
    <Box
      key={fileProps.id}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={0.5}
      border={1}
      borderRadius='4px'
      bgcolor="white"
    >
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>ลบแหล่งข้อมูล</MenuItem>
      </Menu>

      <Typography color="#2d3748" noWrap>
        {fileProps.filename}
      </Typography>
      <Checkbox
        checked={fileProps.isSelected}
        onChange={() => toggleSelectFile(fileProps.id)}
      />
    </Box>
  );
}