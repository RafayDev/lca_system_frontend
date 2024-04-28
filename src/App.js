import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.js";
import NoPage from "./Pages/NoPage.js";
import Dashboard from "./Layouts/Dashboard.js";
import { routes } from "./routes.js";

function App() {

  return (
    <Router>
      <Routes>
        {/* Define the Login page route */}
        <Route path="/login" element={<Login />} />
        {/* Define the NoPage (404) route */}
        {/* <Route path="/404" element={<NoPage />} /> */}
        {/* Define the Dashboard layout route */}
        <Route path="/" element={<Dashboard />}>
          {/* Nested child routes will be rendered inside the Dashboard layout */}
          {routes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}
        </Route>
        {/* Redirect any other paths to the 404 page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
