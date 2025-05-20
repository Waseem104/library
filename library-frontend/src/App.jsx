import React, { Suspense } from "react";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = React.lazy(() => import("./pages/Contact"));
const Books = React.lazy(() => import("./pages/Books"));

function App() {
  return (
    <AuthProvider>
      <>
        <Suspense fallback={<div>Spinner....</div>}>
          <Navbar />

          <Routes>
            {/* protected Routes */}
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-book"
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              }
            />

            {/* public routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>

        <ToastContainer />
      </>
    </AuthProvider>
  );
}

export default App;
