import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import './fonts.css';
import './index.css';

const router = createHashRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App >
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
