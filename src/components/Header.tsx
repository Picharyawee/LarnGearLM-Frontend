import React from "react";
import { Typography } from '@mui/material'

export default function Header() {
  return (
    <Typography
      variant="h4"
      bgcolor="#1a202c"
      fontWeight="bold"
      color="white"
      align="center"
      py={2}
      boxShadow={2}
    >
      LarnGearLM
    </Typography>
  );
}