import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PiLockDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiCheckCircleBold,
  PiArrowLeftBold,
} from "react-icons/pi";
import { LuShield } from "react-icons/lu";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/v1/auth/validate-reset-token/${token}`
        );
        if (response.ok) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Token validation loading
  if (tokenValid === null) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-900/40"></div>
          <img
            src="/bg00.jpg"
            alt="Medical background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-white/90 rounded-[1.6rem] shadow-2xl backdrop-blur-[2px] p-8">
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token
  if (tokenValid === false) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-900/40"></div>
          <img
            src="/bg00.jpg"
            alt="Medical background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-2.5 md:p-3.5 lg:p-4">
          <div className="w-full max-w-md">
            <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px] p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <LuShield className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Invalid Reset Link
                </h1>
                <p className="text-gray-600 mb-6">
                  This password reset link is invalid or has expired. Please
                  request a new one.
                </p>
                <Link
                  to="/forgot-password"
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-[0.7rem] transition-all duration-500 transform hover:scale-[1.01] shadow-lg hover:shadow-xl text-sm"
                >
                  Request New Reset Link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-900/40"></div>
          <img
            src="/bg00.jpg"
            alt="Medical background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-2.5 md:p-3.5 lg:p-4">
          <div className="w-full max-w-md">
            <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px] p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <PiCheckCircleBold className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Password Reset Successfully
                </h1>
                <p className="text-gray-600 mb-6">
                  Your password has been updated successfully. You can now sign
                  in with your new password.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-[0.7rem] transition-all duration-500 transform hover:scale-[1.01] shadow-lg hover:shadow-xl text-sm"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-900/40"></div>
        <img
          src="/bg00.jpg"
          alt="Medical background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2.5 md:p-3.5 lg:p-4">
        <div className="w-full max-w-md">
          {/* Reset Password Card */}
          <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px] p-8">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <PiLockDuotone className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Your Password
              </h1>
              <p className="text-gray-600 text-sm">
                Enter your new password below. Make sure it's secure and easy to
                remember.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-gradient-to-r from-red-100/80 via-red-100/70 to-red-50/40 border-l-4 border-red-500 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <PiLockDuotone className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-secondary-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PiLockDuotone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm"
                    placeholder="Enter your new password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <PiEyeSlashDuotone className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <PiEyeDuotone className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-secondary-700 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PiLockDuotone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm"
                    placeholder="Confirm your new password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <PiEyeSlashDuotone className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <PiEyeDuotone className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-blue-900 text-xs mb-2">
                  Password Requirements:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li className={password.length >= 8 ? "text-green-600" : ""}>
                    • At least 8 characters long
                  </li>
                  <li
                    className={
                      password !== "" &&
                      confirmPassword !== "" &&
                      password === confirmPassword
                        ? "text-green-600"
                        : ""
                    }
                  >
                    • Passwords must match
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-[0.7rem] transition-all duration-500 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating Password...
                  </span>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="inline-flex items-center text-primary-600 hover:text-secondary-600 font-semibold text-sm transition-colors"
              >
                <PiArrowLeftBold className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-white text-[0.8rem] lg:text-sm">
              © 2025 Cliniq Care360. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
