import { Link } from "react-router-dom";

const cities = [
  {
    name: "Ranchi",
    slug: "ranchi",
  },
  {
    name: "Pune",
    slug: "pune",
  },
  {
    name: "Mumbai",
    slug: "mumbai",
  },
  {
    name: "Bangalore",
    slug: "bangalore",
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
  },
  {
    name: "Delhi",
    slug: "delhi",
  },
  {
    name: "Kolkata",
    slug: "kolkata",
  },
  {
    name: "Bhopal",
    slug: "bhopal",
  },
  {
    name: "Surat",
    slug: "surat",
  },
];

function Cities() {
  return (
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">

          <p className="text-sm font-semibold text-red-600">
            ForeverMeet
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Browse Models by City
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore professional model profiles from different cities
            across India.
          </p>

        </div>
      </section>

      {/* CITIES */}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">

          {cities.map((city) => (
            <Link
              key={city.slug}
              to={`/cities/${city.slug}`}
              className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-red-300
                hover:shadow-lg
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-red-50
                    text-red-600
                    transition
                    group-hover:bg-red-600
                    group-hover:text-white
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z"
                    />

                    <circle
                      cx="12"
                      cy="9"
                      r="2.2"
                    />
                  </svg>
                </div>

                <div className="min-w-0">

                  <h2
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-gray-900
                      group-hover:text-red-600
                      sm:text-base
                    "
                  >
                    {city.name}
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    View models
                  </p>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </main>

    </div>
  );
}

export default Cities;