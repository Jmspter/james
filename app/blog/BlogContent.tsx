"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

interface BlogContentProps {
    posts: BlogPost[];
    categories: string[];
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredPost = posts.find((post) => post.featured);
    const filteredPosts = posts.filter((post) => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch && !post.featured;
    });

    return (
        <main className="min-h-screen bg-bg-main text-text-main">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-bg-main/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-text-main hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Portfolio</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-bg-surface border border-white/10 rounded-full text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors w-64"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                        James <span className="text-primary">Blog</span>
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl">
                       Informações, tutoriais e reflexões sobre desenvolvimento backend, arquitetura de sistemas e práticas de DevOps.
                    </p>
                </motion.div>

                {/* Featured Post */}
                {featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-16"
                    >
                        <Link href={`/blog/${featuredPost.id}`}>
                            <div className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    {featuredPost.image ? (
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
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
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-sm font-medium w-fit mb-4"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        Featured
                                    </motion.span>

                                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-main mb-4 group-hover:text-primary transition-colors duration-300 max-w-3xl">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-text-muted text-lg mb-6 max-w-2xl line-clamp-2">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3 pt-2">
                                            <Image
                                                src={featuredPost.author.avatar || "/about-photo.jpg"}
                                                alt={featuredPost.author.name}
                                                width={32}
                                                height={32}
                                                className="w-8 h-8 rounded-full object-cover border border-white/10"
                                            />
                                            <div className="flex items-center gap-2 text-sm text-text-muted">
                                                <span className="font-medium text-text-main">{featuredPost.author.name}</span>
                                                <span>{featuredPost.date}</span>
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
                )}

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-10"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                selectedCategory === category
                                    ? "bg-primary text-bg-main"
                                    : "bg-bg-surface border border-white/10 text-text-muted hover:border-primary/50 hover:text-primary"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Section Title */}
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-2xl font-heading font-semibold mb-8 text-text-main"
                >
                    Recent blog posts
                </motion.h3>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
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
                                                <span className="font-medium text-text-main">{post.author.name}</span>
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-surface flex items-center justify-center">
                            <Search className="w-8 h-8 text-text-muted" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-2">No posts found</h3>
                        <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
                    </motion.div>
                )}

                {/* Load More Button */}
                {filteredPosts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center mt-12"
                    >
                        <button className="px-8 py-3 bg-bg-surface border border-white/10 rounded-full text-text-main font-medium hover:border-primary/50 hover:text-primary transition-all duration-300">
                            Load more
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-sm">
                        © 2024 James. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-text-muted hover:text-primary text-sm transition-colors">
                            Home
                        </Link>
                        <Link href="/blog" className="text-text-muted hover:text-primary text-sm transition-colors">
                            Blog
                        </Link>
                        <Link href="/#projects" className="text-text-muted hover:text-primary text-sm transition-colors">
                            Projects
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
