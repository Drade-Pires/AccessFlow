import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Logs } from "./pages/Logs";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <Logs />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;