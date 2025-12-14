"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface BlogPostCardProps {
    post: BlogPost;
    index?: number;
}

export default function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
        >
            <Link href={`/blog/${post.id}`}>
                <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative h-52 rounded-2xl overflow-hidden mb-5 bg-bg-surface">
                        {post.image ? (
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-highlight to-secondary/10" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Tag className="w-12 h-12 text-primary/30" />
                                </div>
                            </>
                        )}
                        <div className="absolute inset-0 bg-bg-main/0 group-hover:bg-bg-main/20 transition-colors duration-300" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-bg-main/80 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/20 z-10">
                            {post.category}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                        <h3 className="text-xl font-heading font-semibold text-text-main group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {post.title}
                        </h3>

                        <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Author & Meta */}
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
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
