import { Suspense } from "react";
import BlogContent from "./BlogContent";
import { blogPosts, categories } from "@/lib/blog";

export const metadata = {
    title: "Blog | James",
    description: "Insights, tutorials, and thoughts on backend development, system architecture, and DevOps practices.",
};

export default function BlogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-main" />}>
            <BlogContent posts={blogPosts} categories={categories} />
        </Suspense>
    );
}
