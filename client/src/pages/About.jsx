import {
  FaArrowRight,
  FaCheckCircle,
  FaChevronRight,
  FaCity,
  FaHeart,
  FaLightbulb,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaSearch />,
      title: "Discover Profiles",
      description:
        "Explore professional profiles and discover people across cities and categories that match your interests.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Built Around Trust",
      description:
        "We focus on creating a safer and more reliable platform through account verification and responsible profile management.",
    },
    {
      icon: <FaCity />,
      title: "City-Based Discovery",
      description:
        "Find profiles by city and explore opportunities closer to where you live or work.",
    },
    {
      icon: <FaStar />,
      title: "Stand Out",
      description:
        "Professional profiles can highlight their information, experience and unique strengths in one place.",
    },
  ];

  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Trust",
      description:
        "We believe a strong platform starts with transparency, responsible profiles and a trustworthy experience.",
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description:
        "ForeverMeet is designed to bring people and professional profiles together through a simple discovery experience.",
    },
    {
      icon: <FaLightbulb />,
      title: "Simplicity",
      description:
        "Finding the right profile should feel simple, fast and intuitive on every device.",
    },
    {
      icon: <FaHeart />,
      title: "Quality",
      description:
        "We want profiles to present themselves professionally while giving visitors a clean browsing experience.",
    },
  ];

  const cities = [
    "Mumbai",
    "Pune",
    "Bangalore",
    "Hyderabad",
    "Delhi",
    "Kolkata",
    "Ranchi",
    "Bhopal",
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-gray-950">
      {/* ============================================================
          HERO
      ============================================================ */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-gray-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT */}

            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-600" />
                About ForeverMeet
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                A better way to{" "}
                <span className="text-red-600">discover</span> professional
                profiles.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                ForeverMeet is a modern profile discovery platform designed to
                help people explore professional profiles, discover talent and
                connect with opportunities across cities in India.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/listings")}
                  className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl"
                >
                  Explore Profiles
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-black text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  Create Your Profile
                  <FaChevronRight className="text-xs" />
                </button>
              </div>

              {/* Trust points */}

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  Professional profiles
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  City-based discovery
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  Responsive experience
                </div>
              </div>
            </div>

            {/* RIGHT VISUAL */}

            <div className="relative">
              <div className="relative mx-auto max-w-md">
                {/* Main card */}

                <div className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-200/70">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        ForeverMeet
                      </p>

                      <h2 className="mt-1 text-lg font-black text-gray-950">
                        Discover & Connect
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <FaUsers />
                    </div>
                  </div>

                  {/* Search box */}

                  <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                      <FaSearch className="text-sm text-gray-400" />

                      <span className="text-xs font-medium text-gray-400">
                        Search profiles or cities...
                      </span>
                    </div>
                  </div>

                  {/* Profile preview */}

                  <div className="mt-5 rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FaUsers className="text-xl" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-sm font-black text-gray-950">
                            Professional Profile
                          </h3>

                          <FaCheckCircle className="shrink-0 text-xs text-green-500" />
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-gray-400">
                          <FaMapMarkerAlt />
                          Mumbai, India
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <p className="text-[9px] font-bold uppercase text-gray-400">
                          City
                        </p>
                        <p className="mt-1 text-xs font-black text-gray-800">
                          Mumbai
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <p className="text-[9px] font-bold uppercase text-gray-400">
                          Status
                        </p>
                        <p className="mt-1 text-xs font-black text-green-600">
                          Verified
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <p className="text-[9px] font-bold uppercase text-gray-400">
                          Profile
                        </p>
                        <p className="mt-1 text-xs font-black text-gray-800">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom action */}

                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-gray-950 p-4 text-white">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Find your next
                      </p>

                      <p className="mt-1 text-sm font-black">
                        Professional connection
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600">
                      <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </div>

                {/* Floating card */}

                <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Account
                      </p>

                      <p className="text-xs font-black text-gray-900">
                        Verified experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTRODUCTION
      ============================================================ */}

      <section className="bg-[#f7f8fb]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Built to make profile discovery simpler
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
              ForeverMeet brings profile discovery into one organized
              experience. Instead of searching across disconnected platforms,
              visitors can browse profiles, explore cities and learn more
              about the people and professionals they are interested in.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-gray-950">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MISSION
      ============================================================ */}

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Visual */}

            <div className="relative">
              <div className="rounded-[2rem] bg-gray-950 p-7 shadow-2xl sm:p-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-500">
                  Our Mission
                </p>

                <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
                  Connecting people with the right professional profiles.
                </h2>

                <p className="mt-5 text-sm leading-7 text-gray-400">
                  Our goal is to make discovering professional profiles easier,
                  more organized and more accessible across India.
                </p>

                <div className="mt-8 h-px bg-white/10" />

                <div className="mt-7 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                    <FaLightbulb />
                  </div>

                  <div>
                    <h3 className="font-black text-white">
                      Simple by design
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Every part of ForeverMeet is designed to reduce
                      unnecessary complexity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative element */}

              <div className="absolute -bottom-4 -right-4 -z-0 h-24 w-24 rounded-3xl bg-red-600" />
            </div>

            {/* Content */}

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                What We Believe
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                A platform should work for both sides.
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
                People searching for profiles need a clear and convenient
                experience. Professionals presenting themselves need a place
                where their information can be organized and discovered.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Make profiles easy to discover.",
                  "Keep information organized and professional.",
                  "Create a consistent experience across devices.",
                  "Help visitors find profiles by location.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <FaCheckCircle className="shrink-0 text-green-500" />

                    <span className="text-sm font-bold text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          VALUES
      ============================================================ */}

      <section className="bg-[#f7f8fb]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              The principles behind ForeverMeet
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              We are building ForeverMeet around a few simple principles that
              guide the experience we want to provide.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group cursor-pointer rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl sm:p-7"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white transition-all duration-300 group-hover:bg-red-600">
                    {value.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-gray-300">
                        0{index + 1}
                      </span>

                      <h3 className="text-lg font-black text-gray-950">
                        {value.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CITIES
      ============================================================ */}

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                Across India
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Discover profiles by city.
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                ForeverMeet is designed around city-based discovery, helping
                visitors find relevant profiles in locations that matter to
                them.
              </p>

              <button
                type="button"
                onClick={() => navigate("/listings")}
                className="group mt-7 inline-flex cursor-pointer items-center gap-2 text-sm font-black text-red-600"
              >
                Explore all profiles
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => navigate(`/listings?city=${city}`)}
                  className="group flex cursor-pointer items-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:shadow-lg"
                >
                  <FaMapMarkerAlt className="text-xs text-gray-400 transition-colors group-hover:text-red-600" />

                  <span className="text-xs font-black text-gray-700 transition-colors group-hover:text-red-600">
                    {city}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA
      ============================================================ */}

      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-red-600 px-6 py-12 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-black/10" />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-100">
                Get Started
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready to discover something new?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-red-100 sm:text-base">
                Explore professional profiles or create your own profile and
                become part of the ForeverMeet platform.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/listings")}
                  className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-black text-red-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl"
                >
                  Browse Profiles
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  Create Account
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;