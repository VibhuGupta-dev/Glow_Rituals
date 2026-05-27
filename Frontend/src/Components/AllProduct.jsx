import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import greenbg from "../assets/greenbg.png";
import yellowbg from "../assets/yellowbg.png";
import pinkbg from "../assets/pinkbg.png";

gsap.registerPlugin(ScrollTrigger);

export function AllProducts() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const imageRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

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
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const scrollTween = gsap.to(cardsRef.current, {
        xPercent: -100 * (products.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=3000",
        },
      });

      cardsRef.current.forEach((card, index) => {
        const image = imageRef.current[index];

        gsap.to(image, {
          y: -25,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.fromTo(
          image,
          { scale: 0.8, rotate: -5 },
          {
            scale: 1,
            rotate: 0,
            duration: 1.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="all-products"
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black">
            ALL PRODUCTS
          </h1>
        </div>

        {/* MOBILE LAYOUT */}
        {isMobile ? (
          <div className="space-y-24">
            {products.map((product) => (
              <div key={product.id} className="text-center">
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-[320px] mx-auto drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
                />

                <div className="mt-8">
                  <h2 className="text-4xl font-black">
                    {product.name}
                  </h2>

                  <p className="text-xl text-orange-600 mt-3">
                    {product.subtitle}
                  </p>

                  <p className="mt-5 text-lg text-black/70 leading-relaxed">
                    {product.desc}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <span className="border px-4 py-2 rounded-full">
                      Reef Safe
                    </span>

                    <span className="border px-4 py-2 rounded-full">
                      Vegan
                    </span>

                    <span className="border px-4 py-2 rounded-full">
                      Dermat Tested
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP LAYOUT */
          <div className="overflow-hidden">
            <div className="flex gap-16 w-[280%]">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="w-1/3 flex-shrink-0"
                >
                  <div className="grid md:grid-cols-2 gap-16 items-center">

                    <img
                      ref={(el) => (imageRef.current[index] = el)}
                      src={product.image}
                      alt={product.name}
                      className="w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)]"
                    />

                    <div>
                      <h2 className="text-6xl font-black">
                        {product.name}
                      </h2>

                      <p className="text-3xl text-orange-600 mt-4">
                        {product.subtitle}
                      </p>

                      <p className="text-xl mt-6 text-black/70">
                        {product.desc}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}