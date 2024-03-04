import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#757de8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c93860',
    },
    background: {
      default: '#e4ecff',
      paper: '#ffffff',
    },
    error: {
      main: '#fb0743',
    },
    text: {
      primary: 'rgba(20,33,70,0.87)',
      secondary: 'rgba(20,33,70,0.62)',
      disabled: 'rgba(20,33,70,0.33)',
    },
  },
  typography: {
    fontFamily: 'PT serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  }
};

export const theme = createTheme(themeOptions);

export default themeOptions