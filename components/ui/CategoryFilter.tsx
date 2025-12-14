"use client";

import { motion } from "framer-motion";
import { Filter } from "lucide-react";

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    showIcon?: boolean;
}

export default function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
    showIcon = false,
}: CategoryFilterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
        >
            {showIcon && (
                <div className="flex items-center gap-2 text-text-muted mr-2">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm">Filter:</span>
                </div>
            )}
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
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
    );
}
