import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  // stolen from: https://getbootstrap.com/docs/5.0/layout/breakpoints/
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px"
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace"
  },
  colors: {
    dark: "#101B2D",
    pink: {
      200: "#E40066",
      500: "#FF0080"
    },
    light: "#DFE4F7",
    purple: {
      600: "#5D3B7F",
      700: "#7928CA"
    }
  },
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
        height: "100%"
      },
      body: {
        bg: "dark",
        overflow: "hidden"
      },
      "#__next": {
        height: "100%",
        color: "light"
      }
    }
  }
});

export default theme;
