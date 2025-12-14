"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ProjectModal, { type Project } from "@/components/ProjectModal";
import {
    CategoryFilter,
    EmptyState,
    PageFooter,
    PageHeader,
    ProjectCard,
} from "@/components/ui";

interface ProjectsContentProps {
    projects: Project[];
    categories: string[];
}

export default function ProjectsContent({ projects, categories }: ProjectsContentProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects.filter((project) => {
        const matchesCategory =
            selectedCategory === "All" || project.category === selectedCategory;
        const matchesSearch =
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );
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
                <PageHeader
                    backHref="/"
                    backLabel="Back to Home"
                    searchValue={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchPlaceholder="Search projects..."
                />

                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Page Title */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                            All <span className="text-primary">Projects</span>
                        </h1>
                        <p className="text-text-muted text-lg max-w-2xl">
                            Uma coleção completa de sistemas backend, APIs e soluções de
                            infraestrutura que desenvolvi ao longo da minha carreira.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            showIcon
                        />
                    </div>

                    {/* Projects Count */}
                    <p className="text-text-muted text-sm mb-8">
                        Showing {filteredProjects.length} of {projects.length} projects
                    </p>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <EmptyState
                            title="No projects found"
                            description="Try adjusting your search or filter criteria."
                        />
                    )}
                </div>

                {/* Footer */}
                <PageFooter />
            </main>
        </>
    );
}
