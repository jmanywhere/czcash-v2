import { Button, ClickAwayListener } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import { matchSorter } from 'match-sorter';
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { VariableSizeList } from 'react-window';
import { TokenListContext } from '../../providers/TokenListProvider';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      <Box
        as="img"
        src={dataSet[1].logoURI}
        sx={{
          width: '2em',
          height: 'auto',
          maxHeight: '2em',
          marginRight: '0.5em',
        }}
      />
      <Typography sx={{ textAlign: 'left' }}>
        <Typography
          as="span"
          sx={{ display: 'block', fontSize: '1em', fontWeight: 'bold' }}
        >
          {dataSet[1].symbol}
        </Typography>
        <Typography as="span" sx={{ display: 'block', fontSize: '0.6em' }}>
          {dataSet[1].name}
        </Typography>
      </Typography>
    </Typography>
  );
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export default function TokenListBox({
  labelSelectPrompt,
  selectedToken,
  setSelectedToken,
}) {
  const { tokenList, updateTokenList } = useContext(TokenListContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();

  const toggleOpen = (event) => {
    setAnchorEl(!!anchorEl ? null : event.currentTarget);
  };

  const id = !!anchorEl ? 'token-popper' : undefined;

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setAnchorEl(null);
        }}
      >
        <Box>
          <Button
            variant="outlined"
            onClick={(event) => {
              toggleOpen(event);
            }}
            aria-describedby={id}
            sx={{
              width: '300px',
              justifyContent: 'left',
              display: 'flex',
              height: '3.5em',
            }}
          >
            {!selectedToken ? (
              <>{labelSelectPrompt}</>
            ) : (
              <>
                <Box
                  as="img"
                  src={selectedToken.logoURI}
                  sx={{
                    width: '2em',
                    height: 'auto',
                    maxHeight: '2em',
                    marginRight: '0.5em',
                  }}
                />
                <Typography sx={{ textAlign: 'left' }}>
                  <Typography
                    as="span"
                    sx={{
                      display: 'block',
                      fontSize: '1em',
                      fontWeight: 'bold',
                    }}
                  >
                    {selectedToken.symbol.length < 6
                      ? selectedToken.symbol
                      : selectedToken.symbol.substr(0, 4) + '…'}
                  </Typography>
                  <Typography
                    as="span"
                    sx={{ display: 'block', fontSize: '0.6em' }}
                  >
                    {selectedToken.name.length < 12
                      ? selectedToken.name
                      : selectedToken.name.substr(0, 10) + '…'}
                  </Typography>
                </Typography>
              </>
            )}
          </Button>
          <Popper
            id={id}
            open={!!anchorEl}
            anchorEl={anchorEl}
            placement="bottom-start"
          >
            <Box sx={{ backgroundColor: theme.palette.background.paper }}>
              <Autocomplete
                id="token-selector"
                sx={{ width: 300, overflowX: 'hidden' }}
                disableListWrap
                PopperComponent={StyledPopper}
                ListboxComponent={ListboxComponent}
                options={tokenList}
                open
                value={selectedToken}
                selectOnFocus
                disableCloseOnSelect
                onChange={(event, newValue) => {
                  setSelectedToken(newValue);
                  if (!!newValue) {
                    //only close when not clearing input
                    toggleOpen(event);
                  }
                }}
                filterOptions={(options, { inputValue }) =>
                  matchSorter(options, inputValue, {
                    keys: [
                      {
                        threshold: matchSorter.rankings.STARTS_WITH,
                        key: 'symbol',
                      },
                      'name',
                      'address',
                    ],
                    baseSort: (a, b) => (a.index < b.index ? -1 : 1),
                  })
                }
                getOptionLabel={(option) => `${option.symbol}`}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Search symbol, name, or address"
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      zIndex: 1500,
                    }}
                  />
                )}
                renderOption={(props, option, state) => [
                  props,
                  option,
                  state.index,
                ]}
              />
            </Box>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
}
