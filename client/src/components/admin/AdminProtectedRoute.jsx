import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminProtectedRoute() {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdminAccess = () => {
      try {
        /*
         * Read the logged-in user from localStorage.
         *
         * IMPORTANT:
         * Change "user" below only if your existing login
         * stores the user under a different localStorage key.
         */
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setAllowed(false);
          setChecking(false);
          return;
        }

        const user = JSON.parse(storedUser);

        /*
         * Only users with role === "admin"
         * are allowed to access /admin.
         */
        if (user && user.role === "admin") {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch (error) {
        console.error("Admin access check error:", error);
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    };

    checkAdminAccess();
  }, []);

  /*
   * Premium loading screen
   */
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-500/20 bg-pink-500/10 shadow-[0_0_40px_rgba(236,72,153,0.15)]">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-700 border-t-pink-500" />
          </div>

          <h2 className="mt-5 text-lg font-bold text-white">
            Checking administrator access
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Not logged in
   *
   * Send user to the existing login page.
   *
   * The current location is preserved so we know where
   * the user originally tried to go.
   */
  if (!localStorage.getItem("user")) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  /*
   * Logged in but not administrator.
   */
  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  /*
   * Administrator is allowed.
   */
  return <Outlet />;
}

export default AdminProtectedRoute;