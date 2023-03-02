import { useTheme } from '@emotion/react';
import { Button, Container, Icon, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import BottomBar from '../components/layouts/BottomBar';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import {
  LINK_TELEGRAM,
  LINK_TWITTER,
  LINK_WHITEPAPER,
} from '../constants/links';

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Box css={{ backgroundColor: theme.palette.primary.dark }}>
        <HeaderBar />
        <Container
          sx={{ minHeight: '100vh', paddingTop: '1em', textAlign: 'left' }}
        >
          <Grid2
            container
            spacing={0}
            sx={{
              paddingTop: { md: '5em' },
              flexDirection: { md: 'row-reverse' },
              maxWidth: { xs: '370px', md: '740px' },
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Grid2 xs={12} md={6}>
              <Typography
                color="primary"
                as="h1"
                sx={{
                  fontSize: '2em',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginLeft: '1.5em',
                  display: { xs: 'flex', md: 'none' },
                }}
              >
                CZ.CASH
              </Typography>
              <Box
                as="img"
                src="./images/clips/laptop.png"
                sx={{
                  maxWidth: '100%',
                  marginTop: '-3.5em',
                  marginBottom: '-6em',
                  width: 360,
                }}
              />
            </Grid2>
            <Grid2 xs={12} md={6}>
              <Box sx={{ marginLeft: '3.5em', marginBottom: '0.5em' }}>
                <IconButton href={LINK_TELEGRAM} target="_blank">
                  <Icon
                    baseClassName="fab"
                    className="fa-telegram"
                    color="primary"
                    sx={{
                      fontSize: '1.8em',
                      backgroundColor: theme.palette.primary.dark,
                      borderRadius: '0.9em',
                      marginLeft: { md: '0.8em' },
                    }}
                  />
                </IconButton>
                <IconButton href={LINK_TWITTER} target="_blank">
                  <Icon
                    baseClassName="fab"
                    className="fa-twitter"
                    sx={{
                      padding: '0.4001em',
                      fontSize: '1em',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '0.9em',
                      color: theme.palette.primary.dark,
                      marginLeft: { md: '2em' },
                    }}
                  />
                </IconButton>
              </Box>
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: { xs: '2em', md: '3em' },
                  lineHeight: 1.1,
                  textAlign: 'left',
                  marginLeft: { xs: '1.5em', md: '1em' },
                  fontWeight: 'bold',
                }}
              >
                Building for
                <br />
                The Future
              </Typography>
              <Button
                variant="contained"
                disableElevation
                href={LINK_WHITEPAPER}
                target="blank"
                sx={{
                  color: theme.palette.text.dark,
                  fontWeight: 'bold',
                  fontSize: '0.8em',
                  paddingLeft: '4em',
                  paddingRight: '4em',
                  marginLeft: '4em',
                  marginTop: '1.5em',
                  borderRadius: '1.5em',
                }}
              >
                View Documentation
              </Button>
            </Grid2>
          </Grid2>
        </Container>
        <FooterArea />
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomBar />
        </Paper>
      </Box>
    </>
  );
}
