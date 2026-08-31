import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaUserCircle,
  FaHome,
  FaUserCheck,
  FaSignOutAlt,
  FaCoins,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaHeart,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdBadge,
  FaEdit,
  FaLock,
  FaTrashAlt,
  FaPlus,
  FaWallet,
  FaChevronRight,
  FaChartLine,
  FaStar,
  FaList,
  FaShieldAlt,
  FaArrowUp,
  FaCog,
} from "react-icons/fa";

import { getProfile, logoutUser } from "../services/authService";

function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  // ============================================================
  // FETCH PROFILE
  // ============================================================

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      if (res?.user) {
        const user = { ...res.user };

        // Get the locally stored user as a secondary source
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");

        // If the profile photo was removed and local user has no photo,
        // make sure the dashboard does not continue showing the old image.
        if (
          storedUser &&
          (!storedUser.profileImage ||
            !storedUser.profileImage?.url ||
            storedUser.profileImage?.url === "")
        ) {
          user.profileImage = null;
        }

        // Keep localStorage synchronized with the latest profile data
        localStorage.setItem("user", JSON.stringify(user));

        setProfile(user);
      } else {
        throw new Error("Profile information not found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.dispatchEvent(new Event("authChanged"));

      toast.success(res?.message || "Logged out successfully");

      navigate("/login");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.dispatchEvent(new Event("authChanged"));

      toast.error(error.response?.data?.message || "Logout failed");

      navigate("/login");
    }
  };

  // ============================================================
  // PROFILE COMPLETION
  // ============================================================

  const profileCompletion = useMemo(() => {
    if (!profile) return 0;

    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.city,
      profile.state,
      profile.profileImage?.url,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round((completed / fields.length) * 100);
  }, [profile]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl border border-gray-100">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
          </div>

          <h2 className="mt-6 text-2xl font-black text-gray-900">
            Loading Dashboard
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load your account.
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <FaUserCircle className="mx-auto text-6xl text-gray-300" />

          <h2 className="mt-5 text-2xl font-black text-gray-900">
            Profile Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            We could not load your profile information.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 cursor-pointer rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const credits = profile.wallet?.credits || 0;
  const totalPurchased = profile.wallet?.totalPurchased || 0;
  const totalSpent = profile.wallet?.totalSpent || 0;

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      {/* ============================================================
          DASHBOARD HEADER
      ============================================================ */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* BRAND */}

            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                Forever<span className="text-red-600">Meet</span>
              </h1>

              <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                Personal Dashboard
              </p>
            </div>

            {/* HEADER RIGHT */}

            <div className="flex items-center gap-3 sm:gap-5">
              {/* HOME */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                title="Go to Home"
              >
                <FaHome />
              </button>

              {/* USER */}

              <div className="hidden items-center gap-3 sm:flex">
                {profile.profileImage?.url ? (
                  <img
                    src={profile.profileImage.url}
                    alt={profile.name || "Profile"}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100"
                  />
                ) : (
                  <FaUserCircle className="text-[44px] text-gray-400" />
                )}

                <div className="max-w-[150px]">
                  <p className="truncate text-sm font-black text-gray-900">
                    {profile.name || "My Account"}
                  </p>

                  <p className="truncate text-xs capitalize text-gray-500">
                    {profile.role || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ============================================================
            WELCOME HERO
        ============================================================ */}

        <section className="relative overflow-hidden rounded-3xl bg-gray-950 shadow-xl">
          {/* Decorative background */}

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1fr_320px]">
            {/* HERO CONTENT */}

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400 ring-1 ring-green-500/20">
                  Account Active
                </span>

                {profile.isEmailVerified && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-500/20">
                    <FaUserCheck />
                    Verified
                  </span>
                )}
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back,
                <br />
                <span className="text-red-500">{profile.name || "Member"}</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Manage your professional profile, listings, wallet credits and
                account settings from one central dashboard.
              </p>

              {/* HERO BUTTONS */}

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/edit-profile")}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-gray-950 transition hover:bg-red-50"
                >
                  <FaEdit />
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/my-listings")}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <FaList />
                  My Listings
                </button>
              </div>
            </div>

            {/* PROFILE IMAGE */}

            <div className="hidden items-center justify-center bg-white/5 lg:flex">
              {profile.profileImage?.url ? (
                <img
                  src={profile.profileImage.url}
                  alt={profile.name || "Profile"}
                  className="h-56 w-56 rounded-full object-cover border-8 border-white/10 shadow-2xl"
                />
              ) : (
                <div className="flex h-56 w-56 items-center justify-center rounded-full border-8 border-white/10 bg-white/5">
                  <FaUserCircle className="text-[170px] text-gray-500" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            PROFILE COMPLETION
        ============================================================ */}

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FaUserCheck />
              </div>

              <div>
                <h3 className="font-black text-gray-900">Profile Completion</h3>

                <p className="mt-1 text-xs text-gray-500">
                  Complete your profile to make it more professional.
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1 sm:max-w-md">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">
                  Profile strength
                </span>

                <span className="text-sm font-black text-gray-900">
                  {profileCompletion}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-red-600 transition-all duration-700"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/edit-profile")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-black text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Complete Profile
              <FaChevronRight className="text-[10px]" />
            </button>
          </div>
        </section>

        {/* ============================================================
            STATISTICS
        ============================================================ */}

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-950 sm:text-2xl">
                Account Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                A quick summary of your ForeverMeet activity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <StatCard
              title="Wallet Credits"
              value={credits}
              icon={<FaCoins />}
              iconClass="bg-yellow-50 text-yellow-600"
              description="Available credits"
              onClick={() => navigate("/wallet")}
            />

            <StatCard
              title="Active Listings"
              value="0"
              icon={<FaCheckCircle />}
              iconClass="bg-green-50 text-green-600"
              description="Published profiles"
              onClick={() => navigate("/my-listings")}
            />

            <StatCard
              title="Pending Listings"
              value="0"
              icon={<FaClock />}
              iconClass="bg-orange-50 text-orange-600"
              description="Awaiting approval"
              onClick={() => navigate("/my-listings")}
            />

            <StatCard
              title="Rejected Listings"
              value="0"
              icon={<FaTimesCircle />}
              iconClass="bg-red-50 text-red-600"
              description="Needs attention"
              onClick={() => navigate("/my-listings")}
            />

            <StatCard
              title="Profile Views"
              value="0"
              icon={<FaEye />}
              iconClass="bg-blue-50 text-blue-600"
              description="Total profile views"
            />

            <StatCard
              title="Favourites"
              value="0"
              icon={<FaHeart />}
              iconClass="bg-pink-50 text-pink-600"
              description="Saved profiles"
              onClick={() => navigate("/favourites")}
            />
          </div>
        </section>

        {/* ============================================================
            WALLET + LISTING STATUS
        ============================================================ */}

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* WALLET */}

          <div className="relative overflow-hidden rounded-3xl bg-gray-950 p-6 text-white shadow-lg lg:col-span-2 sm:p-8">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-yellow-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                    <FaWallet className="text-2xl" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Your Wallet
                    </p>

                    <h3 className="mt-1 text-2xl font-black">
                      {credits} Credits
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/wallet")}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-gray-950 transition hover:bg-yellow-50"
                >
                  Manage Wallet
                  <FaChevronRight />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <WalletMiniCard label="Available" value={credits} />

                <WalletMiniCard label="Purchased" value={totalPurchased} />

                <WalletMiniCard
                  label="Spent"
                  value={totalSpent}
                  className="col-span-2 sm:col-span-1"
                />
              </div>

              <button
                type="button"
                onClick={() => navigate("/wallet")}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-black text-white transition hover:bg-red-700"
              >
                <FaPlus />
                Buy More Credits
              </button>
            </div>
          </div>

          {/* LISTING STATUS */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FaChartLine />
              </div>

              <div>
                <h3 className="font-black text-gray-950">Listing Status</h3>

                <p className="text-xs text-gray-500">
                  Current profile activity
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <ListingStatus
                label="Published"
                value="0"
                icon={<FaCheckCircle />}
                className="text-green-600 bg-green-50"
              />

              <ListingStatus
                label="Pending"
                value="0"
                icon={<FaClock />}
                className="text-orange-600 bg-orange-50"
              />

              <ListingStatus
                label="Rejected"
                value="0"
                icon={<FaTimesCircle />}
                className="text-red-600 bg-red-50"
              />
            </div>

            <button
              type="button"
              onClick={() => navigate("/create-listing")}
              className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-950 py-3 text-sm font-black text-white transition hover:bg-red-600"
            >
              <FaPlus />
              Create New Profile
            </button>
          </div>
        </section>

        {/* ============================================================
            ACCOUNT INFORMATION + QUICK ACTIONS
        ============================================================ */}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* ACCOUNT INFORMATION */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              icon={<FaUserCircle />}
              iconClass="bg-blue-50 text-blue-600"
              title="Account Information"
              subtitle="Your personal account details"
            />

            <div className="mt-7 space-y-1">
              <InfoRow
                icon={<FaEnvelope />}
                iconClass="text-blue-600 bg-blue-50"
                label="Email"
                value={profile.email}
              />

              <InfoRow
                icon={<FaPhoneAlt />}
                iconClass="text-green-600 bg-green-50"
                label="Phone"
                value={profile.phone || "Not Added"}
              />

              <InfoRow
                icon={<FaMapMarkerAlt />}
                iconClass="text-red-600 bg-red-50"
                label="City"
                value={profile.city || "Not Added"}
              />

              <InfoRow
                icon={<FaMapMarkerAlt />}
                iconClass="text-orange-600 bg-orange-50"
                label="State"
                value={profile.state || "Not Added"}
              />

              <InfoRow
                icon={<FaIdBadge />}
                iconClass="text-purple-600 bg-purple-50"
                label="Account Type"
                value={profile.role ? profile.role : "User"}
                capitalize
              />

              <InfoRow
                icon={<FaShieldAlt />}
                iconClass="text-emerald-600 bg-emerald-50"
                label="Verification"
                value={
                  profile.isEmailVerified ? "Email Verified" : "Not Verified"
                }
              />
            </div>

            <button
              type="button"
              onClick={() => navigate("/edit-profile")}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-black text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <FaEdit />
              Edit Account Information
            </button>
          </div>

          {/* QUICK ACTIONS */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              icon={<FaStar />}
              iconClass="bg-yellow-50 text-yellow-600"
              title="Quick Actions"
              subtitle="Frequently used account tools"
            />

            <div className="mt-7 grid grid-cols-2 gap-3">
              <ActionCard
                icon={<FaEdit />}
                title="Edit Profile"
                description="Update details"
                iconClass="bg-blue-50 text-blue-600"
                onClick={() => navigate("/edit-profile")}
              />

              <ActionCard
                icon={<FaList />}
                title="My Listings"
                description="Manage profiles"
                iconClass="bg-green-50 text-green-600"
                onClick={() => navigate("/my-listings")}
              />

              <ActionCard
                icon={<FaWallet />}
                title="Wallet"
                description="Manage credits"
                iconClass="bg-yellow-50 text-yellow-600"
                onClick={() => navigate("/wallet")}
              />

              <ActionCard
                icon={<FaHeart />}
                title="Favourites"
                description="Saved profiles"
                iconClass="bg-pink-50 text-pink-600"
                onClick={() => navigate("/favourites")}
              />

              <ActionCard
                icon={<FaLock />}
                title="Password"
                description="Secure account"
                iconClass="bg-purple-50 text-purple-600"
                onClick={() => navigate("/change-password")}
              />

              <ActionCard
                icon={<FaCog />}
                title="Settings"
                description="Account settings"
                iconClass="bg-gray-100 text-gray-700"
                onClick={() => navigate("/settings")}
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            MEMBERSHIP DETAILS
        ============================================================ */}

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            icon={<FaIdBadge />}
            iconClass="bg-indigo-50 text-indigo-600"
            title="Membership Details"
            subtitle="Account history and activity"
          />

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MembershipItem
              label="Member Since"
              value={
                profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString()
                  : "Not Available"
              }
              icon={<FaCalendarAlt />}
            />

            <MembershipItem
              label="Last Login"
              value={
                profile.lastLogin
                  ? new Date(profile.lastLogin).toLocaleString()
                  : "Never"
              }
              icon={<FaClock />}
            />

            <MembershipItem
              label="Account Status"
              value={profile.isBlocked ? "Blocked" : "Active"}
              icon={<FaUserCheck />}
            />

            <MembershipItem
              label="Account Role"
              value={profile.role || "User"}
              icon={<FaIdBadge />}
            />
          </div>
        </section>

        {/* ============================================================
            RECENT ACTIVITY
        ============================================================ */}

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeading
              icon={<FaChartLine />}
              iconClass="bg-blue-50 text-blue-600"
              title="Recent Activity"
              subtitle="Your latest account activity"
            />

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
              Activity Center
            </span>
          </div>

          <div className="mt-7">
            <ActivityItem
              icon={<FaUserCheck />}
              title="Account created"
              description="Your ForeverMeet account was successfully created."
              time={
                profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString()
                  : "Recently"
              }
              iconClass="bg-green-50 text-green-600"
            />

            <ActivityItem
              icon={<FaShieldAlt />}
              title={
                profile.isEmailVerified
                  ? "Email verified"
                  : "Email verification pending"
              }
              description={
                profile.isEmailVerified
                  ? "Your email address is verified."
                  : "Please verify your email address."
              }
              time="Account security"
              iconClass="bg-blue-50 text-blue-600"
            />

            <ActivityItem
              icon={<FaWallet />}
              title="Wallet available"
              description={`${credits} credits are currently available in your wallet.`}
              time="Wallet"
              iconClass="bg-yellow-50 text-yellow-600"
              last
            />
          </div>
        </section>

        {/* ============================================================
            SECURITY / DANGER ZONE
        ============================================================ */}

        <section className="mt-8 mb-10 rounded-3xl border border-red-100 bg-red-50/50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <FaShieldAlt />
              </div>

              <div>
                <h3 className="font-black text-gray-950">Account Security</h3>

                <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
                  Keep your password secure and make sure your account
                  information is up to date.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/change-password")}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:text-red-600"
              >
                <FaLock />
                Change Password
              </button>

              <button
                type="button"
                onClick={() => navigate("/delete-account")}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700"
              >
                <FaTrashAlt />
                Delete Account
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            LOGOUT
        ============================================================ */}

        <div className="mb-10 flex justify-center">
          <button
            type="button"
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <FaSignOutAlt />
            Sign out of ForeverMeet
          </button>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({ title, value, icon, iconClass, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition ${
        onClick
          ? "cursor-pointer hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
          : "cursor-default"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-gray-500">{title}</p>

          <p className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            {value}
          </p>

          <p className="mt-2 truncate text-[11px] font-medium text-gray-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      {onClick && (
        <div className="mt-4 flex items-center gap-1 text-[11px] font-black text-gray-400 transition group-hover:text-red-600">
          View details
          <FaChevronRight className="text-[8px]" />
        </div>
      )}
    </button>
  );
}

