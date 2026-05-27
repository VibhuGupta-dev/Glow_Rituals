

export function Aboutus() {
  return (
    <section
      id="aboutus"
      className="relative overflow-hidden bg-[#fffaf5] py-24 md:py-32"
    >
      {/* Background Effects */}
      <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-orange-300/20 blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.6em] text-orange-500">
            The Story Behind Glow Rituals
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black">
            ABOUT{" "}
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              US
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-black/60">
            Built for Indian summers, Indian skin, and people who were tired of
            sunscreens that never truly worked.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid items-center gap-16 md:grid-cols-2">

          {/* LEFT IMAGE */}
          <div className="relative flex justify-center">

            {/* Glow */}
            <div className="absolute h-[400px] w-[400px] rounded-full bg-gradient-to-br from-orange-300/30 to-pink-300/20 blur-3xl"></div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.18)]">
              <img
                src="https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/vip/2026/02/inc-luana-lopes-lara-kalshi-female-founders-1240x1550-1.jpg"
                alt="Founder Priya"
                className="h-[650px] w-full max-w-[520px] object-cover transition duration-700 hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Founder Tag */}
              <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-5 py-2 backdrop-blur-md">
                <p className="text-sm font-semibold tracking-wide text-black">
                  PRIYA • Founder of Glow Rituals
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>

            <p className="mb-4 text-sm uppercase tracking-[0.5em] text-orange-500">
              Founder Story
            </p>

            <h2 className="mb-8 text-4xl md:text-6xl font-black leading-tight text-black">
              The Sun Whisperer
            </h2>

            <div className="space-y-7 text-lg md:text-[1.15rem] leading-relaxed text-black/70">

              <p>
                Priya had the kind of skin that burned just from thinking about
                going outside. SPF 50, reapplied every two hours, wide-brimmed
                hats — and still she'd come home looking sunburnt.
              </p>

              <p>
                The breaking point came on a beach in Goa after using a ₹900
                “dermatologist-tested” sunscreen that left her shoulders burning.
                She flipped the bottle and found alcohol listed near the top.
              </p>

              <p>
                As a cosmetic chemistry grad student, she knew better. So she
                decided to build something better.
              </p>

              <p>
                For eight months she worked in college labs experimenting with
                formulas designed specifically for Indian skin tones and Indian
                heat — no white cast, no greasy finish, no alcohol.
              </p>

              {/* Highlight Card */}
              <div className="rounded-3xl border border-orange-200 bg-white/80 p-7 shadow-lg backdrop-blur-sm">
                <p className="text-2xl font-bold leading-relaxed text-black">
                  Batch 34 was the breakthrough.
                </p>

                <p className="mt-3 text-black/70">
                  Lightweight. Invisible. Reef-safe. With a soft green tea scent.
                </p>
              </div>

              <p>
                She launched{" "}
                <span className="font-bold text-black">Glow Rituals</span> with
                ₹80,000 in savings, a tiny online store, and honest Instagram
                videos about skincare and sun damage.
              </p>

              <p>
                First month: 60 bottles sold.
                <br />
                Third month: a dermatologist posted an unboxing video.
                <br />
                The website crashed overnight.
              </p>

              {/* Final Quote */}
              <div className="border-l-4 border-orange-500 pl-6">
                <p className="text-2xl md:text-3xl font-bold leading-snug text-black">
                  “Priya packed every order from her kitchen table for two days
                  straight. Her hands smelled like green tea for a week.”
                </p>

                <p className="mt-4 text-orange-500 font-semibold text-xl">
                  She didn’t mind at all.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}