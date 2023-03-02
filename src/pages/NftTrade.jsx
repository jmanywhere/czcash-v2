import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomBar from '../components/layouts/BottomBar';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import TopNavTabs from '../components/layouts/TopNavTabs';
import UnderConstruction from '../components/layouts/UnderConstruction';

export default function NftTrade() {
  const theme = useTheme();
  return (
    <>
      <Box>
        <HeaderBar />
        <TopNavTabs />
        <UnderConstruction label="Trade the best NFTs." />
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
