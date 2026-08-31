import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyResetOTP from "../pages/VerifyResetOTP";
import ResetPassword from "../pages/ResetPassword";
import ChangePassword from "../pages/ChangePassword";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import DeleteAccount from "../pages/DeleteAccount";
import About from "../pages/About";
import Contact from "../pages/Contact/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "../pages/Terms/Terms";
import Disclaimer from "../pages/Disclaimer/Disclaimer";
import Cities from "../pages/cities/Cities";
import CityListings from "../pages/cities/CityListings";
import Help from "../pages/Help/Help";
import Safety from "../pages/Safety";
import FAQ from "../pages/FAQ";
import Report from "../pages/Report";
import Categories from "../pages/Categories";
import Premium from "../pages/Premium/Premium";
import AdminDashboard from "../pages/admin/AdminDashboard";

// Wallet
import Wallet from "../pages/Wallet/Wallet";
import TransactionDetails from "../pages/Wallet/TransactionDetails";

// Search
import SearchResults from "../pages/search/SearchResults";

// Listings
import CreateListing from "../pages/Listings/CreateListing";
import ListingDetails from "../pages/ListingDetails/ListingDetails";
import Favourites from "../pages/Favourites/Favourites";
import MyListings from "../pages/MyListings/MyListings";
import Listings from "../pages/Listings/Listings";

// Components
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar/Navbar";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Automatically scroll to the top whenever the route changes */}
      <ScrollToTop />

      <Navbar />

      <Routes>
        {/* =====================================================
            HOME
        ====================================================== */}

        <Route path="/" element={<Home />} />

        {/* =====================================================
            AUTHENTICATION
        ====================================================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/change-password" element={<ChangePassword />} />

        {/* =====================================================
            PROFILE
        ====================================================== */}

        <Route path="/profile" element={<Profile />} />

        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/delete-account" element={<DeleteAccount />} />

        {/* =====================================================
            WALLET
        ====================================================== */}

        <Route path="/wallet" element={<Wallet />} />

        <Route
          path="/wallet/transactions/:id"
          element={<TransactionDetails />}
        />

        {/* =====================================================
            SEARCH
        ====================================================== */}

        <Route path="/search" element={<SearchResults />} />

        {/* =====================================================
            LISTINGS
        ====================================================== */}

        <Route path="/create-listing" element={<CreateListing />} />

        <Route path="/listing/:id" element={<ListingDetails />} />

        <Route path="/my-listings" element={<MyListings />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/disclaimer" element={<Disclaimer />} />

        <Route path="/listings" element={<Listings />} />

        <Route path="/cities" element={<Cities />} />

        <Route path="/cities/:city" element={<CityListings />} />

        <Route path="/help" element={<Help />} />

        <Route path="/safety" element={<Safety />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/report" element={<Report />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/premium" element={<Premium />} />

        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </BrowserRouter>
  );
}
