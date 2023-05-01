import { czbPrice, czrPrice, czusdPrice } from '../../data/atoms';
import { useAtomValue } from 'jotai';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { commify, formatEther } from 'ethers/lib/utils.js';

const PriceBubbles = () => {
  const czusd = useAtomValue(czusdPrice);
  const czb = useAtomValue(czbPrice);
  const czr = useAtomValue(czrPrice);

  return (
    <Stack direction={'row'} justifyContent={'center'} spacing={2}>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'black',
          borderRadius: '8px',
          py: 2,
          px: 1,
        }}
      >
        {commify(
          formatEther(czusd)
            .split('.')
            .map((x, i) => (i == 0 ? x : x.substring(0, 4)))
            .join('.')
        )}
        &nbsp;CZUSD
      </Box>
      <Box
        sx={{
          backgroundColor: 'blue',
          color: 'black',
          borderRadius: '8px',
          py: 2,
          px: 1,
        }}
      >
        {commify(
          formatEther(czb)
            .split('.')
            .map((x, i) => (i == 0 ? x : x.substring(0, 4)))
            .join('.')
        )}
        &nbsp;CZB
      </Box>
      <Box
        sx={{
          backgroundColor: 'red',
          color: 'black',
          borderRadius: '8px',
          py: 2,
          px: 1,
        }}
      >
        {commify(
          formatEther(czr)
            .split('.')
            .map((x, i) => (i == 0 ? x : x.substring(0, 4)))
            .join('.')
        )}
        &nbsp;CZR
      </Box>
    </Stack>
  );
};

export default PriceBubbles;
