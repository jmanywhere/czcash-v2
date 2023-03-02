import { useTheme } from '@emotion/react';
import { Tab, Tabs } from '@mui/material';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { MENU_HOME } from '../../constants/routes';

export default function TopNavTabs(props) {
  const theme = useTheme();
  const location = useLocation();

  const value = (() => {
    const item = MENU_HOME.find(
      (item) => !!matchPath(item.route + '*', location.pathname)
    );
    return item.pages?.findIndex(
      (page) => !!matchPath(item.route + page.route, location.pathname)
    );
  })();

  return (
    <>
      <Tabs
        centered
        value={value}
        sx={{
          backgroundColor: theme.palette.background.paper,
          minHeight: 0,
        }}
        {...props}
      >
        {MENU_HOME.find(
          (item) => !!matchPath(item.route + '*', location.pathname)
        ).pages?.map((page) => (
          <Tab
            key={page.route}
            label={page.title}
            component={Link}
            to={'/' + location.pathname.split('/')[1] + page.route}
            sx={{
              fontSize: '0.8em',
              fontWeight: 'bold',
              minHeight: 0,
              '&.Mui-selected': {
                color: theme.palette.primary.light,
              },
            }}
          />
        ))}
      </Tabs>
    </>
  );
}
