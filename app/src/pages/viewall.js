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
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";



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
    const contractAddress = '0x20C6E292F4127e0FAB75AB67C01eD2Cb72fD814D'

    const [frog, setFrog] = useState([])
    const getAllPolicies = async (rpc_url, contract_address, abi, abiContract) => {
      // Instantiate web3 with HttpProvider
      const web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));
  
      // Instantiate contract
      const contract = new web3.eth.Contract(abi, '0x20C6E292F4127e0FAB75AB67C01eD2Cb72fD814D');
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
        const policyContractAddress = event.returnValues.policy;
        const policyContract = new web3.eth.Contract(abiContract, policyContractAddress);
        const policyData = await policyContract.methods.POLICY().call();
      
        let policy = {
          policyContract: policyContractAddress,
          name: policyData.name, 
          filecoinCID: policyData.filecoinCID,
          expiry: policyData.expiry,
          holder: policyData.holder,
          catType: policyData.catType,
          paymentFrequency: policyData.paymentFrequency,
          size: policyData.size,
          underlying: policyData.underlying,
          statement: policyData.statement,
          whatThreeWords: policyData.whatThreeWords,
          radius: policyData.radius,
          category: policyData.category,
          premiums: policyData.premiums,
        };
      
        policies.push(policy);
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
// Fetch the policies
useEffect(() => {
  getAllPolicies(rpc_url, contractAddress, abi, abiContract)
    .then(policies => {
      setFrog(policies);
    })
    .catch(error => {
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



  
 

  const classes = useStyles();
  const filteredPolicies = frog.filter(policy => policy.name.toLowerCase().includes(search.toLowerCase()));
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
                      <Typography variant="h6"  sx={{ fontWeight: "bold"}} className={classes.gradientText} align="left">Welcome
</Typography>
                      <Typography>Find and trade catastrophe bonds. </Typography>
                      </CardContent>
              </Card>
            </Grid>
            <Grid item={true} ml={0} xs={12} md={4}>
            <Grid item mb={2}>
                <Card>
                  <CardContent sx={{ padding: 3 }}>
                    <Box display="flex" alignItems="center">
                      <AccountBalanceWalletIcon />

                      <Typography
                        component={"span"}
                        sx={{ fontWeight: "bold", marginLeft: 2 }}
                      >
                        <strong
                          style={{ fontWeight: "bold", padding: 3, ML: 5 }}
                        >
                          Committed Capital:
                        </strong>
                      </Typography>
                      <Typography
                        component={"span"}
                        sx={{ fontWeight: "bold", marginLeft: 2 }}
                        className={classes.gradientText}
                      >
                       22
                      </Typography>
                    </Box>
                    <br></br>
                  </CardContent>
                </Card>
              </Grid>
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
                <Typography sx={{ fontWeight: 'bold'}} className={classes.gradientText} variant='h6'>View Bonds</Typography>
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
                    {stableSort(filteredPolicies, getComparator(order, orderBy)).map((policy) => (
                  <TableRow
                    key={policy.name}
                    onClick={() => handleRowClick(policy.policyContract)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        transition: "all .2s ease",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center">
                        <Avatar alt={policy.name} src={policy.image} />
                        <Typography variant="body1" style={{ marginLeft: 10 }}>
                          {policy.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{policy.size}</TableCell>
                    <TableCell align="right">{policy.issuePrice}</TableCell>
                    <TableCell align="right">{policy.currentPrice}</TableCell>
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





