import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formType, setFormType] = useState("login"); // 'login', 'signup', 'forgotPassword'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      notifyError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (!user.emailVerified) {
        await signOut(auth);
        notifyError("Please verify your email before logging in.");
        return;
      }
      notifySuccess("Login successful!");
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      notifyError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      notifySuccess(
        "Account created! Please check your email for verification."
      );
      setFormType("login");
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      if (!user.emailVerified) {
        await signOut(auth);
        notifyError("Please verify your email before logging in.");
        return;
      }
      notifySuccess("Google sign-in successful!");
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      notifySuccess("Password reset email sent! Check your inbox.");
      setFormType("login");
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (formType) {
      case "signup":
        return (
          <form onSubmit={handleSignup} className="auth-form">
            <h2>Sign Up</h2>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="auth-button">
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
            <p className="auth-switch">
              Already have an account?{" "}
              <span onClick={() => setFormType("login")} className="auth-link">
                Login
              </span>
            </p>
          </form>
        );

      case "forgotPassword":
        return (
          <form onSubmit={handleForgotPassword} className="auth-form">
            <h2>Reset Password</h2>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="auth-button">
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
            <p className="auth-switch">
              Remember your password?{" "}
              <span onClick={() => setFormType("login")} className="auth-link">
                Login
              </span>
            </p>
          </form>
        );

      default:
        return (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Login</h2>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="auth-button border border-white mt-4">
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="google-button"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in with Google &nbsp;
                  <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>{" "}
                </>
              )}
            </button>

            <p className="auth-switch">
              <span
                onClick={() => setFormType("forgotPassword")}
                className="auth-link"
              >
                Forgot Password?
              </span>
            </p>

            <p className="auth-switch">
              Don't have an account?{" "}
              <span onClick={() => setFormType("signup")} className="auth-link">
                Sign Up
              </span>
            </p>
          </form>
        );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="brand-section">
          <h1>Resume-Maker</h1>
          <p>Welcome</p>
        </div>
        {renderForm()}
      </div>
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
  );
};

export default Login;
