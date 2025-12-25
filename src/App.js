import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const EditTemplate = lazy(() => import("./components/EditTemplate"));
const Templates = lazy(() => import("./components/Templates"));
const Settings = lazy(() => import("./components/Settings"));
const MyResume = lazy(() => import("./components/MyResume"));
const Notes = lazy(() => import("./components/Notes"));
const Blog = lazy(() => import("./components/Blog"));
const Privacy = lazy(() => import("./components/Privacy"));
const Terms = lazy(() => import("./components/Terms"));
const Contact = lazy(() => import("./components/Contact"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar onSignIn={() => setShowLoginModal(true)} />
            <Suspense
              fallback={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    fontSize: "1.25rem",
                    color: "#667eea",
                  }}
                >
                  Loading...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/edit-template" element={<EditTemplate />} />
                <Route path="/edit-resume" element={<EditTemplate />} />
                <Route path="/list-templates" element={<Templates />} />
                <Route path="/my-resume" element={<MyResume />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />
                <Route path="/notes" element={<Notes />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
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
    </HelmetProvider>
  );
}

export default App;
