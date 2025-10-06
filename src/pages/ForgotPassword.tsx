import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiArrowLeftBold, PiCheckCircleBold } from "react-icons/pi";
import { LuMail } from "react-icons/lu";
import api from "../lib/api";
import { TbMailFilled } from "react-icons/tb";
import { FaExclamationCircle } from "react-icons/fa";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/forgot-password", { email });

      if (response.data.success) {
        setSuccess(true);
      } else {
        throw new Error(response.data.message || "Failed to send reset email");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to send reset email. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
              <div className="flex flex-col lg:flex-row lg:min-h-[600px]">
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
                              <TbMailFilled className="w-[1.2rem] h-[1.2rem] lg:w-[1.45rem] lg:h-[1.45rem] text-primary-600" />
                            </div>
                            <div className="hidden md:block">
                              <h3 className="font-semibold text-white text-[0.65rem] md:text-xs lg:text-sm">
                                Password Reset
                              </h3>
                              <p className="text-[0.65rem] md:text-xs font-sans text-white/80">
                                Secure Email Verification
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
                              <LuMail className="w-[1.2rem] h-[1.2rem] lg:w-[1.45rem] lg:h-[1.45rem] text-white" />
                            </div>
                            <div className="">
                              <h3 className="font-semibold text-white text-[0.65rem] md:text-xs lg:text-sm">
                                Check Email
                              </h3>
                              <p className="text-[0.65rem] lg:text-xs font-sans text-white/80">
                                Reset link sent
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Side - Success Content (Bottom on mobile) */}
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
                      Check Your Email
                    </h1>
                    <p className="flex items-center space-x-2 justify-center text-green-700 font-semibold text-[1.05rem] lg:text-lg">
                      <PiCheckCircleBold className="w-[1.4rem] h-[1.4rem] text-green-600" />
                      <span>Password Reset Link Sent</span>
                    </p>
                  </div>

                  {/* Success Content */}
                  <div className="max-w-md mx-auto w-full">
                    {/* Instructions */}
                    <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <div>
                          <ul className="text-[0.8rem] text-slate-800 space-y-1">
                            <li>Check your email inbox or spam folder</li>
                            <li>
                              Click the reset link in the email to go to the
                              reset password page
                            </li>
                            <li>
                              Create your new password on the reset password
                              page and submit
                            </li>
                            <li>
                              Sign in with your new password on the login page
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Back to Login */}
                    <div className="text-center">
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
  }

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
                            <TbMailFilled className="w-[1.2rem] h-[1.2rem] lg:w-[1.45rem] lg:h-[1.45rem] text-primary-600" />
                          </div>
                          <div className="hidden md:block">
                            <h3 className="font-semibold text-white text-[0.65rem] md:text-xs lg:text-sm">
                              Password Reset
                            </h3>
                            <p className="text-[0.65rem] md:text-xs font-sans text-white/80">
                              Secure Email Verification
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
                            <TbMailFilled className="w-[1.2rem] h-[1.2rem] lg:w-[1.45rem] lg:h-[1.45rem] text-white" />
                          </div>
                          <div className="">
                            <h3 className="font-semibold text-white text-[0.65rem] md:text-xs lg:text-sm">
                              Email Support
                            </h3>
                            <p className="text-[0.65rem] lg:text-xs font-sans text-white/80">
                              Reset assistance
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Side - Forgot Password Form (Bottom on mobile) */}
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
                    Forgot Password?
                  </h1>
                  <p className="text-primary-600 font-semibold text-[1.05rem] lg:text-lg">
                    Reset Your Account Password
                  </p>
                </div>

                {/* Forgot Password Form */}
                <div className="max-w-md mx-auto w-full">
                  <p className="text-sm md:text-[0.93rem] lg:text-base font-semibold text-gray-600 mb-4 text-center">
                    Enter your email address and we'll send you a link to reset
                    your password.
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
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs md:text-[0.8rem] lg:text-sm font-semibold text-secondary-700 mb-1 md:mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <TbMailFilled className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm lg:text-[0.95rem]"
                          placeholder="Enter your email address"
                          disabled={loading}
                        />
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
                          Sending Reset Link...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <TbMailFilled className="w-[1.1rem] h-[1.15rem] lg:w-5 lg:h-5 text-white" />
                          <span className="ml-2.5">Send Reset Link</span>
                        </span>
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

export default ForgotPassword;
