import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTimes,
  FaCoins,
  FaExclamationTriangle,
  FaShoppingCart,
  FaArrowLeft,
  FaCheck,
  FaCloudUploadAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLanguage,
  FaBriefcase,
  FaImages,
  FaRocket,
  FaClock,
  FaUser,
} from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import { createListing } from "../../services/listingService";

const CITY_STATE_MAP = {
  Mumbai: "Maharashtra",
  Delhi: "Delhi",
  Hyderabad: "Telangana",
  Pune: "Maharashtra",
  Bangalore: "Karnataka",
  Ranchi: "Jharkhand",
  Kolkata: "West Bengal",
  Bhopal: "Madhya Pradesh",
  Surat: "Gujarat",
};

const LANGUAGES = [
  "Hindi",
  "English",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "Odia",
];

const PROFESSIONAL_SERVICES = [
  "Fashion Modeling",
  "Commercial Modeling",
  "Print Modeling",
  "Runway Modeling",
  "Catalog Modeling",
  "Product Promotion",
  "Brand Promotion",
  "Event Promotion",
  "Photography",
  "Acting",
  "Influencer",
  "Social Media Promotion",
  "Host / Presenter",
];

const CATEGORIES = [
  "Fashion Model",
  "Commercial Model",
  "Fitness Model",
  "Runway Model",
  "Photography Model",
  "Influencer",
  "Actor / Actress",
  "Brand Promoter",
  "Event Host",
];

const DURATIONS = [
  {
    weeks: 1,
    label: "1 Week",
    extraCredits: 0,
  },
  {
    weeks: 2,
    label: "2 Weeks",
    extraCredits: 5,
  },
  {
    weeks: 4,
    label: "4 Weeks",
    extraCredits: 15,
  },
  {
    weeks: 8,
    label: "8 Weeks",
    extraCredits: 35,
  },
];

function CreateListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    name: "",
    age: "",
    height: "",
    weight: "",
    category: "",
    city: "",
    state: "",
    phone: "",
    whatsapp: "",
    price: "",
    bio: "",
    languages: [],
    services: [],

    isPremium: false,
    isFeatured: false,
    isTrending: false,
    isHomepageHighlight: false,
    isUrgent: false,
    isTopCity: false,

    listingDurationWeeks: 1,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCreditModal, setShowCreditModal] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  // =========================================================
  // CREDIT CALCULATION
  // =========================================================

  const creditsRequired = useMemo(() => {
    let credits = 10;

    if (form.isPremium) {
      credits += 5;
    }

    if (form.isHomepageHighlight) {
      credits += 10;
    }

    if (form.isUrgent) {
      credits += 3;
    }

    if (form.isTopCity) {
      credits += 15;
    }

    const weeks = Number(form.listingDurationWeeks || 1);

    if (weeks > 1) {
      credits += (weeks - 1) * 5;
    }

    return credits;
  }, [
    form.isPremium,
    form.isHomepageHighlight,
    form.isUrgent,
    form.isTopCity,
    form.listingDurationWeeks,
  ]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitError("");
  };

  // =========================================================
  // CITY CHANGE
  // =========================================================

  const handleCityChange = (event) => {
    const city = event.target.value;

    const state = CITY_STATE_MAP[city] || "";

    setForm((previous) => ({
      ...previous,
      city,
      state,
    }));

    setErrors((previous) => ({
      ...previous,
      city: "",
      state: "",
    }));
  };

  // =========================================================
  // LANGUAGE SELECT
  // =========================================================

  const toggleLanguage = (language) => {
    setForm((previous) => {
      const alreadySelected = previous.languages.includes(language);

      return {
        ...previous,
        languages: alreadySelected
          ? previous.languages.filter((item) => item !== language)
          : [...previous.languages, language],
      };
    });
  };

  // =========================================================
  // SERVICE SELECT
  // =========================================================

  const toggleService = (service) => {
    setForm((previous) => {
      const alreadySelected = previous.services.includes(service);

      return {
        ...previous,
        services: alreadySelected
          ? previous.services.filter((item) => item !== service)
          : [...previous.services, service],
      };
    });
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImagesChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) {
      return;
    }

    const remainingSlots = 10 - images.length;

    if (remainingSlots <= 0) {
      setSubmitError("Maximum 10 images are allowed.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    const filesToAdd = selectedFiles
      .slice(0, remainingSlots)
      .filter((file) => {
        if (!allowedTypes.includes(file.type)) {
          return false;
        }

        if (file.size > 5 * 1024 * 1024) {
          return false;
        }

        return true;
      });

    if (!filesToAdd.length) {
      setSubmitError(
        "Please select JPG, JPEG, PNG or WEBP images only. Maximum size is 5MB per image.",
      );
      return;
    }

    const newPreviews = filesToAdd.map((file) =>
      URL.createObjectURL(file),
    );

    setImages((previous) => [...previous, ...filesToAdd]);

    setImagePreviews((previous) => [...previous, ...newPreviews]);

    setSubmitError("");

    event.target.value = "";
  };

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  const removeImage = (index) => {
    setImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index),
    );

    setImagePreviews((previous) => {
      const url = previous[index];

      if (url) {
        URL.revokeObjectURL(url);
      }

      return previous.filter((_, imageIndex) => imageIndex !== index);
    });
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Listing title is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.age) {
      newErrors.age = "Age is required.";
    } else if (Number(form.age) < 18 || Number(form.age) > 80) {
      newErrors.age = "Please enter a valid age.";
    }

    if (!form.height.trim()) {
      newErrors.height = "Height is required.";
    }

    if (!form.weight.trim()) {
      newErrors.weight = "Weight is required.";
    }

    if (!form.category) {
      newErrors.category = "Please select a category.";
    }

    if (!form.city) {
      newErrors.city = "Please select a city.";
    }

    if (!form.state) {
      newErrors.state = "State is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must contain 10 digits.";
    }

    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required.";
    } else if (!/^[0-9]{10}$/.test(form.whatsapp)) {
      newErrors.whatsapp = "WhatsApp number must contain 10 digits.";
    }

    if (!form.price) {
      newErrors.price = "Price is required.";
    }

    if (!form.bio.trim()) {
      newErrors.bio = "Bio is required.";
    }

    if (form.languages.length === 0) {
      newErrors.languages = "Please select at least one language.";
    }

    if (form.services.length === 0) {
      newErrors.services =
        "Please select at least one professional service.";
    }

    if (images.length === 0) {
      newErrors.images = "Please upload at least one image.";
    }

    if (images.length > 10) {
      newErrors.images = "Maximum 10 images are allowed.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================================================
  // CHECK CREDITS
  // =========================================================

  const checkCreditsBeforeSubmit = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return true;
      }

      const user = JSON.parse(storedUser);

      const credits = Number(
        user?.wallet?.credits ?? user?.credits ?? 0,
      );

      setUserCredits(credits);

      if (credits < creditsRequired) {
        setShowCreditModal(true);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Unable to check user credits:", error);

      return true;
    }
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!checkCreditsBeforeSubmit()) {
      return;
    }

    setSubmitError("");
    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("name", form.name.trim());
      formData.append("age", form.age);
      formData.append("height", form.height.trim());
      formData.append("weight", form.weight.trim());
      formData.append("category", form.category);
      formData.append("city", form.city);
      formData.append("state", form.state);
      formData.append("phone", form.phone.trim());
      formData.append("whatsapp", form.whatsapp.trim());
      formData.append("price", form.price);
      formData.append("bio", form.bio.trim());

      formData.append(
        "languages",
        JSON.stringify(form.languages),
      );

      formData.append(
        "services",
        JSON.stringify(form.services),
      );

      formData.append(
        "isPremium",
        String(form.isPremium),
      );

      formData.append(
        "isFeatured",
        String(form.isFeatured),
      );

      formData.append(
        "isTrending",
        String(form.isTrending),
      );

      formData.append(
        "isHomepageHighlight",
        String(form.isHomepageHighlight),
      );

      formData.append(
        "isUrgent",
        String(form.isUrgent),
      );

      formData.append(
        "isTopCity",
        String(form.isTopCity),
      );

      formData.append(
        "listingDurationWeeks",
        String(form.listingDurationWeeks),
      );

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await createListing(formData);

      setSuccessMessage(
        response?.message || "Listing created successfully.",
      );

      setForm({
        title: "",
        description: "",
        name: "",
        age: "",
        height: "",
        weight: "",
        category: "",
        city: "",
        state: "",
        phone: "",
        whatsapp: "",
        price: "",
        bio: "",
        languages: [],
        services: [],

        isPremium: false,
        isFeatured: false,
        isTrending: false,
        isHomepageHighlight: false,
        isUrgent: false,
        isTopCity: false,

        listingDurationWeeks: 1,
      });

      imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      setImages([]);
      setImagePreviews([]);
      setErrors({});

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Create listing error:", error);

      setSubmitError(
        error?.message || "Unable to create listing.",
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-listing-page relative min-h-screen overflow-hidden bg-slate-950">
      {/* =====================================================
          PROFESSIONAL ANIMATED BACKGROUND
      ===================================================== */}

      <style>{`
        @keyframes floatOrb {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(30px, -40px, 0) scale(1.08);
          }
        }

        @keyframes floatOrbReverse {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-35px, 35px, 0) scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        @keyframes pulseSoft {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.7;
            transform: scale(1.15);
          }
        }

        @keyframes sectionReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes uploadPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.12);
          }

          50% {
            box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float-orb {
          animation: floatOrb 10s ease-in-out infinite;
        }

        .animate-float-orb-reverse {
          animation: floatOrbReverse 13s ease-in-out infinite;
        }

        .animate-pulse-soft {
          animation: pulseSoft 5s ease-in-out infinite;
        }

        .animate-section-reveal {
          animation: sectionReveal 0.65s ease-out both;
        }

        .animate-upload-pulse {
          animation: uploadPulse 2.5s infinite;
        }

        .professional-gradient {
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .dark-glass {
          background: rgba(15, 23, 42, 0.76);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .background-grid {
          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
        }

        .input-professional {
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease,
            background-color 180ms ease;
        }

        .input-professional:focus {
          transform: translateY(-1px);
        }

        .card-hover {
          transition:
            transform 250ms ease,
            box-shadow 250ms ease,
            border-color 250ms ease;
        }

        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow:
            0 18px 45px rgba(15, 23, 42, 0.08);
        }

        .shimmer-button {
          position: relative;
          overflow: hidden;
        }

        .shimmer-button::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 40%;
          transform: translateX(-120%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.28),
            transparent
          );
          animation: shimmer 3.2s ease-in-out infinite;
        }

        .section-number {
          box-shadow:
            0 8px 18px rgba(239, 68, 68, 0.24);
        }
      `}</style>

      {/* Background elements */}

      <div className="pointer-events-none absolute inset-0 background-grid" />

      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-red-600/20 blur-3xl animate-float-orb" />

      <div className="pointer-events-none absolute right-[-120px] top-[28rem] h-96 w-96 rounded-full bg-orange-500/15 blur-3xl animate-float-orb-reverse" />

      <div className="pointer-events-none absolute left-[40%] top-[75rem] h-72 w-72 rounded-full bg-pink-500/10 blur-3xl animate-pulse-soft" />

      <div className="relative z-10">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="border-b border-white/10 bg-slate-950/80 text-white backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between gap-5">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400 shadow-lg shadow-red-500/50" />

                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-red-200">
                    ForeverMeet
                  </span>
                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Create Your{" "}
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Professional Listing
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Create a professional modelling or business profile
                  and showcase your services to clients in your city.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <HeaderBadge text="Professional Profile" />
                  <HeaderBadge text="City Based Listings" />
                  <HeaderBadge text="Premium Promotion" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                  hidden
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:border-white/20
                  hover:bg-white/10
                  sm:flex
                "
              >
                <FaArrowLeft className="text-xs" />
                Back
              </button>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
          {/* =====================================================
              SUCCESS
          ===================================================== */}

          {successMessage && (
            <div className="animate-section-reveal mb-6 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl">
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500" />

              <div className="p-5 sm:p-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <FaCheck />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-900">
                      Listing Created
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {successMessage}
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/my-listings")}
                      className="
                        mt-4
                        cursor-pointer
                        rounded-xl
                        bg-emerald-600
                        px-5
                        py-2.5
                        text-sm
                        font-black
                        text-white
                        shadow-lg
                        shadow-emerald-100
                        transition
                        hover:-translate-y-0.5
                        hover:bg-emerald-700
                      "
                    >
                      View My Listings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================
              ERROR
          ===================================================== */}

          {submitError && (
            <div className="animate-section-reveal mb-6 overflow-hidden rounded-3xl border border-red-200 bg-white shadow-xl">
              <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500" />

              <div className="flex gap-4 p-5 sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <FaExclamationTriangle />
                </div>

                <div>
                  <p className="font-black text-red-700">
                    Unable to create listing
                  </p>

                  <p className="mt-1 text-sm leading-6 text-red-600">
                    {submitError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* =====================================================
                BASIC INFORMATION
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="01"
                title="Basic Information"
                description="Tell clients about your professional profile."
                icon={<FaUser />}
              />

              <div className="space-y-5 p-4 sm:p-6 lg:p-7">
                <InputField
                  label="Listing Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Professional Fashion Model in Mumbai"
                  required
                  error={errors.title}
                />

                <TextAreaField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write a professional description about your profile..."
                  rows={6}
                  required
                  error={errors.description}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Professional Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    error={errors.name}
                  />

                  <InputField
                    label="Age"
                    name="age"
                    type="number"
                    min="18"
                    max="80"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="24"
                    required
                    error={errors.age}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Height"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    placeholder={`Example: 5'6"`}
                    required
                    error={errors.height}
                  />

                  <InputField
                    label="Weight"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="Example: 55 kg"
                    required
                    error={errors.weight}
                  />
                </div>

                <SelectField
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={CATEGORIES}
                  placeholder="Select category"
                  required
                  error={errors.category}
                />
              </div>
            </section>

            {/* =====================================================
                LOCATION
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="02"
                title="Location"
                description="Your state is automatically selected from your city."
                icon={<FaMapMarkerAlt />}
              />

              <div className="p-4 sm:p-6 lg:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-800">
                      City
                      <span className="ml-1 text-red-600">*</span>
                    </label>

                    <select
                      name="city"
                      value={form.city}
                      onChange={handleCityChange}
                      className={`
                        input-professional
                        w-full
                        cursor-pointer
                        rounded-xl
                        border
                        bg-white
                        px-4
                        py-3.5
                        text-sm
                        font-semibold
                        text-slate-900
                        outline-none
                        ${
                          errors.city
                            ? "border-red-400 bg-red-50"
                            : "border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                        }
                      `}
                    >
                      <option value="">Select city</option>

                      {Object.keys(CITY_STATE_MAP).map((city) => (
                        <option
                          key={city}
                          value={city}
                        >
                          {city}
                        </option>
                      ))}
                    </select>

                    {errors.city && (
                      <ErrorText message={errors.city} />
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black text-slate-800">
                      State
                      <span className="ml-1 text-red-600">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        readOnly
                        placeholder="Select city first"
                        className="
                          w-full
                          cursor-not-allowed
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-100
                          px-4
                          py-3.5
                          text-sm
                          font-bold
                          text-slate-700
                          outline-none
                        "
                      />

                      {form.state && (
                        <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs font-black text-emerald-600">
                          <FaCheck />
                          Auto selected
                        </span>
                      )}
                    </div>

                    {errors.state && (
                      <ErrorText message={errors.state} />
                    )}
                  </div>
                </div>

                {form.city && form.state && (
                  <div className="mt-5 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Listing location
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-black text-slate-900">
                      <FaMapMarkerAlt className="text-red-500" />
                      {form.city}, {form.state}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* =====================================================
                CONTACT
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="03"
                title="Contact Information"
                description="Both phone and WhatsApp numbers are required."
                icon={<FaPhoneAlt />}
              />

              <div className="p-4 sm:p-6 lg:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10 digit mobile number"
                    maxLength={10}
                    required
                    error={errors.phone}
                  />

                  <InputField
                    label="WhatsApp Number"
                    name="whatsapp"
                    type="tel"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="10 digit WhatsApp number"
                    maxLength={10}
                    required
                    error={errors.whatsapp}
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                  <p className="text-sm font-black text-blue-800">
                    Contact details
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Your contact information will be associated
                    with your listing.
                  </p>
                </div>
              </div>
            </section>

            {/* =====================================================
                LANGUAGES
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="04"
                title="Languages"
                description="Select all languages you can communicate professionally in."
                icon={<FaLanguage />}
              />

              <div className="p-4 sm:p-6 lg:p-7">
                <div className="flex flex-wrap gap-2.5">
                  {LANGUAGES.map((language) => {
                    const selected =
                      form.languages.includes(language);

                    return (
                      <button
                        key={language}
                        type="button"
                        onClick={() =>
                          toggleLanguage(language)
                        }
                        className={`
                          cursor-pointer
                          rounded-full
                          border
                          px-4
                          py-2.5
                          text-sm
                          font-bold
                          transition
                          duration-200
                          hover:-translate-y-0.5
                          ${
                            selected
                              ? "border-red-600 bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-100"
                              : "border-slate-200 bg-white text-slate-700 hover:border-red-300 hover:bg-red-50"
                          }
                        `}
                      >
                        {selected && (
                          <span className="mr-1">
                            ✓
                          </span>
                        )}

                        {language}
                      </button>
                    );
                  })}
                </div>

                {form.languages.length > 0 && (
                  <div className="mt-5 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-bold text-slate-500">
                      Selected languages
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {form.languages.join(", ")}
                    </p>
                  </div>
                )}

                {errors.languages && (
                  <ErrorText message={errors.languages} />
                )}
              </div>
            </section>

            {/* =====================================================
                PROFESSIONAL SERVICES
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="05"
                title="Professional Services"
                description="Select the professional services you offer."
                icon={<FaBriefcase />}
              />

              <div className="p-4 sm:p-6 lg:p-7">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {PROFESSIONAL_SERVICES.map((service) => {
                    const selected =
                      form.services.includes(service);

                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() =>
                          toggleService(service)
                        }
                        className={`
                          group
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          p-3.5
                          text-left
                          transition
                          duration-200
                          hover:-translate-y-0.5
                          ${
                            selected
                              ? "border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-red-200 hover:bg-slate-50"
                          }
                        `}
                      >
                        <span
                          className={`
                            flex
                            h-6
                            w-6
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            text-xs
                            font-black
                            transition
                            ${
                              selected
                                ? "border-red-600 bg-red-600 text-white shadow-sm"
                                : "border-slate-300 bg-white text-transparent group-hover:border-red-300"
                            }
                          `}
                        >
                          ✓
                        </span>

                        <span className="text-sm font-bold text-slate-800">
                          {service}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {errors.services && (
                  <ErrorText message={errors.services} />
                )}
              </div>
            </section>

            {/* =====================================================
                BIO + PRICE
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="06"
                title="Profile Details"
                description="Add pricing and a short professional bio."
                icon={<FaRocket />}
              />

              <div className="space-y-5 p-4 sm:p-6 lg:p-7">
                <InputField
                  label="Starting Price"
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Example: 5000"
                  required
                  error={errors.price}
                />

                <TextAreaField
                  label="Professional Bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Write a short professional bio..."
                  rows={5}
                  required
                  error={errors.bio}
                />
              </div>
            </section>

            {/* =====================================================
                IMAGES
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="07"
                title="Profile Images"
                description="Upload up to 10 professional images."
                icon={<FaImages />}
              />

              <div className="p-4 sm:p-6 lg:p-7">
                {images.length < 10 && (
                  <label
                    className="
                      animate-upload-pulse
                      group
                      flex
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-3xl
                      border-2
                      border-dashed
                      border-slate-300
                      bg-gradient-to-br
                      from-slate-50
                      via-white
                      to-red-50
                      px-6
                      py-12
                      text-center
                      transition
                      duration-300
                      hover:border-red-400
                      hover:bg-red-50
                    "
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-2xl text-white shadow-xl shadow-red-200 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                      <FaCloudUploadAlt />
                    </div>

                    <p className="mt-5 text-base font-black text-slate-900">
                      Upload Professional Images
                    </p>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      Add high-quality images that represent
                      your professional profile.
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-500 shadow-sm">
                        JPG
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-500 shadow-sm">
                        PNG
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-500 shadow-sm">
                        WEBP
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      Maximum 5MB per image • Maximum 10 images
                    </p>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={handleImagesChange}
                      className="hidden"
                    />
                  </label>
                )}

                {errors.images && (
                  <ErrorText message={errors.images} />
                )}

                {imagePreviews.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={preview}
                        className="
                          group
                          relative
                          aspect-[3/4]
                          overflow-hidden
                          rounded-2xl
                          bg-slate-100
                          shadow-sm
                          ring-1
                          ring-slate-200
                        "
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />

                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                        {index === 0 && (
                          <span className="absolute left-2 top-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-2.5 py-1.5 text-[10px] font-black text-white shadow-lg">
                            MAIN IMAGE
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-9
                            w-9
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            bg-black/70
                            text-sm
                            font-bold
                            text-white
                            opacity-90
                            backdrop-blur-sm
                            transition
                            hover:bg-red-600
                            hover:scale-105
                          "
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length > 0 && (
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold text-slate-500">
                      Images selected
                    </p>

                    <p className="text-sm font-black text-slate-900">
                      {images.length} / 10
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* =====================================================
                PROMOTION
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="08"
                title="Listing Promotion"
                description="Optional promotional features use additional credits."
                icon={<FaRocket />}
              />

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:p-7">
                <FeatureCheckbox
                  name="isPremium"
                  checked={form.isPremium}
                  onChange={handleChange}
                  title="Premium"
                  description="+5 credits"
                />

                <FeatureCheckbox
                  name="isHomepageHighlight"
                  checked={form.isHomepageHighlight}
                  onChange={handleChange}
                  title="Homepage Highlight"
                  description="+10 credits"
                />

                <FeatureCheckbox
                  name="isUrgent"
                  checked={form.isUrgent}
                  onChange={handleChange}
                  title="Urgent"
                  description="+3 credits"
                />

                <FeatureCheckbox
                  name="isTopCity"
                  checked={form.isTopCity}
                  onChange={handleChange}
                  title="Top City"
                  description="+15 credits"
                />

                <FeatureCheckbox
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  title="Featured"
                  description="Optional"
                />

                <FeatureCheckbox
                  name="isTrending"
                  checked={form.isTrending}
                  onChange={handleChange}
                  title="Trending"
                  description="Optional"
                />
              </div>
            </section>

            {/* =====================================================
                DURATION
            ===================================================== */}

            <section className="glass-card card-hover animate-section-reveal overflow-hidden rounded-3xl border border-white/70 shadow-xl">
              <SectionHeader
                number="09"
                title="Listing Duration"
                description="Choose how long your listing should remain active."
                icon={<FaClock />}
              />

              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-6 lg:p-7">
                {DURATIONS.map((duration) => {
                  const selected =
                    Number(form.listingDurationWeeks) ===
                    duration.weeks;

                  return (
                    <button
                      key={duration.weeks}
                      type="button"
                      onClick={() =>
                        setForm((previous) => ({
                          ...previous,
                          listingDurationWeeks:
                            duration.weeks,
                        }))
                      }
                      className={`
                        cursor-pointer
                        rounded-2xl
                        border
                        p-4
                        text-center
                        transition
                        duration-200
                        hover:-translate-y-1
                        ${
                          selected
                            ? "border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg shadow-red-100"
                            : "border-slate-200 bg-white hover:border-red-300 hover:bg-red-50"
                        }
                      `}
                    >
                      <div
                        className={`
                          mx-auto
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          ${
                            selected
                              ? "bg-gradient-to-br from-red-500 to-orange-500 text-white"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        <FaClock />
                      </div>

                      <p className="mt-3 font-black text-slate-900">
                        {duration.label}
                      </p>

                      {duration.extraCredits === 0 ? (
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          Base price
                        </p>
                      ) : (
                        <p className="mt-1 text-xs font-black text-red-600">
                          +{duration.extraCredits} credits
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* =====================================================
                SUMMARY
            ===================================================== */}

            <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-white shadow-2xl">
              <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500" />

              <div className="flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                      <FaCoins />
                    </div>

                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                      Total credits required
                    </p>
                  </div>

                  <p className="mt-3 text-4xl font-black tracking-tight">
                    {creditsRequired}
                    <span className="ml-2 text-sm font-bold text-slate-400">
                      credits
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {form.listingDurationWeeks} week listing
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    shimmer-button
                    w-full
                    cursor-pointer
                    rounded-2xl
                    bg-gradient-to-r
                    from-red-600
                    via-red-500
                    to-orange-500
                    px-7
                    py-4
                    text-sm
                    font-black
                    text-white
                    shadow-xl
                    shadow-red-950/30
                    transition
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-2xl
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:w-auto
                  "
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating Listing...
                      </>
                    ) : (
                      <>
                        <FaRocket />
                        Create Listing
                      </>
                    )}
                  </span>
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>

      {/* =====================================================
          NO CREDITS / INSUFFICIENT CREDITS MODAL
      ===================================================== */}

      {showCreditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-md">
          <div className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Close */}

            <button
              type="button"
              onClick={() => setShowCreditModal(false)}
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-black/10
                text-white
                transition
                hover:bg-black/20
              "
            >
              <FaTimes />
            </button>

            {/* Top */}

            <div className="professional-gradient bg-gradient-to-br from-red-600 via-red-500 to-orange-500 px-6 pb-8 pt-10 text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-white/15
                  text-white
                  shadow-2xl
                  ring-8
                  ring-white/10
                  backdrop-blur-md
                "
              >
                <FaCoins className="text-3xl" />
              </div>

              <h2 className="mt-5 text-2xl font-black tracking-tight text-white">
                Credits Required
              </h2>

              <p className="mt-2 text-sm leading-6 text-red-50">
                You don't have enough credits to publish this listing.
              </p>
            </div>

            {/* Content */}

            <div className="p-5 sm:p-7">
              {/* Credit status */}

              <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Your credits
                    </p>

                    <p className="mt-1 text-3xl font-black text-slate-900">
                      {userCredits}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Required
                    </p>

                    <p className="mt-1 text-3xl font-black text-red-600">
                      {creditsRequired}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-700"
                    style={{
                      width: `${
                        creditsRequired > 0
                          ? Math.min(
                              100,
                              (userCredits /
                                creditsRequired) *
                                100,
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Warning */}

              <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <FaExclamationTriangle />
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    You cannot publish this listing yet.
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {userCredits === 0
                      ? "You have no credits in your wallet. Please purchase credits to publish your listing."
                      : `You need ${
                          creditsRequired - userCredits
                        } more credits to publish this listing.`}
                  </p>
                </div>
              </div>

              {/* Buy credits */}

              <button
                type="button"
                onClick={() => navigate("/wallet")}
                className="
                  shimmer-button
                  mt-6
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-red-600
                  to-orange-500
                  px-5
                  py-4
                  text-sm
                  font-black
                  text-white
                  shadow-xl
                  shadow-red-100
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-2xl
                  active:scale-[0.98]
                "
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaShoppingCart />
                  Buy Credits
                </span>
              </button>

              {/* Cancel */}

              <button
                type="button"
                onClick={() => setShowCreditModal(false)}
                className="
                  mt-3
                  w-full
                  cursor-pointer
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-black
                  text-slate-700
                  transition
                  hover:border-slate-300
                  hover:bg-slate-50
                "
              >
                Continue Editing
              </button>

              <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                Credits are used when your listing is successfully
                published.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// HEADER BADGE
// =============================================================

function HeaderBadge({ text }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-sm">
      {text}
    </span>
  );
}

// =============================================================
// SECTION HEADER
// =============================================================

function SectionHeader({
  number,
  title,
  description,
  icon,
}) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 px-4 py-5 sm:px-6 lg:px-7">
      <div className="flex items-center gap-3">
        <div className="section-number flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-sm font-black text-white">
          {number}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-black tracking-tight text-slate-900">
              {title}
            </h2>

            <span className="hidden text-xs text-slate-300 sm:inline">
              •
            </span>

            <span className="hidden text-xs text-red-500 sm:inline">
              {icon}
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// INPUT
// =============================================================

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
  min,
  max,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-800">
        {label}

        {required && (
          <span className="ml-1 text-red-600">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        maxLength={maxLength}
        className={`
          input-professional
          w-full
          rounded-xl
          border
          px-4
          py-3.5
          text-sm
          font-semibold
          text-slate-900
          placeholder:text-slate-400
          outline-none
          ${
            error
              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-slate-200 bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          }
        `}
      />

      {error && <ErrorText message={error} />}
    </div>
  );
}

// =============================================================
// TEXTAREA
// =============================================================

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  required = false,
  error,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-800">
        {label}

        {required && (
          <span className="ml-1 text-red-600">*</span>
        )}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`
          input-professional
          w-full
          resize-y
          rounded-xl
          border
          px-4
          py-3.5
          text-sm
          font-semibold
          leading-6
          text-slate-900
          placeholder:text-slate-400
          outline-none
          ${
            error
              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-slate-200 bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          }
        `}
      />

      {error && <ErrorText message={error} />}
    </div>
  );
}

// =============================================================
// SELECT
// =============================================================

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  error,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-800">
        {label}

        {required && (
          <span className="ml-1 text-red-600">*</span>
        )}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
          input-professional
          w-full
          cursor-pointer
          rounded-xl
          border
          bg-white
          px-4
          py-3.5
          text-sm
          font-semibold
          text-slate-900
          outline-none
          ${
            error
              ? "border-red-400"
              : "border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          }
        `}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      {error && <ErrorText message={error} />}
    </div>
  );
}

// =============================================================
// FEATURE CHECKBOX
// =============================================================

function FeatureCheckbox({
  name,
  checked,
  onChange,
  title,
  description,
}) {
  return (
    <label
      className={`
        group
        flex
        cursor-pointer
        items-center
        gap-3
        rounded-2xl
        border
        p-4
        transition
        duration-200
        hover:-translate-y-0.5
        ${
          checked
            ? "border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-sm"
            : "border-slate-200 bg-white hover:border-red-200 hover:bg-slate-50"
        }
      `}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 cursor-pointer accent-red-600"
      />

      <div className="min-w-0">
        <p className="text-sm font-black text-slate-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs font-semibold text-slate-500">
          {description}
        </p>
      </div>
    </label>
  );
}

// =============================================================
// ERROR
// =============================================================

function ErrorText({ message }) {
  return (
    <p className="mt-1.5 text-xs font-bold text-red-600">
      {message}
    </p>
  );
}

export default CreateListing;