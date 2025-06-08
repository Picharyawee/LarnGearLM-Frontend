import { Box, Typography } from "@mui/material";

export default function FileItem({ file, index }: { file: File; index: number }) {
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
        {file.name}
      </Typography>
    </Box>
  );
}