// ============================================================
// WALLET MINI CARD
// ============================================================

function WalletMiniCard({ label, value, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}

// ============================================================
// LISTING STATUS
// ============================================================

function ListingStatus({ label, value, icon, className }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 p-3">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${className}`}
        >
          {icon}
        </span>

        <span className="text-sm font-bold text-gray-700">{label}</span>
      </div>

      <span className="text-lg font-black text-gray-950">{value}</span>
    </div>
  );
}

// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({ icon, iconClass, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div>
        <h2 className="text-lg font-black text-gray-950 sm:text-xl">{title}</h2>

        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

// ============================================================
// INFO ROW
// ============================================================

function InfoRow({ icon, iconClass, label, value, capitalize = false }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-0">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-sm font-bold text-gray-800 ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value || "Not Added"}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// ACTION CARD
// ============================================================

function ActionCard({ icon, title, description, iconClass, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-gray-100 bg-gray-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-red-100 hover:bg-white hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-black text-gray-900">{title}</h3>

      <p className="mt-1 text-[11px] font-medium text-gray-500">
        {description}
      </p>

      <div className="mt-3 flex items-center gap-1 text-[10px] font-black text-gray-400 group-hover:text-red-600">
        Open
        <FaChevronRight className="text-[7px]" />
      </div>
    </button>
  );
}

// ============================================================
// MEMBERSHIP ITEM
// ============================================================

function MembershipItem({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <div className="flex items-center gap-2 text-gray-400">
        <span className="text-sm">{icon}</span>

        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-3 break-words text-sm font-black text-gray-900">
        {value}
      </p>
    </div>
  );
}

// ============================================================
// ACTIVITY ITEM
// ============================================================

function ActivityItem({
  icon,
  title,
  description,
  time,
  iconClass,
  last = false,
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </div>

        {!last && <div className="mt-2 h-full min-h-8 w-px bg-gray-200" />}
      </div>

      <div className="pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-sm font-black text-gray-900">{title}</h3>

          <span className="text-[10px] font-bold text-gray-400">{time}</span>
        </div>

        <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default Profile;
