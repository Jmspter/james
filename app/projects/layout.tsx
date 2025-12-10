import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Explore meu portfólio de projetos em desenvolvimento backend, arquitetura de sistemas e aplicações full-stack.",
    keywords: [
        "projetos desenvolvimento",
        "portfólio backend",
        "APIs REST",
        "microsserviços",
        "arquitetura de sistemas",
        "full-stack",
    ],
    alternates: {
        canonical: "https://jamespeter.dev/projects",
    },
    openGraph: {
        title: "Projetos | James Peter",
        description: "Explore meu portfólio de projetos em desenvolvimento backend, arquitetura de sistemas e aplicações full-stack.",
        url: "https://jamespeter.dev/projects",
        siteName: "James Peter",
        images: [
            {
                url: "/about-photo.jpg",
                width: 1200,
                height: 630,
                alt: "James Peter - Projetos",
            },
        ],
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Projetos | James Peter",
        description: "Explore meu portfólio de projetos em desenvolvimento backend, arquitetura de sistemas e aplicações full-stack.",
        images: ["/about-photo.jpg"],
        creator: "@jmspter",
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
