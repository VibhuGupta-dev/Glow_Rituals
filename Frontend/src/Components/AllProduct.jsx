import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import greenbg from "../assets/greenbg.png";
import yellowbg from "../assets/yellowbg.png";
import pinkbg from "../assets/pinkbg.png";

gsap.registerPlugin(ScrollTrigger);

export function AllProducts() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const imageRef = useRef([]);

  const products = [
    {
      id: 1,
      name: "Green Glow",
      subtitle: "Hydrating Protection",
      desc: "Lightweight SPF 50+ sunscreen with a natural matte finish that keeps your skin fresh, protected, and hydrated throughout the day.",
      image: greenbg,
      accent: "from-lime-400/20 to-green-500/10",
    },
    {
      id: 2,
      name: "Golden Hour",
      subtitle: "Sun Kissed Glow",
      desc: "A radiant SPF 50+ sunscreen enriched with skin-loving hydration that leaves behind a luminous golden glow.",
      image: yellowbg,
      accent: "from-yellow-300/20 to-orange-400/10",
    },
    {
      id: 3,
      name: "Pink Petal",
      subtitle: "Radiant Skin Shield",
      desc: "A dewy finish sunscreen crafted for sensitive skin that brightens, nourishes, and shields with a silky smooth glow.",
      image: pinkbg,
      accent: "from-pink-300/20 to-rose-400/10",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Animation
      const scrollTween = gsap.to(cardsRef.current, {
        xPercent: -100 * (products.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${3000}`,
          invalidateOnRefresh: true,
        },
      });

      // Individual Card Animations
      cardsRef.current.forEach((card, index) => {
        const image = imageRef.current[index];

        // Image float animation
        gsap.to(image, {
          y: -25,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Image entrance
        gsap.fromTo(
          image,
          { scale: 0.75, rotate: -8 },
          {
            scale: 1,
            rotate: 0,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "left 80%",
              containerAnimation: scrollTween,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="all-products"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-10 md:py-20"
    >
      {/* Background Glows */}
      <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-orange-300/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 md:mb-24 text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.6em] text-black/60">
            Glow Rituals Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-black">
            ALL{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              PRODUCTS
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-black/60">
            Premium lightweight sunscreen essentials crafted for every skin mood.
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={containerRef} className="overflow-hidden">
          <div className="flex gap-8 md:gap-16 w-[300%] md:w-[280%]">
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="w-full md:w-1/3 flex-shrink-0"
              >
                <div className="grid md:grid-cols-2 rounded-xl bg-white gap-10 md:gap-16 items-center">
                  {/* Image Side */}
                  <div className="flex justify-center order-1 md:order-1">
                    <div className="group relative w-full max-w-[420px]">
                      {/* Glow */}
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${product.accent} scale-110 blur-3xl opacity-70 transition-all duration-700 group-hover:scale-125`}
                      ></div>

                      {/* Product Image */}
                      <img
                        ref={(el) => (imageRef.current[index] = el)}
                        src={product.image}
                        alt={product.name}
                        className="relative top-4 rounded-4xl w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-2">
                    <p className="mb-4 text-sm uppercase tracking-[0.4em] text-black/40">
                      SPF 50+
                    </p>

                    <h2 className="mb-4 text-4xl md:text-6xl font-black leading-tight text-black">
                      {product.name}
                    </h2>

                    <p className="mb-8 text-2xl md:text-3xl font-medium text-orange-600">
                      {product.subtitle}
                    </p>

                    <p className="text-lg md:text-2xl font-light leading-relaxed text-black/70">
                      {product.desc}
                    </p>

                    {/* Features */}
                    <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-3">
                      <span className="rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm backdrop-blur">
                        Reef Safe
                      </span>
                      <span className="rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm backdrop-blur">
                        Vegan
                      </span>
                      <span className="rounded-full border border-black/10 bg-white/70 px-5 py-2.5 text-sm backdrop-blur">
                        Dermat Tested
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-black/50">
            <span>Scroll horizontally</span>
            <span className="text-xl">→</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-24 border-t border-black/10 pt-8 text-center">
          <p className="text-sm tracking-widest text-black/45">
            REEF SAFE • VEGAN • CRUELTY FREE • SPF 50+
          </p>
        </div>
      </div>
    </section>
  );
}