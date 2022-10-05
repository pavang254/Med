import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SendIcon from "@mui/icons-material/Send";

const AddNew = () => {
  const [name, setName] = useState("");
  const [strength, setStrength] = useState(null);
  const [timing, setTiming] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var tab = {
      name: name,
      strength: parseInt(strength),
      timings: timing,
    };

    fetch("http://localhost:8000/api/tablets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tab),
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      }
    });
  };

  const handleTimingChange = (e) => {
    const index = timing.indexOf(e.target.value);

    if (index === -1) {
      setTiming([...timing, e.target.value]);
    } else {
      setTiming(timing.filter((time) => time !== e.target.value));
    }
  };

  return (
    <>
      <Box>
        <Typography
          component="h1"
          color="primary"
          fontWeight={500}
          sx={{
            fontSize: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Add New Prescription
        </Typography>
        <Typography
          component="h2"
          color="gray"
          fontWeight={400}
          sx={{
            fontSize: 24,
            margin: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Patient: Shashikala
        </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ "& > :not(style)": { m: 1, width: "20ch" } }}
      >
        <Stack direction="column" spacing={1}>
          <Typography color="primary" fontWeight={500} sx={{ fontSize: 20 }}>
            Prescription Name:
          </Typography>
          <TextField
            id="outlined-basic"
            label="prescription name"
            variant="outlined"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <TextField
          id="outlined-basic"
          label="mg"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">mg</InputAdornment>,
          }}
          onChange={(e) => setStrength(e.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                value="morning"
                checked={timing.includes("morning")}
                onChange={handleTimingChange}
              />
            }
            label="Morning"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="afternoon"
                checked={timing.includes("afternoon")}
                onChange={handleTimingChange}
              />
            }
            label="Afternoon"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="night"
                checked={timing.includes("night")}
                onChange={handleTimingChange}
              />
            }
            label="Night"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Add New
        </Button>
      </Box>
      <Link
        href="/"
        underline="always"
        sx={{ marginLeft: 2, marginTop: 2, fontSize: 24, color: "gray" }}
      >
        Back
      </Link>
    </>
  );
};

export default AddNew;
