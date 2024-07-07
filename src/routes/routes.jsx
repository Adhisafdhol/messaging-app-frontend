import App from "../App";
import SignupPage from "../components/signupPage/SignupPage";
import ConnectionErrPage from "../components/connectionErrPage/ConnectionErrPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users/signup",
        element: <SignupPage />,
      },
      {
        path: "/error",
        element: <ConnectionErrPage />,
      },
    ],
  },
];

export default routes;
