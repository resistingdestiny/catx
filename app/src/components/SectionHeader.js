import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SectionHeader(props) {
  const { subtitle, title, size, className, sx = [], ...otherProps } = props;

  // Render nothing if no title or subtitle
  if (!title && !subtitle) {
    return null;
  }

  return (
    <Box
      component="header"
      sx={[
        {
          // Add bottom margin if element below
          "&:not(:last-child)": {
            mb: "2rem",
          },
        },
        // Merge `sx` prop (object or array)
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...otherProps}
    >
      {title && (
        <Typography
          variant={`h${size}`}
          gutterBottom={props.subtitle ? true : false}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            // Subtitle text generally isn't very long
            // so usually looks better to limit width.
            maxWidth: "700px",
            // So we can have max-width but still
            // have alignment controlled by text-align.
            display: "inline-block",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default SectionHeader;
