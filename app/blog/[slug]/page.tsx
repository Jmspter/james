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
        title: post.title,
        description: post.excerpt,
        keywords: post.tags,
        authors: [{ name: post.author.name }],
        alternates: {
            canonical: `https://jamespeter.dev/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://jamespeter.dev/blog/${slug}`,
            siteName: "James Peter",
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            locale: "pt_BR",
            type: "article",
            publishedTime: post.date,
            authors: [post.author.name],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            creator: "@jmspter",
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getBlogPost(slug);
    
    if (!post) {
        notFound();
    }
    
    const relatedPosts = getRelatedPosts(slug, 3);
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `https://jamespeter.dev${post.image}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Person",
            name: post.author.name,
            url: "https://jamespeter.dev",
        },
        publisher: {
            "@type": "Person",
            name: "James Peter",
            url: "https://jamespeter.dev",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://jamespeter.dev/blog/${slug}`,
        },
        keywords: post.tags?.join(", ") || "",
        articleSection: post.category,
        wordCount: post.content.split(/\s+/).length,
    };
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostContent post={post} relatedPosts={relatedPosts} />
        </>
    );
}
