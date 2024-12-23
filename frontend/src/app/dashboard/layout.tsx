"use client";

import React, { Suspense, lazy } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// Lazy load Navbar
const Navbar = lazy(() => import("@/components/Navbar"));

// ErrorFallback Component for error boundary
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="h-screen flex justify-center items-center bg-red-100">
    <div className="text-center p-6">
      <h2 className="text-xl font-semibold text-red-600">Something went wrong!</h2>
      <p className="text-gray-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Try again
      </button>
    </div>
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
        <div className="h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            {children}
          </main>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Layout;
