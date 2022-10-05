import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const Navbar = () => {
  return (
    <>
      <AppBar position="static" sx={{marginBottom:2}}>
        <Toolbar >
          <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
            <LocalHospitalIcon sx={{fontSize:22}}/>
            <Typography variant='h5'>
              PRESCRIPTION
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar