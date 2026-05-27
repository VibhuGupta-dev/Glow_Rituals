import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";

const navLinks = [
  { label: "Sunscreen",    href: "#sunscreen"    },
  { label: "All Products", href: "#all-products" },
  { label: "About Us",     href: "#about-us"     },
  { label: "Contact",      href: "#contact"      },
];

export function Navbar() {
  const [activeLink,   setActiveLink]   = useState("Sunscreen");
  const [cartCount,    setCartCount]    = useState(3);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["sunscreen", "all-products", "about-us", "contact"];

      // viewport center line
      const mid = window.innerHeight / 2;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const { top, bottom } = el.getBoundingClientRect();

        // section jo bhi viewport midline ke andar hai usse active karo
        if (top <= mid && bottom >= mid) {
          const matched = navLinks.find((l) => l.href === `#${id}`);
          if (matched) setActiveLink(matched.label);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // page reload pe bhi check karo
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full px-6 sticky top-0 z-50 bg-transparent">
      <div className="mx-auto flex items-center justify-between">

        {/* Left - Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img src={logo} alt="Jacket Masters" className="h-30 w-70 object-contain" />
        </a>

        {/* Center - Nav Links */}
        <ul className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full border p-5 border-white/10">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => setActiveLink(label)}
                className={`px-5 py-2.5 text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-300
                  ${activeLink === label
                    ? "text-black bg-white border border-orange-400/30"
                    : "text-white hover:text-white hover:bg-white/10"
                  }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right - Wishlist & Cart */}
        <div className="flex items-center gap-3 pr-20">

          <button
            onClick={() => setIsWishlisted((prev) => !prev)}
            className={`p-2 bg-gray-200 rounded-4xl transition-all duration-200 hover:bg-white/10
              ${isWishlisted ? "text-red-400" : "text-black hover:text-black"}`}
          >
            <svg width="26" height="26" viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            onClick={() => setCartCount((prev) => prev + 1)}
            className="relative p-2 bg-gray-200 rounded-full text-black hover:text-white hover:bg-gray-400 transition-all duration-200"
          >
            <svg width="26" height="26" viewBox="0 0 24 24"
              fill="" stroke="black" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs font-bold w-4 h-4 flex p-1 items-center justify-center rounded-full bg-black text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-black/80 backdrop-blur-lg border border-white/10 rounded-3xl p-4 mx-4">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => { setActiveLink(label); setMenuOpen(false); }}
              className={`block py-4 px-6 text-sm font-medium tracking-widest uppercase border-b border-white/10 last:border-none
                ${activeLink === label ? "text-orange-400" : "text-white/70"}`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}