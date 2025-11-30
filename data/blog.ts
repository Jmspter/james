// Import individual blog posts
import scalingNodejs from "./posts/scaling-nodejs-production.json";
import microservices from "./posts/microservices-architecture.json";
import postgresql from "./posts/postgresql-optimization.json";
import dockerKubernetes from "./posts/docker-kubernetes-basics.json";
import apiSecurity from "./posts/api-security-best-practices.json";
import redisCaching from "./posts/redis-caching-strategies.json";
import graphqlRest from "./posts/graphql-vs-rest.json";
import cicd from "./posts/ci-cd-pipelines.json";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
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

// Combine all posts into a single array
export const blogPosts: BlogPost[] = [
    scalingNodejs,
    microservices,
    postgresql,
    dockerKubernetes,
    apiSecurity,
    redisCaching,
    graphqlRest,
    cicd,
];

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
        .filter((post) => post.category === currentPost.category || 
                         post.tags?.some((tag) => currentPost.tags?.includes(tag)))
        .slice(0, limit);
}

export const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];
