"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { Server, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} />;
}

export default function About() {
    return (
        <section id="about" className="relative py-32 bg-bg-main overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 text-primary mb-6">
                            <Server className="w-5 h-5" />
                            <span className="font-mono text-sm tracking-wider uppercase">System Architect</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-6 leading-tight">
                            Optimizing for <span className="text-primary">scale</span> and performance.
                        </h2>

                        <p className="text-lg text-text-muted mb-8 leading-relaxed">
                            I specialize in designing and implementing high-availability backend systems.
                            From microservices architecture to database tuning, I ensure your infrastructure
                            can handle massive growth without compromising on speed or security.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <h3 className="text-4xl font-heading font-bold text-text-main mb-2">
                                    <Counter value={99.9} suffix="%" />
                                </h3>
                                <p className="text-sm text-text-muted uppercase tracking-wider">Uptime Guarantee</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-heading font-bold text-text-main mb-2">
                                    <Counter value={10} suffix="M+" />
                                </h3>
                                <p className="text-sm text-text-muted uppercase tracking-wider">Requests / Day</p>
                            </div>
                        </div>

                        <Link href="/blog" className="group flex items-center gap-2 text-text-main font-semibold hover:text-primary transition-colors">
                            <span>Read my technical blog</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 group transform-gpu">
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                            <Image
                                src="/about-photo.jpg"
                                alt="Server Room"
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="absolute bottom-8 left-8 z-20 bg-bg-surface/90 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Server className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted uppercase tracking-wider">Role</p>
                                        <p className="text-text-main font-bold">Backend Specialist</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
