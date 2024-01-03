import { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/about";
import Travels from "./components/travels";
import Home from "./components/home";
import Travel from "./components/travel";
import Signin from "./components/signIn";
import Login from "./components/logIn";
import UploadForm from "./components/uploadForm";
import { AuthContext } from "./authContext";
import { AuthProvider } from "./authContext";

const AppContainer = () => {
  const { signedIn } = useContext(AuthContext);

  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "cesty",
          element: <Travels />,
        },
        {
          path: "/onas",
          element: <About />,
        },
        {
          path: "/cesty/:travelId",
          element: <Travel />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/novacesta",
          element: signedIn ? <UploadForm /> : null,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <AppContainer />
  </AuthProvider>
);

