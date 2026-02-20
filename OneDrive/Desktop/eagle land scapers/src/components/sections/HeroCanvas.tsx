"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const FRAME_PATH = "/frames/ezgif-74d890837bf89c78-png-split/ezgif-frame-";

function frameSrc(i: number) {
    return `${FRAME_PATH}${String(i).padStart(3, "0")}.png`;
}

export default function HeroCanvas() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const [loadProgress, setLoadProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const currentFrameRef = useRef(0);
    const scrollProgressRef = useRef(0);
    const renderedFrameRef = useRef(-1);

    // Create floating particles
    useEffect(() => {
        if (!particlesRef.current || !loaded) return;

        const container = particlesRef.current;
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 5;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(74, 154, 82, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                pointer-events: none;
                box-shadow: 0 0 ${size * 2}px rgba(74, 154, 82, 0.5);
            `;

            container.appendChild(particle);

            // Animate particle float
            gsap.to(particle, {
                y: -100 - Math.random() * 200,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                duration: duration,
                delay: delay,
                repeat: -1,
                ease: "none",
            });
        }
    }, [loaded]);

    // ── Load all frames ──────────────────────────────
    useEffect(() => {
        let cancelled = false;
        let loadedCount = 0;
        const imgs: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);

        console.log("Starting frame loading...");

        const checkAllLoaded = () => {
            if (cancelled) return;
            const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
            setLoadProgress(progress);
            
            if (loadedCount === FRAME_COUNT) {
                console.log("All frames loaded successfully");
                imagesRef.current = imgs;
                setLoaded(true);
            }
        };

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            
            img.onload = () => {
                if (cancelled) return;
                loadedCount++;
                imgs[i] = img;
                checkAllLoaded();
            };
            
            img.onerror = () => {
                if (cancelled) return;
                loadedCount++;
                console.warn(`Frame ${i + 1} failed to load`);
                checkAllLoaded();
            };
            
            img.src = frameSrc(i + 1);
        }

        const timeout = setTimeout(() => {
            if (!cancelled && loadedCount < FRAME_COUNT) {
                console.warn(`Timeout: proceeding with ${loadedCount}/${FRAME_COUNT} frames`);
                imagesRef.current = imgs;
                setLoaded(true);
            }
        }, 15000);

        return () => { 
            cancelled = true; 
            clearTimeout(timeout);
        };
    }, []);

    // ── Canvas Rendering ─────────────────────────────
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const img = imagesRef.current[index];
        
        if (!canvas || !context || !img || !img.complete || img.naturalHeight === 0) {
            return;
        }

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        // Premium: Add subtle vignette
        const gradient = context.createRadialGradient(
            canvasWidth / 2, canvasHeight / 2, 0,
            canvasWidth / 2, canvasHeight / 2, canvasWidth * 0.7
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.4)");

        context.fillStyle = "#000";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        // Add subtle color grading - warm tones
        context.fillStyle = "rgba(74, 154, 82, 0.03)";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
    }, []);

    // ── Setup Canvas & ScrollTrigger ─────────────────
    useEffect(() => {
        if (!loaded || !canvasRef.current || !sectionRef.current || !containerRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(currentFrameRef.current);
        };
        
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        renderFrame(0);
        renderedFrameRef.current = 0;

        gsap.to({ value: 0 }, {
            value: FRAME_COUNT - 1,
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                onUpdate: function(self) {
                    const frameIndex = Math.round(self.progress * (FRAME_COUNT - 1));
                    if (frameIndex !== renderedFrameRef.current && frameIndex >= 0 && frameIndex < FRAME_COUNT) {
                        renderedFrameRef.current = frameIndex;
                        currentFrameRef.current = frameIndex;
                        renderFrame(frameIndex);
                    }
                }
            }
        });

        // Premium: Animate particles on scroll
        gsap.to(".particle", {
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

        console.log("HeroCanvas: Initialized successfully");

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [loaded, renderFrame]);

    return (
        <div 
            ref={containerRef}
            style={{ height: `${FRAME_COUNT * 10}px`, position: "relative" }}
        >
            <div
                ref={sectionRef}
                id="hero"
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                    background: "#000",
                    overflow: "hidden",
                }}
                suppressHydrationWarning
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "block",
                    }}
                />

                {/* Premium floating particles */}
                <div 
                    ref={particlesRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        overflow: "hidden",
                    }}
                    className="particles-container"
                />

                {/* Premium gradient overlay */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)",
                    pointerEvents: "none",
                }} />

                {/* Loading screen - premium minimal */}
                {!loaded && (
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 20,
                        background: "#0a0a0a",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        gap: 24,
                    }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 12,
                        }}>
                            <div style={{
                                width: 8, height: 8,
                                borderRadius: "50%",
                                background: "#4a9a52",
                                boxShadow: "0 0 20px rgba(74, 154, 82, 0.6)",
                            }} />
                            <span style={{
                                fontFamily: "var(--font-playfair), Georgia, serif",
                                fontSize: 14,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.7)",
                                letterSpacing: "0.1em",
                            }}>
                                EAGLE LANDSCAPERS
                            </span>
                        </div>
                        <div style={{
                            width: 200, height: 1,
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: 1, overflow: "hidden",
                        }}>
                            <div style={{
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, #4a9a52, transparent)",
                                width: `${loadProgress}%`,
                                transition: "width 0.3s ease-out",
                            }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
