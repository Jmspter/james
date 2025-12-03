"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-bg-main text-text-muted py-12 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-heading font-medium text-text-main mb-2">
                        James Peter
                    </h3>
                    <p className="text-sm">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>

                <div className="flex gap-6">
                    {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
                        <a
                            key={index}
                            href="#"
                            className="p-2 rounded-full hover:bg-white/5 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,122,26,0.3)]"
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>

                <div className="flex gap-8 text-sm font-medium">
                    <a href="#" className="hover:text-text-main transition-colors">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-text-main transition-colors">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}
