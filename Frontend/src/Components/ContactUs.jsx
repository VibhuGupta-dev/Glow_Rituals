import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactUs() {
  const sectionRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".contact-card", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-wrapper",
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      alert("Message Sent ✨");
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="contact-heading text-center mb-20">
          <p className="text-sm uppercase tracking-[0.6em] text-black/40 mb-5">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-none text-black">
            LET'S TALK
          </h1>

          <p className="mt-6 text-lg md:text-xl text-black/60 max-w-2xl mx-auto">
            Have questions about our products or want to collaborate?
            We'd love to hear from you.
          </p>
        </div>

        <div className="contact-wrapper grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Side */}
          <div className="contact-card space-y-6">
            <div className="rounded-[32px] border border-black/10 bg-white/40 backdrop-blur-md p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-black/40 mb-4">
                Email
              </p>

              <h3 className="text-3xl font-bold text-black">
                hello@sunscreen.com
              </h3>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white/40 backdrop-blur-md p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-black/40 mb-4">
                Phone
              </p>

              <h3 className="text-3xl font-bold text-black">
                +91 98765 43210
              </h3>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white/40 backdrop-blur-md p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-black/40 mb-4">
                Address
              </p>

              <h3 className="text-3xl font-bold text-black">
                Mumbai, India
              </h3>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="contact-card rounded-[40px] border border-black/10 bg-white/40 backdrop-blur-md p-8 md:p-10">
            <h2 className="text-4xl font-black text-black mb-3">
              Send Message
            </h2>

            <p className="text-black/50 mb-10">
              We'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full rounded-2xl border border-black/10 bg-transparent px-5 py-4 outline-none transition-all duration-300 focus:border-orange-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full rounded-2xl border border-black/10 bg-transparent px-5 py-4 outline-none transition-all duration-300 focus:border-orange-400"
              />

              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                className="w-full resize-none rounded-[28px] border border-black/10 bg-transparent px-5 py-4 outline-none transition-all duration-300 focus:border-orange-400"
              />

              <button
                type="submit"
                disabled={submitted}
                className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:scale-[1.02]"
              >
                {submitted ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Socials */}
            <div className="mt-8 flex gap-4">
              {["IG", "FB", "TW"].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 text-sm font-bold text-black transition-all duration-300 hover:bg-black hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}