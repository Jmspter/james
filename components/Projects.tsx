"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Globe, X, Calendar, Users, Zap, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    tags: string[];
    link: string;
    github?: string;
    description: string;
    longDescription: string;
    features: string[];
    year: string;
    role: string;
    metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "Demanda Urbanas",
        category: "Web Application",
        image: "/project1.jpg",
        tags: ["Ruby on rails", "PostgreSQL", "Redis", "Sidekiq"],
        link: "https://demandaurbanas.com",
        github: "https://github.com/example/demanda-urbanas",
        description: "Plataforma de gestão de demandas urbanas para prefeituras.",
        longDescription: "Sistema completo de gestão de demandas urbanas que permite aos cidadãos reportar problemas na cidade e acompanhar a resolução em tempo real. A plataforma inclui painéis administrativos, sistema de priorização automática e integração com equipes de campo.",
        features: [
            "Sistema de tickets em tempo real",
            "Geolocalização de demandas",
            "Dashboard analítico para gestores",
            "App mobile para equipes de campo",
            "Notificações automáticas por email/SMS"
        ],
        year: "2024",
        role: "Backend Lead",
        metrics: [
            { label: "Uptime", value: "99.9%" },
            { label: "Requests/day", value: "50K+" },
            { label: "Response Time", value: "<100ms" }
        ]
    },
    {
        id: 2,
        title: "Base GPT",
        category: "AI",
        image: "/project2.jpg",
        tags: ["Nest.js", "OpenAI", "PostgreSQL"],
        link: "https://basegpt.io",
        description: "Plataforma de IA conversacional para empresas.",
        longDescription: "Solução enterprise de IA conversacional que permite empresas criarem assistentes virtuais personalizados treinados com seus próprios dados. Inclui sistema de RAG (Retrieval-Augmented Generation), fine-tuning de modelos e analytics avançado.",
        features: [
            "Integração com bases de conhecimento",
            "Fine-tuning de modelos LLM",
            "API RESTful para integrações",
            "Painel de analytics e métricas",
            "Suporte multi-idioma"
        ],
        year: "2024",
        role: "Full Stack Developer",
        metrics: [
            { label: "Accuracy", value: "94%" },
            { label: "Avg Response", value: "1.2s" },
            { label: "Users", value: "10K+" }
        ]
    },
    {
        id: 3,
        title: "Auth Provider Service",
        category: "Security",
        image: "/project3.jpg",
        tags: ["Node.js", "OAuth2", "JWT", "MongoDB"],
        link: "#",
        github: "https://github.com/example/auth-provider",
        description: "Serviço de autenticação centralizado e seguro.",
        longDescription: "Microserviço de autenticação robusto que implementa OAuth2, OpenID Connect e SAML. Projetado para alta disponibilidade e segurança, com suporte a MFA, rate limiting e detecção de fraudes em tempo real.",
        features: [
            "OAuth2 & OpenID Connect",
            "Multi-factor authentication (MFA)",
            "Rate limiting inteligente",
            "Detecção de fraudes com ML",
            "SSO para múltiplas aplicações"
        ],
        year: "2023",
        role: "Backend Developer",
        metrics: [
            { label: "Security Score", value: "A+" },
            { label: "Auth/sec", value: "5K+" },
            { label: "Latency", value: "<50ms" }
        ]
    },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
                    <button className="px-6 py-3 border border-primary/20 rounded-full hover:bg-primary hover:text-bg-main transition-colors duration-300 text-primary">
                        View All Projects
                    </button>
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
                                            <button className="p-2 bg-bg-main text-text-main rounded-full hover:bg-primary hover:text-bg-main transition-colors">
                                                <Github className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-bg-main text-text-main rounded-full hover:bg-primary hover:text-bg-main transition-colors">
                                                <Globe className="w-4 h-4" />
                                            </button>
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
