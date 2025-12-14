"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import type { Project } from "@/components/ProjectModal";

interface ProjectCardProps {
    project: Project;
    index?: number;
    onClick: () => void;
}

export default function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
            }}
            onClick={onClick}
            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 hover:border-primary/30 transition-colors"
        >
            {/* Image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-bg-main/50 group-hover:bg-bg-main/70 transition-colors duration-300" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary/20 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/30">
                {project.category}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-bg-surface/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-heading font-semibold text-text-main">
                                {project.title}
                            </h3>
                            <p className="text-text-muted text-sm mt-1">
                                {project.year} • {project.role}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 bg-bg-main text-text-main rounded-full hover:bg-primary hover:text-bg-main transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {project.link && project.link !== "#" && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 bg-bg-main text-text-main rounded-full hover:bg-primary hover:text-bg-main transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="text-text-muted text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs bg-black/40 rounded-full text-text-muted border border-white/5"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-3 py-1 text-xs bg-black/40 rounded-full text-text-muted border border-white/5">
                                +{project.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        View Details
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
