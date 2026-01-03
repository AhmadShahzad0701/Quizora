import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-blue-50 to-green-50">
      
      {/* LEFT SIDE – FORM AREA */}
      <div className="flex items-center justify-center p-6">
        {children}
      </div>
<div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
      <div className="hidden md:flex items-center justify-center p-6">
        <Image
          src="/login-illustration.svg"
          alt="Login Illustration"
          width={420}
          height={420}
          className="max-w-md h-auto"
          priority
        />
      </div>


    </div>
  );
}
