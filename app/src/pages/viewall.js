import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useRouter } from "next/router";
import Meta from "components/Meta";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { makeStyles } from "@mui/styles";

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
        <Grid item={true} xs={12} md={3}>
        <Card>
                  <CardContent sx={{ padding: 3 }}>
                  <Typography sx={{ fontWeight: 'bold'}} className={classes.gradientText} variant='h5'>High Risk</Typography>
                  <Typography>Highest Risk, highest reward</Typography>
                  <br/>
                  </CardContent>
          </Card>
          </Grid>
        <Grid item={true} xs={12} md={3}>
        <Card>
          
                        <CardContent sx={{ padding: 3 }}>
                        <Container>
             <Grid container={true} justifyContent="center" >
            <Grid item={true} mt={3} mb={2} xs={12} sm={3}>
          

              <Box sx={{ textAlign: "center" }}>

                <Typography sx={{ fontWeight: "bold"}} className={classes.gradientText} variant="h4">{rows?.length}</Typography>
                <Typography  ml={-2} variant="overline">Pool1</Typography>
              </Box>
            </Grid>
           </Grid>
           </Container>
              </CardContent>
          </Card>
          </Grid>
          <Grid item={true} xs={12} md={3}>
                <Card>
                      <CardContent sx={{ padding: 3 }}>
                      <Container>
                    <Grid container={true} justifyContent="center" >
                    <Grid item={true} mt={3} mb={2} xs={12} sm={3}>

                      <Box sx={{ textAlign: "center" }}>

                        <Typography  sx={{ fontWeight: "bold"}} className={classes.gradientText} variant="h4">0</Typography>
                        <Typography  ml={0} variant="overline">Pool2</Typography>

                      </Box>
                    </Grid>
                  </Grid>
                  </Container>
                      </CardContent>
                  </Card>
          </Grid>
          <Grid item={true} xs={12} md={3}>
          <Card>
                      <CardContent sx={{ padding: 3 }}>
                      <Container>
                    <Grid container={true} justifyContent="center" >
                    <Grid item={true} mt={3} mb={2} xs={12} sm={3}>
                    

                      <Box sx={{ textAlign: "center" }}>

                        <Typography  sx={{ fontWeight: "bold"}} className={classes.gradientText} variant="h4">0</Typography>
                        <Typography  ml={0} variant="overline">Pool3</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  </Container>
                      </CardContent>
                  </Card>
          </Grid>
          
          <Grid item={true} xs={12} md={12}>
          <Card>
          
              <CardContent sx={{ padding: 3 }}>
                <Box>

                <div style={{ width: "100%" }}>
 

    </div>
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





