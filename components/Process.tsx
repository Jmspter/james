"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Lock, Server, Settings, Terminal } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    id: 1,
    title: "Architecture",
    description: "Designing scalable microservices and system topology.",
    icon: Server,
    color: "bg-bg-surface", // Dark
    textColor: "text-text-main",
  },
  {
    id: 2,
    title: "Database Design",
    description: "Optimizing schema and queries for high performance.",
    icon: Database,
    color: "bg-bg-highlight", // Slightly lighter dark
    textColor: "text-text-main",
  },
  {
    id: 3,
    title: "API Development",
    description: "Building secure, RESTful and GraphQL endpoints.",
    icon: Terminal,
    color: "bg-secondary", // Dark Orange
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Security",
    description: "Implementing OAuth, JWT, and encryption standards.",
    icon: Lock,
    color: "bg-primary", // Vibrant Orange
    textColor: "text-bg-main",
  },
  {
    id: 5,
    title: "CI/CD & Deploy",
    description: "Automating testing and deployment pipelines.",
    icon: Settings,
    color: "bg-text-main", // White/Light
    textColor: "text-bg-main",
  },
];

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-bg-main">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-1 left-10 z-10">
          <h2 className="text-4xl md:text-6xl font-heading text-primary mb-4">
            DevOps Cycle
          </h2>
          <p className="text-text-muted max-w-md">
            A rigorous approach to building resilient backend systems.
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-10 md:px-20 pt-20">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`group relative h-[450px] w-[350px] md:w-[450px] flex-shrink-0 overflow-hidden rounded-3xl ${step.color} p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-2 border border-white/5`}
            >
              <div className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full">
                <step.icon className={`w-6 h-6 ${step.textColor}`} />
              </div>

              <div className="flex flex-col h-full justify-end">
                <span className={`text-9xl font-heading font-bold opacity-10 absolute top-10 left-4 select-none ${step.textColor}`}>
                  0{step.id}
                </span>
                <h3 className={`text-3xl font-heading font-semibold mb-4 relative z-10 ${step.textColor}`}>
                  {step.title}
                </h3>
                <p className={`font-sans leading-relaxed relative z-10 opacity-80 ${step.textColor}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

