import Link from "next/link";

interface PageFooterProps {
    links?: { href: string; label: string }[];
}

const defaultLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
];

export default function PageFooter({ links = defaultLinks }: PageFooterProps) {
    return (
        <footer className="border-t border-white/5 py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-text-muted text-sm">
                    © {new Date().getFullYear()} James. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-text-muted hover:text-primary text-sm transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
