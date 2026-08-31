import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(currentQuery);
  const [focused, setFocused] = useState(false);

  // Keep input synchronized with URL
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchValue = query.trim();

    if (!searchValue) {
      navigate("/search");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  const handleClear = () => {
    setQuery("");
    navigate("/search");
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className={`
            flex
            w-full
            items-center
            overflow-hidden
            rounded-2xl
            border
            bg-white
            transition-all
            duration-200
            ${
              focused
                ? "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.10)]"
                : "border-gray-300"
            }
          `}
        >
          {/* Location icon */}
          <div className="flex shrink-0 items-center pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
              />

              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </div>

          {/* Search input */}
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search city, location or model..."
            className="
              min-w-0
              flex-1
              bg-transparent
              px-3
              py-4
              text-base
              font-medium
              text-gray-900
              outline-none
              placeholder:text-gray-400
              sm:text-lg
            "
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="
                mr-1
                flex
                h-9
                w-9
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-full
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-gray-800
              "
              aria-label="Clear search"
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
                  d="M6 6l12 12M18 6 6 18"
                />
              </svg>
            </button>
          )}

          {/* Search button */}
          <button
            type="submit"
            className="
              mr-2
              flex
              h-12
              w-12
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-red-600
              text-white
              shadow-sm
              transition
              hover:bg-red-700
              active:scale-95
            "
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="7" />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20 20-4-4"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Search suggestions / help */}
      {focused && !query && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-2
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-xl
          "
        >
          <div className="px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Search examples
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Mumbai",
                "Delhi",
                "Pune",
                "Hyderabad",
                "Bangalore",
                "Ranchi",
                "Fashion Model",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setQuery(item);
                    navigate(`/search?q=${encodeURIComponent(item)}`);
                  }}
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;