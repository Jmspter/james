import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getRelatedPosts, getAllPosts } from "@/lib/blog";
import BlogPostContent from "./BlogPostContent";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);
    
    if (!post) {
        return {
            title: "Post Not Found",
        };
    }
    
    return {
        title: `${post.title} | James Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getBlogPost(slug);
    
    if (!post) {
        notFound();
    }
    
    const relatedPosts = getRelatedPosts(slug, 3);
    
    return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
