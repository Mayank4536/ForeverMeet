import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { getProfile } from "../../services/authService";

import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaWallet,
  FaHeart,
  FaPlus,
  FaSignOutAlt,
  FaChevronDown,
  FaSearch,
  FaHome,
  FaMapMarkerAlt,
  FaThLarge,
  FaCrown,
  FaBlog,
  FaList,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [search, setSearch] = useState("");

  // Logged-in user
  const [user, setUser] = useState(null);

  // ============================================================
  // SCROLL TO TOP
  // ============================================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  // ============================================================
  // AUTOMATICALLY SCROLL TO TOP WHEN ROUTE CHANGES
  // ============================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.search]);

  // ============================================================
  // GET USER FROM BACKEND / LOCAL STORAGE
  // ============================================================

  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return null;
      }

      // Get latest user information from backend
      const response = await getProfile();

      if (response?.success && response?.user) {
        // Keep localStorage user updated
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );

        return response.user;
      }

      // Fallback to localStorage
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch {
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error(
        "Unable to load logged-in user:",
        error
      );

      // Fallback to localStorage if backend request fails
      try {
        const storedUser =
          localStorage.getItem("user");

        if (storedUser) {
          return JSON.parse(storedUser);
        }
      } catch (storageError) {
        console.error(
          "Unable to read stored user:",
          storageError
        );
      }

      return null;
    }
  };

  // ============================================================
  // CHECK LOGIN
  // ============================================================

  const checkLoginStatus = async () => {
    const loggedInUser =
      await getLoggedInUser();

    setUser(loggedInUser);
  };

  // ============================================================
  // INITIAL LOGIN CHECK
  // ============================================================

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // ============================================================
  // LISTEN FOR LOGIN / LOGOUT EVENTS
  // ============================================================

  useEffect(() => {
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener(
      "authChanged",
      handleAuthChange
    );

    window.addEventListener(
      "storage",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "authChanged",
        handleAuthChange
      );

      window.removeEventListener(
        "storage",
        handleAuthChange
      );
    };
  }, []);

  // ============================================================
  // LOGGED-IN STATUS
  // ============================================================

  const isLoggedIn = Boolean(user);

  // ============================================================
  // CREDITS
  // ============================================================

  const credits =
    user?.wallet?.credits ??
    user?.credits ??
    0;

  // ============================================================
  // NAVIGATION LINKS
  // ============================================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Cities",
      path: "/cities",
      icon: <FaMapMarkerAlt />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FaThLarge />,
    },
    {
      name: "Premium",
      path: "/premium",
      icon: <FaCrown />,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <FaBlog />,
    },
  ];

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    setSearch("");

    setSearchOpen(false);

    setMenuOpen(false);

    // Scroll to top before navigation
    scrollToTop();

    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    // Update navbar immediately
    setUser(null);

    setProfileOpen(false);

    setMenuOpen(false);

    // Notify other components
    window.dispatchEvent(
      new Event("authChanged")
    );

    // Scroll to top
    scrollToTop();

    navigate("/login");
  };

  // ============================================================
  // CLOSE MOBILE MENU
  // ============================================================

  const closeMobileMenu = () => {
    setMenuOpen(false);

    setSearchOpen(false);

    setProfileOpen(false);

    // Scroll to top
    scrollToTop();
  };

  // ============================================================
  // NAVIGATION CLICK
  // ============================================================

  const handleNavigationClick = () => {
    scrollToTop();
  };

  // ============================================================
  // NAV LINK STYLE
  // ============================================================

  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-2 px-1 py-2 text-sm font-bold transition ${
      isActive
        ? "text-red-600"
        : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      {/* ======================================================
          MAIN NAVBAR
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4">

          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            onClick={() => {
              closeMobileMenu();
              scrollToTop();
            }}
            className="group shrink-0"
          >
            <div className="text-[25px] font-black tracking-tight sm:text-[28px]">
              <span className="text-red-600 transition group-hover:text-red-700">
                Forever
              </span>

              <span className="text-gray-950">
                Meet
              </span>
            </div>

            <p className="hidden text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400 sm:block">
              Professional Profiles
            </p>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavigationClick}
                className={navLinkClass}
              >
                <span className="hidden text-xs xl:inline">
                  {link.icon}
                </span>

                {link.name}

                {link.name === "Premium" && (
                  <span className="absolute -right-4 -top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[7px] font-black text-white">
                    PRO
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ==================================================
              DESKTOP RIGHT SIDE
          ================================================== */}

          <div className="hidden items-center gap-2 lg:flex">

            {/* SEARCH */}

            <button
              type="button"
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 hover:text-red-600"
              aria-label="Search"
            >
              <FaSearch />
            </button>

            {/* =================================================
                LOGGED IN
            ================================================= */}

            {isLoggedIn ? (
              <>
                {/* WALLET */}

                <Link
                  to="/wallet"
                  onClick={handleNavigationClick}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition hover:border-red-200 hover:bg-red-50"
                >
                  <FaWallet className="text-red-600" />

                  <div className="leading-none">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Credits
                    </p>

                    <p className="mt-1 text-sm font-black text-gray-900">
                      {credits}
                    </p>
                  </div>
                </Link>

                {/* POST PROFILE */}

                <Link
                  to="/create-listing"
                  onClick={handleNavigationClick}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
                >
                  <FaPlus />

                  <span className="hidden xl:inline">
                    Post Profile
                  </span>

                  <span className="xl:hidden">
                    Post
                  </span>
                </Link>

                {/* PROFILE */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setProfileOpen(
                        !profileOpen
                      )
                    }
                    className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-gray-200 hover:bg-gray-50"
                  >
                    <FaUserCircle
                      size={34}
                      className="text-gray-700"
                    />

                    <FaChevronDown
                      className={`text-[10px] text-gray-500 transition ${
                        profileOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {/* PROFILE DROPDOWN */}

                  {profileOpen && (
                    <>
                      {/* OVERLAY */}

                      <button
                        type="button"
                        aria-label="Close profile menu"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="fixed inset-0 z-40 h-full w-full cursor-default"
                      />

                      {/* DROPDOWN */}

                      <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

                        {/* PROFILE HEADER */}

                        <div className="border-b border-gray-100 bg-gray-50 px-4 py-4">
                          <div className="flex items-center gap-3">
                            <FaUserCircle
                              size={42}
                              className="text-gray-400"
                            />

                            <div className="min-w-0">
                              <p className="truncate text-sm font-black text-gray-950">
                                {user?.name ||
                                  "My Account"}
                              </p>

                              <p className="truncate text-xs text-gray-500">
                                {user?.email ||
                                  "Manage your profile"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* MENU */}

                        <div className="p-2">
                          <DropdownLink
                            to="/profile"
                            icon={<FaUserCircle />}
                            label="My Profile"
                            onClick={() => {
                              setProfileOpen(false);
                              scrollToTop();
                            }}
                          />

                          <DropdownLink
                            to="/my-listings"
                            icon={<FaList />}
                            label="My Listings"
                            onClick={() => {
                              setProfileOpen(false);
                              scrollToTop();
                            }}
                          />

                          <DropdownLink
                            to="/favourites"
                            icon={<FaHeart />}
                            label="Favourites"
                            onClick={() => {
                              setProfileOpen(false);
                              scrollToTop();
                            }}
                          />

                          <DropdownLink
                            to="/wallet"
                            icon={<FaWallet />}
                            label="Wallet & Credits"
                            onClick={() => {
                              setProfileOpen(false);
                              scrollToTop();
                            }}
                          />

                          <DropdownLink
                            to="/create-listing"
                            icon={<FaPlus />}
                            label="Post New Profile"
                            onClick={() => {
                              setProfileOpen(false);
                              scrollToTop();
                            }}
                          />
                        </div>

                        {/* LOGOUT */}

                        <div className="border-t border-gray-100 p-2">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                          >
                            <FaSignOutAlt />

                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              /* =================================================
                 GUEST
              ================================================= */

              <>
                <Link
                  to="/login"
                  onClick={handleNavigationClick}
                  className="rounded-xl px-4 py-2.5 text-sm font-black text-gray-700 transition hover:bg-gray-100 hover:text-red-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={handleNavigationClick}
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* ==================================================
              MOBILE BUTTONS
          ================================================== */}

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100"
              aria-label="Search"
            >
              <FaSearch />
            </button>

            <button
              type="button"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-white transition hover:bg-red-600"
              aria-label="Open menu"
            >
              {menuOpen ? (
                <FaTimes size={19} />
              ) : (
                <FaBars size={19} />
              )}
            </button>
          </div>
        </div>

        {/* ====================================================
            DESKTOP SEARCH
        ==================================================== */}

        {searchOpen && (
          <div className="hidden border-t border-gray-100 py-3 lg:block">
            <form
              onSubmit={handleSearch}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  autoFocus
                  placeholder="Search models, services, categories or cities..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ======================================================
          MOBILE SEARCH
      ====================================================== */}

      {searchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <form
            onSubmit={handleSearch}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                autoFocus
                placeholder="Search cities, profiles..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-4 text-sm font-black text-white"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white shadow-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

            {/* NAV LINKS */}

            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    }`
                  }
                >
                  <span className="w-5">
                    {link.icon}
                  </span>

                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* =================================================
                LOGGED IN MOBILE
            ================================================= */}

            {isLoggedIn ? (
              <div className="mt-4 border-t border-gray-100 pt-4">

                {/* WALLET */}

                <Link
                  to="/wallet"
                  onClick={closeMobileMenu}
                  className="mb-2 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <FaWallet />
                    </span>

                    <div>
                      <p className="text-xs font-bold text-gray-400">
                        Wallet
                      </p>

                      <p className="text-sm font-black text-gray-900">
                        {credits} Credits
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-red-600">
                    Manage
                  </span>
                </Link>

                {/* POST PROFILE */}

                <Link
                  to="/create-listing"
                  onClick={closeMobileMenu}
                  className="mb-2 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-black text-white"
                >
                  <FaPlus />

                  Post New Profile
                </Link>

                {/* MY PROFILE */}

                <MobileMenuLink
                  to="/profile"
                  icon={<FaUserCircle />}
                  label="My Profile"
                  onClick={closeMobileMenu}
                />

                {/* MY LISTINGS */}

                <MobileMenuLink
                  to="/my-listings"
                  icon={<FaList />}
                  label="My Listings"
                  onClick={closeMobileMenu}
                />

                {/* FAVOURITES */}

                <MobileMenuLink
                  to="/favourites"
                  icon={<FaHeart />}
                  label="Favourites"
                  onClick={closeMobileMenu}
                />

                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  <FaSignOutAlt />

                  Logout
                </button>
              </div>
            ) : (
              /* =================================================
                 GUEST MOBILE
              ================================================= */

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-black text-gray-800 transition hover:border-red-300 hover:text-red-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// ============================================================
// DROPDOWN LINK
// ============================================================

function DropdownLink({
  to,
  icon,
  label,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 hover:text-red-600"
    >
      <span className="w-5 text-gray-500">
        {icon}
      </span>

      {label}
    </Link>
  );
}

// ============================================================
// MOBILE MENU LINK
// ============================================================

function MobileMenuLink({
  to,
  icon,
  label,
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 hover:text-red-600"
    >
      <span className="w-5 text-gray-500">
        {icon}
      </span>

      {label}
    </Link>
  );
}

export default Navbar;