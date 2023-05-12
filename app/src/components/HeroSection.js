import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Typography from "@mui/material/Typography";

function HeroSection(props) {
    const classes = props.useStyles();

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Grid container={true} alignItems="center" spacing={6}>
          <Grid container={true} item={true} direction="column" xs={12} md={12}>
            <Box sx={{ textAlign: { xs: "center", md: "center"} }}>
                <Box>
            <Typography variant="h2"  sx={{ fontWeight: "bold", mt: 8, mb: 4}} className={classes.gradientText} align="center">Cat Bond Exchange
</Typography>
            <Typography variant="p"   align="center">Exchange Cat Bonds
</Typography>

            </Box>
 <Box sx={{mt: 4}}>
              <Link href="/viewall" passHref={true}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
                    color: 'white',
                    ml: 0,
                  }}
                >
                  {props.buttonText}
                </Button>
              </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item={true} xs={12} md={true}>
            <figure>
             
            </figure>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default HeroSection;