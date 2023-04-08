import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./assets/index.css";
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';

import History from './pages/History';
import Homepage from './pages/Homepage';
import Income from './pages/Income';
import Login from './pages/Login';
import Outcome from './pages/Outcome';
import Reset from './pages/Reset';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "outcome",
        element: <Outcome />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);