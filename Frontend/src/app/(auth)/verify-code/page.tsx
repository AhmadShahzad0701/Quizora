"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyCodePage() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          We sent you a code
        </h1>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      {/* OTP Inputs (UI only) */}
      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            maxLength={1}
            className="h-10 w-10 rounded-md border border-input text-center text-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>

      <div className="text-center text-xs text-gray-500 mb-4">
        Didn’t receive any code? <span className="text-primary cursor-pointer">Resend</span>
      </div>

      <Link href={"/reset-password"}>
      <Button className="w-full">
        Submit
      </Button>
        </Link>

      <div className="mt-4 text-center text-sm">
        <Link href="/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
