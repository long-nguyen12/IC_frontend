import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/auth";
import router from "./router";
import { App } from "antd";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <Root />
//       </ProtectedRoute>
//     ),
//     errorElement: <Error404 />,
//     children: [
//       // {
//       //   path: "auth",
//       //   element;
//       // },
//       {
//         // path: "upload",
//         index: true,
//         element: (
//           <ProtectedRoute>
//             <UploadScreen />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "image",
//         // element: <ListImage />,
//         children: [
//           {
//             path: ":folderName",
//             element: (
//               <ProtectedRoute>
//                 <ListImage />
//               </ProtectedRoute>
//             ),
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: <Error404 />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <LoginScreen />,
//   },
//   {
//     path: "/register",
//     element: <SignUpPage />,
//   },
// ]);

// const authRouter = createBrowserRouter([
//   {
//     path: "/",
//     errorElement: <Error404 />,
//     children: [
//       {
//         // path: "/login",
//         index: true,
//         element: <LoginScreen />,
//       },
//       {
//         path: "/register",
//         element: <SignUpPage />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
