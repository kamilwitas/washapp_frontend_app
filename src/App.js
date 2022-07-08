import React from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import "antd/dist/antd.less";
import "./styles/App.less";

import AuthRoute from "./routes/authRoute";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
