"use client";

import { useEffect, useRef, useState } from "react";

export default function KlassFinVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.playsInline = true;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          const p = el.play();
          if (p) p.catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-10 sm:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative glass rounded-3xl border border-sky-400/15 bg-white/60 dark:bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
          {!ready && (
            <div className="absolute inset-0 animate-pulse bg-black/5 dark:bg-white/5" />
          )}

          <video
            ref={ref}
            className={`w-full aspect-[16/9] sm:aspect-[21/9] object-cover pointer-events-none select-none transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            src="/videos/klassfin-cards.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            onCanPlay={() => setReady(true)}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}