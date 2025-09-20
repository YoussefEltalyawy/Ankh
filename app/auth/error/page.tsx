"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "Access denied. You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f9f9] to-[#f3f3f3] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#B8860B] hover:text-[#DAA520] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Error Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          {/* Error Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-manrope font-bold text-gray-900 mb-4">
            Authentication Error
          </h1>

          <p className="text-gray-600 mb-6">
            {errorMessages[error] || errorMessages.Default}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="w-full bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-white font-manrope font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 inline-block"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 font-manrope font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </motion.div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            If this problem persists, please{" "}
            <Link href="mailto:talyawy@proton.me" className="text-[#B8860B] hover:underline">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
