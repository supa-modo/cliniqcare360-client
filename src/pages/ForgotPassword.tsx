import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PiEnvelopeDuotone,
  PiArrowLeftBold,
  PiCheckCircleBold,
} from "react-icons/pi";
import { LuMail } from "react-icons/lu";

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
      const response = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send reset email");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
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
          <div className="w-full max-w-md">
            {/* Success Card */}
            <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px] p-8">
              {/* Logo/Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <PiCheckCircleBold className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Check Your Email
                </h1>
                <p className="text-gray-600">
                  We've sent a password reset link to{" "}
                  <span className="font-semibold text-primary-600">
                    {email}
                  </span>
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <LuMail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm mb-1">
                      Next Steps:
                    </h3>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Check your email inbox</li>
                      <li>• Click the reset link in the email</li>
                      <li>• Create your new password</li>
                      <li>• Sign in with your new password</li>
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
        <div className="w-full max-w-md">
          {/* Forgot Password Card */}
          <div className="bg-white/90 rounded-[1.6rem] shadow-2xl overflow-hidden backdrop-blur-[2px] p-8">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <PiEnvelopeDuotone className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 text-sm">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-gradient-to-r from-red-100/80 via-red-100/70 to-red-50/40 border-l-4 border-red-500 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <PiEnvelopeDuotone className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-secondary-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <PiEnvelopeDuotone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400 text-sm"
                    placeholder="Enter your email address"
                    disabled={loading}
                  />
                </div>
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
                    Sending Reset Link...
                  </span>
                ) : (
                  "Send Reset Link"
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

export default ForgotPassword;
