"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let isHovering = false;
    let raf: number;

    // Dot follows instantly
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    // Ring follows with very slight lag — feels snappy not slow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.35; // 0.12 tha, ab 0.35 — 3x faster
      ringY += (mouseY - ringY) * 0.35;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      raf = requestAnimationFrame(animate);
    };

    // Hover on interactive elements
    const onEnter = () => {
      isHovering = true;
      dot.style.width = "6px";
      dot.style.height = "6px";
      dot.style.opacity = "0.6";
      ring.style.width = "46px";
      ring.style.height = "46px";
      ring.style.borderColor =
        theme === "light" ? "rgba(2,132,199,0.6)" : "rgba(167,139,250,0.7)";
      ring.style.background =
        theme === "light" ? "rgba(2,132,199,0.05)" : "rgba(167,139,250,0.05)";
    };

    const onLeave = () => {
      isHovering = false;
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.opacity = "1";
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor =
        theme === "light" ? "rgba(2,132,199,0.4)" : "rgba(56,189,248,0.35)";
      ring.style.background = "transparent";
    };

    // Click pulse
    const onClick = () => {
      ring.style.opacity = "0.3";
      ring.style.transform += " scale(1.3)";
      setTimeout(() => {
        ring.style.opacity = "1";
      }, 120);
    };

    // Hide when mouse leaves window
    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onMouseEnterDoc = () => {
      dot.style.opacity = isHovering ? "0.6" : "1";
      ring.style.opacity = "1";
    };

    const interactiveEls = document.querySelectorAll(
      "a, button, input, textarea, select, label, .card-hover, [role='button']",
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnterDoc);

    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnterDoc);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, [theme]);

  return (
    <>
      {/* Main dot — instant */}
      <div
        ref={dotRef}
        style={{
          width: "10px",
          height: "10px",
          background: "var(--sky)",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.15s, height 0.15s, opacity 0.15s",
          boxShadow: "0 0 8px var(--sky)",
        }}
      />

      {/* Follower ring — fast lag */}
      <div
        ref={ringRef}
        style={{
          width: "36px",
          height: "36px",
          border: "1.5px solid rgba(56,189,248,0.35)",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          transition:
            "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.15s ease",
        }}
      />
    </>
  );
}
