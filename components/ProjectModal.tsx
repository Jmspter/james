"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe, X, Calendar, Users, Zap, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    tags: string[];
    link?: string;
    github?: string;
    description: string;
    longDescription: string;
    features: string[];
    year: string;
    role: string;
    metrics?: { label: string; value: string }[];
}

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-bg-main/80 backdrop-blur-xl" />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-bg-surface/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-primary/10"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-bg-main/50 backdrop-blur-sm border border-white/10 text-text-muted hover:text-text-main hover:bg-primary/20 transition-all duration-300"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                    {/* Hero Section */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/50 to-transparent" />
                        
                        {/* Floating Category Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-6 left-6 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30"
                        >
                            <span className="text-primary text-sm font-medium">{project.category}</span>
                        </motion.div>

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl font-heading font-bold text-text-main mb-2"
                            >
                                {project.title}
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="flex flex-wrap items-center gap-4 text-text-muted text-sm"
                            >
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {project.year}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {project.role}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 space-y-8">
                        {/* Metrics Cards */}
                        {project.metrics && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-3 gap-4"
                            >
                                {project.metrics.map((metric, index) => (
                                    <motion.div
                                        key={metric.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.25 + index * 0.1 }}
                                        className="relative overflow-hidden rounded-2xl bg-bg-main/50 border border-white/5 p-4 text-center group hover:border-primary/30 transition-colors duration-300"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative">
                                            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{metric.value}</div>
                                            <div className="text-xs text-text-muted uppercase tracking-wider">{metric.label}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-heading font-semibold text-text-main flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                About the Project
                            </h3>
                            <p className="text-text-muted leading-relaxed">
                                {project.longDescription}
                            </p>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-heading font-semibold text-text-main">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {project.features.map((feature, index) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.05 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-bg-main/30 border border-white/5 hover:border-primary/20 transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                        <span className="text-text-muted text-sm">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="space-y-4"
                        >
                            <h3 className="text-lg font-heading font-semibold text-text-main">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + index * 0.05 }}
                                        className="px-4 py-2 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="flex flex-wrap gap-4 pt-4 border-t border-white/5"
                        >
                            {project.link && project.link !== "#" && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-primary text-bg-main font-semibold rounded-xl hover:bg-secondary transition-colors duration-300 group"
                                >
                                    <Globe className="w-4 h-4" />
                                    Visit Live Site
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-bg-main border border-white/10 text-text-main font-semibold rounded-xl hover:border-primary/50 hover:text-primary transition-all duration-300 group"
                                >
                                    <Github className="w-4 h-4" />
                                    View Source
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}
