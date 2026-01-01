"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  studentName?: string;
}

const StudentNavbar = ({ studentName }: NavbarProps) => {

  return (
    <header className="flex items-center justify-between px-[10%] py-3 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        {/* Logo Section */}
        <div className="flex justify-center items-center py-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Quizora
            </span>
          </Link>
        </div>
      </div>

      {studentName && (
        <div className="flex items-center space-x-4 border-2 rounded-md border-black px-4 py-2">
          <span className="text-black font-medium text-md">{studentName}</span>
        </div>
      )}
    </header>
  );
};

export default StudentNavbar;
