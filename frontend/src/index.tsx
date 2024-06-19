import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./routes/Dashboard";
import Tasks from "./routes/Tasks";
import AddTask from "./routes/AddTask";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import persistStore from "redux-persist/lib/persistStore";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "home",
    element: <Dashboard />,
    children: [
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "add-task",
        element: <AddTask />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
