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
import { useAccount } from "wagmi";
import { SHA256 } from 'crypto-js';

import { Typography, Chip } from "@mui/material";
import { DatePicker } from "@mui/lab";
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Slider from '@mui/material/Slider';
import dynamic from 'next/dynamic';
import { CardMedia } from "@mui/material";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DateRange } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import 'leaflet/dist/leaflet.css';
import Confetti from 'react-dom-confetti';
import { contract, rpc_url, abi } from "../util/contract";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import MenuItem from '@mui/material/MenuItem';
import Tooltip from "@mui/material/Tooltip";
import Web3 from "web3";



const perils = [
    { id: 1, name: "Hurricane", icon: "images/hurricane.svg" },
    { id: 2, name: "Earthquake", icon: "images/earthquake.svg" },
    { id: 3, name: "Wildfire", icon: "images/fire.png" },
    { id: 4, name: "Flood", icon: "images/flood.svg" },
   
  ];

  import { Web3Storage } from 'web3.storage'

  const getStorageClient = () => {
    return new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5ZkU4RjIyYmNiRGExRjQ1ZjZmNjM2MDdkZjE0MDg3RDYwQjM4MkMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODQwMTExOTI4MzMsIm5hbWUiOiJCb2IifQ.xyeZM35fOAh6SeMCSyJ7hT5tn26qmbffyqmpZ4xQSqg' })
  }
function PerilSelection({ selectedPeril, onPerilSelect }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {perils.map((peril) => (
        <Tooltip title={peril.name} key={peril.id}>
          <Card 
            onClick={() => onPerilSelect(peril)}
            sx={{
              width: '60px',
              height: '60px',
              borderRadius: '10px',
              borderColor: selectedPeril?.id === peril.id ? 'purple' : '#2F2F34',
              borderWidth: '2px',
              borderStyle: 'solid',
              marginRight: '8px',
              marginBottom: '8px',
              
            }}
          >
            <CardMedia
              sx={{
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%', 
                width: '100%',
                '&:hover': {
                    borderColor: 'grey',
                  },
              }}
              component="img"
              image={peril.icon}
              alt={peril.name}
            />
          </Card>
        </Tooltip>
      ))}
    </Box>
  );
}
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
    const { address, isConnecting, isDisconnected } = useAccount();

    const { data: signer, isError, isLoading } = useSigner();

    const [isCelebrating, setIsCelebrating] = useState(false);
    const [premiums, setPremiums] = useState([{severity: "small", value: 0}]);

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [what3words, setWhat3Words] = useState("")
  const [radiusInKm, setRadiusInKm] = useState("")
  const [successMessage, setSuccessMessage] = useState(false);
  const [bondName, setBondName] = useState("");
  const [underlying, setUnderlying] = useState("0x49871B521E44cb4a34b2bF2cbCF03C1CF895C48b");
  const [endDate, setEndDate] = useState(new Date().setFullYear(new Date().getFullYear() + 1));
  const [frequency, setFrequency] = useState(5);
  const [bondAmount, setBondAmount] = useState(100);
  const [bondDescription, setBondDescription] = useState("Describe the trigger");
    const [CID, setCID] = useState('bafybeib3oy2dehclqkt5ttgios2vdkebccpmm7dhqmtauwpgdfoeiezf5y');
  const [premiumValue, setPremiumValue] = useState(3);
  const [estimatedYield, setEstimatedYield] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [selectedPeril, setSelectedPeril] = useState({id: 3, name: 'Wildfire', icon: 'images/fire.png'});
  const handlePerilSelect = (perilId) => {
    setSelectedPeril(perilId);
  };

  let policyCategories = [];
  let policyPremiums = [];
  
  if(premiums && premiums.length > 0){
    policyCategories = premiums.map(premium => {
        if (premium && premium.hasOwnProperty('severity')) {
           return premium.severity
        } else {
            console.error('Premium object is undefined or does not have a category property', premium);
            return null;
        }
    }).filter(Boolean); // Filter out null values

    policyPremiums = premiums.map(premium => {
        if (premium && premium.hasOwnProperty('value')) {
            return (premium.value.toString())
        } else {
            console.error('Premium object is undefined or does not have a value property', premium);
            return null;
        }
    }).filter(Boolean); // Filter out null values
}

const [holder, setHolder] = useState("0x2D41164fDe069d7177105753CE333c73332c6456")

  const stringRadius = radiusInKm.toString()
  const unixEndDate = (Math.round(endDate/1000)).toString();
  const stringAmount = bondAmount.toString()
  //////
  let policy = {
    name: bondName, //complete
    expiry: ethers.BigNumber.from(unixEndDate), //complete
    holder: address, //complete
    catType: selectedPeril?.name, //complete
    paymentFrequency: ethers.BigNumber.from(frequencyToSeconds(frequency).toString()), //complete
    size: ethers.BigNumber.from(stringAmount), //complete
    underlying: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211", //update when necessary
    statement: bondDescription, //complete
    category: policyCategories, // group
    premiums: policyPremiums, // number
    whatThreeWords: what3words, 
    radius: stringRadius,
    filecoinCID: CID
};

