import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    contentHtml: string;
    image: string;
    category: string;
    author: {
        name: string;
        avatar: string;
    };
    date: string;
    readTime: string;
    featured?: boolean;
    tags?: string[];
}

const postsDirectory = path.join(process.cwd(), "content/posts");

// Configure marked options
marked.setOptions({
    gfm: true,
    breaks: true,
});

export function getAllPosts(): BlogPost[] {
    const fileNames = fs.readdirSync(postsDirectory);
    
    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const id = fileName.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);
            
            // Convert markdown to HTML
            const contentHtml = marked(content) as string;

            return {
                id,
                title: data.title,
                excerpt: data.excerpt,
                content,
                contentHtml,
                image: data.image,
                category: data.category,
                author: data.author,
                date: data.date,
                readTime: data.readTime,
                featured: data.featured || false,
                tags: data.tags || [],
            } as BlogPost;
        });

    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });
}

export const blogPosts = getAllPosts();

export function getBlogPost(id: string): BlogPost | undefined {
    return blogPosts.find((post) => post.id === id);
}

export function getFeaturedPost(): BlogPost | undefined {
    return blogPosts.find((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
    if (category === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentPostId: string, limit: number = 3): BlogPost[] {
    const currentPost = getBlogPost(currentPostId);
    if (!currentPost) return blogPosts.slice(0, limit);
    
    return blogPosts
        .filter((post) => post.id !== currentPostId)
        .filter((post) => 
            post.category === currentPost.category || 
            post.tags?.some((tag) => currentPost.tags?.includes(tag))
        )
        .slice(0, limit);
}

export const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];
