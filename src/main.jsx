import '@fortawesome/fontawesome-free/css/brands.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './fonts.css';
import './index.css';
import Home from './pages/Home';

import { MENU_HOME } from './constants/routes';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  ...MENU_HOME.flatMap((item) => {
    return item.pages.map((page) => {
      console.log(item.route + page.route);
      return {
        path: item.route + page.route,
        element: page.component,
      };
    });
  }),
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
