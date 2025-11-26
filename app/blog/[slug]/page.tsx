"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, Share2, BookmarkPlus, Twitter, Linkedin, Link2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    date: string;
    readTime: string;
    tags: string[];
}

const blogPosts: Record<string, BlogPost> = {
    "scaling-nodejs-production": {
        id: "scaling-nodejs-production",
        title: "Scaling Node.js Applications in Production",
        excerpt: "Learn the best practices for scaling Node.js applications to handle millions of requests.",
        content: `
## Introduction

Scaling Node.js applications is crucial for handling increased traffic and ensuring high availability. In this article, we'll explore various strategies and best practices for scaling your Node.js applications in production.

## Understanding the Event Loop

Before diving into scaling strategies, it's essential to understand how Node.js handles concurrent connections through its event loop. The single-threaded nature of Node.js might seem like a limitation, but it's actually one of its strengths when properly utilized.

## Clustering

One of the most effective ways to scale a Node.js application is by using the built-in cluster module. This allows you to create multiple worker processes that share the same server port.

\`\`\`javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker process
  require('./server');
}
\`\`\`

## Load Balancing

For horizontal scaling across multiple servers, you'll need a load balancer. Popular options include:

- **Nginx** - High-performance reverse proxy
- **HAProxy** - TCP/HTTP load balancer
- **AWS ALB** - Application Load Balancer for cloud deployments

## Caching Strategies

Implementing proper caching can significantly reduce database load and improve response times:

1. **In-memory caching** with Redis or Memcached
2. **HTTP caching** with proper cache headers
3. **CDN caching** for static assets

## Database Optimization

Your database is often the bottleneck. Consider:

- Connection pooling
- Read replicas
- Query optimization
- Proper indexing

## Monitoring and Observability

You can't scale what you can't measure. Implement comprehensive monitoring:

- Application metrics (response times, error rates)
- Infrastructure metrics (CPU, memory, disk)
- Business metrics (active users, transactions)

## Conclusion

Scaling Node.js applications requires a holistic approach that considers all layers of your stack. Start with the basics, measure everything, and iterate based on real data.
        `,
        image: "/blog/nodejs-scaling.jpg",
        category: "Backend",
        author: {
            name: "James",
            avatar: "/avatar.jpg",
            bio: "Backend developer passionate about building scalable systems and sharing knowledge."
        },
        date: "Nov 20, 2024",
        readTime: "8 min read",
        tags: ["Node.js", "Scaling", "Performance", "Backend"]
    },
    "microservices-architecture": {
        id: "microservices-architecture",
        title: "Microservices Architecture: A Practical Guide",
        excerpt: "Breaking down monoliths into microservices. When to do it, how to do it right, and common pitfalls to avoid.",
        content: `
## Introduction

Microservices architecture has become the go-to pattern for building large-scale applications. But when should you use it, and how do you implement it correctly?

## When to Consider Microservices

Not every application needs microservices. Consider them when:

- Your team is growing and needs autonomous deployment
- Different parts of your application have different scaling needs
- You want to use different technologies for different components

## Key Principles

### Single Responsibility
Each service should do one thing and do it well.

### Loose Coupling
Services should be independent and communicate through well-defined APIs.

### High Cohesion
Related functionality should be grouped together within a service.

## Communication Patterns

### Synchronous (REST/gRPC)
Direct communication between services. Simple but creates coupling.

### Asynchronous (Message Queues)
Event-driven communication using RabbitMQ, Kafka, or similar tools.

## Common Pitfalls

1. **Distributed Monolith** - Microservices that are too tightly coupled
2. **Data Management** - Sharing databases between services
3. **Over-engineering** - Creating too many services too early

## Conclusion

Microservices are powerful but come with complexity. Start with a well-structured monolith and extract services as needed.
        `,
        image: "/blog/microservices.jpg",
        category: "Architecture",
        author: {
            name: "James",
            avatar: "/avatar.jpg",
            bio: "Backend developer passionate about building scalable systems and sharing knowledge."
        },
        date: "Nov 15, 2024",
        readTime: "12 min read",
        tags: ["Microservices", "Architecture", "Design Patterns"]
    },
};

