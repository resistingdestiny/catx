import React from "react";
import Box from "@mui/material/Box";
import { emphasize } from "@mui/material/styles";
import BackgroundImage from "components/BackgroundImage";
import { useTheme } from "@mui/styles";

function Section(props) {
  const theme = useTheme();

  const {
    bgColor = "default",
    bgImage,
    bgImageOpacity,
    size = "normal",
    sx = [],
    children,
    ...otherProps
  } = props;

  // Get responsive vertical padding based on `size` prop
  const verticalPadding = {
    normal: { xs: 6 },
    medium: { xs: 6, sm: 10 },
    large: { xs: 6, sm: 20 },
    auto: 0,
  }[size];

  // Get background color based on `bgColor` prop
  const backgroundColor = {
    default: theme.palette.background.default,
    light: emphasize(theme.palette.background.default, 0.03),
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    transparent: "transparent",
  }[bgColor];

  // Get text color based on `backgroundColor`
  const color =
    backgroundColor === "transparent"
      ? "inherit"
      : theme.palette.getContrastText(backgroundColor);

  // Get border color based on `backgroundColor`
  const borderColor =
    backgroundColor === "transparent"
      ? false
      : emphasize(backgroundColor, 0.09);

  return (
    <Box
      component="section"
      className={`bg-${bgColor}`}
      sx={[
        {
          py: verticalPadding,
          position: "relative",
          // Ensure child <Container> is above background
          // image (if one is set with the bgImage prop).
          "& > .MuiContainer-root": {
            position: "relative",
          },
          backgroundColor: backgroundColor,
          color: color,
        },
        borderColor && {
          // Only add border if two sections with
          // same `bgColor` are next to each other.
          [`&.bg-${bgColor} + .bg-${bgColor}`]: {
            borderTop: `1px solid ${borderColor}`,
          },
        },
        // Merge `sx` prop (object or array)
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...otherProps}
    >
      {bgImage && <BackgroundImage image={bgImage} opacity={bgImageOpacity} />}

      {props.children}
    </Box>
  );
}

export default Section;
