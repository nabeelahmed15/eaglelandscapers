"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOCS = [
    {
        title: "ZTC Corporate Profile 2025",
        size: "14.2 MB", type: "PDF",
        desc: "Complete overview of ZTC International's landscape engineering capabilities.",
    },
    {
        title: "Vertical Garden Systems Guide",
        size: "8.5 MB", type: "PDF",
        desc: "Technical specifications for our intensive and extensive green wall systems.",
    },
    {
        title: "Water Management Case Studies",
        size: "22.1 MB", type: "PDF",
        desc: "Analysis of our zero-discharge water systems at major tech parks.",
    },
];

export default function Downloads() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            // Premium animated line
            gsap.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1, opacity: 1,
                    duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: lineRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                }
            );

            gsap.utils.toArray<HTMLElement>(".dl-reveal", section).forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.08,
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="downloads" ref={sectionRef} style={{
            background: "#0a0a0a",
            padding: "clamp(100px, 14vh, 160px) clamp(20px, 5vw, 48px)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Premium background */}
            <div style={{
                position: "absolute",
                bottom: "-20%",
                right: "-10%",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(74,154,82,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
                {/* Animated line */}
                <div ref={lineRef} style={{
                    width: 60, height: 2,
                    background: "linear-gradient(90deg, #4a9a52, #2E7D32)",
                    marginBottom: 32,
                    transformOrigin: "left",
                }} />

                <p className="dl-reveal" style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "#4a9a52", marginBottom: 20,
                }}>Resources</p>
                <h2 className="dl-reveal" style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 600,
                    lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff",
                    marginBottom: "clamp(48px, 7vh, 72px)",
                }}>
                    Download our portfolios<br />
                    <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
                        and capabilities.
                    </span>
                </h2>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {DOCS.map((d, i) => (
                        <div key={d.title} className="dl-reveal" suppressHydrationWarning style={{
                            padding: "clamp(28px, 4vh, 40px) 0",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                            position: "relative",
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateX(12px)";
                                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                                const h = e.currentTarget.querySelector("h3") as HTMLElement;
                                if (h) h.style.color = "#4a9a52";
                                const icon = e.currentTarget.querySelector(".download-icon") as HTMLElement;
                                if (icon) {
                                    icon.style.background = "#4a9a52";
                                    icon.style.boxShadow = "0 0 20px rgba(74,154,82,0.4)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.background = "transparent";
                                const h = e.currentTarget.querySelector("h3") as HTMLElement;
                                if (h) h.style.color = "#fff";
                                const icon = e.currentTarget.querySelector(".download-icon") as HTMLElement;
                                if (icon) {
                                    icon.style.background = "rgba(74,154,82,0.1)";
                                    icon.style.boxShadow = "none";
                                }
                            }}>
                            {/* Number indicator */}
                            <span style={{
                                position: "absolute",
                                left: -40,
                                top: "50%",
                                transform: "translateY(-50%)",
                                fontFamily: "monospace",
                                fontSize: 12,
                                color: "rgba(255,255,255,0.1)",
                                letterSpacing: "0.1em",
                            }}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div>
                                    <span style={{
                                        fontSize: 11, color: "rgba(255,255,255,0.35)",
                                        letterSpacing: "0.1em", textTransform: "uppercase",
                                        display: "block", marginBottom: 8,
                                    }}>{d.type} · {d.size}</span>
                                    <h3 style={{
                                        fontSize: "clamp(19px, 2.6vw, 26px)", color: "#fff",
                                        fontWeight: 500, transition: "color 0.3s", marginBottom: 6,
                                    }}>{d.title}</h3>
                                    <p style={{
                                        fontSize: 15, color: "rgba(255,255,255,0.4)",
                                        lineHeight: 1.6, maxWidth: 500,
                                    }}>{d.desc}</p>
                                </div>
                                <div className="download-icon" style={{
                                    width: 52, height: 52, borderRadius: "50%",
                                    background: "rgba(74,154,82,0.1)",
                                    border: "1px solid rgba(74,154,82,0.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                    transition: "all 0.3s ease",
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        stroke="#4a9a52" strokeWidth="2">
                                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>
            </div>
        </section>
    );
}
