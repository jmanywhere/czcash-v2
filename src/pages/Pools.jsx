import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomBar from '../components/layouts/BottomBar';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import UnderConstruction from '../components/layouts/UnderConstruction';
import PriceBubbles from '../components/price/PriceBubbles';



export default function Pools() {
  const theme = useTheme();
  return (
    <>
      <Box>
        <HeaderBar />
        <PriceBubbles/>
        <UnderConstruction label="High Yield Pools" />
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
