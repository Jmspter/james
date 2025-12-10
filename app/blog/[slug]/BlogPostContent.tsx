"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import ShareButtons from "@/components/ShareButtons";

interface BlogPostContentProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

const defaultAuthorBio = "Backend developer passionate about building scalable systems and sharing knowledge.";

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
    return (
        <main className="min-h-screen bg-bg-main text-text-main">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-bg-main/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/blog" className="flex items-center gap-2 text-text-main hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Blog</span>
                    </Link>
                    <ShareButtons title={post.title} variant="compact" />
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="max-w-4xl mx-auto px-6 py-6">
                <nav className="flex items-center gap-2 text-sm text-text-muted">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-text-main">{post.title}</span>
                </nav>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-6 pb-20">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-4 text-text-muted text-sm">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-text-muted leading-relaxed mb-8">
                        {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pb-8 border-b border-white/10">
                        <Image
                            src={post.author.avatar || "/about-photo.jpg"}
                            alt={post.author.name}
                            width={56}
                            height={56}
                            className="w-14 h-14 rounded-full object-cover border border-white/10"
                        />
                        <div>
                            <p className="font-semibold text-text-main">{post.author.name}</p>
                            <p className="text-sm text-text-muted">{defaultAuthorBio}</p>
                        </div>
                    </div>
                </motion.header>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-heading prose-headings:text-text-main prose-headings:font-bold
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-text-main
                        prose-code:text-primary prose-code:bg-bg-surface prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-bg-surface prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                        prose-ul:text-text-muted prose-ol:text-text-muted
                        prose-li:marker:text-primary
                        prose-blockquote:border-l-primary prose-blockquote:text-text-muted prose-blockquote:italic
                        prose-table:text-text-muted
                        prose-th:text-text-main prose-th:font-semibold prose-th:bg-bg-surface/50 prose-th:px-4 prose-th:py-2
                        prose-td:px-4 prose-td:py-2 prose-td:border-white/10
                    "
                    dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 pt-8 border-t border-white/10"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <Tag className="w-5 h-5 text-text-muted" />
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-bg-surface border border-white/10 rounded-full text-sm text-text-muted hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Share Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-8 p-6 bg-bg-surface/50 rounded-2xl border border-white/5"
                >
                    <p className="text-text-muted mb-4">Share this article</p>
                    <ShareButtons title={post.title} />
                </motion.div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16"
                    >
                        <h3 className="text-2xl font-heading font-bold mb-8">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                                    <div className="group p-6 bg-bg-surface/50 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300">
                                        <span className="text-xs text-primary font-medium uppercase tracking-wider">
                                            {relatedPost.category}
                                        </span>
                                        <h4 className="mt-3 font-heading font-semibold text-text-main group-hover:text-primary transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </article>

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
                    </div>
                </div>
            </footer>
        </main>
    );
}
