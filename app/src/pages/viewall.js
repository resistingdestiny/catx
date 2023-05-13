import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useRouter } from "next/router";
import Meta from "components/Meta";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import { Typography, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Web3 from 'web3';
import { useNetwork } from 'wagmi'
import {  Multicall} from 'ethereum-multicall';
import { contract, rpc_url, abi, abiContract } from "../util/contract";



const useStyles = makeStyles((theme) => ({
  
  priceChip: {
    backgroundColor: '#4caf50', 
    color: '#fff', 
  },
  gradientText: {
    backgroundClip: "text",
    backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  toolbarContainer: {
    "& .MuiButton-root": {
      color: theme.palette.secondary.main,
    },
  },
}));



  function DashboardPage(props) {
    const contractAddress = '0x64318f50569d490B4382d23cb2239F851Ba4d984'

    const [frog, setFrog] = useState('')
    const getAllPolicies = async (rpc_url, contract_address, abi, abiContract) => {
      // Instantiate web3 with HttpProvider
      const web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));
  
      // Instantiate contract
      const contract = new web3.eth.Contract(abi, '0x64318f50569d490B4382d23cb2239F851Ba4d984');
      console.log('frog2', contract )
      // Get past events
      const fromBlock = await web3.eth.getBlockNumber() - 1000;
      const toBlock = 'latest';
  
      const events = await contract.getPastEvents('NewPolicy', {
        fromBlock,
        toBlock
      });
      console.log('events', events)
  
      const policies = [];

        for (const event of events) {
          // Use the correct variable from your event log
          const policyContractAddress = event.returnValues.policy;

          // Instantiate the policy contract
          const policyContract = new web3.eth.Contract(abiContract, policyContractAddress);

          // Call a method on the policy contract to fetch data
          // The exact method call depends on your contract's ABI
          const policyData = await policyContract.methods.POLICY().call();

          policies.push(policyData);
        }

        setFrog(policies);
        return policies;
        }
      


    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
    const { chain, chains } = useNetwork();
    
//
const web3 = new Web3();
const [rows, setRows] = useState([]);
useEffect(() => {
  getAllPolicies(rpc_url, contractAddress, abi, abiContract)
      .then(policies => {
          // Do something with the policies
          console.log('fish', policies.events);
      })
      .catch(error => {
          // Handle or log any errors
          console.error(error);
      });
}, []);
const handleSort = (property) => (event) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleSearch = (event) => {
  setSearch(event.target.value);
};

 

    const router = useRouter();

   
  const [value, setValue] = useState('all')
  const [search, setSearch] = useState('');
const [order, setOrder] = useState('asc');
const [orderBy, setOrderBy] = useState('name');


  let bondData = [
    {
      icon: "https://via.placeholder.com/150",
      id: 1,
      name: "Bond 1",
      number: 1,
      issuePrice: 100,
      currentPrice: 120,
      fluctuation: 20,
    },
    {
      icon: "https://via.placeholder.com/150",
      id: 2,
      name: "Bond 2",
      number: 2,
      issuePrice: 100,
      currentPrice: 120,
      fluctuation: 20,
    },
    // ... add more bonds as necessary
  ];
  
 

  const classes = useStyles();
  const filteredBonds = bondData.filter(bond => bond.name.toLowerCase().includes(search.toLowerCase()));
  const handleRowClick = (id) => {
    router.push(`/bond?${id}`);
  };
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
        <Grid item={true} ml={0} mr={0}xs={12} md={4}>
              <Card>
                      <CardContent sx={{ padding: 3}}>
                    
                      <Typography>Insures transactions with Ultravity scores of less than 50</Typography>
                      </CardContent>
              </Card>
            </Grid>
            <Grid item={true} ml={0} xs={12} md={4}>
              <Card>
                      <CardContent sx={{ padding: 3}}>
                      
                      <Typography>Insures transactions with Ultravity scores of 50 to 70</Typography>
                      </CardContent>
              </Card>
            </Grid>
          <Grid item={true} ml={0} xs={12} md={4}>
              <Card>
                      <CardContent sx={{ padding: 3}}>
                     
                      <Typography>Insures transactions with Ultravity scores of more than 70</Typography>
                      </CardContent>
              </Card>
            </Grid>
            
        <Grid item={true} xs={12} md={12}>
            <Card>
              <CardContent sx={{ padding: 3 }}>
                <Typography sx={{ fontWeight: 'bold'}} className={classes.gradientText} variant='h5'>View Bonds</Typography>
                <Typography>Explore the investment universe</Typography>
                <br/>
                <TextField
                  value={search}
                  onChange={handleSearch}
                  label="Search"
                  variant="outlined"
                />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === 'name'}
                            direction={orderBy === 'name' ? order : 'asc'}
                            onClick={handleSort('name')}
                          >
                            Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel
                            active={orderBy === 'number'}
                            direction={orderBy === 'number' ? order : 'asc'}
                            onClick={handleSort('number')}
                          >
                            Number
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel
                            active={orderBy === 'issuePrice'}
                            direction={orderBy === 'issuePrice' ? order : 'asc'}
                            onClick={handleSort('issuePrice')}
                          >
                            Issue Price
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                          <TableSortLabel
                            active={orderBy === 'currentPrice'}
                            direction={orderBy === 'currentPrice' ? order : 'asc'}
                            onClick={handleSort('currentPrice')}
                          >
                            Current Price
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                {stableSort(filteredBonds, getComparator(order, orderBy)).map((bond) => (
                  <TableRow
                  key={bond.name}
                  onClick={() => handleRowClick(bond.id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)", // or any color you want
                      transition: "all .2s ease",
                      cursor: "pointer",
                    },
                  }}
                >
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center">
                        <Avatar alt={bond.name} src={bond.image} />
                        <Typography variant="body1" style={{ marginLeft: 10 }}>
                          {bond.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{bond.number}</TableCell>
                    <TableCell align="right">{bond.issuePrice}</TableCell>
                    <TableCell align="right">{bond.currentPrice}</TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
        </Table>
      </TableContainer>
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





