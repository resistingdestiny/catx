import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import { useRouter } from "next/router";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { useAuth } from "util/auth";

function DashboardSection2(props) {
  const auth = useAuth();
  const router = useRouter();

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

        
        <Grid container={true} spacing={4}>
          <Grid item={true} xs={12} md={6}>
          <Card>
              <CardContent sx={{ padding: 3 }}>
                <Box>
                  
              
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Card>
              <CardContent sx={{ padding: 3 }}>
                <Box>
                  
              
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default DashboardSection2;
