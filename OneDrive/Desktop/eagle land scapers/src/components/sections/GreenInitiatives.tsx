"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        title: "Green Walls",
        desc: "Living vertical gardens that transform concrete facades into thriving ecosystems — both indoors and outdoors, with fully automated irrigation.",
        img: "https://images.unsplash.com/photo-1524247108137-732e0f642303?w=800&q=80",
        stat: "2,400 sq ft",
        statLabel: "Largest installation",
    },
    {
        title: "Roof Gardens",
        desc: "Asia's largest roof garden at Brigade Metropolis. Intensive and extensive rooftop greenery with engineered drainage and waterproofing systems.",
        img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
        stat: "50,000 sq ft",
        statLabel: "Asia's largest",
    },
    {
        title: "Water Systems",
        desc: "Storm water, rainwater harvesting, lake management, and smart irrigation — zero waste, fully integrated, and engineered to last decades.",
        img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
        stat: "Zero Waste",
        statLabel: "Closed-loop design",
    },
    {
        title: "Fountain Tech",
        desc: "Architectural water features — cascade, mist, rain curtain, and multimedia floating fountains. Designed, built, and maintained by our in-house team.",
        img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
        stat: "360°",
        statLabel: "Multimedia viewing",
    },
];

export default function GreenInitiatives() {
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
                    duration: 1.2, ease: "power3.out",
                    scrollTrigger: {
                        trigger: lineRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                }
            );

            // Header reveals
            gsap.utils.toArray<HTMLElement>(".svc-header-reveal", section).forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.1,
                    }
                );
            });

            // Service cards — staggered reveal with premium effect
            gsap.utils.toArray<HTMLElement>(".svc-card", section).forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 100, scale: 0.96 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 1, ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.12,
                    }
                );
            });

            // Parallax images inside cards
            gsap.utils.toArray<HTMLElement>(".svc-parallax-img", section).forEach((img) => {
                gsap.to(img, {
                    yPercent: -25,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });

            // Card hover glow effect
            gsap.utils.toArray<HTMLElement>(".svc-card-inner").forEach((card) => {
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, { scale: 1.02, duration: 0.4, ease: "power2.out" });
                });
                card.addEventListener("mouseleave", () => {
                    gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out" });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} style={{
            background: "#0a0a0a",
            padding: "clamp(120px, 16vh, 180px) clamp(20px, 5vw, 48px)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Premium background accents */}
            <div style={{
                position: "absolute",
                top: "10%",
                left: "-15%",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(74,154,82,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute",
                bottom: "10%",
                right: "-10%",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(46,125,50,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                {/* Premium animated line */}
                <div ref={lineRef} style={{
                    width: 60, height: 2,
                    background: "linear-gradient(90deg, #4a9a52, #2E7D32)",
                    marginBottom: 32,
                    transformOrigin: "left",
                }} />

                {/* Section header */}
                <p className="svc-header-reveal" style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "#4a9a52", marginBottom: 20,
                }}>
                    What We Engineer
                </p>
                <h2 className="svc-header-reveal" style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 600,
                    lineHeight: 1.05, letterSpacing: "-0.03em",
                    color: "#fff",
                    marginBottom: 8,
                }}>
                    Six disciplines.
                </h2>
                <h2 className="svc-header-reveal" style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 600,
                    lineHeight: 1.05, letterSpacing: "-0.03em",
                    color: "rgba(255,255,255,0.15)",
                    fontStyle: "italic",
                    marginBottom: "clamp(64px, 9vh, 100px)",
                }}>
                    One living system.
                </h2>

                {/* Service cards — alternating layout */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(48px, 7vh, 80px)" }}>
                    {SERVICES.map((s, i) => {
                        const isReversed = i % 2 !== 0;
                        return (
                            <div key={s.title} className="svc-card" suppressHydrationWarning style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "clamp(32px, 5vw, 72px)",
                                alignItems: "center",
                                direction: isReversed ? "rtl" : "ltr",
                            }}>
                                {/* Image - Premium card */}
                                <div className="svc-card-inner" style={{
                                    direction: "ltr",
                                    position: "relative",
                                    height: "clamp(320px, 45vh, 480px)",
                                    borderRadius: 24, overflow: "hidden",
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    transition: "all 0.4s ease",
                                }}>
                                    <div className="svc-parallax-img" style={{
                                        position: "absolute", inset: "-25%",
                                        width: "150%", height: "150%",
                                    }}>
                                        <Image src={s.img} alt={s.title} fill
                                            style={{ objectFit: "cover" }} sizes="50vw"
                                        />
                                    </div>
                                    {/* Premium overlay */}
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: "linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.8) 100%)",
                                    }} />
                                    
                                    {/* Glow effect */}
                                    <div style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(135deg, rgba(74,154,82,0.1) 0%, transparent 50%)",
                                        pointerEvents: "none",
                                    }} />

                                    {/* Stat badge - Premium */}
                                    <div style={{
                                        position: "absolute", bottom: 24, left: 28, zIndex: 2,
                                        background: "rgba(10,10,10,0.8)",
                                        backdropFilter: "blur(10px)",
                                        padding: "16px 24px",
                                        borderRadius: 14,
                                        border: "1px solid rgba(74,154,82,0.2)",
                                    }}>
                                        <div style={{
                                            fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 700,
                                            fontFamily: "var(--font-playfair), Georgia, serif",
                                            color: "#fff",
                                            textShadow: "0 0 30px rgba(74,154,82,0.3)",
                                        }}>{s.stat}</div>
                                        <div style={{
                                            fontSize: 10, color: "rgba(255,255,255,0.5)",
                                            textTransform: "uppercase", letterSpacing: "0.12em",
                                        }}>{s.statLabel}</div>
                                    </div>
                                </div>

                                {/* Text */}
                                <div style={{ direction: "ltr" }}>
                                    <span style={{
                                        fontFamily: "monospace", fontSize: 13,
                                        color: "rgba(74,154,82,0.5)",
                                        display: "block", marginBottom: 16,
                                        letterSpacing: "0.1em",
                                    }}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 style={{
                                        fontFamily: "var(--font-playfair), Georgia, serif",
                                        fontSize: "clamp(26px, 3.2vw, 40px)",
                                        fontWeight: 600, color: "#fff",
                                        letterSpacing: "-0.02em",
                                        marginBottom: 20,
                                    }}>{s.title}</h3>
                                    <p style={{
                                        fontSize: "clamp(16px, 1.2vw, 19px)",
                                        lineHeight: 1.75,
                                        color: "rgba(255,255,255,0.5)",
                                        maxWidth: 480,
                                    }}>{s.desc}</p>
                                    
                                    {/* Learn more link */}
                                    <div style={{
                                        marginTop: 28,
                                        display: "flex", alignItems: "center", gap: 8,
                                        cursor: "pointer",
                                    }}>
                                        <span style={{
                                            fontSize: 13, fontWeight: 600,
                                            color: "#4a9a52",
                                            letterSpacing: "0.05em",
                                        }}>Learn more</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="#4a9a52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
