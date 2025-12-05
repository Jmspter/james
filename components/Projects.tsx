"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProjectModal, { type Project } from "@/components/ProjectModal";
import { projects } from "@/data/projects";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <>
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            <section className="py-24 px-6 bg-bg-surface text-text-main">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-heading font-medium mb-4 text-primary">
                            Selected Works
                        </h2>
                        <p className="text-text-muted max-w-xl">
                            A collection of high-performance backend systems and APIs.
                        </p>
                    </div>
                    <Link 
                        href="/projects"
                        className="px-6 py-3 border border-primary/20 rounded-full hover:bg-primary hover:text-bg-main transition-colors duration-300 text-primary"
                    >
                        View All Projects
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.02,
                                rotateX: 2,
                                z: 50,
                                transition: { duration: 0.3 }
                            }}
                            onClick={() => setSelectedProject(project)}
                            className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer perspective-1000 border border-white/5"
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

                            {/* Content Overlay (Glassmorphism) */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-bg-surface/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-secondary text-sm font-medium tracking-wider uppercase">
                                                {project.category}
                                            </span>
                                            <h3 className="text-2xl font-heading font-semibold mt-1 text-text-main">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="flex gap-2">
                                            {project.github && (
                                                <button className="p-2 bg-bg-main text-text-main rounded-full hover:bg-primary hover:text-bg-main transition-colors">
                                                    <Github className="w-4 h-4" />
                                                </button>
                                            )}
                                            {project.link && project.link !== "#" && (
                                                <button className="p-2 bg-bg-main text-text-main rounded-full hover:bg-primary hover:text-bg-main transition-colors">
                                                    <Globe className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 text-xs bg-black/40 rounded-full text-text-muted border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-primary font-medium text-sm group/link">
                                        View Details
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}
