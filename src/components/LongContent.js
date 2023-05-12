import React from "react";
import Box from "@mui/material/Box";

function LongContent(props) {
  return (
    <Box
      sx={(theme) => ({
        // Style nested elements so that long-form
        // content doesn't have to use MUI components.
        ...theme.typography.body1,
        "& h1": {
          ...theme.typography.h4,
          fontWeight: 600,
        },
        "& h2": {
          ...theme.typography.h5,
          fontWeight: 600,
        },
        "& h3": {
          ...theme.typography.h6,
          fontWeight: 600,
        },
        "& a": {
          color: "primary.main",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      })}
    >
      {props.children}
    </Box>
  );
}

export default LongContent;
