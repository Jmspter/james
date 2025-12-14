"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";
import {
    CategoryFilter,
    EmptyState,
    PageFooter,
    BlogPostCard,
    FeaturedCarousel,
} from "@/components/ui";

interface BlogContentProps {
    posts: BlogPost[];
    categories: string[];
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(3);

    // Get all featured posts
    const featuredPosts = posts.filter((post) => post.featured);

    // Filter posts (include ALL posts, not excluding featured)
    const filteredPosts = posts.filter((post) => {
        const matchesCategory =
            selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMorePosts = visibleCount < filteredPosts.length;

    const loadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    // Reset visible count when filter changes
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setVisibleCount(3);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setVisibleCount(3);
    };

    return (
        <main className="min-h-screen bg-bg-main text-text-main">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-bg-main/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 py-5 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-text-main hover:text-primary transition-colors"
                    >
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
                                onChange={handleSearchChange}
                                className="pl-10 pr-4 py-2 bg-bg-surface border border-white/10 rounded-full text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-colors w-64"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 py-16">
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
                        Informações, tutoriais e reflexões sobre desenvolvimento backend,
                        arquitetura de sistemas e práticas de DevOps.
                    </p>
                </motion.div>

                {/* Featured Posts Carousel */}
                {featuredPosts.length > 0 && <FeaturedCarousel posts={featuredPosts} />}

                {/* Category Filter */}
                <div className="mb-10">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>

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
                    {visiblePosts.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <EmptyState
                        title="No posts found"
                        description="Try adjusting your search or filter criteria."
                    />
                )}

                {/* Load More Button */}
                {hasMorePosts && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center mt-12"
                    >
                        <button
                            onClick={loadMore}
                            className="px-8 py-3 bg-bg-surface border border-white/10 rounded-full text-text-main font-medium hover:border-primary/50 hover:text-primary transition-all duration-300"
                        >
                            Load more ({filteredPosts.length - visibleCount} remaining)
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-8">
                <PageFooter />
            </div>
        </main>
    );
}
