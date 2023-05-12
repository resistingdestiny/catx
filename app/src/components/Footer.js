import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Section from "components/Section";
import { useTheme } from "@mui/styles";

function Footer(props) {
  const theme = useTheme();

  // Use inverted logo if specified
  // and we are in dark mode
  const logo =
    props.logoInverted && theme.name === "dark"
      ? props.logoInverted
      : props.logo;

  const styles = {
    item: {
      display: "flex",
      flex: "none",
      justifyContent: "center",
      width: "100%",
      mb: "24px",
      [theme.breakpoints.up("sm")]: {
        // Take up half the width
        flex: "50%",
      },
    },
    leftItem: {
      [theme.breakpoints.up("sm")]: {
        // Position children to the left
        justifyContent: "flex-start",
      },
    },
    rightItem: {
      [theme.breakpoints.up("sm")]: {
        // Position children to the right
        justifyContent: "flex-end",
      },
      // Social and nav links
      "& a": {
        color: "inherit",
        lineHeight: 1,
        "&:not(:last-of-type)": {
          mr: "1.2rem",
        },
      },
    },
  };

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      sx={{
        ...(props.sticky && {
          // Push to bottom of page
          mt: "auto",
        }),
      }}
    >
      <Container sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={[styles.item, styles.leftItem]}>
          <Link href="/">
            <a>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ display: "block", height: "32px" }}
              />
            </a>
          </Link>
        </Box>
        <Box
          sx={[
            {
              // On mobile show link row
              // above social icons
              [theme.breakpoints.up("sm")]: {
                order: 1,
              },
            },
            styles.item,
            styles.rightItem,
          ]}
        >
          <Typography>
            
            
           
          </Typography>
        </Box>
        <Box
          sx={[
            {
              // Position icons at bottom
              // so closer to nav links
              alignItems: "flex-end",
            },
            styles.item,
            styles.rightItem,
          ]}
        >
          <a href="" target="_blank" rel="noreferrer">
            <TwitterIcon fontSize="small" />
          </a>
      
        </Box>
        <Box
          sx={[
            {
              fontSize: "0.875rem",
              opacity: 0.6,
              "& a": {
                color: "inherit",
                ml: "0.8rem",
              },
            },
            styles.item,
            styles.leftItem,
          ]}
        >
          {props.copyright}
         
        </Box>
      </Container>
    </Section>
  );
}

export default Footer;
