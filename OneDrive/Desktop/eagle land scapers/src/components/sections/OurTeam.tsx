"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function OurTeam() {
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

            gsap.utils.toArray<HTMLElement>(".team-reveal", section).forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.08,
                    }
                );
            });

            const img = section.querySelector(".team-parallax-img");
            if (img) {
                gsap.to(img, {
                    yPercent: -15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="team" ref={sectionRef} style={{
            background: "#0a0a0a",
            padding: "clamp(120px, 16vh, 180px) clamp(20px, 5vw, 48px)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Premium background */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "-10%",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(74,154,82,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                {/* Animated line */}
                <div ref={lineRef} style={{
                    width: 60, height: 2,
                    background: "linear-gradient(90deg, #4a9a52, #2E7D32)",
                    marginBottom: 32,
                    transformOrigin: "left",
                }} />

                <p className="team-reveal" suppressHydrationWarning style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "#4a9a52", marginBottom: 20,
                }}>The Practice</p>
                <h2 className="team-reveal" suppressHydrationWarning style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 600,
                    lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff",
                    marginBottom: "clamp(56px, 8vh, 90px)",
                }}>
                    Our People
                </h2>

                {/* Team photo with parallax - Premium */}
                <div className="team-reveal" suppressHydrationWarning style={{
                    position: "relative", width: "100%",
                    height: "clamp(360px, 50vh, 560px)",
                    borderRadius: 24, overflow: "hidden",
                    marginBottom: "clamp(56px, 9vh, 96px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                }}>
                    <div className="team-parallax-img" style={{
                        position: "absolute", inset: "-15%",
                        width: "130%", height: "130%",
                    }}>
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
                            alt="ZTC International Team" fill
                            style={{ objectFit: "cover" }} sizes="100vw"
                        />
                    </div>
                    {/* Premium overlay */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.85) 100%)",
                    }} />
                    
                    {/* Glow effect */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, rgba(74,154,82,0.1) 0%, transparent 40%)",
                        pointerEvents: "none",
                    }} />

                    <div style={{
                        position: "absolute", bottom: 36, left: 40, zIndex: 2,
                    }}>
                        <span style={{
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 600,
                            color: "#fff",
                        }}>50+ landscape engineers</span>
                        <span style={{
                            display: "block", fontSize: 14, color: "rgba(255,255,255,0.45)",
                            marginTop: 8,
                        }}>Ecologists, architects, and project directors</span>
                    </div>
                </div>

                {/* Founder - Premium layout */}
                <div className="responsive-grid-2" style={{
                    display: "grid", gridTemplateColumns: "auto 1fr",
                    gap: "clamp(40px, 6vw, 80px)", alignItems: "start",
                }}>
                    <div className="team-reveal" suppressHydrationWarning style={{
                        width: "clamp(120px, 14vw, 180px)",
                        height: "clamp(120px, 14vw, 180px)",
                        borderRadius: "50%", overflow: "hidden",
                        position: "relative",
                        border: "3px solid rgba(74,154,82,0.2)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}>
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                            alt="Founder" fill
                            style={{ objectFit: "cover" }} sizes="180px"
                        />
                    </div>
                    <div>
                        <span className="team-reveal" style={{
                            display: "block", fontSize: 11, fontWeight: 600,
                            letterSpacing: "0.18em", textTransform: "uppercase",
                            color: "#4a9a52", marginBottom: 16,
                        }}>Founder &amp; Managing Director</span>
                        <h3 className="team-reveal" style={{
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 600,
                            color: "#fff", letterSpacing: "-0.02em", marginBottom: 28,
                        }}>ZTC International</h3>
                        <p className="team-reveal" style={{
                            fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.75,
                            color: "rgba(255,255,255,0.5)", marginBottom: 32,
                            maxWidth: 560,
                        }}>
                            ZTC International was founded with a singular vision —
                            to bring international-quality landscape engineering to
                            India. We have delivered over 500 projects including
                            Asia&apos;s largest roof garden at Brigade Metropolis.
                        </p>
                        
                        {/* Premium quote box */}
                        <div className="team-reveal" suppressHydrationWarning style={{
                            padding: 28,
                            background: "linear-gradient(135deg, rgba(74,154,82,0.08) 0%, rgba(46,125,50,0.03) 100%)",
                            borderRadius: 18,
                            border: "1px solid rgba(74,154,82,0.15)",
                            position: "relative",
                            overflow: "hidden",
                        }}>
                            {/* Glow */}
                            <div style={{
                                position: "absolute",
                                top: "-30%",
                                left: "-20%",
                                width: "150%",
                                height: "150%",
                                background: "radial-gradient(circle, rgba(74,154,82,0.08) 0%, transparent 50%)",
                                pointerEvents: "none",
                            }} />
                            <p style={{
                                fontFamily: "var(--font-playfair), Georgia, serif",
                                fontSize: "clamp(18px, 1.7vw, 24px)", fontStyle: "italic",
                                color: "rgba(255,255,255,0.7)", lineHeight: 1.6,
                                position: "relative",
                                zIndex: 1,
                            }}>
                                &ldquo;We don&apos;t just plant trees. We engineer
                                ecosystems that will outlive us all.&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
