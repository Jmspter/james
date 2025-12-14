"use client";

import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface PageHeaderProps {
    backHref: string;
    backLabel: string;
    rightContent?: ReactNode;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
}

export default function PageHeader({
    backHref,
    backLabel,
    rightContent,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
}: PageHeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-bg-main/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link
                    href={backHref}
                    className="flex items-center gap-2 text-text-main hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">{backLabel}</span>
                </Link>
                <div className="flex items-center gap-4">
                    {onSearchChange && (
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-bg-surface border border-white/10 rounded-full text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors w-64"
                            />
                        </div>
                    )}
                    {rightContent}
                </div>
            </div>
        </header>
    );
}
