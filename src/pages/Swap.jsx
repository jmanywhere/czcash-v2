import { useTheme } from '@emotion/react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { parseEther } from 'ethers/lib/utils.js';
import { useState } from 'react';
import EtherTextField from '../components/elements/EtherTextField';
import TokenListBox from '../components/elements/TokenListbox';
import BottomBar from '../components/layouts/BottomBar';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import TopNavTabs from '../components/layouts/TopNavTabs';

export default function Swap() {
  const theme = useTheme();

  const [inputWad, setInputWad] = useState(parseEther('0'));
  const [outputWad, setOutputWad] = useState(parseEther('0'));

  const [inputToken, setInputToken] = useState(null);
  const [outputToken, setOutputToken] = useState(null);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          background:
            'linear-gradient(340deg, ' +
            theme.palette.primary.main +
            ' 0%, ' +
            theme.palette.primary.dark +
            ' 100%);',
          padding: 0,
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
          <Box
            sx={{
              border: 'solid 1px ' + theme.palette.primary.main,
              padding: '0.8em',
              borderRadius: '0.8em',
              backgroundColor: theme.palette.secondary.dark,
              width: 'fit-content',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <TokenListBox
              selectedToken={inputToken}
              setSelectedToken={setInputToken}
              labelSelectPrompt="Select Input Token"
            />
            <EtherTextField
              decimals={18}
              onChange={setInputWad}
              value={inputWad}
              placeholder="0.0"
              renderInput={(props) => (
                <TextField
                  variant="standard"
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '2em' },
                  }}
                  {...props}
                />
              )}
            />
          </Box>
          <ArrowDownwardIcon
            color="primary"
            sx={{
              fontSize: '1em',
              backgroundColor: theme.palette.secondary.dark,
              padding: '0.5em',
              border: 'solid ' + theme.palette.primary.main,
              borderWidth: '0px 1px 0px 1px',
              marginTop: '-5px',
              marginBottom: '-10px',
            }}
          />
          <Box
            sx={{
              border: 'solid 1px ' + theme.palette.primary.main,
              padding: '0.8em',
              borderRadius: '0.8em',
              backgroundColor: theme.palette.secondary.dark,
              width: 'fit-content',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <TokenListBox
              selectedToken={outputToken}
              setSelectedToken={setOutputToken}
              labelSelectPrompt="Select Output Token"
            />
            <EtherTextField
              decimals={18}
              onChange={setOutputWad}
              value={outputWad}
              placeholder="0.0"
              renderInput={(props) => (
                <TextField
                  variant="standard"
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '2em' },
                  }}
                  {...props}
                />
              )}
            />
          </Box>
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
