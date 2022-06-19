import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};

/* TODO Split theme settings into separated files if growing */
const theme = extendTheme({
  // https://getbootstrap.com/docs/5.0/layout/breakpoints/
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
  components: {
    Form: {
      variants: {
        // https://chakra-ui.com/docs/components/recipes/floating-labels
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              color: "white",
              backgroundColor: "purple.700",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top"
            }
          }
        }
      }
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
        overflowX: "hidden"
      },
      "#__next": {
        height: "100%",
        color: "light"
      }
    }
  }
});

export default theme;
