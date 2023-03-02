import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import React, { useContext } from 'react';
import { DarkModeContext } from './DarkModeProvider';

import { Link as RouterLink } from 'react-router-dom';

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const BaseThemeProvider = ({ children }) => {
  const { isDark } = useContext(DarkModeContext);
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: 'dark',
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
        primary: {
          light: '#c5ffd2',
          main: '#12ff46',
          dark: '#011e11',
          contrastText: '#eeeef2',
        },
        secondary: {
          light: '#a97acb',
          main: '#9825ea',
          dark: '#3d0c60',
          contrastText: '#eeeef2',
        },
        accent: {
          light: '#eaad4a',
          main: '#f9a825',
          dark: '#be7522',
          contrastText: '#eeeef2',
        },
        background: {
          default: `#999393`,
          paper: `#231e1e`,
        },
        text: {
          primary: '#eeeef2',
          secondary: '#c4c4c4',
          dark: '#230411',
        },
      },
    })
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default BaseThemeProvider;
