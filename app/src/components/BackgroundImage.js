import React from "react";
import Box from "@mui/material/Box";

function BackgroundImage(props) {
  const { image, opacity, ...otherProps } = props;

  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        opacity: opacity,
        content: "''",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        zIndex: 0,
      }}
      {...otherProps}
    />
  );
}

export default BackgroundImage;
