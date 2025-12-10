import { Metadata } from "next";
import { Suspense } from "react";
import BlogContent from "./BlogContent";
import { blogPosts, categories } from "@/lib/blog";

export const metadata: Metadata = {
    title: "Blog",
    description: "Artigos, tutoriais e insights sobre desenvolvimento backend, arquitetura de sistemas e práticas DevOps.",
    keywords: [
        "blog desenvolvimento",
        "tutoriais backend",
        "arquitetura de sistemas",
        "DevOps",
        "Node.js",
        "Python",
        "TypeScript",
    ],
    alternates: {
        canonical: "https://jamespeter.dev/blog",
    },
    openGraph: {
        title: "Blog | James Peter",
        description: "Artigos, tutoriais e insights sobre desenvolvimento backend, arquitetura de sistemas e práticas DevOps.",
        url: "https://jamespeter.dev/blog",
        siteName: "James Peter",
        images: [
            {
                url: "/about-photo.jpg",
                width: 1200,
                height: 630,
                alt: "James Peter - Blog",
            },
        ],
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | James Peter",
        description: "Artigos, tutoriais e insights sobre desenvolvimento backend, arquitetura de sistemas e práticas DevOps.",
        images: ["/about-photo.jpg"],
        creator: "@jmspter",
    },
};

export default function BlogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-main" />}>
            <BlogContent posts={blogPosts} categories={categories} />
        </Suspense>
    );
}
