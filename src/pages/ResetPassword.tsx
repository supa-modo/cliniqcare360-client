import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  PiLockDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiCheckCircleBold,
  PiArrowLeftBold,
  PiXCircleBold,
  PiPasswordDuotone,
} from "react-icons/pi";
import { LuShield } from "react-icons/lu";
import api from "../lib/api";
import { TbArrowRight } from "react-icons/tb";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
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
        const response = await api.get(`/auth/validate-reset-token/${token}`);
        if (response.data.success) {
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
      const response = await api.post("/auth/reset-password", {
        token,
        password,
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        throw new Error(response.data.message || "Failed to reset password");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to reset password. Please try again.";
      setError(errorMessage);
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
        <div className="relative z-10 min-h-screen flex items-center justify-center p-2.5 md:p-3.5 lg:p-4">
          <div className="w-full max-w-6xl">
            <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px]">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Right Side - Image with Annotations (Top on mobile) */}
                <div className="lg:w-1/2 relative order-1 lg:order-2">
                  <div className="h-48 lg:h-full lg:min-h-[600px] relative overflow-hidden rounded-t-[1.6rem] lg:rounded-none">
                    <img
                      src="/bg2.jpg"
                      alt="Modern healthcare facility"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Left Side - Loading Content (Bottom on mobile) */}
                <div className="flex-1 px-4 py-4 md:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl mb-3">
                      <img
                        src="/logo.png"
                        alt="Cliniq Care360"
                        className="w-full h-full object-cover"
                      />
                    </div>
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
          <div className="w-full max-w-6xl">
            <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px]">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Right Side - Image with Annotations (Top on mobile) */}
                <div className="lg:w-1/2 relative order-1 lg:order-2">
                  <div className="h-48 lg:h-full lg:min-h-[600px] relative overflow-hidden rounded-t-[1.6rem] lg:rounded-none">
                    <img
                      src="/bg2.jpg"
                      alt="Modern healthcare facility"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Left Side - Invalid Token Content (Bottom on mobile) */}
                <div className="flex-1 px-4 py-4 md:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl mb-3">
                      <img
                        src="/logo.png"
                        alt="Cliniq Care360"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-[1.3rem] lg:text-[1.6rem] font-merriweather font-bold text-secondary-700 mb-1 md:mb-1.5 lg:mb-2">
                      Invalid Reset Link
                    </h1>
                    <p className="text-red-600 font-semibold text-[1.05rem] lg:text-lg mb-6 flex items-center justify-center space-x-2">
                      <PiXCircleBold className="w-[1.4rem] h-[1.4rem] text-red-600" />
                      <span>Reset Link Expired or Invalid</span>
                    </p>
                    <div className="max-w-md mx-auto w-full">
                      <div className="text-center mb-6">
                        <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold text-gray-600 mb-4">
                          This password reset link is invalid or has expired.
                          Please request a new one.
                        </p>
                      </div>
                      <Link
                        to="/forgot-password"
                        className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-[0.6rem] transition-colors duration-500 shadow-lg hover:shadow-xl text-sm lg:text-[0.95rem]"
                      >
                        <PiArrowLeftBold className="w-4 h-4 text-white" />
                        <span className="ml-2.5">Request New Reset Link</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (!success) {
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
          <div className="w-full max-w-6xl">
            <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px]">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Right Side - Image with Annotations (Top on mobile) */}
                <div className="lg:w-1/2 relative order-1 lg:order-2">
                  <div className="h-48 lg:h-full lg:min-h-[600px] relative overflow-hidden rounded-t-[1.6rem] lg:rounded-none">
                    <img
                      src="/bg2.jpg"
                      alt="Modern healthcare facility"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Left Side - Success Content (Bottom on mobile) */}
                <div className="flex-1 px-4 py-4 md:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl mb-3">
                      <img
                        src="/logo.png"
                        alt="Cliniq Care360"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-[1.3rem] lg:text-[1.6rem] font-merriweather font-bold text-secondary-700 mb-1 md:mb-1.5 lg:mb-2">
                      Password Reset Successfully
                    </h1>
                    <p className="text-green-600 font-semibold text-[1.05rem] lg:text-lg mb-6 flex items-center justify-center space-x-2">
                      <PiCheckCircleBold className="w-[1.4rem] h-[1.4rem] text-green-600" />
                      <span>Ready to Sign In !!</span>
                    </p>
                    <div className="max-w-md mx-auto w-full">
                      <div className="text-center mb-6">
                        <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold text-gray-600 mb-4">
                          Your password has been updated successfully. You can
                          now sign in with your new password.
                        </p>
                      </div>
                      <Link
                        to="/login"
                        className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-[0.7rem] transition-all duration-500 transform hover:scale-[1.01] shadow-lg hover:shadow-xl text-sm lg:text-[0.95rem]"
                      >
                        <span>Proceed to Sign In</span>
                        <TbArrowRight className="w-[1.3rem] h-[1.3rem] text-white ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
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
        <div className="w-full max-w-6xl">
          {/* Central Card */}
          <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px]">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Right Side - Image with Annotations (Top on mobile) */}
              <div className="lg:w-1/2 relative order-1 lg:order-2">
                <div className="h-48 lg:h-full lg:min-h-[600px] relative overflow-hidden rounded-t-[1.6rem] lg:rounded-none">
                  {/* Main Image */}
                  <img
                    src="/bg2.jpg"
                    alt="Modern healthcare facility"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Annotations - Mobile Optimized */}
                  <div className="absolute inset-0 p-3 lg:p-6">
                    {/* Top Left - Hospital Info */}
                    <div className="absolute top-3 left-3 lg:top-6 lg:left-6">
                      <div className="bg-white/40 lg:bg-white/20 backdrop-blur-sm rounded-full p-1.5 lg:p-2 shadow-lg max-w-xs">
                        <div className="flex items-center lg:space-x-3">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
                            <PiLockDuotone className="w-[1.2rem] h-[1.2rem] lg:w-[1.45rem] lg:h-[1.45rem] text-primary-600" />
                          </div>
                          <div className="hidden md:block">
                            <h3 className="font-semibold text-white text-[0.65rem] md:text-xs lg:text-sm">
                              Password Reset
                            </h3>
                            <p className="text-[0.65rem] md:text-xs font-sans text-white/80">
                              Secure Password Update
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Right - Stats */}
                    <div className="absolute bottom-3 right-3 lg:bottom-6 lg:right-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1.5 lg:p-2 shadow-lg max-w-xs">
                        <div className="flex items-center space-x-2 lg:space-x-3">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 border-2 border-white rounded-[0.6rem] flex items-center justify-center">
                            <LuShield className="w-[1.2rem] h-[1.2rem] lg:w-[1.45rem] lg:h-[1.45rem] text-white" />
                          </div>
                          <div className="">
                            <h3 className="font-semibold text-white text-[0.65rem] md:text-xs lg:text-sm">
                              Security First
                            </h3>
                            <p className="text-[0.65rem] lg:text-xs font-sans text-white/80">
                              Protected reset
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Side - Reset Password Form (Bottom on mobile) */}
              <div className="flex-1 px-4 py-4 md:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                {/* Logo/Header */}
                <div className="text-center mb-2 md:mb-4 lg:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl mb-3">
                    <img
                      src="/logo.png"
                      alt="Cliniq Care360"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-[1.3rem] lg:text-[1.6rem] font-merriweather font-bold text-secondary-700 mb-1 md:mb-1.5 lg:mb-2">
                    Reset Your Password
                  </h1>
                  <p className="text-primary-600 font-semibold text-[1.05rem] lg:text-lg">
                    Create New Password
                  </p>
                </div>

                {/* Reset Password Form */}
                <div className="max-w-md mx-auto w-full">
                  <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold text-gray-600 mb-4 text-center">
                    Enter your new password below. Make sure it's secure, easy
                    to remember and at least 8 characters long.
                  </p>

                  {error && (
                    <div className="mb-4 p-2.5 bg-gradient-to-r from-red-100/80 via-red-100/70 to-red-50/40 border-l-4 border-red-500 rounded-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FaExclamationCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs md:text-[0.8rem] lg:text-sm text-red-700">
                            {error}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 md:space-y-4 lg:space-y-5"
                  >
                    {/* New Password Field */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-xs md:text-[0.8rem] lg:text-sm font-semibold text-secondary-700 mb-1 md:mb-2"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <PiPasswordDuotone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm lg:text-[0.95rem]"
                          placeholder="Enter your new password"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <FaEye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-xs md:text-[0.8rem] lg:text-sm font-semibold text-secondary-700 mb-1 md:mb-2"
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
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm lg:text-[0.95rem]"
                          placeholder="Confirm your new password"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <PiEyeSlashDuotone className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <PiEyeDuotone className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-[0.7rem] transition-all duration-500 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl text-sm lg:text-[0.95rem]"
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
                  <div className="text-center mt-4">
                    <Link
                      to="/login"
                      className="inline-flex items-center text-primary-600 hover:text-secondary-600 font-semibold text-sm transition-colors"
                    >
                      <PiArrowLeftBold className="w-4 h-4 mr-2" />
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
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
