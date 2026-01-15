"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    BookOpen,
    Brain,
    BarChart3,
    LogOut,
    GraduationCap,
} from "lucide-react";

const teacherLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Sessions", path: "/teacher/session", icon: BookOpen },
    { name: "My Quizzes", path: "/templates", icon: Brain },
    { name: "Templates", path: "/templates", icon: BookOpen },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
];

const TeacherNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-background border-b">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            Quizora
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {teacherLinks.map((link) => {
                            const isActive = pathname.startsWith(link.path);
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-primary"
                                        }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:block">
                            Professor
                        </span>

                        {/* Logout */}
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </Link>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default TeacherNavbar;
