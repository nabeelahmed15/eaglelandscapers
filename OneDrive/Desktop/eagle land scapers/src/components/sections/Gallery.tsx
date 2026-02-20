"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        title: "Brigade Metropolis",
        tag: "Asia's Largest Roof Garden",
        img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
        desc: "50,000 sq ft of engineered greenery atop one of Bangalore's most iconic residential complexes.",
    },
    {
        title: "Qualcomm Green Wall",
        tag: "Corporate Vertical Garden",
        img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
        desc: "A 2,400 sq ft living wall with automated drip irrigation and 40 native species.",
    },
    {
        title: "Orion Mall Fountain",
        tag: "Cascade Water Feature",
        img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
        desc: "Multimedia cascade fountain with synchronized LED lighting and musical choreography.",
    },
    {
        title: "Lavasa Floating Fountain",
        tag: "Multimedia Fountain",
        img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
        desc: "India's first floating multimedia fountain with 360° viewing and fog effects.",
    },
];

export default function Gallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            // Header reveals
            gsap.utils.toArray<HTMLElement>(".gal-reveal", section).forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 60, scale: 0.97 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.9, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.08,
                    }
                );
            });

            // Parallax zoom on images
            gsap.utils.toArray<HTMLElement>(".gal-img-inner", section).forEach((img) => {
                gsap.fromTo(img,
                    { scale: 1.2 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="gallery" ref={sectionRef} style={{
            background: "#0a0a0a",
            padding: "clamp(120px, 16vh, 180px) clamp(20px, 5vw, 48px)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Premium background */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "800px",
                height: "800px",
                background: "radial-gradient(circle, rgba(74,154,82,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                {/* Animated line */}
                <div style={{
                    width: 60, height: 2,
                    background: "linear-gradient(90deg, #4a9a52, #2E7D32)",
                    marginBottom: 32,
                }} />

                <p className="gal-reveal" style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "#4a9a52", marginBottom: 20,
                }}>Selected Projects</p>
                <h2 className="gal-reveal" style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 600,
                    lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff",
                    marginBottom: 8,
                }}>
                    Every commission,
                </h2>
                <h2 className="gal-reveal" style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 600,
                    lineHeight: 1.05, letterSpacing: "-0.03em",
                    color: "rgba(255,255,255,0.15)", fontStyle: "italic",
                    marginBottom: "clamp(64px, 9vh, 100px)",
                }}>
                    a legacy.
                </h2>

                {/* Grid — hero + 3 smaller */}
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(16px, 2vw, 24px)",
                }}>
                    {PROJECTS.map((p, i) => (
                        <div 
                            key={p.title} 
                            className="gal-reveal" 
                            suppressHydrationWarning 
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                position: "relative",
                                height: i === 0 ? "clamp(400px, 58vh, 600px)" : "clamp(320px, 45vh, 450px)",
                                borderRadius: 24, overflow: "hidden",
                                cursor: "pointer",
                                gridColumn: i === 0 ? "1 / -1" : undefined,
                                border: "1px solid rgba(255,255,255,0.06)",
                                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                                transform: hoveredIndex === i ? "scale(0.99)" : "scale(1)",
                            }}>
                            <div className="gal-img-inner" style={{
                                position: "absolute", inset: "-12%",
                                width: "124%", height: "124%",
                                filter: hoveredIndex === i ? "brightness(1.1)" : "brightness(1)",
                                transition: "filter 0.5s ease",
                            }}>
                                <Image src={p.img} alt={p.title} fill
                                    style={{ objectFit: "cover" }}
                                    sizes={i === 0 ? "100vw" : "50vw"}
                                />
                            </div>

                            {/* Premium gradient overlay */}
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.9) 100%)",
                            }} />

                            {/* Glow on hover */}
                            <div style={{
                                position: "absolute", inset: 0,
                                background: hoveredIndex === i 
                                    ? "linear-gradient(135deg, rgba(74,154,82,0.15) 0%, transparent 50%)"
                                    : "transparent",
                                transition: "all 0.5s ease",
                                pointerEvents: "none",
                            }} />

                            {/* Number */}
                            <span style={{
                                position: "absolute", top: 24, right: 28,
                                fontSize: 12, fontFamily: "monospace",
                                color: "rgba(255,255,255,0.2)", zIndex: 2,
                                letterSpacing: "0.1em",
                            }}>
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Info */}
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                padding: "clamp(24px, 3.5vw, 40px)", zIndex: 2,
                            }}>
                                <span style={{
                                    display: "inline-block", 
                                    fontSize: 10, fontWeight: 600,
                                    letterSpacing: "0.15em", textTransform: "uppercase",
                                    color: "#4a9a52", 
                                    marginBottom: 12,
                                    padding: "6px 14px",
                                    background: "rgba(74,154,82,0.15)",
                                    borderRadius: 20,
                                    border: "1px solid rgba(74,154,82,0.2)",
                                }}>{p.tag}</span>
                                <h3 style={{
                                    fontFamily: "var(--font-playfair), Georgia, serif",
                                    fontSize: i === 0 ? "clamp(30px, 4vw, 48px)" : "clamp(24px, 2.8vw, 36px)",
                                    fontWeight: 600, color: "#fff",
                                    letterSpacing: "-0.02em", 
                                    lineHeight: 1.15, 
                                    marginBottom: 12,
                                }}>{p.title}</h3>
                                <p style={{
                                    fontSize: 15, color: "rgba(255,255,255,0.5)",
                                    lineHeight: 1.6, maxWidth: 520,
                                    opacity: hoveredIndex === i ? 1 : 0.8,
                                    transform: hoveredIndex === i ? "translateY(0)" : "translateY(10px)",
                                    transition: "all 0.4s ease",
                                }}>{p.desc}</p>
                            </div>

                            {/* View project button on hover */}
                            <div style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                opacity: hoveredIndex === i ? 1 : 0,
                                transition: "opacity 0.4s ease",
                                zIndex: 3,
                            }}>
                                <div style={{
                                    background: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(10px)",
                                    padding: "16px 32px",
                                    borderRadius: 50,
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    display: "flex", alignItems: "center", gap: 10,
                                    cursor: "pointer",
                                }}>
                                    <span style={{
                                        fontSize: 13, fontWeight: 600,
                                        color: "#fff", letterSpacing: "0.05em",
                                    }}>View Project</span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
