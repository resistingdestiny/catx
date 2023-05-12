import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function ContentCardsSection(props) {
  const items = [
    {
      image: "https://st3.depositphotos.com/5934840/33936/v/1600/depositphotos_339368658-stock-illustration-global-warming-alert-with-melting.jpg",
      title: "Climate Change",
      body: "How will climate change affect the world?",
      url: "/viewall",
    },
    {
      image: "https://elements-cover-images-0.imgix.net/30f7935b-624c-4aeb-898e-a25da4695613?auto=compress%2Cformat&fit=max&w=632&s=274f2de687701c9fb3b166616d22a4ed",
      title: "Existential Risk",
      body: "Awareness of the risks we face as a civilization.",
      url: "/viewall",
    },
    {
      image: "https://elements-cover-images-0.imgix.net/1990abe9-6d8a-460b-abc0-573961bfce19?auto=compress%2Cformat&fit=max&w=632&s=8923e0ca10919d58b73d4e2735ecf014",
      title: "Finance",
      body: "Understand the future of money and the economy.",
      url: "/viewall",
    }
    
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
        <Grid container={true} justifyContent="center" spacing={4}>
          {items.map((item, index) => (
            <Grid item={true} xs={12} md={6} lg={3} key={index}>
              <Card>
                <Link href={item.url} passHref={true}>
                  <CardActionArea component="a">
                    <CardMedia
                      image={item.image}
                      title={item.title}
                      sx={{ height: "160px" }}
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom={true}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.body}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default ContentCardsSection;
