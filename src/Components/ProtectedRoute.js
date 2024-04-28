// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ element: Element}) {
  const authToken = Cookies.get('authToken');

  return (
    <Route
      element={authToken ? <Element /> : <Navigate to="/" />}
    />
  );
}
