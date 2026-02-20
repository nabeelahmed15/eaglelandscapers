"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
    const [sent, setSent] = useState(false);

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

            gsap.utils.toArray<HTMLElement>(".contact-reveal", section).forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                        delay: i * 0.1,
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    const inputStyles: React.CSSProperties = {
        width: "100%",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "18px 20px",
        color: "#fff",
        fontSize: 15,
        fontFamily: "inherit",
        outline: "none",
        transition: "all 0.3s ease",
    };

    return (
        <section id="contact" ref={sectionRef} style={{
            background: "#0a0a0a",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Premium background effects */}
            <div style={{
                position: "absolute", inset: 0,
            }}>
                <Image
                    src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=60"
                    alt="" fill style={{ objectFit: "cover", opacity: 0.06 }} sizes="100vw"
                />
            </div>
            
            {/* Gradient overlays */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.5) 100%)",
                pointerEvents: "none",
            }} />
            
            <div style={{
                position: "absolute",
                top: "-30%",
                right: "-20%",
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(74,154,82,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{
                position: "relative", zIndex: 2,
                padding: "clamp(120px, 16vh, 180px) clamp(20px, 5vw, 48px)",
            }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    {/* Animated line */}
                    <div ref={lineRef} style={{
                        width: 60, height: 2,
                        background: "linear-gradient(90deg, #4a9a52, #2E7D32)",
                        marginBottom: 32,
                        transformOrigin: "left",
                    }} />

                    <p className="contact-reveal" suppressHydrationWarning style={{
                        fontSize: 11, fontWeight: 600, letterSpacing: "0.25em",
                        textTransform: "uppercase", color: "#4a9a52", marginBottom: 20,
                    }}>Get In Touch</p>
                    <h2 className="contact-reveal" suppressHydrationWarning style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 600,
                        lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fff",
                        maxWidth: 650, marginBottom: "clamp(48px, 7vh, 80px)",
                    }}>
                        Let&apos;s build something<br />
                        <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
                            that lives and breathes.
                        </span>
                    </h2>

                    <div className="contact-reveal" suppressHydrationWarning style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr",
                        gap: "clamp(48px, 7vw, 96px)",
                    }}>
                        {/* Info */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                            {[
                                { 
                                    label: "Office", 
                                    value: "ZTC International\nC-340, 1st Stage, Peenya Industrial Estate\nBengaluru, Karnataka 560058",
                                    icon: "📍"
                                },
                                { 
                                    label: "Email", 
                                    value: "info@ztcinternational.com",
                                    icon: "✉️"
                                },
                                { 
                                    label: "Phone", 
                                    value: "+91 80 2839 0000",
                                    icon: "📞"
                                },
                            ].map((item, i) => (
                                <div key={item.label} style={{
                                    padding: 24,
                                    background: "rgba(255,255,255,0.02)",
                                    borderRadius: 16,
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                    e.currentTarget.style.borderColor = "rgba(74,154,82,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                                }}
                                >
                                    <div style={{
                                        fontSize: 11, fontWeight: 600, letterSpacing: "0.15em",
                                        textTransform: "uppercase", color: "#4a9a52",
                                        marginBottom: 12,
                                        display: "flex", alignItems: "center", gap: 8,
                                    }}>
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </div>
                                    <div style={{
                                        fontSize: 16, color: "rgba(255,255,255,0.7)",
                                        lineHeight: 1.7, whiteSpace: "pre-line",
                                    }}>{item.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Form - Premium */}
                        <div style={{
                            padding: 36,
                            background: "rgba(255,255,255,0.02)",
                            borderRadius: 24,
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}>
                            {sent ? (
                                <div style={{ padding: "20px 0", textAlign: "center" }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: "50%",
                                        background: "rgba(74,154,82,0.15)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        margin: "0 auto 28px",
                                        boxShadow: "0 0 40px rgba(74,154,82,0.2)",
                                    }}>
                                        <svg width="28" height="28" viewBox="0 0 24 24"
                                            fill="none" stroke="#4a9a52" strokeWidth="2.5">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <h3 style={{
                                        fontFamily: "var(--font-playfair), Georgia, serif",
                                        fontSize: 28, fontWeight: 600, color: "#fff", marginBottom: 12,
                                    }}>Enquiry received.</h3>
                                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }}>
                                        We&apos;ll be in touch within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{
                                    display: "flex", flexDirection: "column", gap: 16,
                                }}>
                                    {[
                                        { key: "name", label: "Full Name", type: "text" },
                                        { key: "company", label: "Company", type: "text" },
                                        { key: "email", label: "Email", type: "email" },
                                    ].map((f) => (
                                        <input
                                            key={f.key} type={f.type} required
                                            placeholder={f.label}
                                            value={form[f.key as keyof typeof form]}
                                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                            style={inputStyles}
                                            suppressHydrationWarning
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = "#4a9a52";
                                                e.currentTarget.style.background = "rgba(74,154,82,0.05)";
                                                e.currentTarget.style.boxShadow = "0 0 20px rgba(74,154,82,0.1)";
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        />
                                    ))}
                                    <textarea
                                        required rows={5}
                                        placeholder="Tell us about your project"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        style={{ ...inputStyles, resize: "none" }}
                                        suppressHydrationWarning
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#4a9a52";
                                            e.currentTarget.style.background = "rgba(74,154,82,0.05)";
                                            e.currentTarget.style.boxShadow = "0 0 20px rgba(74,154,82,0.1)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                    <button type="submit" suppressHydrationWarning style={{
                                        alignSelf: "flex-start", marginTop: 12,
                                        padding: "16px 48px",
                                        background: "linear-gradient(135deg, #4a9a52 0%, #2E7D32 100%)",
                                        color: "#fff", fontSize: 14, fontWeight: 600,
                                        letterSpacing: "0.1em", textTransform: "uppercase",
                                        border: "none", borderRadius: 50, cursor: "pointer",
                                        fontFamily: "inherit",
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 8px 24px rgba(74,154,82,0.3)",
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-3px)";
                                            e.currentTarget.style.boxShadow = "0 16px 40px rgba(74,154,82,0.4)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "none";
                                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(74,154,82,0.3)";
                                        }}>
                                        Submit Enquiry
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Footer - ZTC Copyright */}
                    <div className="contact-reveal" suppressHydrationWarning style={{
                        marginTop: "clamp(80px, 12vh, 120px)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        paddingTop: 28,
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        flexWrap: "wrap", gap: 16,
                    }}>
                        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
                            © 2025 ZTC International Landscape Solutions (P) Ltd.
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                                width: 8, height: 8,
                                borderRadius: "50%",
                                background: "#4a9a52",
                                boxShadow: "0 0 10px rgba(74,154,82,0.5)",
                            }} />
                            <span style={{
                                color: "rgba(255,255,255,0.35)", fontSize: 13,
                                fontFamily: "var(--font-playfair), Georgia, serif",
                                fontStyle: "italic",
                            }}>
                                Landscape Engineering Pioneer
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
