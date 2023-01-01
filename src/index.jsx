import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';

import Packs from './pages/Packs';
import Income from './pages/Income';
import Outcome from './pages/Outcome';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Packs />,
      },
      {
        path: "/income",
        element: <Income />,
      },
      {
        path: "/outcome",
        element: <Outcome />,
      },
    ],
  },
  // {
  //   path: "contact",
  //   element: <Login />,
  // },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);