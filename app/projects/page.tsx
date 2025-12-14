import { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";
import { projects, categories } from "@/content/projects/projects";

export const metadata: Metadata = {
    title: "Projects",
    description: "Uma coleção completa de sistemas backend, APIs e soluções de infraestrutura desenvolvidos por James Peter.",
    keywords: [
        "projetos backend",
        "APIs",
        "sistemas",
        "portfólio",
        "desenvolvimento",
        "Node.js",
        "Ruby on Rails",
    ],
    alternates: {
        canonical: "https://jamespeter.dev/projects",
    },
    openGraph: {
        title: "Projects | James Peter",
        description: "Uma coleção completa de sistemas backend, APIs e soluções de infraestrutura.",
        url: "https://jamespeter.dev/projects",
        siteName: "James Peter",
        images: [
            {
                url: "https://jamespeter.dev/about-photo.jpg",
                width: 1200,
                height: 630,
                alt: "James Peter - Projects",
            },
        ],
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects | James Peter",
        description: "Uma coleção completa de sistemas backend, APIs e soluções de infraestrutura.",
        images: ["https://jamespeter.dev/about-photo.jpg"],
        creator: "@jmspter",
    },
};

export default function ProjectsPage() {
    return <ProjectsContent projects={projects} categories={categories} />;
}
