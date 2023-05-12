import React, { useEffect, useLayoutEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import * as colors from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createLocalStorageStateHook } from "use-local-storage-state";

const clientEmotionCache = createCache({ key: "css", prepend: true });

const themeConfig = {
  // Light theme
  light: {
   
    palette: {
      mode: "dark",
      primary: {
        // Lighter shade so it stands out on dark
        main: '#242429'
      },
      secondary: {
        main: "#FFF",
      },
      background: {
        default: '#1C1B1E',
        paper: '#242429',
      },
    },
  },

  // Dark theme
  dark: {
    palette: {
      mode: "dark",
      primary: {
        // Lighter shade so it stands out on dark
        main: '#242429'
      },
      secondary: {
        main: "#FFF",
      },
      background: {
        default: '#1C1B1E',
        paper: '#242429',
      },
    },
  },

  // Example theme (you can have more than just light/dark)
  // Switch to this theme by calling `theme.set("wacky")` in a component
  wacky: {
    palette: {
      mode: "light",
      primary: {
        main: colors.purple["300"],
      },
    },
    typography: {
      // This font will only be applied if you remove `fontFamily`
      // from the `shared` object below and specify it in each theme
      fontFamily: '"Comic Sans MS", "Comic Sans',
    },
  },


  // Values shared by all themes
  // These will be merged into the current theme
  shared: {
    typography: {
      fontSize: 14,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      // Uncomment to make button lowercase
      // button: { textTransform: "none" },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    // Customize specific components
    // Docs: https://mui.com/material-ui/customization/theme-components/
    components: {
      // Customize global style component
      MuiCssBaseline: {
        styleOverrides: {
          "#__next": {
            // Flex column that is height
            // of viewport so that footer
            // can push self to bottom by
            // with auto margin-top
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            // Prevent child elements from
            // shrinking when content
            // is taller than the screen
            // (quirk of flex parent)
            "& > *": {
              flexShrink: 0,
            },
          },
        },
      },
      // Customize Link component
      /* MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            color: "#000",
          },
        },
      }, */
     HeroSection: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            color: "#000",
          },
        },
      },

      MuiLink: {
        defaultProps: {
          // Only underline links on hover
          underline: "hover",
        },
      },
      // Customize Button component (example)
      /*
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            "&:hover": {
              boxShadow: "none",
            },
          },
          sizeLarge: {
            height: "48px",
          },
        },
      },
      */
    },
  },
};

// Create a local storage hook for storing theme preference
const useStoredTheme = createLocalStorageStateHook(
  "storedTheme",
  // Default theme ("light", "dark", undefined)
  // Use undefined to fall back to system preference (recommended)
  undefined
);

export const ThemeProvider = (props) => {
  // Get stored theme preference
  let [storedTheme, setStoredTheme] = useStoredTheme();

  // Only used stored preference after hydration to avoid client/server mismatch
  const hasHydrated = useHasHydrated();
  if (!hasHydrated) {
    storedTheme = undefined;
  }

  // Get system dark mode preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Get theme preference with fallback to light/dark based on system setting
  const themeName = storedTheme || (prefersDarkMode ? "dark" : "light");

  // Create final theme object
  const theme = createTheme(
    // Deep merge shared values
    deepmerge(themeConfig[themeName], themeConfig.shared),
    // Extra values to add to theme object
    {
      // So we can read current theme
      name: themeName,
      // Function for setting the current theme by name
      set: (name) => setStoredTheme(name),
      // Function for toggling between light/dark
      toggle: () => setStoredTheme(themeName === "dark" ? "light" : "dark"),
    }
  );

  // Get emotion cache passed down from `_document.js` if rendering on server
  // Otherwise use emotion cache for client-side
  const emotionCache = props.serverEmotionCache || clientEmotionCache;

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        {/* Set global MUI styles */}
        <CssBaseline />
        {props.children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

// Hook that tells us when hydration is complete so that we can
// safely use the value returned by useStoredTheme without
// risking a mismatch between server and client.
// This will hopefully be built-in to the use-local-storage-state library soon
// See https://github.com/astoilkov/use-local-storage-state/issues/23
function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  const isServer = typeof window === "undefined";
  // To reduce flicker, we use `useLayoutEffect` so that app re-renders before
  // before React has painted to the browser.
  // React throws a warning when using useLayoutEffect on the server so
  // we use useEffect on the server (no-op) and useLayoutEffect in the browser.
  const useEffectFn = isServer ? useEffect : useLayoutEffect;

  useEffectFn(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
}
