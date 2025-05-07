import React, { lazy, Suspense } from "react";
import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/login";
import ShowProperty from "./components/showProperty.jsx";
const AdminDashboard = lazy(() => import("./components/adminDashboard.jsx"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div className="h-full w-full m-auto">Loading...</div>}>
              <LogIn />
            </Suspense>
          }
        />
        <Route
          path="/admin/home"
          element={
            <Suspense fallback={<div className="h-full w-full m-auto">Loading...</div>}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="/show/:id"
          element={
            <Suspense fallback={<div className="h-full w-full m-auto">Loading...</div>}>
              <ShowProperty />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
