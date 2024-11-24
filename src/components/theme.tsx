'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    // fontFamily: inter,
    fontWeightRegular: 'lighter',
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 5,
          padding: 0,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingTop: 40,
        },
      },
      defaultProps: {
        fontWeight: 700,
      },
    },
    // MuiTypography: {
    //   styleOverrides: {
    //     fontFamily: "revert-layer",
    //   },
    // },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            color: 'gray',
          },
        },
        contained: {
          textTransform: 'capitalize',
        },
        text: {
          textTransform: 'capitalize',
          color: 'black',
        },
      },
    },
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      contrastText: '#fff',
    },

    secondary: {
      main: '#4D4D4D',
      contrastText: '#fff',
    },
  },
})

export default theme
