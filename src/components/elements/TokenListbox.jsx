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

export default function TokenListBox() {
  const { tokenList, updateTokenList } = useContext(TokenListContext);
  return (
    <Autocomplete
      id="virtualize-demo"
      sx={{ width: 300 }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={tokenList}
      filterOptions={(options, { inputValue }) =>
        matchSorter(options, inputValue, {
          keys: [
            { threshold: matchSorter.rankings.STARTS_WITH, key: 'symbol' },
            'name',
            'address',
          ],
          baseSort: (a, b) => (a.index < b.index ? -1 : 1),
        })
      }
      getOptionLabel={(option) => `${option.address}`}
      renderInput={(params) => <TextField {...params} label="Select Token" />}
      renderOption={(props, option, state) => [props, option, state.index]}
    />
  );
}
