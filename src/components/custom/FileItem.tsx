import { Box, Typography, Checkbox } from "@mui/material";
import { useResourceContext } from "@/lib/contexts/ResourceContext";
import { FileProps } from "@/lib/types/FileProps";

export default function FileItem({
  fileProps
}: {
  fileProps: FileProps;
}) {
  const { toggleFileSelection } = useResourceContext();

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
      <Typography color="#2d3748" noWrap>
        {fileProps.filename}
      </Typography>
      <Checkbox
        checked={fileProps.isSelected}
        onChange={() => toggleFileSelection(fileProps.id)}
      />
    </Box>
  );
}