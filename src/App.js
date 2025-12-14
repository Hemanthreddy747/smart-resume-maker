import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./components/Landing";
import EditTemplate from "./components/EditTemplate";
import EditResume from "./components/EditResume";
import Templates from "./components/Templates";
import Settings from "./components/Settings";
import MyResume from "./components/MyResume";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar onSignIn={() => setShowLoginModal(true)} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/edit-template" element={<EditTemplate />} />
            <Route path="/edit-resume" element={<EditTemplate />} />
            <Route path="/list-templates" element={<Templates />} />
            <Route path="/my-resume" element={<MyResume />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
          <LoginModal
            show={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
