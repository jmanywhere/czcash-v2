import { useTheme } from '@emotion/react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils.js';
import { useContext, useState } from 'react';
import EtherTextField from '../components/elements/EtherTextField';
import TokenListBox from '../components/elements/TokenListbox';
import BottomBar from '../components/layouts/BottomBar';
import FooterArea from '../components/layouts/FooterArea';
import HeaderBar from '../components/layouts/HeaderBar';
import TopNavTabs from '../components/layouts/TopNavTabs';
import { TrackedTokensContext } from '../providers/TrackedTokensProvider';
import { bnToCompact } from '../utils/bnToFixed';

const PctButton = (props) => {
  const { children, onClick, ...other } = props;
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        padding: '0em',
        minWidth: 'auto',
        width: '3.5em',
        borderRadius: '1.7em',
        fontSize: '0.7em',
        marginLeft: '0.4em',
      }}
      {...other}
    >
      {children}
    </Button>
  );
};

const TokenSelectorBalanceDisplay = ({
  selectedToken,
  selectedTokenBalanceString,
}) => {
  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        <Typography
          as="span"
          sx={{
            textAlign: 'left',
            display: 'inline-block',
            fontSize: '0.85em',
          }}
        >
          Balance:
        </Typography>
        <Typography
          as="span"
          sx={{
            textAlign: 'left',
            marginLeft: '0.5em',
            minWidth: '3em',
            display: 'inline-block',
            fontSize: '0.85em',
          }}
        >
          {bnToCompact(selectedToken.balance, selectedToken.decimals, 4)}
        </Typography>
      </Box>
      <Box>
        <PctButton>25%</PctButton>
        <PctButton>50%</PctButton>
        <PctButton>75%</PctButton>
        <PctButton>Max</PctButton>
      </Box>
    </>
  );
};

export default function Swap() {
  const theme = useTheme();

  const [inputWad, setInputWad] = useState(parseEther('0'));
  const [outputWad, setOutputWad] = useState(parseEther('0'));

  const [inputToken, setInputToken] = useState(null);
  const [outputToken, setOutputToken] = useState(null);

  const { trackedTokens, syncTokenWeb3Data } = useContext(TrackedTokensContext);

  const inputTrackedToken =
    !!inputToken?.address && !!trackedTokens?.get(inputToken.address)
      ? trackedTokens.get(inputToken.address)
      : inputToken;
  const outputTrackedToken =
    !!outputToken?.address && !!trackedTokens?.get(outputToken.address)
      ? trackedTokens.get(outputToken.address)
      : outputToken;

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TokenListBox
                selectedToken={inputToken}
                selectedTokenBalanceString={formatEther(
                  inputToken?.balance ?? BigNumber.from(0)
                )}
                selectedTokenPriceString={formatEther(
                  inputToken?.price ?? BigNumber.from(0)
                )}
                setSelectedToken={setInputToken}
                labelSelectPrompt={
                  <Typography
                    as="span"
                    sx={{ textAlign: 'center', width: '100%' }}
                  >
                    Select
                    <br />
                    Input
                  </Typography>
                }
              />
              <Box
                sx={{
                  textAlign: 'left',
                  display: 'inline-block',
                  color: theme.palette.text.primary,
                }}
              >
                {!!inputToken && (
                  <TokenSelectorBalanceDisplay
                    selectedToken={inputTrackedToken}
                    selectedTokenBalanceString={formatEther(
                      inputTrackedToken?.balance ?? BigNumber.from(0)
                    )}
                  />
                )}
              </Box>
            </Box>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TokenListBox
                selectedToken={outputToken}
                setSelectedToken={setOutputToken}
                selectedTokenBalanceString={formatEther(
                  outputToken?.balance ?? BigNumber.from(0)
                )}
                selectedTokenPriceString={formatEther(
                  outputToken?.price ?? BigNumber.from(0)
                )}
                labelSelectPrompt={
                  <Typography
                    as="span"
                    sx={{ textAlign: 'center', width: '100%' }}
                  >
                    Select
                    <br />
                    Output
                  </Typography>
                }
              />
              <Box
                sx={{
                  textAlign: 'left',
                  display: 'inline-block',
                  color: theme.palette.text.primary,
                }}
              >
                {!!outputToken && (
                  <TokenSelectorBalanceDisplay
                    selectedToken={outputTrackedToken}
                    selectedTokenBalanceString={formatEther(
                      outputTrackedToken?.balance ?? BigNumber.from(0)
                    )}
                  />
                )}
              </Box>
            </Box>
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
