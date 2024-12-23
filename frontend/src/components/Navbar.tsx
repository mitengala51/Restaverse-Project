"use client";

import { signOut } from "next-auth/react";

const Header = () => {
  // Sign-out handler, no need for useCallback unless you have performance concerns
  const handleSignOut = () => {
    signOut(); // Ensure the login page exists at this path
  };

  return (
    <header className="w-full py-6 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white tracking-tight">Restaverse</h1>
        <button
          onClick={handleSignOut}
          className="py-3 px-8 bg-white text-indigo-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-indigo-50 transition-all ease-in-out duration-300 transform hover:scale-105 focus:outline-none"
          aria-label="Sign out of your account"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
