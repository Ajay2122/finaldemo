/* eslint-disable react/jsx-no-undef */
import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import UserProfile from "./pages/profile/profile";
import NotFoundPage from "./pages/NotFound/NotFound";
import Video from "./assets/video/video";
import Room from "./assets/video/room";
import ChatRoom from "./assets/Chat/ChatRoom";
import ForgetPassword from "./pages/login/Forget";
import ResetPassword from "./pages/login/resetPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/Forget",
          element: <ForgetPassword />,
        },
        {
          path: "/resetPassword/:token",
          element: <ResetPassword />,
        },
        {
          path: "/gigs",
          element: (
            <PrivateRoute>
              <Gigs />
            </PrivateRoute>
          ),
        },
        {
          path: "/myGigs",
          element: (
            <PrivateRoute>
              <MyGigs />
            </PrivateRoute>
          ),
        },
        {
          path: "/orders",
          element: (
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          ),
        },
        {
          path: "/messages",
          element: (
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          ),
        },
        {
          path: "/message/:id",
          element: (
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          ),
        },
        {
          path: "/add",
          element: (
            <PrivateRoute>
              <Add />
            </PrivateRoute>
          ),
        },
        {
          path: "/gig/:id",
          element: (
            <PrivateRoute>
              <Gig />
            </PrivateRoute>
          ),
        },
        {
          path: "/pay/:id",
          element: (
            <PrivateRoute>
              <Pay />
            </PrivateRoute>
          ),
        },
        {
          path: "/success",
          element: (
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          ),
        },
        {
          path: "/video",
          element: (
            <PrivateRoute>
              <Video />
            </PrivateRoute>
          ),
        },
        {
          path: "/video/:videoId",
          element: (
            <PrivateRoute>
              <Room />
            </PrivateRoute>
          ),
        },
        {
          path: "/Chat",
          element: (
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
