"use client";

import { Github, Linkedin, Mail } from "lucide-react";

// X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
    return (
        <svg 
            viewBox="0 0 24 24" 
            className={className}
            fill="currentColor"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

const socialLinks = [
    { icon: Github, href: "https://github.com/Jmspter", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/james-barbosa-289842235/", label: "LinkedIn" },
    { icon: XIcon, href: "https://x.com/JamesOnRails", label: "X" },
    { icon: Mail, href: "mailto:jamespeter1006@gmail.com", label: "Email" },
];

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
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                            className="p-2 rounded-full hover:bg-white/5 hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,122,26,0.3)]"
                            aria-label={label}
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
