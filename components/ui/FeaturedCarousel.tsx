"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import type { BlogPost } from "@/lib/blog";

interface FeaturedCarouselProps {
    posts: BlogPost[];
    autoRotateInterval?: number;
}

export default function FeaturedCarousel({
    posts,
    autoRotateInterval = 5000,
}: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    }, [posts.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
    }, [posts.length]);

    // Handle swipe/drag
    const handleDragEnd = useCallback(
        (
            event: MouseEvent | TouchEvent | PointerEvent,
            info: { offset: { x: number }; velocity: { x: number } }
        ) => {
            const swipeThreshold = 50;
            const velocityThreshold = 500;

            if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                nextSlide();
            } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                prevSlide();
            }
        },
        [nextSlide, prevSlide]
    );

    // Auto-rotate
    useEffect(() => {
        if (posts.length <= 1) return;

        const interval = setInterval(nextSlide, autoRotateInterval);
        return () => clearInterval(interval);
    }, [posts.length, nextSlide, autoRotateInterval]);

    if (posts.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16 relative"
        >
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                    {posts.map(
                        (post, index) =>
                            index === currentIndex && (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    drag={posts.length > 1 ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                                >
                                    <Link href={`/blog/${post.id}`}>
                                        <div className="group relative h-full cursor-pointer">
                                            {/* Background Image */}
                                            <div className="absolute inset-0">
                                                {post.image ? (
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-bg-surface to-secondary/20" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent" />
                                            </div>

                                            {/* Content */}
                                            <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-sm font-medium w-fit mb-4">
                                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                    Destaque
                                                </span>

                                                <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-main mb-4 group-hover:text-primary transition-colors duration-300 max-w-3xl">
                                                    {post.title}
                                                </h2>

                                                <p className="text-text-muted text-lg mb-6 max-w-2xl line-clamp-2">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-3 pt-2">
                                                        <Image
                                                            src={post.author.avatar || "/about-photo.jpg"}
                                                            alt={post.author.name}
                                                            width={32}
                                                            height={32}
                                                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                                                        />
                                                        <div className="flex items-center gap-2 text-sm text-text-muted">
                                                            <span className="font-medium text-text-main">
                                                                {post.author.name}
                                                            </span>
                                                            <span>{post.date}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Arrow indicator */}
                                                <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                                    <ArrowRight className="w-6 h-6 text-primary group-hover:text-bg-main transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                    )}
                </AnimatePresence>

                {/* Carousel Navigation Dots */}
                {posts.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {posts.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? "w-8 bg-primary"
                                        : "w-2 bg-white/30 hover:bg-white/50"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
