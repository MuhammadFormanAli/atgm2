import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './components/Home.jsx';
import PrivetRoute from './privateRoute/PrivateRoute.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import UserProvider from './context/UserProvider.jsx';

import { QueryClient, QueryClientProvider } from 'react-query';


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivetRoute><Home /></PrivetRoute>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
