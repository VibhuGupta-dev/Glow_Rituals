import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";

import greenbg from "../assets/green.png";
import yellowbg from "../assets/yellow.png";
import pinkbg from "../assets/pink.png";

const products = [
  {
    id: 0,
    title: "Yellow Sunscreen",
    tagline: "Your skin, sun-ready.",
    description:
      "Lightweight, dermatologist-tested sunscreen that protects your skin from UVA & UVB rays — so you can live fully, every single day.",
    image: yellowbg,
    accent: "#ffa703",
    accentLight: "#FFD048",
    badge: "BEST SELLER",
  },
  {
    id: 1,
    title: "Green Sunscreen",
    tagline: "Nature meets protection.",
    description:
      "Infused with natural botanical extracts, this green-tinted formula soothes while shielding — perfect for sensitive and reactive skin.",
    image: greenbg,
    accent: "#22c55e",
    accentLight: "#B2D267",
    badge: "NEW ARRIVAL",
  },
  {
    id: 2,
    title: "Pink Sunscreen",
    tagline: "Protect. Tint. Glow.",
    description:
      "Lightweight formula with a soft pink tint that protects your skin and gives a radiant, youthful glow — every single day.",
    image: pinkbg,
    accent: "#ec4899",
    accentLight: "#FFA3C6",
    badge: "FAN FAVOURITE",
  },
];

const quantities = [
  { label: "30ml", original: 499, discounted: 299 },
  { label: "80ml", original: 999, discounted: 649 },
  { label: "120ml", original: 1499, discounted: 999 },
];

const MinusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export function Getlook() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedQtyIndex, setSelectedQtyIndex] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const pageRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  const product = products[selectedProduct];
  const qty = quantities[selectedQtyIndex];

  const discount = useMemo(
    () =>
      Math.round(
        ((qty.original - qty.discounted) / qty.original) * 100
      ),
    [qty]
  );

  const totalPrice = useMemo(
    () => qty.discounted * quantity,
    [qty.discounted, quantity]
  );

  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  const switchProduct = useCallback(
    (id) => {
      if (id === selectedProduct) return;

      const tl = gsap.timeline();

      tl.to([imageRef.current, infoRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.25,
      });

      tl.add(() => {
        setSelectedProduct(id);
      });

      tl.fromTo(
        [imageRef.current, infoRef.current],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        }
      );
    },
    [selectedProduct]
  );

  return (
  <div ref={pageRef} className="min-h-screen bg-white">

    <div
      className="
      grid
      grid-cols-1
      lg:grid-cols-2
      min-h-screen
    "
    >

      {/* ================= LEFT ================= */}

      <div
        ref={infoRef}
        className="
        order-2 lg:order-1

        flex
        flex-col
        justify-center

        px-6
        sm:px-8
        lg:px-24

        py-10
        lg:py-14

        bg-white
      "
      >

        <div className="mt-2 lg:mt-8">

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.9]">
            {product.title}
          </h1>

          <p
            className="mt-4 text-lg sm:text-xl italic font-light"
            style={{ color: product.accent }}
          >
            {product.tagline}
          </p>

        </div>

        <div
          className="w-20 lg:w-24 h-1 rounded-full mt-6"
          style={{ background: product.accent }}
        />

        {/* PRICE */}

        <div className="mt-8 flex flex-wrap items-center gap-4">

          <span className="text-4xl sm:text-5xl lg:text-6xl font-black">
            ₹{qty.discounted}
          </span>

          <span className="line-through text-gray-400 text-xl lg:text-2xl">
            ₹{qty.original}
          </span>

          <span
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{
              backgroundColor: `${product.accent}20`,
              color: product.accent,
            }}
          >
            SAVE {discount}%
          </span>

        </div>

        {/* DESCRIPTION */}

        <div className="mt-8 rounded-3xl bg-gray-50 border border-gray-100 p-5 lg:p-7">

          <p className="leading-7 text-gray-600 text-sm sm:text-base">
            {product.description}
          </p>

        </div>

        {/* SIZE */}

        <div className="mt-8">

          <p className="text-xs font-bold tracking-[0.25em] mb-4 text-gray-500">
            SELECT SIZE
          </p>

          <div className="flex gap-3 flex-wrap">

            {quantities.map((q, i) => (
              <button
                key={i}
                onClick={() => setSelectedQtyIndex(i)}
                className={`px-5 sm:px-7 py-3 rounded-2xl border-2 transition-all ${
                  selectedQtyIndex === i
                    ? "scale-105 shadow-xl"
                    : "hover:scale-105"
                }`}
                style={
                  selectedQtyIndex === i
                    ? {
                        backgroundColor: product.accent,
                        borderColor: product.accent,
                        color: "#fff",
                      }
                    : {
                        borderColor: "#ececec",
                      }
                }
              >
                {q.label}
              </button>
            ))}

          </div>

        </div>

        {/* QUANTITY */}

        <div className="mt-8">

          <p className="text-xs font-bold tracking-[0.25em] mb-4 text-gray-500">
            QUANTITY
          </p>

          <div className="flex items-center rounded-3xl bg-gray-100 w-fit">

            <button
              className="p-4"
              onClick={() =>
                setQuantity((p) => Math.max(1, p - 1))
              }
            >
              <MinusIcon />
            </button>

            <span className="w-14 text-center font-bold text-lg">
              {quantity}
            </span>

            <button
              className="p-4"
              onClick={() =>
                setQuantity((p) => p + 1)
              }
            >
              <PlusIcon />
            </button>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-10">

          <button
            className="
            w-full
            py-4 lg:py-5
            rounded-3xl
            text-white
            font-bold
            tracking-[0.12em]
            shadow-2xl
          "
            style={{
              background: `linear-gradient(
                135deg,
                ${product.accent},
                ${product.accentLight}
              )`,
            }}
          >
            ADD TO CART — ₹{totalPrice}
          </button>

          <p className="mt-4 text-center text-red-500 text-sm">
            🔥 Hurry! Only 4 left in stock
          </p>

        </div>

      </div>

      {/* ================= RIGHT ================= */}

      <div
        className="
        order-1 lg:order-2

        bg-[#f7f5f2]

        flex
        flex-col
        justify-center
        items-center

        px-6
        sm:px-10

        py-10
        lg:py-0

        min-h-[55vh]
        lg:min-h-screen
      "
      >

        <div
          ref={imageRef}
          className="
          relative
          w-full
          h-[40vh]

          sm:h-[50vh]

          lg:h-[72vh]

          flex
          items-center
          justify-center
        "
          style={{
            background: `radial-gradient(circle, ${product.accentLight}55 0%, transparent 70%)`,
          }}
        >

          <img
            src={product.image}
            alt={product.title}
            className="
            w-[85%]

            sm:w-[70%]

            lg:w-[80%]

            max-h-full
            object-contain
            drop-shadow-[0_50px_50px_rgba(0,0,0,0.20)]
          "
          />

        </div>

        {/* THUMBNAILS */}

        <div className="flex gap-4 mt-6 flex-wrap justify-center">

          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => switchProduct(p.id)}
              className="
              w-14 h-14
              lg:w-16 lg:h-16

              rounded-2xl
              border-4
              overflow-hidden
              transition-all
            "
              style={{
                borderColor:
                  selectedProduct === p.id
                    ? p.accent
                    : "#ddd",
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${p.accentLight}, ${p.accent})`,
                }}
              >
                <img
                  src={p.image}
                  className="w-[75%] h-[75%] object-contain"
                />
              </div>
            </button>
          ))}

        </div>

      </div>

    </div>

  </div>
);
}