import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TodayIcon from "@mui/icons-material/Today";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MedicationIcon from "@mui/icons-material/Medication";
import CheckIcon from "@mui/icons-material/Check";
import Time from "../utils/Time";

const Main = () => {
  const url = "http://localhost:8000/api/tablets/";
  const { timing, date } = Time();
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw Error("Error in receiving data. Server might be down!");
        const tablets = await response.json();
        tablets.forEach((tablet) => {
          tablet.checked = false;
        });
        setData(tablets);
        setErr(null);
      } catch (err) {
        setErr(err.message);
      }
    };
    fetchData();
  }, []);

  const handleCheck = (id) => {
    const newData = data.map((tablet) =>
      tablet.id === id ? { ...tablet, checked: true } : tablet
    );
    setData(newData);
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ display: "flex", fontWeight: 500, justifyContent: "center" }}
      >
        Shashikala
      </Typography>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScheduleIcon />
          <Typography component="p">Time: {timing}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TodayIcon />
          <Typography component="p">{date} </Typography>
        </Box>
      </Box>
      <Box>
        <main>
          {err && (
            <p style={{ color: "red", textAlign: "center" }}>{`${err}`}</p>
          )}
          <Container maxWidth="sm">
            {!err &&
              data.map((tablet) => (
                <Paper
                  key={tablet.id}
                  elevation={3}
                  sx={{
                    minHeight: 75,
                    marginBottom: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    background: tablet.checked ? "#2a9d8f" : "#FF5C87",
                  }}
                >
                  <MedicationIcon sx={{ fontSize: 40 }} />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="p"
                      sx={{ fontSize: 32, fontWeight: "bold" }}
                    >
                      {tablet.name}
                    </Typography>
                    <Typography
                      variant="span"
                      sx={{ fontSize: 16, fontWeight: "bold" }}
                    >
                      ({tablet.strength} mg)
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleCheck(tablet.id)}>
                    <CheckIcon sx={{ fontSize: 40, color: "white" }} />
                  </IconButton>
                </Paper>
              ))}
          </Container>
        </main>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 16,
          padding: 1,
        }}
      >
        <Link href="create/" underline="always">
          Add New Prescription
        </Link>
        <Link href="edit/" underline="always">
          Edit Prescription
        </Link>
      </Box>
    </>
  );
};

export default Main;
