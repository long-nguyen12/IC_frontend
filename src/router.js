import ListImage from "./Screen/ListImgScreen/ListImgScreen";
import LoginScreen from "./Screen/LoginScreen/LoginScreen";
import SignUpPage from "./Screen/RegisterScreen/RegisterScreen";
import { createBrowserRouter } from "react-router-dom";
import UploadScreen from "./Screen/HomeScreen/HomeScreen";
import Root from "./Screen/Root";
import Error404 from "./Error";
import { ProtectedRoute } from "./component/ProtectedRoute/ProtectedRoute";

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
      // {
      //   path: "auth",
      //   element;
      // },
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
        // element: <ListImage />,
        children: [
          {
            path: ":folderName",
            element: (
              <ProtectedRoute>
                <ListImage />
              </ProtectedRoute>
            ),
          },
        ],
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
    path: "/register",
    element: <SignUpPage />,
  },
]);

export default router;
