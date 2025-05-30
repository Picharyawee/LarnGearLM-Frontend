import React from "react";
import { AppBar , Toolbar , Typography } from '@mui/material'

export default function Header() {
    return (
        <AppBar 
        position="static"
        sx={{
            backgroundColor: '#1a202c',
            boxShadow: 2
        }}
        >
            <Toolbar
            sx={{
                justifyContent: 'center'
            }}
            >
                <Typography
                variant="h4"
                fontWeight={"bold"}
                color="white"
                >
                    LarnGearLM
                </Typography>
            </Toolbar>
        </AppBar>
    );
}