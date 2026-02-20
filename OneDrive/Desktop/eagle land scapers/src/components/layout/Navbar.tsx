"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Projects" },
    { id: "team", label: "Team" },
    { id: "clients", label: "Clients" },
    { id: "downloads", label: "Downloads" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);

            const scrollPos = window.scrollY + window.innerHeight / 3;
            for (const section of SECTIONS) {
                const element = document.getElementById(section.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        // Mac Menu Style - Bottom Center Floating Bar - Perfectly Centered
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: "fixed",
                bottom: 20,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 0",
                pointerEvents: "none", // Allow clicks to pass through around the nav
            }}
            suppressHydrationWarning
        >
            <motion.div
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    background: scrolled 
                        ? "rgba(30, 30, 30, 0.85)" 
                        : "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(50px) saturate(200%)",
                    WebkitBackdropFilter: "blur(50px) saturate(200%)",
                    borderRadius: 50,
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
                    transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
                    pointerEvents: "auto", // Re-enable clicks on the nav itself
                }}
            >
                {SECTIONS.map((s) => (
                    <motion.button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        onMouseEnter={() => setHoveredSection(s.id)}
                        onMouseLeave={() => setHoveredSection(null)}
                        style={{
                            background: "transparent",
                            border: "none",
                            fontSize: 13,
                            fontWeight: 500,
                            color: activeSection === s.id ? "#fff" : "rgba(255,255,255,0.5)",
                            cursor: "pointer",
                            padding: "10px 18px",
                            borderRadius: 25,
                            transition: "color 0.3s ease",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        whileHover={{ 
                            background: "rgba(255,255,255,0.08)",
                            color: "#fff"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Active background pill */}
                        {(activeSection === s.id || hoveredSection === s.id) && (
                            <motion.div
                                layoutId="mac-menu-pill"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: activeSection === s.id 
                                        ? "rgba(74, 154, 82, 0.25)" 
                                        : "rgba(255,255,255,0.06)",
                                    borderRadius: 25,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        
                        <span style={{ 
                            position: "relative", 
                            zIndex: 1,
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                        }}>
                            {s.label}
                        </span>
                    </motion.button>
                ))}

                {/* Divider */}
                <div style={{
                    width: 1,
                    height: 20,
                    background: "rgba(255,255,255,0.12)",
                    margin: "0 8px",
                }} />

                {/* CTA Button */}
                <motion.button
                    onClick={() => scrollTo("contact")}
                    style={{
                        background: "linear-gradient(135deg, #4a9a52 0%, #2E7D32 100%)",
                        border: "none",
                        padding: "8px 20px",
                        borderRadius: 25,
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 3px 12px rgba(74, 154, 82, 0.35)",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    }}
                    whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 5px 18px rgba(74, 154, 82, 0.45)"
                    }}
                    whileTap={{ scale: 0.97 }}
                >
                    Get in Touch
                </motion.button>
            </motion.div>
        </motion.nav>
    );
}
