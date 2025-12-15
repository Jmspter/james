"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "lucide-react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    contentHtml: string;
    mode?: "desktop" | "mobile" | "auto";
}

export default function TableOfContents({ contentHtml, mode = "auto" }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    // Extract headings from HTML content
    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHtml, "text/html");
        const elements = doc.querySelectorAll("h2, h3, h4");

        const items: TocItem[] = [];
        elements.forEach((el, index) => {
            const text = el.textContent || "";
            // Create a slug from the text
            const id =
                el.id ||
                text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                    .trim();

            items.push({
                id: id || `heading-${index}`,
                text,
                level: parseInt(el.tagName[1]),
            });
        });

        setHeadings(items);
    }, [contentHtml]);

    // Add IDs to headings in the actual DOM and track active section
    useEffect(() => {
        if (headings.length === 0) return;

        // Add IDs to headings
        const articleContent = document.querySelector(".prose");
        if (articleContent) {
            const elements = articleContent.querySelectorAll("h2, h3, h4");
            elements.forEach((el, index) => {
                if (!el.id && headings[index]) {
                    el.id = headings[index].id;
                }
            });
        }

        // Intersection Observer for active section tracking
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-80px 0px -80% 0px",
                threshold: 0,
            }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    // Close drawer on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleClick = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setIsOpen(false);
        }
    }, []);

    if (headings.length === 0) return null;

    // Shared TOC list component
    const TocList = ({ onItemClick }: { onItemClick?: () => void }) => (
        <ul className="space-y-2 border-l border-white/10">
            {headings.map((heading) => (
                <li
                    key={heading.id}
                    style={{
                        paddingLeft: `${(heading.level - 2) * 12 + 12}px`,
                    }}
                >
                    <button
                        onClick={() => {
                            handleClick(heading.id);
                            onItemClick?.();
                        }}
                        className={`text-left text-sm transition-all duration-200 hover:text-primary block w-full py-1.5 border-l-2 -ml-[1px] ${
                            activeId === heading.id
                                ? "text-primary border-primary font-medium"
                                : "text-text-muted border-transparent hover:border-white/30"
                        }`}
                    >
                        {heading.text}
                    </button>
                </li>
            ))}
        </ul>
    );

    // Desktop Sidebar Component
    const DesktopSidebar = () => (
        <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
        >
            <div className="flex items-center gap-2 mb-4 text-text-muted">
                <List className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                    Índice
                </span>
            </div>
            <TocList />
        </motion.nav>
    );

    // Mobile Floating Button + Drawer Component
    const MobileDrawer = () => (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 p-4 bg-primary text-bg-main rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
                aria-label="Abrir índice"
            >
                <List className="w-5 h-5" />
            </motion.button>

            {/* Drawer Overlay & Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-bg-main border-l border-white/10 shadow-2xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 border-b border-white/10">
                                    <div className="flex items-center gap-2 text-text-main">
                                        <List className="w-5 h-5 text-primary" />
                                        <span className="font-medium">Índice</span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 text-text-muted hover:text-text-main transition-colors rounded-lg hover:bg-white/5"
                                        aria-label="Fechar índice"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    <TocList onItemClick={() => setIsOpen(false)} />
                                </div>

                                {/* Footer hint */}
                                <div className="p-4 border-t border-white/10 text-center">
                                    <p className="text-xs text-text-muted">
                                        Clique em uma seção para navegar
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );

    // Render based on mode
    if (mode === "desktop") {
        return <DesktopSidebar />;
    }

    if (mode === "mobile") {
        return <MobileDrawer />;
    }

    // Auto mode: use CSS to show/hide based on screen size
    return (
        <>
            {/* Desktop: Sticky Sidebar */}
            <div className="hidden xl:block">
                <DesktopSidebar />
            </div>

            {/* Mobile/Tablet: Floating Button + Drawer */}
            <div className="xl:hidden">
                <MobileDrawer />
            </div>
        </>
    );
}
