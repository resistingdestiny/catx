import React from "react";
import HeroSection from "components/HeroSection";
import ContentCardsSection from "components/ContentCardsSection";
import StatsSection from "components/StatsSection";
import { makeStyles } from "@mui/styles";
import Integrations from "components/Integrations";
function IndexPage(props) {
  const useStyles = makeStyles((theme) => ({
    gradientText: {
      backgroundClip: "text",
      backgroundImage: "linear-gradient(85.9deg, #6F00FF -14.21%, #8A2BE2 18.25%, #A020F0 52.49%, #BA55D3 81.67%, #C71585 111.44%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  }));
  return (
    <>
    <HeroSection
    bgColor="primary"
    size="medium"
    bgImage=""
    logo="logo.png"
    bgImageOpacity={1}
    title="Cat Exchange"
    subtitle="Buy, tade and exchange cat bonds."
    image=""
    buttonText="Get Started"
    buttonColor="secondary"
    buttonPath="/pricing"
    useStyles = {useStyles}
  />
  <Integrations />
 
 


  
  </>
  );
}

export default IndexPage;
