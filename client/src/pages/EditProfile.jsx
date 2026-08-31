import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCity,
  FaMapMarkerAlt,
  FaCamera,
  FaSave,
  FaArrowLeft,
  FaCheckCircle,
  FaShieldAlt,
  FaInfoCircle,
  FaTimes,
  FaUserCircle,
  FaLock,
  FaChevronRight,
  FaTrashAlt,
  FaImage,
} from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
} from "../services/authService";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Used when an existing image needs to be deleted
  const [removeExistingImage, setRemoveExistingImage] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    fetchProfile();

    return () => {
      if (
        previewImage &&
        previewImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, []);

  // ============================================================
  // FETCH PROFILE
  // ============================================================

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      const user = res?.user;

      if (!user) {
        throw new Error("Profile not found");
      }

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        state: user.state || "",
      });

      if (user.profileImage?.url) {
        setPreviewImage(user.profileImage.url);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load profile"
      );
    } finally {
      setFetching(false);
    }
  };

  // ============================================================
  // HANDLE INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // HANDLE PROFILE IMAGE
  // ============================================================

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    // Allow selecting the same image again
    e.target.value = "";

    if (!file) return;

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Profile image must be less than 5 MB"
      );
      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please select a JPG, PNG or WEBP image"
      );
      return;
    }

    // Remove old temporary blob URL
    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(file);
    setPreviewImage(imageUrl);

    // If user selects a new image,
    // don't remove the existing image separately.
    setRemoveExistingImage(false);
  };

  // ============================================================
  // REMOVE PROFILE IMAGE
  // ============================================================

  const handleRemoveImage = () => {
    // Remove temporary selected image
    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewImage);
    }

    setProfileImage(null);
    setPreviewImage("");

    // Tell backend that the existing image should be removed
    setRemoveExistingImage(true);

    toast.success("Profile photo removed");
  };

  // ============================================================
  // PROFILE COMPLETION
  // ============================================================

  const profileCompletion = useMemo(() => {
    const fields = [
      formData.name,
      formData.email,
      formData.phone,
      formData.city,
      formData.state,
      previewImage,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [formData, previewImage]);

  // ============================================================
  // FORM SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error(
        "Name must contain at least 2 characters"
      );
      return;
    }

    if (formData.phone.trim().length > 15) {
      toast.error(
        "Phone number cannot exceed 15 characters"
      );
      return;
    }

    const data = new FormData();

    data.append(
      "name",
      formData.name.trim()
    );

    data.append(
      "phone",
      formData.phone.trim()
    );

    data.append(
      "city",
      formData.city.trim()
    );

    data.append(
      "state",
      formData.state.trim()
    );

    // New image
    if (profileImage) {
      data.append(
        "profileImage",
        profileImage
      );
    }

    // Existing image removal
    if (removeExistingImage) {
      data.append(
        "removeProfileImage",
        "true"
      );
    }

    try {
      setLoading(true);

      const res = await updateProfile(data);

      toast.success(
        res?.message ||
          "Profile updated successfully"
      );

      navigate("/profile");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 flex items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
          </div>

          <h2 className="mt-6 text-2xl font-black text-gray-950">
            Loading Profile
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load your account
            information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb]">

      {/* ============================================================
          PAGE HEADER
      ============================================================ */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <FaArrowLeft />
              </button>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                  Edit Profile
                </h1>

                <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                  Update your personal account information
                </p>
              </div>

            </div>

            {/* RIGHT */}

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="hidden items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:flex"
            >
              Back to Dashboard
              <FaChevronRight className="text-xs" />
            </button>

          </div>
        </div>
      </header>

      {/* ============================================================
          MAIN
      ============================================================ */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ========================================================
              MAIN EDIT CARD
          ======================================================== */}

          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            {/* CARD HEADER */}

            <div className="border-b border-gray-100 px-6 py-6 sm:px-8">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <FaUser />
                </div>

                <div>

                  <h2 className="text-xl font-black text-gray-950">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Keep your profile information accurate
                    and up to date.
                  </p>

                </div>

              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8"
            >

              {/* ====================================================
                  PROFILE IMAGE
              ==================================================== */}

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6">

                <div className="flex flex-col items-center gap-6 sm:flex-row">

                  {/* IMAGE */}

                  <div className="relative">

                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt={
                          formData.name ||
                          "Profile"
                        }
                        className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg ring-1 ring-gray-200 sm:h-36 sm:w-36"
                      />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg ring-1 ring-gray-200 sm:h-36 sm:w-36">
                        <FaUserCircle className="text-[110px] text-gray-400" />
                      </div>
                    )}

                    {/* CAMERA BUTTON */}

                    <label
                      className="absolute bottom-0 right-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-white transition hover:bg-red-700"
                      title="Change photo"
                    >

                      <FaCamera />

                      <input
                        type="file"
                        hidden
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImage}
                      />

                    </label>

                    {/* REMOVE IMAGE BUTTON */}

                    {previewImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        disabled={loading}
                        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-gray-950 text-white shadow-lg transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Remove profile photo"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    )}

                  </div>

                  {/* IMAGE INFO */}

                  <div className="text-center sm:text-left">

                    <h3 className="font-black text-gray-950">
                      Profile Photo
                    </h3>

                    <p className="mt-1 max-w-md text-sm leading-6 text-gray-500">
                      Upload a professional profile photo.
                      A clear image helps people recognize
                      your profile.
                    </p>

                    <p className="mt-3 text-xs font-bold text-gray-400">
                      JPG, PNG or WEBP • Maximum 5 MB
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">

                      {/* CHANGE PHOTO */}

                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-black text-white transition hover:bg-red-600">

                        <FaCamera />

                        {previewImage
                          ? "Change Photo"
                          : "Upload Photo"}

                        <input
                          type="file"
                          hidden
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImage}
                        />

                      </label>

                      {/* REMOVE PHOTO */}

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          disabled={loading}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-black text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaTrashAlt />
                          Remove Photo
                        </button>
                      )}

                    </div>

                    {removeExistingImage && !previewImage && (
                      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600">
                        <FaInfoCircle />
                        Photo will be removed when you save.
                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* ====================================================
                  FORM FIELDS
              ==================================================== */}

              <div className="mt-8">

                <div className="mb-5">

                  <h3 className="text-lg font-black text-gray-950">
                    Account Details
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Update the information associated with
                    your account.
                  </p>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* NAME */}

                  <FormField
                    label="Full Name"
                    icon={<FaUser />}
                    required
                  >

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      maxLength={60}
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <div className="mt-1 flex justify-end">
                      <span className="text-[10px] font-medium text-gray-400">
                        {formData.name.length}/60
                      </span>
                    </div>

                  </FormField>

                  {/* EMAIL */}

                  <FormField
                    label="Email Address"
                    icon={<FaEnvelope />}
                    hint="Email cannot be changed here"
                  >

                    <div className="relative">

                      <input
                        type="email"
                        value={formData.email}
                        readOnly
                        className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3.5 pr-11 text-sm font-medium text-gray-500 outline-none"
                      />

                      <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                    </div>

                  </FormField>

                  {/* PHONE */}

                  <FormField
                    label="Phone Number"
                    icon={<FaPhone />}
                  >

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      maxLength={15}
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                  </FormField>

                  {/* CITY */}

                  <FormField
                    label="City"
                    icon={<FaCity />}
                  >

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      maxLength={50}
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                  </FormField>

                  {/* STATE */}

                  <FormField
                    label="State"
                    icon={<FaMapMarkerAlt />}
                  >

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      maxLength={50}
                      disabled={loading}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                  </FormField>

                </div>

              </div>

              {/* ====================================================
                  INFORMATION BOX
              ==================================================== */}

              <div className="mt-8 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                <FaInfoCircle className="mt-0.5 shrink-0 text-blue-600" />

                <div>

                  <h4 className="text-sm font-black text-blue-900">
                    Keep your information accurate
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Your account information may be used
                    for profile identification, communication
                    and verification.
                  </p>

                </div>

              </div>

              {/* ====================================================
                  BUTTONS
              ==================================================== */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/profile")
                  }
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-black text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaArrowLeft />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}

                </button>

              </div>

            </form>

          </section>

          {/* ========================================================
              RIGHT SIDEBAR
          ======================================================== */}

          <aside className="space-y-6">

            {/* PROFILE STRENGTH */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Profile Strength
                  </p>

                  <h3 className="mt-1 text-3xl font-black text-gray-950">
                    {profileCompletion}%
                  </h3>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <FaUser className="text-xl" />
                </div>

              </div>

              <div className="mt-5">

                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-red-600 transition-all duration-700"
                    style={{
                      width: `${profileCompletion}%`,
                    }}
                  />

                </div>

              </div>

              <p className="mt-4 text-xs leading-5 text-gray-500">
                Complete your profile information to make
                your ForeverMeet account look more professional.
              </p>

            </div>

            {/* VERIFICATION */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FaShieldAlt />
                </div>

                <div>

                  <h3 className="font-black text-gray-950">
                    Account Security
                  </h3>

                  <p className="text-xs text-gray-500">
                    Your account information
                  </p>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                <SecurityItem
                  title="Email Address"
                  status="Protected"
                />

                <SecurityItem
                  title="Profile Information"
                  status="Secure"
                />

                <SecurityItem
                  title="Account Access"
                  status="Protected"
                />

              </div>

            </div>

            {/* QUICK LINKS */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

              <h3 className="font-black text-gray-950">
                Account Settings
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Manage other account options.
              </p>

              <div className="mt-5 space-y-2">

                <SidebarButton
                  icon={<FaLock />}
                  title="Change Password"
                  onClick={() =>
                    navigate("/change-password")
                  }
                />

                <SidebarButton
                  icon={<FaUser />}
                  title="View Profile"
                  onClick={() =>
                    navigate("/profile")
                  }
                />

                <SidebarButton
                  icon={<FaShieldAlt />}
                  title="Account Security"
                  onClick={() =>
                    navigate("/change-password")
                  }
                />

              </div>

            </div>

            {/* HELP */}

            <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-lg">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <FaInfoCircle />
              </div>

              <h3 className="mt-5 font-black">
                Need Help?
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                Make sure your information is accurate before
                saving your profile. You can change your
                profile photo at any time.
              </p>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

// ============================================================
// FORM FIELD
// ============================================================

function FormField({
  label,
  icon,
  children,
  required = false,
  hint = "",
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <label className="flex items-center gap-2 text-xs font-black text-gray-700">

          <span className="text-gray-400">
            {icon}
          </span>

          {label}

          {required && (
            <span className="text-red-600">
              *
            </span>
          )}

        </label>

        {hint && (
          <span className="text-[10px] font-medium text-gray-400">
            {hint}
          </span>
        )}

      </div>

      {children}

    </div>
  );
}

// ============================================================
// SECURITY ITEM
// ============================================================

function SecurityItem({
  title,
  status,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">

      <div className="flex items-center gap-3">

        <FaCheckCircle className="text-green-500" />

        <span className="text-xs font-bold text-gray-700">
          {title}
        </span>

      </div>

      <span className="text-[10px] font-black text-green-600">
        {status}
      </span>

    </div>
  );
}

// ============================================================
// SIDEBAR BUTTON
// ============================================================

function SidebarButton({
  icon,
  title,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 text-left transition hover:border-red-100 hover:bg-red-50"
    >

      <span className="flex items-center gap-3">

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm transition group-hover:text-red-600">
          {icon}
        </span>

        <span className="text-xs font-black text-gray-700 transition group-hover:text-red-600">
          {title}
        </span>

      </span>

      <FaChevronRight className="text-[10px] text-gray-300 transition group-hover:text-red-600" />

    </button>
  );
}

export default EditProfile;