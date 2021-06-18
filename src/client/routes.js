import React from "react";

import App from "./App";
import HomePage from "./pages/HomePage";
import UserListPage from "./pages/UsersListPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminListPage from "./pages/AdminListPage";

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true,
      },
      {
        ...UserListPage,
        path: "/users",
      },
      {
        ...AdminListPage,
        path: "/admins",
      },
      {
        ...NotFoundPage,
        path: "",
      },
    ],
  },
];
