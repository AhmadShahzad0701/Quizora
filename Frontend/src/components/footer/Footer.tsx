import React from "react";
import { Sparkles } from "lucide-react";

const Footer = () => {
    return (
        <footer id="contact" className="bg-black text-white px-6 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* BRAND */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-primary w-6 h-6" />
                        <span className="text-2xl font-bold">Quizora</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Quizora is an AI-powered smart assessment platform that enables
                        educators to create intelligent quizzes, automate grading, and
                        gain real-time insights into student performance.
                    </p>
                </div>

                {/* PRODUCT */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Product</h4>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Features
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Pricing
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        AI Evaluation
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Live Quizzes
                    </p>
                </div>

                {/* SOLUTIONS */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Solutions</h4>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        For Teachers
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        For Students
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        For Institutions
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Academic Integrity
                    </p>
                </div>

                {/* COMPANY */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Company</h4>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        About Quizora
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Contact
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Privacy Policy
                    </p>
                    <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Terms & Conditions
                    </p>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
                © 2025 Quizora. Empowering educators with intelligent assessment tools.
            </div>
        </footer>
    );
};

export default Footer;