console.log(policy)
const removePremium = (index) => {
    const newPremiums = premiums.filter((_, i) => i !== index);
    setPremiums(newPremiums);
  };




const storePolicy = async (policy) => {
    const client = getStorageClient();
    
    const finalContent = JSON.stringify(policy);
    const file = new File([finalContent], await SHA256(finalContent), {
          type: 'text/plain',
        });
    const cid = await client.put([file]);
    console.log(cid);
    return cid;
  }
  const contractWithSigner = contract.connect(signer);


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
      datePickerContainer: {
        width: '100%',
      },
  }));
  const classes = useStyles(); 

  const { chain, chains } = useNetwork();
  const [connected, setConnected] = useState(false);
  const [totalReturn, setTotalReturn] = useState(0);
  const [chartData, setChartData] = useState([]);
  const router = useRouter();

  //
  const web3 = new Web3();
  const [rows, setRows] = useState([]);


  useEffect(() => {
  
    calculateYield();
    generateChartData();
  }, [bondAmount, premiumValue, frequency, endDate]);
 
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
const handleDescription= (event) => {
    setBondDescription(event.target.value);
};
const handleUnderlying= (event) => {
    setUnderlying(event.target.value);
};

function frequencyToSeconds(frequency) {
    let frequencyInSeconds;
    switch (frequency) {
      case 1: // Hourly
        frequencyInSeconds = 60 * 60;
        break;
      case 2: // Daily
        frequencyInSeconds = 24 * 60 * 60;
        break;
      case 3: // Monthly
        frequencyInSeconds = 30 * 24 * 60 * 60;
        break;
      case 4: // Quarterly
        frequencyInSeconds = 3 * 30 * 24 * 60 * 60;
        break;
      case 5: // Yearly
        frequencyInSeconds = 365 * 24 * 60 * 60;
        break;
      default:
        frequencyInSeconds = 24 * 60 * 60; // Default to daily
    }
    return frequencyInSeconds;
  }
  

