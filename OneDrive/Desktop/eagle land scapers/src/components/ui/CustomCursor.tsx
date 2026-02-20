"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!cursorRef.current) return;

        const cursor = cursorRef.current;

        // Move cursor logic
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2, // Slight lag for fluid feel
                ease: "power2.out",
            });
        };

        // Hover state logic
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer") ||
                window.getComputedStyle(target).cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    useEffect(() => {
        if (!cursorRef.current) return;

        if (isHovering) {
            gsap.to(cursorRef.current, {
                scale: 2.5,
                backgroundColor: "rgba(74, 154, 82, 0.2)", // Green glow tint
                borderColor: "#4a9a52",
                mixBlendMode: "normal",
                duration: 0.3,
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 1,
                backgroundColor: "#4a9a52", // Primary green dot
                borderColor: "transparent",
                mixBlendMode: "normal",
                duration: 0.3,
            });
        }
    }, [isHovering]);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{
                backgroundColor: "#4a9a52",
            }}
        />
    );
}
