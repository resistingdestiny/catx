import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function Integrations(props) {
  const items = [
    {
        name: "UMA",
        image: "https://avatars.githubusercontent.com/u/40549210?s=280&v=4",
        width: "100px",
      },
      {
        name: "Mantle",
        image: "https://d31ygswzsyecnt.cloudfront.net/mantlemashlogo2.png",
        width: "100px",
      },
      {
        name: "Filecoin",
        image: "https://cryptologos.cc/logos/filecoin-fil-logo.png",
        width: "100px",

      },
      {
        name: "Aave",
        image: "https://static1.squarespace.com/static/5dc59d3f6301105b02894f5f/5dc59d3f6301105b02894f94/5e1fd62c57b4c425de9d2bfb/1611956185982/Aave+Ghost+Vertical.png?format=1500w",
        width: "100px",

      },
      {
        name: "Optimism",
        image: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
        width: "100px",

      },
      {
        name: "Metamask",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png",
        width: "100px",

      },
      {
        name: "Scroll",
        image: "https://scroll.io/logo.png",
        width: "100px",

      },
      {
        name: "Polygon",
        image: "https://cryptologos.cc/logos/polygon-matic-logo.png",
        width: "100px",

      },
      {
        name: "Gnosis",
        image: "https://cdn.sanity.io/images/r2mka0oi/production/bf37b9c7fb36c7d3c96d3d05b45c76d89072b777-1800x1800.png",
        width: "100px",

      },
      {
        name: "Neon",
        image: "images/neon.png",
        width: "100px",

      },
      
  ];

  return (
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
        <Grid container={true} justifyContent="center">
          {items.map((item, index) => (
            <Grid item={true} xs={12} md="auto" key={index}>
              <Box sx={{ py: 2, px: 3, textAlign: "center" }}>
                <img src={item.image} height="100px" alt={item.name} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default Integrations;