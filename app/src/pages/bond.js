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


const MapContainer = dynamic(() => import('components/MapComponent'), {
    ssr: false, 
  });
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { abi, contractAddresses, rpc_url, polygon_rpc_url} from "util/contract.js";


import Web3 from "web3";
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

  const { chain, chains } = useNetwork();
  const [bondName, setBondName] = useState("Bond 1")


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





  const [graphData, setGraphData] = useState();



  

  



  let data = [
    {name: 'Page A', classA: 4000, classB: 2400, classC: 2400},
    {name: 'Page B', classA: 3000, classB: 1398, classC: 2210},
    {name: 'Page C', classA: 2000, classB: 9800, classC: 2290},
    {name: 'Page D', classA: 2780, classB: 3908, classC: 2000},
    {name: 'Page E', classA: 1890, classB: 4800, classC: 2181},
    {name: 'Page F', classA: 2390, classB: 3800, classC: 2500},
    {name: 'Page G', classA: 3490, classB: 4300, classC: 2100},
  ];
  
  

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
                      {bondName}
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
                      <Line type="monotone" dataKey="classB" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="classC" stroke="#ffc658" />
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
                        <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Buy @ $90
                      </Button></TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Sell @ $90
                      </Button></TableCell>
                     
                   

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Class B</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Buy @ $90
                      </Button></TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Sell @ $90
                      </Button></TableCell>
                     
                   

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Class C</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Buy @ $90
                      </Button></TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>   <Button variant="contained" color="secondary" sx={{ marginBottom: 1, width: '100%' }}>
                        Sell @ $90
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
                  {/* Table with verification method, peril covered, and a map */}
                  <Box>
                    <Typography
                      component={"span"}
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      Verification Method, Peril Covered and Location
                    </Typography>
                    <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Name</TableCell>

                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Bond Name</TableCell>

                      </TableRow>
                      <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>

                        <TableCell align="right" style={{ height: '300px' }}>
                        <MapContainer className={classes.mapContainer} />

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
      </Section>
    </>
  );
}

export default DashboardPage;
