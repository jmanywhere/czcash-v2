import { useTheme } from '@emotion/react';
import { Menu, MenuItem, Paper, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useWeb3Modal } from '@web3modal/react';
import makeBlockie from 'ethereum-blockies-base64';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { MENU_HOME } from '../../constants/routes';

function HeaderBar() {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNavMenu = (event, pages, newItemRoute) => {
    setAnchorEl(event.currentTarget);
    setPages(pages);
    setItemRoute(newItemRoute);
  };

  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  };

  const [pages, setPages] = useState([]);
  const [itemRoute, setItemRoute] = useState([]);

  const open = Boolean(anchorEl);

  const {
    isOpen: web3ModalIsOpen,
    open: web3ModalOpen,
    close: web3ModalClose,
  } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.dark }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-around' }}>
            <a sx={{ mr: 1 }} href="./">
              <Box
                as="img"
                src="./images/logo-white.png"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  maxWidth: 120,
                  transition: '.25s ease-in-out',
                  '&:hover': { transform: 'rotate(-4deg)' },
                }}
              />
              <Box
                as="img"
                src="./images/logo-white-small.png"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  maxWidth: 40,
                }}
              />
            </a>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                ml: { xs: 0, md: 3 },
              }}
            >
              {MENU_HOME.map((item) => (
                <React.Fragment key={item.title}>
                  <Button
                    disableTouchRipple
                    onClick={(event) =>
                      handleOpenNavMenu(event, item.pages, item.route)
                    }
                    sx={{
                      my: 2,
                      color: theme.palette.text.primary,
                      display: 'block',
                      '&:hover': {
                        background: 'transparent',
                        color: theme.palette.primary.light,
                      },
                    }}
                  >
                    {item.title}
                  </Button>
                </React.Fragment>
              ))}
            </Box>
            {!!address && (
              <Tooltip title="Your Wallet's Net CZ.CASH Assets">
                <Paper
                  sx={{
                    flexGrow: 0,
                    margin: 2,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.primary.dark,
                    padding: 1,
                  }}
                >
                  Net Worth:{' '}
                  <Typography
                    as="span"
                    sx={{
                      color: theme.palette.accent.light,
                    }}
                  >
                    $10.8k
                  </Typography>{' '}
                </Paper>
              </Tooltip>
            )}

            <Box sx={{ flexGrow: 0 }}>
              {!!address ? (
                <>
                  <Tooltip title="Open Wallet Settings">
                    <Button
                      onClick={web3ModalOpen}
                      variant="contained"
                      color="primary"
                      sx={{
                        width: '9em',
                        textTransform: 'unset',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.text.dark,
                      }}
                    >
                      <Avatar
                        alt={address}
                        src={makeBlockie(address)}
                        sx={{
                          mr: 1,
                          height: 'auto',
                          width: '0.9em',
                          border: 'solid 1px ' + theme.palette.text.dark,
                        }}
                      />
                      0x...{address.substring(38)}
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Login Your Wallet">
                    <Button
                      onClick={web3ModalOpen}
                      color="primary"
                      variant="contained"
                      sx={{ width: '9em' }}
                    >
                      Connect
                    </Button>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseNavMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {pages.map((page) => (
          <MenuItem
            key={page.route}
            component={Link}
            to={itemRoute + page.route}
            onClick={handleCloseNavMenu}
          >
            {page.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
export default HeaderBar;
