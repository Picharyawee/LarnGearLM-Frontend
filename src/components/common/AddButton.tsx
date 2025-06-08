
import { Box, Button } from '@mui/material';
import Image from "next/image";

export default function AddButton({
  onClick,
  children
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: '#2d3748',
        borderRadius: '8px',
        gap: 1,
        my: 1,
        py: 1.5,
        mx: 2,
        '&:hover': {
          backgroundColor: '#1a202c'
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
      {children}
    </Button>
  );
}