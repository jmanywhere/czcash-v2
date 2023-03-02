import { useTheme } from '@emotion/react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomBar from '../components/layouts/BottomBar';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import TopNavTabs from '../components/layouts/TopNavTabs';

export default function Swap() {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          background:
            'linear-gradient(340deg, ' +
            theme.palette.primary.main +
            ' 0%, ' +
            theme.palette.primary.dark +
            ' 100%);',
        }}
      >
        <HeaderBar />
        <TopNavTabs />
        <Container
          sx={{
            paddingTop: '1em',
            minHeight: '100vh',
          }}
        >
          <Paper
            sx={{
              paddingTop: '0.1em',
              paddingBottom: '1em',
            }}
          >
            <h3>Swap</h3>
            From:
            <br />
            To:
          </Paper>
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
