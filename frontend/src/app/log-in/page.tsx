"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { BsGoogle } from "react-icons/bs";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const redirectIfAuthenticated = useCallback(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  const handleGoogleSignIn = async () => {
    try {
      const response = await signIn("google", { redirect: false });
      if (response?.ok) redirectIfAuthenticated();
      else console.error("Sign-in failed:", response?.error);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-lg">
        {/* Logo Section */}
        <div className="flex justify-center py-6">
          <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
            <BsGoogle className="text-white text-3xl" />
          </div>
        </div>

        {/* Login Content */}
        <div className="px-8 py-6">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Welcome to Our Platform
          </h1>
          <p className="text-sm text-center text-gray-500 mt-2">
            Sign in to access your account.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="w-full max-w-xs py-3 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all duration-300"
            >
              <BsGoogle className="text-xl mr-2" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center mt-6 px-8">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Footer */}
        <div className="px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
