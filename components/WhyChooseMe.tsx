"use client";

import { motion } from "framer-motion";
import { Database, Lock, Server, Zap } from "lucide-react";

const reasons = [
    {
        id: 1,
        title: "High Performance",
        description: "Optimized code for maximum throughput and low latency.",
        icon: Zap,
        color: "bg-bg-surface",
        textColor: "text-text-main",
    },
    {
        id: 2,
        title: "Secure by Design",
        description: "Security best practices integrated from day one.",
        icon: Lock,
        color: "bg-bg-highlight",
        textColor: "text-text-main",
    },
    {
        id: 3,
        title: "Scalable Architecture",
        description: "Systems built to grow with your user base.",
        icon: Server,
        color: "bg-secondary",
        textColor: "text-white",
    },
    {
        id: 4,
        title: "Data Integrity",
        description: "Reliable database design and ACID compliance.",
        icon: Database,
        color: "bg-primary",
        textColor: "text-bg-main",
    },
];

export default function WhyChooseMe() {
    return (
        <section className="py-24 px-6 bg-bg-main">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-medium text-primary mb-4">
                        Why Choose Me
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        I deliver backend solutions that are robust, secure, and built for scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((reason) => (
                        <motion.div
                            key={reason.id}
                            className={`group relative overflow-hidden rounded-[2rem] ${reason.color} p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-white/5`}
                        >
                            {/* Light Sweep Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`mb-6 p-4 rounded-full w-fit bg-white/10`}>
                                    <reason.icon
                                        className={`w-8 h-8 ${reason.textColor} transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}
                                    />
                                </div>

                                <h3 className={`text-xl font-heading font-semibold mb-3 ${reason.textColor}`}>
                                    {reason.title}
                                </h3>
                                <p className={`text-sm leading-relaxed opacity-80 ${reason.textColor}`}>
                                    {reason.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