// Fallback for posts not fully defined
const defaultPost: BlogPost = {
    id: "default",
    title: "Article Coming Soon",
    excerpt: "This article is being written and will be available soon.",
    content: "## Coming Soon\n\nThis article is currently being written. Check back later for the full content!",
    image: "/blog/default.jpg",
    category: "General",
    author: {
        name: "James",
        avatar: "/avatar.jpg",
        bio: "Backend developer passionate about building scalable systems."
    },
    date: "2024",
    readTime: "5 min read",
    tags: ["Backend", "Development"]
};

const relatedPosts = [
    { id: "microservices-architecture", title: "Microservices Architecture: A Practical Guide", category: "Architecture" },
    { id: "postgresql-optimization", title: "PostgreSQL Performance Optimization Tips", category: "Database" },
    { id: "docker-kubernetes-basics", title: "From Docker to Kubernetes: A Developer's Journey", category: "DevOps" },
];

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = blogPosts[slug] || { ...defaultPost, id: slug, title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') };
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-bg-main text-text-main">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-bg-main/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/blog" className="flex items-center gap-2 text-text-main hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Blog</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={copyLink}
                            className="p-2 rounded-full bg-bg-surface border border-white/10 text-text-muted hover:text-primary hover:border-primary/50 transition-all"
                            title="Copy link"
                        >
                            {copied ? <span className="text-xs px-1">Copied!</span> : <Link2 className="w-4 h-4" />}
                        </button>
                        <button className="p-2 rounded-full bg-bg-surface border border-white/10 text-text-muted hover:text-primary hover:border-primary/50 transition-all">
                            <BookmarkPlus className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-bg-surface border border-white/10 text-text-muted hover:text-primary hover:border-primary/50 transition-all">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="max-w-4xl mx-auto px-6 py-6">
                <nav className="flex items-center gap-2 text-sm text-text-muted">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-text-main">{post.category}</span>
                </nav>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-6 pb-20">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-4 text-text-muted text-sm">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-text-muted leading-relaxed mb-8">
                        {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pb-8 border-b border-white/10">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                            {post.author.name[0]}
                        </div>
                        <div>
                            <p className="font-semibold text-text-main">{post.author.name}</p>
                            <p className="text-sm text-text-muted">{post.author.bio}</p>
                        </div>
                    </div>
                </motion.header>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-heading prose-headings:text-text-main prose-headings:font-bold
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-text-main
                        prose-code:text-primary prose-code:bg-bg-surface prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-bg-surface prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                        prose-ul:text-text-muted prose-ol:text-text-muted
                        prose-li:marker:text-primary
                        prose-blockquote:border-l-primary prose-blockquote:text-text-muted prose-blockquote:italic
                    "
                    dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <div className="flex items-center gap-3 flex-wrap">
                        <Tag className="w-5 h-5 text-text-muted" />
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-2 bg-bg-surface border border-white/10 rounded-full text-sm text-text-muted hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Share Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-8 p-6 bg-bg-surface/50 rounded-2xl border border-white/5"
                >
                    <p className="text-text-muted mb-4">Share this article</p>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-full text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors">
                            <Twitter className="w-4 h-4" />
                            Twitter
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0077B5]/10 border border-[#0077B5]/20 rounded-full text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors">
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                        </button>
                        <button 
                            onClick={copyLink}
                            className="flex items-center gap-2 px-5 py-2.5 bg-bg-surface border border-white/10 rounded-full text-text-muted hover:border-primary/50 hover:text-primary transition-colors"
                        >
                            <Link2 className="w-4 h-4" />
                            {copied ? "Copied!" : "Copy Link"}
                        </button>
                    </div>
                </motion.div>

                {/* Related Posts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16"
                >
                    <h3 className="text-2xl font-heading font-bold mb-8">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.filter(p => p.id !== slug).slice(0, 3).map((relatedPost) => (
                            <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                                <div className="group p-6 bg-bg-surface/50 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300">
                                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                                        {relatedPost.category}
                                    </span>
                                    <h4 className="mt-3 font-heading font-semibold text-text-main group-hover:text-primary transition-colors line-clamp-2">
                                        {relatedPost.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </article>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-sm">
                        © 2024 James. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-text-muted hover:text-primary text-sm transition-colors">
                            Home
                        </Link>
                        <Link href="/blog" className="text-text-muted hover:text-primary text-sm transition-colors">
                            Blog
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}

// Simple markdown-like content formatter
function formatContent(content: string): string {
    return content
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[h|p|u|o|l|pre])/gm, '<p>')
        .replace(/(<p><\/p>)/g, '');
}
