"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, Server, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Hero() {
    const [showIntro, setShowIntro] = useState(true);
    const [text, setText] = useState("");
    const [mounted, setMounted] = useState(false);

    const commands = [
        { cmd: "ssh user@backend-portfolio", output: "Authenticating..." },
        { cmd: "./init_system.sh", output: "Loading modules..." },
        { cmd: "loading_skills --verbose", output: "[OK] Node.js\n[OK] Docker\n[OK] Kubernetes\n[OK] PostgreSQL" },
        { cmd: "start_server", output: "Server running on port 3000..." }
    ];

    // Handle client-side mounting for portal
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!showIntro) return;

        // Prevent scrolling during intro and scroll to top
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);

        let currentCommandIndex = 0;
        let currentCharIndex = 0;
        let currentText = "";
        let isOutputting = false;

        const typeLoop = () => {
            if (currentCommandIndex >= commands.length) {
                setTimeout(() => {
                    setShowIntro(false);
                    document.body.style.overflow = "unset";
                }, 800);
                return;
            }

            const commandObj = commands[currentCommandIndex];
            const prompt = "user@backend:~$ ";

            if (!isOutputting) {
                // Typing command
                if (currentCharIndex < commandObj.cmd.length) {
                    currentText = currentText.endsWith("█") ? currentText.slice(0, -1) : currentText; // Remove cursor for update
                    // If it's the start of a new line, add prompt
                    if (currentCharIndex === 0) {
                        if (currentText.length > 0) currentText += "\n";
                        currentText += prompt;
                    }

                    currentText += commandObj.cmd[currentCharIndex];
                    setText(currentText);
                    currentCharIndex++;
                    setTimeout(typeLoop, 50 + Math.random() * 50);
                } else {
                    // Command finished, show output
                    isOutputting = true;
                    setTimeout(typeLoop, 300);
                }
            } else {
                // Show output
                currentText += "\n" + commandObj.output;
                setText(currentText);
                isOutputting = false;
                currentCommandIndex++;
                currentCharIndex = 0;
                setTimeout(typeLoop, 500);
            }
        };

        const timeoutId = setTimeout(typeLoop, 500);

        return () => {
            clearTimeout(timeoutId);
            document.body.style.overflow = "unset";
        };
    }, [showIntro]);

    const introOverlay = showIntro && mounted ? createPortal(
        <AnimatePresence mode="wait">
            <motion.div
                key="intro"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-main font-mono text-primary p-4 md:p-10"
            >
                {/* CRT Effects */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-20" />
                <div className="absolute inset-0 pointer-events-none z-20 animate-[flicker_0.15s_infinite] bg-white/5 mix-blend-overlay opacity-5" />

                <div className="relative z-30 max-w-4xl w-full bg-bg-surface border border-bg-highlight p-6 rounded-lg shadow-2xl shadow-primary/10">
                    <div className="flex gap-2 mb-4 border-b border-bg-highlight pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <pre className="text-sm md:text-lg whitespace-pre-wrap leading-relaxed font-mono text-primary/90 min-h-[300px]">
                        {text}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 md:w-3 md:h-6 bg-primary ml-1 align-middle"
                        />
                    </pre>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null;

    return (
        <>
            {introOverlay}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-bg-main text-text-main">
                <AnimatePresence mode="wait">
                    {!showIntro && (
                        <motion.div
                            key="main"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            {/* Background Elements */}
                            <div className="absolute inset-0 z-0 bg-bg-main">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bg-surface via-bg-main to-bg-main opacity-80" />
                                <div className="absolute top-0 left-0 w-full h-full opacity-10"
                                    style={{ backgroundImage: 'radial-gradient(#262626 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="flex justify-center gap-4 mb-6 text-primary/80"
                                >
                                    <Server className="w-8 h-8" />
                                    <Terminal className="w-8 h-8" />
                                    <Database className="w-8 h-8" />
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                    className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6 leading-tight text-text-main"
                                >
                                    Architecting <span className="text-primary">Scalable</span> <br />
                                    Systems & APIs
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 font-sans font-light"
                                >
                                    Building high-performance backends, secure infrastructure, and robust data pipelines.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-bg-main font-bold rounded-lg shadow-lg shadow-primary/20 overflow-hidden transition-all hover:bg-secondary"
                                        onClick={() => {
                                            document.getElementById("about")?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        }}
                                    >
                                        <span className="relative z-10">View Architecture</span>
                                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
}

