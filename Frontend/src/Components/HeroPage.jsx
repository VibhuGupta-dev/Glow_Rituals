
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {  useNavigate } from "react-router-dom";
import yellow from "../assets/yellow.png";
import green from "../assets/green.png";
import pink from "../assets/pink.png";

const slides = [
  {
    id: 0,
    tagline1: "Because every",
    tagline2: "Day deserves skin",
    description:
      "Lightweight, dermatologist-tested sunscreen that protects your skin from UVA & UVB rays — so you can live fully, every single day.",
    title: "Yellow Sunscreen",
    image: yellow,
    cornerImage: green,
    gradient: "from-[#ffa703] via-[#FFD048] to-[#ffa703]",
  },
  {
    id: 1,
    tagline1: "Because every",
    tagline2: "Day deserves skin",
    description:
      "Lightweight, dermatologist-tested sunscreen that protects your skin from UVA & UVB rays — so you can live fully, every single day.",
    title: "Green Sunscreen",
    image: green,
    cornerImage: yellow,
    gradient: "from-[#22c55e] via-[#B2D267] to-[#22c55e]",
  },
  {
    id: 2,
    tagline1: "Because every",
    tagline2: "Day deserves glow",
    description:
      "Lightweight, dermatologist-tested sunscreen with a soft pink tint that protects your skin and gives a radiant, youthful glow.",
    title: "Pink Sunscreen",
    image: pink,
    cornerImage: yellow,
    gradient: "from-[#ec4899] via-[#FFA3C6] to-[#ec4899]",
  },
];

const quantities = [
  { label: "30ml", original: 499, discounted: 299 },
  { label: "80ml", original: 999, discounted: 649 },
  { label: "120ml", original: 1499, discounted: 999 },
];

export function HomePage({ onGradientChange }) {
  const [current, setCurrent] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);

  const mainImageRef = useRef(null);
  const containerRef = useRef(null);

  const slide = slides[current];
  const qty = quantities[selectedQty];
  const navigate = useNavigate();

  function handlegetlook () {
    navigate("/getlook")
  }

  useEffect(() => {
    onGradientChange?.(slide.gradient);
  }, [current]);

  useEffect(() => {
    if (!mainImageRef.current) return;

    const tl = gsap.timeline();

    tl.to(mainImageRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.2,
      ease: "power2.in",
    }).fromTo(
      mainImageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.1,
        ease: "back.out(1.6)",
      }
    );
  }, [current]);

  const prev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((c) => (c + 1) % slides.length);

  return (
    <div
      id="sunscreen"
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-r ${slide.gradient} w-full relative overflow-hidden`}
    >
      

      {/* MAIN */}
      <div
        className="
        flex flex-col lg:flex-row
        items-center justify-between
        px-5 sm:px-6 md:px-12 lg:px-20
        pt-28 sm:pt-32 lg:pt-20
        pb-14 lg:pb-0
        gap-10 lg:gap-16
      "
      >
        {/* LEFT */}
        <div className="flex-1 max-w-lg text-center lg:text-left w-full">
          {/* DESKTOP ARROWS */}
          <div className="hidden lg:flex items-center justify-start gap-3 mb-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/20 bg-black/30 hover:bg-black/40 flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/20 bg-black/30 hover:bg-black/40 flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Heading */}
          <div
            className="
            text-white
            text-[42px] sm:text-5xl md:text-6xl
            font-semibold
            leading-[0.95]
          "
            style={{
              textShadow: "0px 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            {slide.tagline1}
          </div>

          <div
            className="
            text-white
            text-[42px] sm:text-5xl md:text-6xl
            font-semibold
            leading-[0.95]
            mt-1
          "
            style={{
              textShadow: "0px 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            {slide.tagline2}
          </div>

          {/* Description */}
          <p
            className="
            text-white/80
            text-[15px] sm:text-base md:text-[17px]
            max-w-md
            mx-auto lg:mx-0
            mt-6 sm:mt-8
            leading-relaxed
            px-1 sm:px-0
          "
            style={{
              textShadow: "0px 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            {slide.description}
          </p>

          {/* Button */}
          <button
          onClick={handlegetlook}
            className="
            mt-8 sm:mt-10
            mx-auto lg:mx-0
            flex items-center justify-center gap-2
            bg-white text-[#f44404]
            font-semibold
            px-7 sm:px-8
            py-3.5 sm:py-4
            rounded-full
            hover:bg-orange-50
            transition-all
            shadow-xl hover:shadow-2xl
            group
            w-full sm:w-fit
          "
          >
            Get a Look

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* CENTER IMAGE */}
        <div className="flex-1 flex justify-center lg:justify-start pl-0 lg:pl-8 w-full">
          <div className="relative flex flex-col items-center w-full">
            {/* Glow */}
            <div
              className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[220px] h-[220px]
              sm:w-[300px] sm:h-[300px]
              md:w-[380px] md:h-[380px]
              lg:w-[420px] lg:h-[420px]
              bg-white/30 rounded-full blur-3xl z-0
            "
            />

            {/* Product */}
            <img
              ref={mainImageRef}
              className="
              h-[300px]
              sm:h-[380px]
              md:h-[520px]
              lg:h-[650px]
              object-contain
              drop-shadow-2xl
              relative z-10
            "
              src={slide.image}
              alt={slide.title}
              key={slide.id}
            />

            {/* MOBILE ARROWS */}
            <div className="flex lg:hidden items-center justify-center gap-4 mt-6 z-20">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-black/40 flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-black/40 flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="w-full lg:w-72 flex-shrink-0 flex justify-center lg:justify-end lg:ml-8">
          <div
            className="
            rounded-3xl
            p-5 sm:p-6
            bg-white/10
            backdrop-blur-md
            border border-white/20
            w-full
            max-w-[340px]
          "
          >
            <p className="text-white/70 text-sm">
              Daily Defense
            </p>

            <h2 className="text-white text-2xl font-bold mt-1">
              {slide.title}
            </h2>

            <p className="text-white/70 mt-1 text-sm">
              SPF 50+ • Broad Spectrum
            </p>

            {/* PRICE */}
            <div className="mt-7">
              <span className="text-white/50 line-through text-base">
                ₹{qty.original}
              </span>

              <div className="flex items-end gap-3 mt-1 flex-wrap">
                <span className="text-white text-4xl sm:text-5xl font-bold">
                  ₹{qty.discounted}
                </span>

                <span className="mb-1 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-2xl">
                  {Math.round(
                    ((qty.original - qty.discounted) /
                      qty.original) *
                      100
                  )}
                  % OFF
                </span>
              </div>
            </div>

            {/* SIZE */}
            <div className="mt-8">
              <p className="text-white/70 text-sm mb-3">
                Select Size
              </p>

              <div className="flex gap-3">
                {quantities.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedQty(i)}
                    className={`flex-1 py-3.5 rounded-2xl text-sm font-semibold border-2 transition-all ${
                      selectedQty === i
                        ? "bg-white text-[#f44404] border-white shadow-lg"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORNER IMAGE */}
      <div
        className="
        absolute
        bottom-3 right-3
        sm:bottom-4 sm:right-4
        md:bottom-6 md:right-8
        z-20
      "
      >
        <img
          className="
          h-24
          sm:h-32
          md:h-40
          lg:h-52
          drop-shadow-xl
        "
          src={slide.cornerImage}
          alt="Variant"
        />
      </div>
    </div>
  );
}