const calculateYield = () => {
    const bondAmountValue = parseFloat(bondAmount);
    const premiumValueValue = parseFloat(premiumValue);
    const duration = (endDate - new Date()) / (1000 * 60 * 60 * 24); // Duration in days
  
    let paymentFrequencyInDays;
    switch (frequency) {
      case 1:
        paymentFrequencyInDays = 1 / 24; // Hourly
        break;
      case 2:
        paymentFrequencyInDays = 1; // Daily
        break;
      case 3:
        paymentFrequencyInDays = 30; // Monthly
        break;
      case 4:
        paymentFrequencyInDays = 30 * 3; // Quarterly
        break;
      case 5:
        paymentFrequencyInDays = 365; // Yearly
        break;
      default:
        paymentFrequencyInDays = 1;
    }


  
    const totalPayments = Math.floor(duration / paymentFrequencyInDays);
    const totalReturn = totalPayments * premiumValueValue;
  
    const totalReturnPercentage = (totalReturn / bondAmountValue) * 100;
  
    setTotalReturn(totalReturnPercentage);
  };
  
  

  const generateChartData = () => {
    const data = [];
    const duration = (endDate - new Date()) / (1000 * 60 * 60 * 24); // Duration in days

    for (let i = 0; i <= duration; i++) {
      const dayReturn = (i / duration) * totalReturn;
      data.push({ day: i, return: dayReturn });
    }

    setChartData(data);
  };
  const handleBondAmount = (event) => {
    setBondAmount(Number(event.target.value));
  };

  const handlePremiumValue = (event) => {
    setPremiumValue(Number(event.target.value));
  };

  //////////////////////////////////////////////


  const handleSubmit = async () => {
    try {
        const policycid = await storePolicy(policy);
        console.log('CID:', policycid);
        setCID(policycid)
        const tx = await contractWithSigner.createPolicy(policy);
        console.log(tx.hash);
        setSuccessMessage('Successfully created the bond'); // Update the success message
        setSuccessAlertOpen(true);
        setIsCelebrating(true);
        setTimeout(() => {
            setIsCelebrating(false);
            router.push('/viewall');
          }, 4000); // Stop confetti after 3 seconds
  
       
    

    } catch (error) {
      console.error("Error signing the typed data:", error);
      alert('Error submitting. Please ensure you have selected three risk traunches and completed all form elements. Our public front-end creation demo currently supports Goerli with GHO underlying, with additional networks available soon.')
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
                            name="bondName"

                            onChange={handleName}
                            inputProps={{ min: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Underlying Token</TableCell>
                        <TableCell align="right">
                          <TextField
                            fullWidth
                            type="text"
                            value={underlying}
                            name="Underlying"

                            onChange={handleUnderlying}
                            inputProps={{ min: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                 
                 
                      <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Peril</TableCell>
                            <TableCell align="right">
                                <PerilSelection selectedPeril={selectedPeril} onPerilSelect={handlePerilSelect} />
                            </TableCell>
                            </TableRow>
                            <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Confirmation Description</TableCell>
                        <TableCell align="right">
                          <TextField
                            fullWidth
                            type="text"
                            value={bondDescription}
                            name="bondDescription"
                        

                            onChange={handleDescription}
                            inputProps={{ min: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Amount</TableCell>
                        <TableCell align="right">
                            <TextField
                            fullWidth
                            type="number"
                            value={bondAmount}
                            name="bondAmount"

                            onChange={handleBondAmount}
                            inputProps={{ min: 0 }}
                            />
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} >Frequency</TableCell>
                        <TableCell align="right">
                        <Slider
                                      value={frequency}
                                      name="frequency"

                                      onChange={handleFrequency}
                                      step={1}
                                      marks={[
                                        { value: 1, label: 'Hourly' },
                                        { value: 2, label: 'Daily' },
                                        { value: 3, label: 'Monthly' },
                                        { value: 4, label: 'Quarterly' },
                                        { value: 5, label: 'Yearly' }
                                      ]}
                                      min={1}
                                      max={5}
                                      valueLabelDisplay="off"

                                    />
                          

                        </TableCell>
                      </TableRow>
                        <TableRow>
      <TableCell sx={{ fontWeight: 'bold' }}>Premiums</TableCell>
      <TableCell>
    <Table>
        <TableBody>
            {premiums.map((premium, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <TextField
                            select
                            label="Severity"
                            value={premium.severity}
                            name="premium"
                            onChange={(event) => {
                                const newPremiums = [...premiums];
                                newPremiums[index].severity = event.target.value;
                                setPremiums(newPremiums);
                            }}
                        >
                            {['small', 'medium', 'large'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </TableCell>
                    <TableCell>
                        <TextField
                            label="Value"
                            type="number"
                            name="premium"
                            value={premium.value}
                            onChange={(event) => {
                                const newPremiums = [...premiums];
                                newPremiums[index].value = event.target.value;
                                setPremiums(newPremiums);
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <Button
                        variant="outline"
                       
                            onClick={() => {
                                const newPremiums = [...premiums];
                                newPremiums.splice(index, 1);
                                setPremiums(newPremiums);
                            }}
                        >
                            Remove 
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    <Button
  variant="outlined"
  
  sx={{
        color: "white",
        mt: 2,
        ml: 20,
        borderColor: "white",

      }}
      onClick={() => {
        if (premiums.length < 3) {
            setPremiums([...premiums, {severity: "small", value: 0}])
        } else {
            alert("You can only add up to three premiums.")
        }
    }}
    >
        Add 
    </Button>
</TableCell>
    </TableRow>
                     
                  
                    </TableBody>
                  </Table>

                  <br></br>
                  <Button
                    variant="contained"
                    sx={{
                        backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
                        color: "white",
                        ml: 0,
                      }}
                    size="large"
                    onClick={handleSubmit}
                    
                  >
                    Create Bond
                  </Button>


                </CardContent>
              </Card>
            </Grid>
            <Confetti active={ isCelebrating } config={ confettiConfig } />

            <Grid item={true} xs={12} md={5}>
            <Card >
                <CardContent sx={{ padding: 3 }}>
                <Typography sx={{ fontWeight: 'bold' }}>Expiry</Typography>

                  <br></br>
                  <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }} >Expiry</TableCell>
                        <TableCell align="right">

                          <DatePicker
                          className={classes.datePickerContainer}
                          label="End Date"
                          name="endDate"
                          color="secondary"
                          disableFuture={false}
                          disablePast={true}
                          value={endDate}
                          onChange={handleEndDate}
                          fullWidth={true}

                         
                          renderInput={(params) => <TextField {...params} />}
                        />

                        </TableCell>
                      </TableRow>
                   
                    </TableBody>
                  </Table>
                  
                </CardContent>
              </Card>
              <Card sx={{ mt:2 }}>
                <CardContent sx={{ padding: 3, }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Coverage Area</Typography>
                  <br></br>
                  <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell align="center" style={{ height: '300px' }}>
                        <MapContainer setRadiusInKm={setRadiusInKm} setWhat3Words={setWhat3Words} className={classes.mapContainer} />
                        <Typography sx={{ fontWeight: 'bold', mt: 2}}>{what3words} </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{radiusInKm} km radius</Typography>
                     
                    </TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>

                </CardContent>
              </Card>
            {/*   <Card sx={{ mt:2 }}>
                <CardContent sx={{ padding: 3 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Returns</Typography>
                  <br></br>
                  <Table>
                    <TableBody>
                    <TableRow>
                    <TableCell>Total Cost</TableCell>
                    <TableCell align="right">
                        <span style={{ color: 'red', fontWeight: 'bold' }}>{totalReturn.toFixed(2)}%</span>
                    </TableCell>
                    </TableRow>
                   
                    </TableBody>
                  </Table>
                  
                </CardContent>
              </Card> */}

            </Grid>
         






          </Grid>


        </Container>
      </Section>




    </>
    </LocalizationProvider>

  );
}

export default DashboardPage;





