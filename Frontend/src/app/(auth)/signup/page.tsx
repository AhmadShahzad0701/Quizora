"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      
      {/* Role badge */}
      <div className="mb-3 text-center">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
          Teacher
        </span>
      </div>

      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your Quizora account
        </h1>
        <p className="text-sm text-gray-500">
          Congratulations on taking a step to easy assessment
        </p>
      </div>

      {/* Google Signup */}
      <Button
        variant="outline"
        className="w-full mb-4 flex gap-2"
        onClick={() => console.log("Google signup")}
      >
        Continue with Google
      </Button>

      <div className="my-4 text-center text-xs text-gray-400">
        OR CONTINUE WITH
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Name
        </label>
        <input
          type="text"
          placeholder="Asad"
          className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
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
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Create Account */}
      <Button className="w-full">
        Create Account
      </Button>

      {/* Footer link */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
