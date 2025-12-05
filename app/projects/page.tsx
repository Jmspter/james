"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Globe, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProjectModal, { type Project } from "@/components/ProjectModal";
import { projects, categories } from "@/data/projects";

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects.filter((project) => {
        const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

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

            <main className="min-h-screen bg-bg-main text-text-main">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-bg-main/80 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-text-main hover:text-primary transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
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
                            All <span className="text-primary">Projects</span>
                        </h1>
                        <p className="text-text-muted text-lg max-w-2xl">
                            Uma coleção completa de sistemas backend, APIs e soluções de infraestrutura que desenvolvi ao longo da minha carreira.
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap gap-3 mb-10"
                    >
                        <div className="flex items-center gap-2 text-text-muted mr-2">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">Filter:</span>
                        </div>
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

                    {/* Projects Count */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-text-muted text-sm mb-8"
                    >
                        Showing {filteredProjects.length} of {projects.length} projects
                    </motion.p>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                                onClick={() => setSelectedProject(project)}
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
                                                <span key={tag} className="px-3 py-1 text-xs bg-black/40 rounded-full text-text-muted border border-white/5">
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
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-bg-surface flex items-center justify-center">
                                <Search className="w-8 h-8 text-text-muted" />
                            </div>
                            <h3 className="text-xl font-heading font-semibold mb-2">No projects found</h3>
                            <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <footer className="border-t border-white/5 py-8">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-text-muted text-sm">
                            © {new Date().getFullYear()} James. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-text-muted hover:text-primary text-sm transition-colors">
                                Home
                            </Link>
                            <Link href="/blog" className="text-text-muted hover:text-primary text-sm transition-colors">
                                Blog
                            </Link>
                            <Link href="/projects" className="text-text-muted hover:text-primary text-sm transition-colors">
                                Projects
                            </Link>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
