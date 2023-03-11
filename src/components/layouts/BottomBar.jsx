import { List, ListItemButton, Paper, Popper, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React, { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { MENU_HOME } from '../../constants/routes';
export default function BottomBar() {
  const theme = useTheme();
  const [bottomNavValue, setBottomNavValue] = React.useState(null);
  const [pages, setPages] = useState([]);
  const [itemRoute, setItemRoute] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNavMenu = (event, newPages, newItemRoute) => {
    if (anchorEl == null || (newPages.length > 0 && pages[0] != newPages[0])) {
      setAnchorEl(event.currentTarget);
      setPages(newPages);
      setItemRoute(newItemRoute);
    } else {
      setAnchorEl(null);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == '') {
      setBottomNavValue(null);
    } else {
      MENU_HOME.forEach((item, index) => {
        if (!!matchPath(item.route + '/*', location.pathname)) {
          setBottomNavValue(index);
        }
      });
    }
  }, [location.pathname]);

  return (
    <>
      <BottomNavigation
        showLabels
        value={bottomNavValue}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.dark,
          flexGrow: 1,
          display: { xs: 'flex', md: 'none' },
        }}
        onChange={(event, newValue) => {
          setBottomNavValue(newValue);
        }}
      >
        {MENU_HOME.map((item) => (
          <BottomNavigationAction
            key={item.title}
            onClick={(event) =>
              handleOpenNavMenu(event, item.pages, item.route)
            }
            label={item.title}
            icon={item.icon}
            css={{
              color: theme.palette.text.dark,
              '& svg': {
                color: theme.palette.text.dark,
                position: 'absolute',
                top: '0.4em',
                width: '0.75em',
                height: '0.75em',
              },
              '&.Mui-selected svg': {
                color: theme.palette.text.dark,
                transition: 'width 0.2s,height 0.2s,top 0.2s',
                top: '0.3em',
                width: '1em',
                height: '1em',
              },
              '.Mui-selected': {
                color: theme.palette.text.dark,
                fontWeight: 'bold',
              },
              '& .MuiTouchRipple-root * *': {
                backgroundColor: theme.palette.primary.main,
              },
              '& .MuiBottomNavigationAction-label': {
                position: 'absolute',
                top: '2.5em',
                transition: 'font-size 0.2s,opacity 0.2s,top 0.2s',
              },
              '&.Mui-selected .MuiBottomNavigationAction-label': {
                position: 'absolute',
                top: '2.2em',
              },
            }}
          />
        ))}
      </BottomNavigation>
      <Popper
        keepMounted
        placement="top"
        anchorEl={anchorEl}
        open={open}
        disablePortal={false}
        modifiers={[
          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
        ]}
      >
        <Paper
          elevation={3}
          sx={{
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <List>
            {pages.map((page) => (
              <ListItemButton
                key={page.route}
                component={Link}
                to={itemRoute + page.route}
                onClick={handleCloseNavMenu}
              >
                {page.title}
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Popper>
    </>
  );
}
