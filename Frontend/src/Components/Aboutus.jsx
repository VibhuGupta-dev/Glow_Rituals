import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VIDEO_URL = "https://res.cloudinary.com/domylmj7e/video/upload/q_auto,f_auto,vc_auto/ok_av29ne.mp4";

gsap.registerPlugin(ScrollTrigger);

const getAccentColor = (gradient) => {
  if (gradient?.includes("#22c55e")) return "#FFE566";
  if (gradient?.includes("#ec4899")) return "#FFE566";
  return "#ff6a00";
};

const PARTICLES = [ /* ... your particles array remains same ... */ ];

const StarIcon = ({ size = 14, color = "#fff", opacity = 0.7 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ opacity }}>
    <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill={color} />
  </svg>
);

export function Aboutus({ currentGradient }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const shineRef = useRef(null);
  const badgeLeftRef = useRef(null);
  const badgeRightRef = useRef(null);
  const badgeTopRef = useRef(null);
  const glowRef = useRef(null);
  const glow2Ref = useRef(null);
  const taglineRef = useRef(null);

  const [introVisible, setIntroVisible] = useState(true);
  const [accentColor, setAccentColor] = useState("#ff6a00");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => setAccentColor(getAccentColor(currentGradient)), [currentGradient]);

  useEffect(() => {
    const fn = () => setIntroVisible(window.scrollY < 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Animations (same as before)
  useEffect(() => {
    gsap.fromTo(
      [word1Ref.current, word2Ref.current, word3Ref.current],
      { opacity: 0, scale: 0.15, rotation: -18, y: 70 },
      { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.38)", stagger: 0.2, delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(taglineRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.2 });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      [badgeLeftRef.current, badgeRightRef.current, badgeTopRef.current],
      { opacity: 0, scale: 0.7, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(2)", stagger: 0.12, delay: 1.4 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { scaleX: 0.1, scaleY: 0.8, borderRadius: "8px", opacity: 0 },
      { scaleX: 1, scaleY: 1, borderRadius: "24px", opacity: 1, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", end: "top 15%", scrub: 2 }
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(shineRef.current, { x: "-130%", opacity: 1 }, { x: "230%", duration: 1.8, ease: "power2.inOut", delay: 2.0 });
  }, []);

  useEffect(() => {
    gsap.to(glowRef.current, { scale: 1.2, opacity: 0.65, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(glow2Ref.current, { scale: 1.15, opacity: 0.55, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.2 });
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const init = () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          vid.currentTime = self.progress * vid.duration;
          setScrollPct(Math.round(self.progress * 100));
        },
      });
    };

    vid.readyState >= 2 ? init() : vid.addEventListener("loadedmetadata", init);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      vid.removeEventListener("loadedmetadata", init);
    };
  }, []);

  const glassStyle = {
    background: "rgba(255,255,255,0.13)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.28)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  };

  return (
    <div id="about-us" className={`bg-gradient-to-br ${currentGradient || "from-[#ffa703] via-[#FFD048] to-[#ffa703]"} font-serif`}>
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center gap-4 py-8"
      >
        {/* Grain + Glows + Particles (unchanged) */}
        {/* ... keep your existing grain, glows, particles, and stars ... */}

        {/* Vertical Label - Hide on mobile */}
        <p className="hidden md:block absolute left-6 top-1/2 text-white/35 uppercase tracking-[0.32em] text-[9px] select-none z-20"
          style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}>
          Scroll to Explore
        </p>

        {/* Scroll Progress - Smaller on mobile */}
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
          <span className="text-white/45 text-[9px] tracking-widest font-mono" style={{ writingMode: "vertical-rl" }}>
            {String(scrollPct).padStart(2, "0")}%
          </span>
          <div className="w-[2px] h-20 md:h-24 bg-white/15 rounded-full overflow-hidden">
            <div className="w-full bg-white/80 rounded-full transition-all duration-75" style={{ height: `${scrollPct}%` }} />
          </div>
        </div>

        {/* Heading - Better mobile stacking */}
        <div className="relative z-20 flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-3 flex-wrap justify-center px-4 text-center">
          <span ref={word1Ref} style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(32px, 6vw, 68px)",
            fontWeight: 700,
            color: "#ffffff",
            textShadow: "2px 4px 14px rgba(0,0,0,0.22)",
            transform: "rotate(-2.5deg)",
          }}>The</span>

          <span ref={word2Ref} style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(42px, 8.5vw, 104px)",
            fontWeight: 700,
            color: accentColor,
            textShadow: "3px 6px 20px rgba(0,0,0,0.28)",
            transform: "rotate(-1deg)",
            transition: "color 0.6s ease",
          }}>sunscreen</span>

          <span ref={word3Ref} style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(32px, 6vw, 68px)",
            fontWeight: 700,
            color: "#ffffff",
            textShadow: "2px 4px 14px rgba(0,0,0,0.22)",
            transform: "rotate(1.8deg)",
          }}>You Deserve</span>
        </div>

        {/* Tagline */}
        <p ref={taglineRef} className="relative z-20 text-white/70 text-sm md:text-base tracking-widest uppercase text-center px-4">
          Lightweight · Non-greasy · Reef-safe
        </p>

        {/* Video Container + Badges */}
        <div className="relative z-20 w-[92%] sm:w-[88%] max-w-[980px] mx-auto mt-4 md:mt-2">
          
          {/* Badges - Responsive positioning */}
          <div ref={badgeLeftRef}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-30 px-3 sm:px-4 py-3 rounded-2xl text-center scale-90 sm:scale-100"
            style={glassStyle}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>SPF</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "38px", fontWeight: 700, color: accentColor }}>50+</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>Broad Spectrum</span>
          </div>

          <div ref={badgeTopRef}
            className="absolute -top-3 right-2 sm:-right-4 z-30 px-4 py-2 rounded-xl text-sm scale-90 sm:scale-100"
            style={glassStyle}>
            <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}>✦ New Formula</span>
          </div>

          <div ref={badgeRightRef}
            className="absolute -right-2 sm:-right-5 bottom-6 sm:bottom-8 z-30 px-3 sm:px-4 py-3 rounded-2xl text-center scale-90 sm:scale-100"
            style={glassStyle}>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>Dermatologist</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fontWeight: 700, color: "#fff" }}>Tested ✓</span>
          </div>

          {/* Video Container */}
          <div ref={containerRef}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-video shadow-2xl"
            style={{
              boxShadow: "0 32px 90px rgba(0,0,0,0.3), 0 0 0 1.5px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}>

            <div ref={shineRef}
              className="absolute inset-y-0 w-[38%] z-20 pointer-events-none"
              style={{
                background: "linear-gradient(108deg, transparent 15%, rgba(255,255,255,0.32) 50%, transparent 85%)",
                transform: "skewX(-14deg)"
              }} />

            <div className="absolute top-0 inset-x-0 h-12 sm:h-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(255,165,0,0.18), transparent)" }} />

            <video
              ref={videoRef}
              src={VIDEO_URL}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-6 md:bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 transition-opacity duration-500 ${introVisible ? "opacity-100" : "opacity-0"}`}>
          <p className="text-white/60 text-[10px] tracking-widest uppercase mb-2">Scroll to discover</p>
          <div className="w-6 h-9 rounded-full border border-white/40 relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-scrollDot" />
          </div>
        </div>

        <style jsx>{`
          @keyframes scrollDot {
            0%   { top: 18%; opacity: 1; }
            75%  { top: 62%; opacity: 0.3; }
            100% { top: 18%; opacity: 1; }
          }
          /* Keep your other keyframes */
        `}</style>
      </section>
    </div>
  );
}