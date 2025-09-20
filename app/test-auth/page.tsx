"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f9f9f9] to-[#f3f3f3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#B8860B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f9f9] to-[#f3f3f3] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-manrope font-bold mb-2">
            <span className="bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text">
              Auth Test
            </span>
          </h1>
          <p className="text-gray-600">Test your Google OAuth configuration</p>
        </div>

        {session ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#C0A062] to-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {session.user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <h2 className="text-xl font-manrope font-bold text-gray-900 mb-2">
                Welcome, {session.user?.name}!
              </h2>
              <p className="text-gray-600 mb-4">{session.user?.email}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="w-full bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-white font-manrope font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Go to Dashboard
              </button>

              <button
                onClick={() => signOut()}
                className="w-full bg-gray-100 text-gray-700 font-manrope font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">👤</span>
              </div>
              <h2 className="text-xl font-manrope font-bold text-gray-900 mb-2">
                Not Signed In
              </h2>
              <p className="text-gray-600 mb-4">
                Sign in with Google to test the authentication
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-white font-manrope font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            <a href="/" className="text-[#B8860B] hover:underline">
              ← Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
