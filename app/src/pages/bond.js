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
import { format } from 'date-fns';
import {useSigner, useProvider} from "wagmi";
import { ethers } from "ethers";
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

import { contractAddresses, rpc_url, polygon_rpc_url, abiContract, ghoAbi} from "util/contract.js";


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
  const [policy, setPolicy] = useState({})
  const { data: signer, isError, isLoading } = useSigner();
  const { provider } = useProvider(); // Get the Ethereum provider

  const approvingContract = new ethers.Contract("0x49871B521E44cb4a34b2bF2cbCF03C1CF895C48b", ghoAbi, provider)
  
  
  const approveContract = approvingContract.connect(signer)



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
  const web3 = new Web3(new Web3.providers.HttpProvider(rpc_address));


  const { address, isConnecting, isDisconnected } = useAccount();
let policyRow

  if (typeof window !== "undefined") {
    const url = window.location.href;
    const parts = url.split("?");

    policyRow = parts[parts.length - 1];
    console.log(policyRow)
  }



  const getPolicy = async (rpc_url, contract_address, abiContract) => {
    // Instantiate web3 with HttpProvider

       const policyContractAddress = policyRow
        // Instantiate the policy contract
        const policyContract = new web3.eth.Contract(abiContract, policyContractAddress);
        console.log('contrac', policyContract)
        // Call a method on the policy contract to fetch data
        // The exact method call depends on your contract's ABI
        const policyData = await policyContract.methods.POLICY().call();
        return policyData
       console.log('data', policyData)
  
      }


  const makeInvestment = async (rpc_url, contract_address, abiContract) => {
    const policyContractAddress = (policyRow)
    const policyContract = new web3.eth.Contract(abiContract, policyContractAddress);
    await approveContract.approve((policyRow), ethers.BigNumber.from('10000000000000'));
    const investmentData = await policyContract.methods.POLICY().call();
   // return investmentData = await policyContract.methods.invest("address of bond recipient", [BigNumber of Tier1 amount', 'BigNumber of Tier2 amount', 'BigNumber of Tier3 amount'])
  }

  // await 
    
      const [modalOpen, setModalOpen] = useState(false);

  const [graphData, setGraphData] = useState();


  useEffect(() => {
    getPolicy(rpc_url, contractAddress, abiContract)
        .then(policyData => {
            let policy = {
              name: policyData.name, 
              filecoinCID: policyData.filecoinCID,
              expiry: policyData.expiry,
              holder: policyData.holder,
              catType: policyData.catType,
              paymentFrequency: policyData[5],
              size: policyData.size,
              underlying: policyData.underlying,
              statement: policyData.statement,
              whatThreeWords: policyData,
              radius: policyData.radius,
              category: policyData.category,
              premiums: policyData.premiums,
            };
            console.log('policy data', policy);
            setPolicy(policy)
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


  const handleInvest = () => {
    makeInvestment(rpc_url, (policyRow), abiContract)

  }
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
                        <TableCell sx={{ fontWeight: 'bold' }}>{policy?.premiums?.[2]}%</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>   
                      <TextField
                    label="Investment Amount"
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
                      </TableCell>
                     
                   

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Class B</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{policy?.premiums?.[1]}%</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>  <TextField
                    label="Investment Amount"
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
                  /> </TableCell>
                     
                   

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Class C</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{policy?.premiums?.[0]}%</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>  <TextField
                    label="Investment Amount"
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
                  /> </TableCell>
                     
                   

                      </TableRow>
                      
                      
                    </TableBody>
                  </Table>

                  <Button variant="contained"
                  sx={{
                    backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
                    color: 'white',
                    mr: 0,
                    mt: 2,
                    ml: 20
                  }}  
                  onClick={handleInvest}
                  
                  
                  >
                   Invest
                  </Button>
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
                      About the Bond
                    </Typography>
                    <Table   sx={{ fontWeight: "bold", mt: 4 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Size of Bond</TableCell>
                        <TableCell >{policy.size}</TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Peril</TableCell>
                        <TableCell >{policy.catType}</TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Verification Statement</TableCell>
                        <TableCell >{policy.statement}</TableCell>

                      </TableRow>
                     {/*  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Expiry</TableCell>
                    <TableCell>
                    {format(new Date(policy.expiry * 1000), 'yyyy-MM-dd HH:mm:ss')}
                    </TableCell>
                  </TableRow> */}
                      <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>

                        <TableCell align="right" style={{ height: '200px' }}>
                        <MapContainer what3words={policy.whatThreeWords} radius={policy.radius} className={classes.mapContainer} />

 

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
                <DialogTitle id="staking-dialog">Invest</DialogTitle>
                
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
                    label="Investment Amount"
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
                  Estimated Return:  
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
                   Invest
                  </Button>
                </DialogActions>
              </>
         
          </Dialog>
      </Section>
    </>
  );
}

export default DashboardPage;
