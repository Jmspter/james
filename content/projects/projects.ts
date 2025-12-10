import type { Project } from "@/components/ProjectModal";

export const projects: Project[] = [
    {
        id: 1,
        title: "Demanda Urbanas",
        category: "Web Application",
        image: "/project1.svg",
        tags: ["Ruby on rails", "PostgreSQL", "Redis", "Sidekiq"],
        link: "https://dashboard.demandaurbana.com.br/",
        description: "Plataforma de gestão de demandas urbanas para prefeituras.",
        longDescription: "Sistema completo de gestão de demandas urbanas que permite aos cidadãos reportar problemas na cidade e acompanhar a resolução em tempo real. A plataforma inclui painéis administrativos, sistema de priorização automática e integração com equipes de campo.",
        features: [
            "Sistema de tickets em tempo real",
            "Geolocalização de demandas",
            "Dashboard analítico para gestores",
            "App mobile para equipes de campo",
            "Notificações automáticas por email/SMS"
        ],
        year: "2024",
        role: "Backend Lead",
        metrics: [
            { label: "Uptime", value: "99.9%" },
            { label: "Requests/day", value: "50K+" },
            { label: "Response Time", value: "<100ms" }
        ]
    },
    {
        id: 2,
        title: "Base GPT",
        category: "AI",
        image: "/project2.svg",
        tags: ["Nest.js", "OpenAI", "PostgreSQL"],
        link: "https://basegpt.com.br/",
        description: "Plataforma de IA conversacional para empresas.",
        longDescription: "Solução enterprise de IA conversacional que permite empresas criarem assistentes virtuais personalizados treinados com seus próprios dados. Inclui sistema de RAG (Retrieval-Augmented Generation), fine-tuning de modelos e analytics avançado.",
        features: [
            "Integração com bases de conhecimento",
            "Fine-tuning de modelos LLM",
            "API RESTful para integrações",
            "Painel de analytics e métricas",
            "Suporte multi-idioma"
        ],
        year: "2024",
        role: "Full Stack Developer",
        metrics: [
            { label: "Accuracy", value: "94%" },
            { label: "Avg Response", value: "1.2s" },
            { label: "Users", value: "10K+" }
        ]
    },
    {
        id: 3,
        title: "Red Dune Auth",
        category: "Security",
        image: "/project3.jpg",
        tags: ["Ruby", "OAuth2", "Sinatra", "PostgreSQL"],
        github: "https://github.com/Jmspter/RedDuneAuth",
        description: "Serviço de autenticação centralizado e seguro.",
        longDescription: "Microserviço de autenticação robusto que implementa OAuth2, OpenID Connect e SAML. Projetado para alta disponibilidade e segurança, com suporte a MFA, rate limiting e detecção de fraudes em tempo real.",
        features: [
            "OAuth2 & OpenID Connect",
            "Multi-factor authentication (MFA)",
            "Rate limiting inteligente",
            "Detecção de fraudes com ML",
            "SSO para múltiplas aplicações"
        ],
        year: "2023",
        role: "Backend Developer",
        metrics: [
            { label: "Security Score", value: "A+" },
            { label: "Auth/sec", value: "5K+" },
            { label: "Latency", value: "<50ms" }
        ]
    },
];

export const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
