import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import MedicationIcon from '@mui/icons-material/Medication';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

import useFetch from '../hooks/useFetch';


const Edit = () => {
  const {data} = useFetch('http://localhost:8000/api/tablets/all/');
  const [strength, setStrength] = useState(null)
  const [timing, setTiming] = useState([])

  const navigate = useNavigate();

  const handleTimingChange = (e)=>{
    const index = timing.indexOf(e.target.value)

    if (index === -1){
      setTiming([...timing, e.target.value])
    } else{
      setTiming(timing.filter((time)=> time !== e.target.value))
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    var tabDetails = {
      'id':parseInt(e.target.dataset.id),
      'strength':strength? parseInt(strength): 0,
      'timings':timing,
    }
    var url = `http://localhost:8000/api/tablets/update/${tabDetails.id}/`;
    console.log('tablet update:', tabDetails)
    fetch(url,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
    },
      body:JSON.stringify(tabDetails),
    })
    .then((response)=>{if(response.ok){
      navigate('/');
    }});
    
  }

  const handleDelete = (e)=>{
    e.preventDefault();
    var id=parseInt(e.target.dataset.id);
    var url = `http://localhost:8000/api/tablets/update/${id}/`;

    fetch(url,
      {
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
        },
    })
    .then((response)=>{if (response.ok){
      navigate('/');
    }}) 
  }

  return (
    <>
    <Box >
      <Typography component='h4' color='primary' fontWeight={500} sx={{fontSize:24,margin:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
        Change Prescription
      </Typography>
      <Typography component='h5' color='gray' fontWeight={400} sx={{fontSize:20, margin:2, display:'flex', alignItems:'center', justifyContent:'center'}}>
        Patient: Shashikala
      </Typography>
    </Box>
    {data && data.map((tablet)=>
    <Box key={tablet.id} sx={{padding:1, maxWidth:'400px'}}>
      <Paper elevation={3} sx={{minHeight:75, marginBottom:1,  background:'#caf0f8'}}>
        <Box sx={{marginBottom:1, display:'flex', alignItems:'center', justifyContent:'space-around',}}>
          <MedicationIcon sx={{fontSize:35}}/>
          <Typography variant='p' sx={{fontSize:32, fontWeight:'bold'}}>{tablet.name}</Typography>
          <EditIcon sx={{fontSize:30, }}/>
        </Box>
        <form noValidate autoComplete='off'>
          <Box sx={{padding:1, margin:1, display:'flex', justifyContent:'center'}}>
            <TextField id="outlined-basic" label="strength" variant="outlined" size="small"
            onChange={(e)=>setStrength(e.target.value)}
            InputProps={{endAdornment: <InputAdornment position="end">mg</InputAdornment>}} />
          </Box>
          <Box>
          {timing.length < 1 ?<FormHelperText sx={{color:'red', marginLeft:1}}>Select timing</FormHelperText>: <></> }
            <FormControl>
              <FormGroup row>
                <FormControlLabel control={<Checkbox value='morning' checked={timing.includes('morning')} onChange={handleTimingChange}/>} label="Morning" />
                <FormControlLabel control={<Checkbox value='afternoon' checked={timing.includes('afternoon')} onChange={handleTimingChange}/>} label="Afternoon" />
                <FormControlLabel control={<Checkbox value='night' checked={timing.includes('night')} onChange={handleTimingChange}/>} label="Night" />
              </FormGroup>
            </FormControl>
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Button type='submit' variant="contained" data-id={tablet.id} endIcon={<CheckIcon />} sx={{margin:1}} onClick={handleSubmit}>
              Confirm change
            </Button>
            <Button type='submit' color='error' variant="contained" data-id={tablet.id} sx={{margin:1}} onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>)}
    { !data || (data.length < 1) ? 
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:1, marginTop:5, fontSize:22, gap:2}}>
        <Typography color={'red'} sx={{fontSize:20}}>No data to display...</Typography>
        <Link to='/create' underline="always">
          Add New Prescription
        </Link>
      </Box> : <></>
    }
    </>
  )
}

export default Edit