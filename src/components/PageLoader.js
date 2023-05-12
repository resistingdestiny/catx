import React from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Section from "components/Section";

function PageLoader(props) {
  return (
    <Section bgColor="default">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!props.children && <CircularProgress size={32} />}

        {props.children && <>{props.children}</>}
      </Container>
    </Section>
  );
}

export default PageLoader;
