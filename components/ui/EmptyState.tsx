"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
        >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-surface flex items-center justify-center">
                {icon || <Search className="w-8 h-8 text-text-muted" />}
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
            <p className="text-text-muted">{description}</p>
        </motion.div>
    );
}
