import ListImage from "./Screen/ListImgScreen/ListImgScreen";
import LoginScreen from "./Screen/LoginScreen/LoginScreen";
import SignUpPage from "./Screen/RegisterScreen/RegisterScreen";
import HistoryScreen from "./Screen/HistoryScreen/HistoryScreen";
import ListFoderScreen from "./Screen/ListForderScreen/ListFoder";

import { createBrowserRouter } from "react-router-dom";
import UploadScreen from "./Screen/HomeScreen/HomeScreen";
import Root from "./Screen/Root";
import Error404 from "./Error";
import { ProtectedRoute } from "./component/ProtectedRoute/ProtectedRoute";
import UsersScreen from "./Screen/UsersScreen/UsersScreen";
import InfoScreen from "./Screen/InfoScreen/infoScreen"
import ResetPassword from "./Screen/LoginScreen/ResetPassword";
import ForgotPassword from "./Screen/LoginScreen/FogotPassword";
import SendEmailSuccess from "./Screen/LoginScreen/SendEmailSuccess";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <Error404 />,
    children: [
      {
        // path: "upload",
        index: true,
        element: (
          <ProtectedRoute>
            <UploadScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "image",
            element: (
              <ProtectedRoute>
                <ListImage />
              </ProtectedRoute>
            ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UsersScreen />
          </ProtectedRoute>
        ),
      },

      {
        path: "info",
        element: (
          <ProtectedRoute>
            <InfoScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: "foders",
        children: [
          {
            path: ":name",
            element: (
              <ProtectedRoute>
                  <ListFoderScreen />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: "history",
        element: (
          <ProtectedRoute>
            <HistoryScreen />
          </ProtectedRoute>
        ),
      },


      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },

  {
    path:"/reset_password_success",
    element: <SendEmailSuccess/>

  },
  {
    path: "register",
    element: <SignUpPage />,
  },



 
]);

export default router;
