import { Box, Typography, Checkbox } from "@mui/material";
import { FileProps } from "@/lib/types/FileProps";

export default function FileItem({
  fileProps,
  index,
  isSelected,
  toggleSelectFile
}: {
  fileProps: FileProps;
  index: number;
  isSelected: boolean;
  toggleSelectFile: (index: number) => void;
}) {
  return (
    <Box
      key={index}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={0.5}
      border={1}
      borderRadius='8px'
      bgcolor="white"
    >
      <Typography color="#2d3748" noWrap>
        {fileProps.filename}
      </Typography>
      <Checkbox
        checked={isSelected}
        onChange={() => toggleSelectFile(index)}
      />
    </Box>
  );
}