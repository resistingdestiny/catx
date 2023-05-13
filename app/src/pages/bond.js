import React, { useEffect, useState, PureComponent } from "react";
import { useNetwork } from "wagmi";

import Meta from "components/Meta";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useAccount } from "wagmi";
import dynamic from 'next/dynamic';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Confetti from 'react-dom-confetti';
import 'leaflet/dist/leaflet.css';
import Web3 from 'web3';
import {  Multicall} from 'ethereum-multicall';


const MapContainer = dynamic(() => import('components/viewMap'), {
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
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { abi, contractAddresses, rpc_url, polygon_rpc_url, abiContract} from "util/contract.js";


const tableRow = [
  {
    id: 1,
    verificationMethod: "Method A",
    perilCovered: "Peril A",
    location: [51.505, -0.09],
  }

];
const useStyles = makeStyles((theme) => ({
  gradientText: {
    backgroundClip: "text",
    backgroundImage:
      "linear-gradient(85.9deg, #1EBEA5 -14.21%, #00B5C4 18.25%, #00A8E6 52.49%, #0096FD 81.67%, #157AFB 111.44%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

function DashboardPage(props) {
  const [rpc_address, setrpc_address] = useState(rpc_url)
  const [contractAddress, setcontractAddress] = useState(null)
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const { chain, chains } = useNetwork();
  let policy = {
    name: "Bond 12", //complete
    expiry: "112121", //complete
    holder: "0x2D41164fDe069d7177105753CE333c73332c6456", 
    typeHash: "123123", 
    paymentFrequency: "21313", //complete
    size: "12223", //complete
    underlying: "0x5B1F146caAAD62C4EE1fC9F29d9414B6Ed530Ac6", //update when necessary
    statement: "BigHurricane23", 
    category: "234324", // group
    premiums: "234234234", // number
    location: [
        {
            whatThreeWords: ['pretty', 'needed', 'chill'], 
            radius: "20", 
        },
    ],
};



  const classes = useStyles();

  useEffect(() => {
  if (chain?.name === "Goerli") {
    setrpc_address(rpc_url)
    console.log('Ethereum')
  } else{
    setrpc_address(polygon_rpc_url)

      console.log('Polygon')
    }
  },[chain?.name])
  // url parsing
  const web3 = new Web3();

  const { address, isConnecting, isDisconnected } = useAccount();
let bond_id

  if (typeof window !== "undefined") {
    const url = window.location.href;
    const parts = url.split("?");

    bond_id = parts[parts.length - 1];
  }



  const getPolicy = async (rpc_url, contract_address, abiContract) => {
    // Instantiate web3 with HttpProvider

       const policyContractAddress = "0x2AB335fF597BC477D94E55727EF39aB2bEf8a2D3"
        // Instantiate the policy contract
        const policyContract = new web3.eth.Contract(abiContract, policyContractAddress);
        console.log('contrat', policyContract)
        // Call a method on the policy contract to fetch data
        // The exact method call depends on your contract's ABI
        const policyData = await policyContract.methods.POLICY().call();

       console.log('data', policyData)
      }

    
      const [modalOpen, setModalOpen] = useState(false);

  const [graphData, setGraphData] = useState();


  useEffect(() => {
    getPolicy(rpc_url, contractAddress, abi, abiContract)
        .then(policies => {
            // Do something with the policies
            console.log('fish', policies.events);
        })
        .catch(error => {
            // Handle or log any errors
            console.error(error);
        });
  }, []);
  

  



  let data = [
    {name: 'Value', classA: policy.size}
   
  ];
  
  
  function openStakeModal() {
  
    setModalOpen(true);
  }

  function closeStakeModal() {
    setModalOpen(false);
  
  }
console.log([policy.location[0].whatThreewords])
  return (
    <>
      <Meta title="Dashboard" />
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

          <Grid container={true} spacing={4}>
            <Grid item={true} xs={12} md={7}>
              <Card>
                <CardContent sx={{}}>
                  <Box>
                    <Typography
                      component={"span"}
                      sx={{ fontWeight: "bold", mb: 4, fontSize: 24 }}
                      className={classes.gradientText}
                      align="left"
                    >
                      {policy.name}
                    </Typography>

                  
                    <LineChart
                      width={600}
                      height={400}
                      data={data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="classA" stroke="#8884d8" activeDot={{ r: 8 }} />
               
                    </LineChart>

                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item={true} xs={12} md={5}>
              <Grid item mb={2}>
                <Card>
                  <CardContent sx={{ padding: 3 }}>
                    {/* Buy or sell short tranches */}
                    <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Class A</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>   <Button onClick={() => openStakeModal()} variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Buy 
                      </Button></TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Sell 
                      </Button></TableCell>
                     
                   

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Class B</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Buy 
                      </Button></TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Sell 
                      </Button></TableCell>
                     
                   

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Class C</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Buy 
                      </Button></TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Sell 
                      </Button></TableCell>
                     
                   

                      </TableRow>
                      
                      
                    </TableBody>
                  </Table>
                  </CardContent>
                </Card>
              </Grid>
              </Grid>
          
      
            <Grid item={true} xs={12} md={12}>
              <Card>
                <CardContent sx={{ padding: 3 }}>
                 
                  <Box>
                    <Typography
                      component={"span"}
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      Verification Method, Peril Covered and Location
                    </Typography>
                    <Table   sx={{ fontWeight: "bold", mt: 4 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                        <TableCell >£200</TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Name</TableCell>
                        <TableCell >Bond Name</TableCell>

                      </TableRow>
                      <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>

                        <TableCell align="right" style={{ height: '200px' }}>
                        <MapContainer what3words={policy.location[0].whatThreeWords} radius={policy.radius} className={classes.mapContainer} />

 

                    </TableCell>
                      </TableRow>
                      
                    </TableBody>
                  </Table>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Dialog
            open={modalOpen}
            onClose={closeStakeModal}
            aria-labelledby="staking-dialog"
            maxWidth="lg"
            fullScreen={false}
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.7)" }}}
          >
         
              <>
                <DialogTitle id="staking-dialog">Stake in</DialogTitle>
                
                <DialogContent
                
                
                >
                   <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
                  
                  <br></br>
                  <TextField
                    label="WBIT to Stake"
                    value={stakeAmount}
                    onChange={(e) => console.log('hello')}
                    type="number"
                    id="wbit-input"
                    className="staking-amount-input"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "white" }

                    }}
                  />
                  <Typography>
                  <br></br>
                  Base Insurance Rate: 
</Typography>
              
                </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button sx= {{color: "white"}} color="secondary" variant="outlined" onClick={closeStakeModal}>Cancel</Button>

                  
                  <Button variant="contained"
                  sx={{
                    backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
                    color: 'white',
                    mr: 0,
                  }}  
                  
                  
                  
                  >
                    Stake
                  </Button>
                </DialogActions>
              </>
         
          </Dialog>
      </Section>
    </>
  );
}

export default DashboardPage;
