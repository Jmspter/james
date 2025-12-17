"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { incrementLike } from "@/lib/likes";

interface LikeButtonProps {
    postSlug: string;
    initialLikes: number;
}

export default function LikeButton({ postSlug, initialLikes }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [showHeart, setShowHeart] = useState(false);

    // Check localStorage on mount
    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
        if (likedPosts.includes(postSlug)) {
            setHasLiked(true);
        }
    }, [postSlug]);

    const handleLike = () => {
        if (hasLiked || isPending) return;

        // Optimistic update
        setLikes((prev) => prev + 1);
        setHasLiked(true);
        setShowHeart(true);

        // Save to localStorage
        if (typeof window !== "undefined") {
            const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
            localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, postSlug]));
        }

        // Hide floating heart after animation
        setTimeout(() => setShowHeart(false), 1000);

        // Server action
        startTransition(async () => {
            try {
                const newCount = await incrementLike(postSlug);
                setLikes(newCount);
            } catch (error) {
                // Revert optimistic update on error
                console.error("Failed to like:", error);
                setLikes((prev) => prev - 1);
                setHasLiked(false);
                if (typeof window !== "undefined") {
                    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
                    localStorage.setItem(
                        "likedPosts",
                        JSON.stringify(likedPosts.filter((slug: string) => slug !== postSlug))
                    );
                }
            }
        });
    };

    return (
        <div className="relative inline-flex items-center gap-3">
            <motion.button
                onClick={handleLike}
                disabled={hasLiked || isPending}
                whileTap={!hasLiked ? { scale: 0.9 } : {}}
                className={`
                    group relative flex items-center gap-2 px-4 py-2.5 rounded-full
                    border transition-all duration-300
                    ${hasLiked
                        ? "bg-red-500/10 border-red-500/30 text-red-400 cursor-default"
                        : "bg-bg-surface/50 border-white/10 hover:border-red-500/50 hover:bg-red-500/5 text-text-muted hover:text-red-400"
                    }
                    ${isPending ? "opacity-70" : ""}
                `}
                aria-label={hasLiked ? "Você curtiu este post" : "Curtir este post"}
            >
                <motion.div
                    animate={hasLiked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <Heart
                        className={`w-5 h-5 transition-all duration-300 ${
                            hasLiked ? "fill-red-400 text-red-400" : "group-hover:fill-red-400/20"
                        }`}
                    />
                </motion.div>
                <span className="font-medium tabular-nums">{likes}</span>
            </motion.button>

            {/* Floating hearts animation */}
            <AnimatePresence>
                {showHeart && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
                                animate={{
                                    opacity: 0,
                                    y: -60 - Math.random() * 40,
                                    x: (Math.random() - 0.5) * 60,
                                    scale: 0.8 + Math.random() * 0.4,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.8 + Math.random() * 0.4,
                                    delay: i * 0.1,
                                    ease: "easeOut",
                                }}
                                className="absolute left-4 top-0 pointer-events-none"
                            >
                                <Heart className="w-4 h-4 fill-red-400 text-red-400" />
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
