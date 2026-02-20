"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { value: 14, suffix: "+", label: "Years" },
    { value: 500, suffix: "+", label: "Projects" },
    { value: 50, suffix: "+", label: "Engineers" },
    { value: 150, suffix: "+", label: "Cities" },
];

export default function AboutUs() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            // Premium: Animated gradient line
            gsap.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1, opacity: 1,
                    duration: 1.5, ease: "power3.out",
                    scrollTrigger: {
                        trigger: lineRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                }
            );

            // Headline words fly in with stagger
            gsap.utils.toArray<HTMLElement>(".about-word", section).forEach((word, i) => {
                gsap.fromTo(word,
                    { opacity: 0, y: 60, rotateX: -40 },
                    {
                        opacity: 1, y: 0, rotateX: 0,
                        duration: 0.8, ease: "power3.out",
                        scrollTrigger: {
                            trigger: word,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.08,
                    }
                );
            });

            // Body text and elements with premium fade
            gsap.utils.toArray<HTMLElement>(".about-reveal", section).forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 1, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.1,
                    }
                );
            });

            // Premium: Image reveal with clip path
            const imgContainer = section.querySelector(".about-img-container");
            if (imgContainer) {
                gsap.fromTo(imgContainer,
                    { clipPath: "inset(0 100% 0 0)" },
                    {
                        clipPath: "inset(0 0% 0 0)",
                        duration: 1.2, ease: "power3.out",
                        scrollTrigger: {
                            trigger: imgContainer,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        }
                    }
                );
            }

            // Parallax image
            const img = section.querySelector(".about-parallax-img");
            if (img) {
                gsap.to(img, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Stat count-up with glow effect
            gsap.utils.toArray<HTMLElement>(".about-stat-number", section).forEach((el) => {
                const target = parseInt(el.dataset.value || "0", 10);
                const suffix = el.dataset.suffix || "";
                gsap.fromTo(el,
                    { innerText: "0" },
                    {
                        innerText: target,
                        duration: 2.5,
                        snap: { innerText: 1 },
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                        onUpdate: function () {
                            el.textContent = Math.round(parseFloat(el.innerText)) + suffix;
                        },
                    }
                );
            });

            // Premium: Stats container slide up
            gsap.fromTo(".stats-container",
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0,
                    duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".stats-container",
                        start: "top 90%",
                        toggleActions: "play none none none",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} style={{
            background: "#0a0a0a",
            padding: "clamp(120px, 16vh, 180px) clamp(20px, 5vw, 48px)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Premium background accent */}
            <div style={{
                position: "absolute",
                top: "-20%",
                right: "-10%",
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(74,154,82,0.08) 0%, transparent 70%)",
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

                {/* Tag */}
                <p className="about-word" style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "#4a9a52", marginBottom: 20,
                }}>
                    About ZTC International
                </p>

                {/* Headline — each word animates in */}
                <h2 style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(38px, 5.5vw, 76px)", fontWeight: 600,
                    lineHeight: 1.05, letterSpacing: "-0.03em",
                    marginBottom: "clamp(48px, 7vh, 72px)",
                }}>
                    <span className="about-word" style={{ display: "inline-block", color: "#fff" }}>
                        We pioneered&nbsp;
                    </span>
                    <span className="about-word" style={{ display: "inline-block", color: "#fff" }}>
                        Landscape&nbsp;
                    </span>
                    <span className="about-word" style={{ display: "inline-block", color: "#fff" }}>
                        Engineering
                    </span>
                    <br />
                    <span className="about-word" style={{
                        display: "inline-block",
                        color: "rgba(255,255,255,0.15)",
                        fontStyle: "italic",
                    }}>
                        in India.
                    </span>
                </h2>

                {/* Two-column layout */}
                <div className="responsive-grid-2" style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(48px, 7vw, 96px)", alignItems: "start",
                    marginBottom: "clamp(72px, 11vh, 120px)",
                }}>
                    {/* Text side */}
                    <div>
                        <p className="about-reveal" suppressHydrationWarning style={{
                            fontSize: "clamp(17px, 1.35vw, 21px)",
                            lineHeight: 1.75, color: "rgba(255,255,255,0.6)",
                            marginBottom: 32,
                        }}>
                            From Asia&apos;s largest roof garden at Brigade Metropolis to iconic
                            living walls for Qualcomm, we design landscapes that are alive,
                            intelligent, and built to endure for generations.
                        </p>
                        <p className="about-reveal" suppressHydrationWarning style={{
                            fontSize: "clamp(15px, 1.15vw, 18px)",
                            lineHeight: 1.75, color: "rgba(255,255,255,0.4)",
                            marginBottom: 40,
                        }}>
                            Every project begins with the land itself. We study its ecology,
                            water systems, and light — and engineer a living system that works
                            with nature, never against it.
                        </p>
                        
                        {/* Premium quote box */}
                        <div className="about-reveal" suppressHydrationWarning style={{
                            padding: 28,
                            background: "linear-gradient(135deg, rgba(74,154,82,0.08) 0%, rgba(46,125,50,0.04) 100%)",
                            borderRadius: 16,
                            border: "1px solid rgba(74,154,82,0.15)",
                            position: "relative",
                            overflow: "hidden",
                        }}>
                            {/* Glow effect */}
                            <div style={{
                                position: "absolute",
                                top: "-50%",
                                left: "-50%",
                                width: "200%",
                                height: "200%",
                                background: "radial-gradient(circle, rgba(74,154,82,0.1) 0%, transparent 50%)",
                                pointerEvents: "none",
                            }} />
                            <p style={{
                                fontFamily: "var(--font-playfair), Georgia, serif",
                                fontSize: "clamp(17px, 1.6vw, 23px)",
                                fontStyle: "italic",
                                color: "rgba(255,255,255,0.7)",
                                lineHeight: 1.6,
                                position: "relative",
                                zIndex: 1,
                            }}>
                                &ldquo;We don&apos;t just plant trees. We engineer ecosystems
                                that will outlive us all.&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Image side - premium reveal */}
                    <div className="about-img-container" suppressHydrationWarning style={{
                        position: "relative",
                        height: "clamp(360px, 55vh, 580px)",
                        borderRadius: 24, overflow: "hidden",
                    }}>
                        <div className="about-parallax-img" style={{
                            position: "absolute", inset: "-20%",
                            width: "140%", height: "140%",
                        }}>
                            <Image
                                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80"
                                alt="Engineered landscape by ZTC International"
                                fill style={{ objectFit: "cover" }} sizes="50vw"
                            />
                        </div>
                        {/* Premium overlay */}
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.7) 100%)",
                        }} />
                        
                        {/* Floating badge */}
                        <div style={{
                            position: "absolute", bottom: 24, left: 24,
                            background: "rgba(10,10,10,0.8)",
                            backdropFilter: "blur(10px)",
                            padding: "16px 24px",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}>
                            <span style={{
                                fontSize: 10, fontWeight: 600,
                                letterSpacing: "0.15em", textTransform: "uppercase",
                                color: "#4a9a52",
                            }}>Award Winning</span>
                            <p style={{
                                fontFamily: "var(--font-playfair), Georgia, serif",
                                fontSize: 16, color: "#fff", marginTop: 4,
                            }}>Best Landscape Architecture 2024</p>
                        </div>
                    </div>
                </div>

                {/* Stats bar - premium container */}
                <div className="stats-container" suppressHydrationWarning style={{
                    display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 32, 
                    padding: "clamp(32px, 5vh, 48px)",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
                    borderRadius: 24,
                    border: "1px solid rgba(255,255,255,0.05)",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    {/* Premium glow */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: "25%",
                        width: "1px",
                        height: "100%",
                        background: "linear-gradient(180deg, transparent, rgba(74,154,82,0.3), transparent)",
                    }} />
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        width: "1px",
                        height: "100%",
                        background: "linear-gradient(180deg, transparent, rgba(74,154,82,0.3), transparent)",
                    }} />
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: "75%",
                        width: "1px",
                        height: "100%",
                        background: "linear-gradient(180deg, transparent, rgba(74,154,82,0.3), transparent)",
                    }} />
                    
                    {STATS.map((s, i) => (
                        <div key={s.label} style={{ 
                            textAlign: "center",
                            position: "relative",
                            zIndex: 1,
                        }}>
                            <div
                                className="about-stat-number"
                                data-value={s.value}
                                data-suffix={s.suffix}
                                style={{
                                    fontFamily: "var(--font-playfair), Georgia, serif",
                                    fontSize: "clamp(32px, 4vw, 56px)",
                                    fontWeight: 600, color: "#fff",
                                    textShadow: "0 0 40px rgba(74,154,82,0.3)",
                                }}
                            >
                                0
                            </div>
                            <div style={{
                                fontSize: 11, color: "rgba(255,255,255,0.35)",
                                letterSpacing: "0.15em", textTransform: "uppercase",
                                marginTop: 8,
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
