import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login.js";
import NoPage from "./Pages/NoPage.js";
import Dashboard from "./Layouts/Dashboard.js";
import Card from "./Pages/Card/Card.js";
import { routes } from "./routes.js";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { extractPermissionsFromToken } from "./utlls/useful.js";

function App() {
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      const permissions = extractPermissionsFromToken(authToken);
      sessionStorage.setItem('permissions', permissions);
    }
  }, []); 

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
          <Route 
            path="/card"
            element={<Card />}
          />
        </Route>
        {/* Redirect any other paths to the 404 page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
