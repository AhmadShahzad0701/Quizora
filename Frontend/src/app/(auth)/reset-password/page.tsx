"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Reset Password
        </h1>
        <p className="text-sm text-gray-500">
          Enter your new password
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          New Password
        </label>
        <input
          type="password"
          className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">
          Confirm New Password
        </label>
        <input
          type="password"
          className="w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <Button className="w-full">
        Change Password
      </Button>

      <div className="mt-4 text-center text-sm">
        <Link href="/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
