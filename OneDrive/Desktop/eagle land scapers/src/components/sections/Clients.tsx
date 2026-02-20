"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real ZTC International Clients
const CLIENTS = [
    { name: "Brigade Group", type: "Real Estate" },
    { name: "Qualcomm", type: "Technology" },
    { name: "Embassy Group", type: "Real Estate" },
    { name: "Ozone Group", type: "Real Estate" },
    { name: "Prestige Estates", type: "Real Estate" },
    { name: "Reliance Industries", type: "Conglomerate" },
    { name: "L&T", type: "Engineering" },
    { name: "Mantri Group", type: "Real Estate" },
    { name: "NCC Ltd", type: "Construction" },
    { name: "Unitech", type: "Real Estate" },
    { name: "Aga Khan Academy", type: "Education" },
    { name: "ETA Group", type: "Construction" },
    { name: "ITC Hotels", type: "Hospitality" },
    { name: "Sheraton", type: "Hospitality" },
    { name: "GMR Group", type: "Infrastructure" },
    { name: "Adarsh Developers", type: "Real Estate" },
];

const STATS = [
    { n: "14+", l: "Years of Excellence" },
    { n: "500+", l: "Landscapes Delivered" },
    { n: "15+", l: "Fortune 500 Clients" },
    { n: "Pan-India", l: "Presence" },
];

export default function Clients() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".cli-reveal", section).forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // Marquee — continuous scroll
            gsap.utils.toArray<HTMLElement>(".cli-marquee-inner", section).forEach((row, i) => {
                const dir = i % 2 === 0 ? -1 : 1;
                gsap.to(row, {
                    xPercent: dir * -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const row1 = CLIENTS.slice(0, 8);
    const row2 = CLIENTS.slice(8, 16);

    const renderCard = (c: (typeof CLIENTS)[0], idx: number) => (
        <div key={`${c.name}-${idx}`} suppressHydrationWarning style={{
            flexShrink: 0,
            width: "clamp(180px, 20vw, 250px)",
            padding: "clamp(20px, 2.5vw, 32px)",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", flexDirection: "column", gap: 10,
            transition: "border-color 0.3s, transform 0.3s",
            cursor: "default",
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(74,154,82,0.3)";
                e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "none";
            }}
        >
            <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #2E7D32, #4CAF50)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 16, fontWeight: 700,
                fontFamily: "var(--font-playfair), Georgia, serif",
            }}>{c.name.charAt(0)}</div>
            <h3 style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{c.name}</h3>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{c.type}</span>
        </div>
    );

    return (
        <section id="clients" ref={sectionRef} style={{
            background: "#0a0a0a",
            padding: "clamp(80px, 12vh, 140px) 0",
            overflow: "hidden",
        }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)" }}>
                <p className="cli-reveal" style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#4a9a52", marginBottom: 20,
                }}>— Trusted Partners</p>
                <h2 className="cli-reveal" style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 600,
                    lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff",
                    marginBottom: "clamp(48px, 7vh, 72px)",
                }}>
                    India&apos;s finest builders<br />
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>trust ZTC International.</span>
                </h2>
            </div>

            {/* Marquee rows */}
            <div className="cli-reveal" style={{
                display: "flex", flexDirection: "column",
                gap: "clamp(10px, 1.5vh, 16px)", marginBottom: "clamp(48px,7vh,72px)",
            }}>
                <div style={{ overflow: "hidden" }}>
                    <div className="cli-marquee-inner" style={{
                        display: "flex", gap: "clamp(10px, 1.5vw, 16px)",
                        width: "max-content",
                    }}>
                        {[...row1, ...row1, ...row1, ...row1].map((c, i) => renderCard(c, i))}
                    </div>
                </div>
                <div style={{ overflow: "hidden" }}>
                    <div className="cli-marquee-inner" style={{
                        display: "flex", gap: "clamp(10px, 1.5vw, 16px)",
                        width: "max-content", transform: "translateX(-10%)",
                    }}>
                        {[...row2, ...row2, ...row2, ...row2].map((c, i) => renderCard(c, i))}
                    </div>
                </div>
            </div>

            {/* Stats stripe */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)" }}>
                <div className="cli-reveal" style={{
                    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "clamp(24px,3vh,36px)",
                }}>
                    {STATS.map((s) => (
                        <div key={s.l} style={{ textAlign: "center" }}>
                            <div style={{
                                fontFamily: "var(--font-playfair), Georgia, serif",
                                fontSize: "clamp(24px,3vw,40px)", fontWeight: 600,
                                color: "#fff",
                            }}>{s.n}</div>
                            <div style={{
                                fontSize: 10, color: "rgba(255,255,255,0.3)",
                                letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4,
                            }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
