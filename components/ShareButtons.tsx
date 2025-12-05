"use client";

import { Linkedin, Link2 } from "lucide-react";
import { useState } from "react";

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

interface ShareButtonsProps {
    title: string;
    variant?: "full" | "compact";
    className?: string;
}

export default function ShareButtons({ title, variant = "full", className = "" }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const getShareUrl = () => {
        if (typeof window !== "undefined") {
            return encodeURIComponent(window.location.href);
        }
        return "";
    };

    const getShareTitle = () => {
        return encodeURIComponent(title);
    };

    const shareOnX = () => {
        const url = `https://twitter.com/intent/tweet?text=${getShareTitle()}&url=${getShareUrl()}`;
        window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
    };

    const shareOnLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${getShareUrl()}`;
        window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
    };

    const copyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (variant === "compact") {
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <button 
                    onClick={copyLink}
                    className="p-2 rounded-full bg-bg-surface border border-white/10 text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                    title="Copy link"
                >
                    {copied ? <span className="text-xs px-1">Copied!</span> : <Link2 className="w-4 h-4" />}
                </button>
                <button 
                    onClick={shareOnX}
                    className="p-2 rounded-full bg-bg-surface border border-white/10 text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                    title="Share on X"
                >
                    <XIcon className="w-4 h-4" />
                </button>
                <button 
                    onClick={shareOnLinkedIn}
                    className="p-2 rounded-full bg-bg-surface border border-white/10 text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                    title="Share on LinkedIn"
                >
                    <Linkedin className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button 
                onClick={shareOnX}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-text-muted hover:bg-white/10 hover:text-text-main transition-colors"
            >
                <XIcon className="w-4 h-4" />
                X
            </button>
            <button 
                onClick={shareOnLinkedIn}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0077B5]/10 border border-[#0077B5]/20 rounded-full text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors"
            >
                <Linkedin className="w-4 h-4" />
                LinkedIn
            </button>
            <button 
                onClick={copyLink}
                className="flex items-center gap-2 px-5 py-2.5 bg-bg-surface border border-white/10 rounded-full text-text-muted hover:border-primary/50 hover:text-primary transition-colors"
            >
                <Link2 className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
            </button>
        </div>
    );
}
