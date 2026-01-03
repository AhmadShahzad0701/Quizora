"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      
      {/* Logo / Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back!
        </h1>
        <p className="text-sm text-gray-500">
          Sign in to your account
        </p>
      </div>

      {/* Google Login (UI only) */}
      <Button
        variant="outline"
        className="w-full mb-4 flex gap-2"
        onClick={() => console.log("Google login")}
      >
        Continue with Google
      </Button>

      <div className="my-4 text-center text-xs text-gray-400">
        OR CONTINUE WITH
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="m@example.com"
          className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Login Button */}
      <Button className="w-full">
        Login
      </Button>

      {/* Footer links */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>

      <div className="mt-2 text-center text-sm">
        <Link
          href="/forgot-password"
          className="text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
