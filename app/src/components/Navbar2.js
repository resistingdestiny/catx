import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import Section from "components/Section";
import { useTheme } from "@mui/styles";
import { ConnectButton } from '@rainbow-me/rainbowkit';


function Navbar2(props) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuState, setMenuState] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && theme.name === "dark"
      ? props.logoInverted
      : props.logo;



  return (
    <Section bgColor={props.color} size="auto">
      <AppBar position="static" color="transparent" elevation={0}>
        <Container disableGutters={true}>
          <Toolbar>
            <Link href="/">
              <a>
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{ height: 28 }}
                />
              </a>
            </Link>
            <Box sx={{ ml: 2, display: { md: "block", xs: "none" } }}>
            <Link href="/viewall" passHref={true}>
                <Button color="inherit" component="a">
                  Dashboard{" "}
                </Button>
              </Link>
             
              

            </Box>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              color="inherit"
              size="large"
              sx={{ ml: "auto", display: { md: "none", xs: "block" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", ml: "auto", mr: "10px", }}>
            
                    <ConnectButton/>
               
                

             

           
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
    </Section>
  );
}

export default Navbar2;
