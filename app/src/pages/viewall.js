import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useRouter } from "next/router";
import Meta from "components/Meta";
import LinearProgress from "@mui/material/LinearProgress";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import { Typography, Chip } from "@mui/material";

import Web3 from 'web3';
import { useNetwork } from 'wagmi'


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
    const { chain, chains } = useNetwork();
    
//
const web3 = new Web3();
const [rows, setRows] = useState([]);


 

    const router = useRouter();

   
  const [value, setValue] = useState('all')
  const [searchText, setSearchText] = useState("Frog");
  


  let bondData = [
    {
      icon: "https://via.placeholder.com/150",
      name: "Bond 1",
      number: 1,
      issuePrice: 100,
      currentPrice: 120,
      fluctuation: 20,
    },
    // ... add more bonds as necessary
  ];
  
 

  const classes = useStyles();
 
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
        <Grid item={true} xs={12} md={12}>
  <Card>
    <CardContent>
      <Typography
        sx={{ fontWeight: 'bold' }}
        className={classes.gradientText}
        variant='h5'>
        View Bonds
      </Typography>
      <Typography>Current Outstanding Bonds</Typography>
      <br/>

      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Issue Price</TableCell>
              <TableCell>Current Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bondData.map((bond) => (
              <TableRow
              key={bond.name}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)", // or any color you want
                  transition: "all .2s ease",
                },
              }}
            >
                <TableCell>
                  <Avatar alt={bond.name} src={bond.icon} />
                </TableCell>
                <TableCell>{bond.name}</TableCell>
                <TableCell>{bond.number}</TableCell>
                <TableCell>{bond.issuePrice}</TableCell>
                <TableCell>{bond.currentPrice}</TableCell>
               
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





