import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Meta from "components/Meta";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useNetwork } from "wagmi";
import { Typography, Chip } from "@mui/material";
import { DatePicker } from "@mui/lab";
import Web3 from 'web3';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Slider from '@mui/material/Slider';
import dynamic from 'next/dynamic';

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DateRange } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import 'leaflet/dist/leaflet.css';
import Confetti from 'react-dom-confetti';


const MapContainer = dynamic(() => import('components/MapComponent'), {
    ssr: false, 
  });

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 140,
    dragFriction: 0.12,
    duration: 5000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#20b3ff", "#b4e33d", "#ef62d1", "#ff38ab", "#ff9d00", "#ffffff"],
    origin: { y: 0, x: 0.5 }, 

  };
function DashboardPage(props) {


    const [isCelebrating, setIsCelebrating] = useState(false);

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [bondName, setBondName] = useState(false);
  const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate() + 1));
  const [frequency, setFrequency] = useState(1);

  const { handleSubmit, register, errors, reset } = useForm();



  const useStyles = makeStyles((theme) => ({
    gradientText: {
      backgroundClip: "text",
      backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    mapContainer: {
        height: '100%',
        width: '100%',
      },
  }));
  const classes = useStyles(); 

  const { chain, chains } = useNetwork();
  const [connected, setConnected] = useState(false);


  //
  const web3 = new Web3();
  const [rows, setRows] = useState([]);


 
  const handleCloseSuccessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };

  const handleName = (event) => {
    setBondName(event.target.value);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };
  const handleFrequency = (event, value) => {
    setFrequency(value);
};





  //////////////////////////////////////////////


  const report = async () => {
    try {

     
        setSuccessMessage('Ye boi'); // Update the success message
        setSuccessAlertOpen(true);
        setIsCelebrating(true);
        setTimeout(() => setIsCelebrating(false), 3000); // Stop confetti after 3 seconds
  
       
    

    } catch (error) {
      console.error("Error signing the typed data:", error);
    }
  };

  /////////////////////////////////////////////////////



  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>

    <>
      <Meta title="Create Bond" />
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSuccessAlert} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Section
        bgColor={props.bgColor}
        size={props.size}
        bgImage={props.bgImage}
        bgImageOpacity={props.bgImageOpacity}
      >
        <Container>

          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
            sx={{ textAlign: "center" }}
          />


          <Grid container={true} spacing={2}>

            <Grid item={true} xs={12} md={7}>
              <Card>
                <CardContent sx={{ padding: 3 }}>
                  <Typography sx={{ fontWeight: 'bold' }} variant='h5'>Create</Typography>
                  <Typography>Create a Bond</Typography>
                  <br></br>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Name</TableCell>
                        <TableCell align="right">
                          <TextField
                            fullWidth
                            type="text"
                            value={bondName}
                            onChange={handleName}
                            inputProps={{ min: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                 
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Name</TableCell>
                        <TableCell align="right">
                          <TextField
                            fullWidth
                            type="text"
                            value={bondName}
                            onChange={handleName}
                            inputProps={{ min: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} >Value of Premiums</TableCell>
                        <TableCell align="right">

                         

                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} >Frequency</TableCell>
                        <TableCell align="right">
                        <Slider
                                      value={frequency}
                                      onChange={handleFrequency}
                                      step={1}
                                      marks={[
                                        { value: '1', label: 'Hourly' },
                                        { value: '2', label: 'Daily' },
                                        { value: '3', label: 'Monthly' },
                                        { value: '4', label: 'Quarterly' },
                                        { value: '5', label: 'Yearly' }
                                      ]}
                                      min={1}
                                      max={5}
                                      valueLabelDisplay="off"

                                    />
                          

                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} >Expiry</TableCell>
                        <TableCell align="right">

                          <DatePicker
                          label="End Date"
                          name="date"
                          color="secondary"
                          disableFuture={false}
                          disablePast={true}
                          value={endDate}
                          onChange={handleEndDate}
                          fullWidth={true}

                          inputRef={register({
                            required: "Please select a date",
                          })}
                          renderInput={(params) => <TextField {...params} />}
                        />

                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <br></br>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={report}
                    sx={{
                      backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
                      color: "white",
                      ml: 0,
                    }}
                  >
                    Create Bond
                  </Button>


                </CardContent>
              </Card>
            </Grid>
            <Confetti active={ isCelebrating } config={ confettiConfig } />

            <Grid item={true} xs={12} md={5}>
             
              <Card>
                <CardContent sx={{ padding: 3 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Coverage Area</Typography>
                  <br></br>
                  <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell align="right" style={{ height: '300px' }}>
                        <MapContainer className={classes.mapContainer} />

                    </TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>

                </CardContent>
              </Card>
            </Grid>
         






          </Grid>


        </Container>
      </Section>




    </>
    </LocalizationProvider>

  );
}

export default DashboardPage;





