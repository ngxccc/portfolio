"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export const TooManyRequestsContent = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black p-4 text-center text-white">
      <div className="mb-6 rounded-full bg-red-500/10 p-4">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      <h1 className="mb-4 text-4xl font-bold">429 - Too Many Requests</h1>
      <p className="mb-8 max-w-md text-gray-400">
        Whoa there! You&apos;ve sent too many requests in a short amount of
        time. Please wait a moment before trying again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all hover:scale-105 hover:bg-gray-200 active:scale-95"
      >
        <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
        Reload Page
      </button>
    </div>
  );
};
