import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaUsers,
  FaList,
  FaCoins,
  FaCheckCircle,
  FaBan,
  FaCrown,
  FaStar,
  FaFire,
  FaShieldAlt,
  FaSearch,
  FaChartLine,
  FaUserShield,
  FaPlus,
  FaTimes,
  FaCheck,
  FaTimesCircle,
  FaSync,
  FaBars,
} from "react-icons/fa";

import {
  getAdminDashboard,
  getAdminUsers,
  getAdminListings,
  blockUser,
  unblockUser,
  addUserCredits,
  approveListing,
  rejectListing,
  toggleListingPremium,
  toggleListingFeatured,
  toggleListingTrending,
  toggleListingVerification,
} from "../../services/adminService";


function AdminDashboard() {
  const [activePage, setActivePage] =
    useState("overview");

  const [dashboard, setDashboard] =
    useState(null);

  const [users, setUsers] = useState([]);

  const [listings, setListings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState("");

  const [error, setError] =
    useState("");

  const [searchUser, setSearchUser] =
    useState("");

  const [searchListing, setSearchListing] =
    useState("");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [creditModal, setCreditModal] =
    useState(null);

  const [creditAmount, setCreditAmount] =
    useState("");


  /*
  |--------------------------------------------------------------------------
  | Load dashboard
  |--------------------------------------------------------------------------
  */

  const loadDashboard = async () => {
    try {
      setError("");

      const response =
        await getAdminDashboard();

      setDashboard(response);
    } catch (error) {
      setError(error.message);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Load users
  |--------------------------------------------------------------------------
  */

  const loadUsers = async () => {
    try {
      const response =
        await getAdminUsers();

      setUsers(response.users || []);
    } catch (error) {
      setError(error.message);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Load listings
  |--------------------------------------------------------------------------
  */

  const loadListings = async () => {
    try {
      const response =
        await getAdminListings();

      setListings(
        response.listings || []
      );
    } catch (error) {
      setError(error.message);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Initial load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await Promise.all([
        loadDashboard(),
        loadUsers(),
        loadListings(),
      ]);

      setLoading(false);
    };

    load();
  }, []);


  /*
  |--------------------------------------------------------------------------
  | Refresh
  |--------------------------------------------------------------------------
  */

  const refreshAll = async () => {
    setLoading(true);

    await Promise.all([
      loadDashboard(),
      loadUsers(),
      loadListings(),
    ]);

    setLoading(false);
  };


  /*
  |--------------------------------------------------------------------------
  | Block / unblock
  |--------------------------------------------------------------------------
  */

  const handleBlock = async (user) => {
    try {
      setActionLoading(user._id);

      if (user.isBlocked) {
        await unblockUser(user._id);
      } else {
        await blockUser(user._id);
      }

      await Promise.all([
        loadDashboard(),
        loadUsers(),
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading("");
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Add credits
  |--------------------------------------------------------------------------
  */

  const handleAddCredits = async () => {
    if (!creditModal) return;

    const amount =
      Number(creditAmount);

    if (
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      setError(
        "Enter a valid whole number of credits"
      );

      return;
    }

    try {
      setActionLoading(
        creditModal._id
      );

      await addUserCredits(
        creditModal._id,
        amount
      );

      setCreditModal(null);
      setCreditAmount("");

      await Promise.all([
        loadDashboard(),
        loadUsers(),
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading("");
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Listing action
  |--------------------------------------------------------------------------
  */

  const listingAction = async (
    listingId,
    action
  ) => {
    try {
      setActionLoading(listingId);

      if (action === "approve") {
        await approveListing(listingId);
      }

      if (action === "reject") {
        await rejectListing(listingId);
      }

      if (action === "premium") {
        await toggleListingPremium(
          listingId
        );
      }

      if (action === "featured") {
        await toggleListingFeatured(
          listingId
        );
      }

      if (action === "trending") {
        await toggleListingTrending(
          listingId
        );
      }

      if (action === "verify") {
        await toggleListingVerification(
          listingId
        );
      }

      await Promise.all([
        loadDashboard(),
        loadListings(),
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading("");
    }
  };


  /*
  |--------------------------------------------------------------------------
  | Filter users
  |--------------------------------------------------------------------------
  */

  const filteredUsers =
    useMemo(() => {
      const search =
        searchUser
          .toLowerCase()
          .trim();

      if (!search) {
        return users;
      }

      return users.filter(
        (user) =>
          user.name
            ?.toLowerCase()
            .includes(search) ||
          user.email
            ?.toLowerCase()
            .includes(search) ||
          user.city
            ?.toLowerCase()
            .includes(search)
      );
    }, [users, searchUser]);


  /*
  |--------------------------------------------------------------------------
  | Filter listings
  |--------------------------------------------------------------------------
  */

  const filteredListings =
    useMemo(() => {
      const search =
        searchListing
          .toLowerCase()
          .trim();

      if (!search) {
        return listings;
      }

      return listings.filter(
        (listing) =>
          listing.title
            ?.toLowerCase()
            .includes(search) ||
          listing.category
            ?.toLowerCase()
            .includes(search) ||
          listing.city
            ?.toLowerCase()
            .includes(search) ||
          listing.user?.name
            ?.toLowerCase()
            .includes(search)
      );
    }, [
      listings,
      searchListing,
    ]);


  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading && !dashboard) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "#070b14",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <FaSync
            size={30}
            style={{
              animation:
                "spin 1s linear infinite",
              marginBottom: 15,
            }}
          />

          <div>
            Loading admin dashboard...
          </div>
        </div>
      </div>
    );
  }


  const statistics =
    dashboard?.statistics || {};

  const userStats =
    statistics.users || {};

  const listingStats =
    statistics.listings || {};

  const walletStats =
    statistics.wallet || {};


  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#070b14",
        color: "#e2e8f0",
        fontFamily:
          "Inter, Arial, sans-serif",
      }}
    >

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        style={{
          position:
            "fixed",
          top: 0,
          left: mobileMenu
            ? 0
            : -280,
          width: 270,
          height: "100vh",
          background:
            "linear-gradient(180deg,#0b101b,#080c15)",
          borderRight:
            "1px solid rgba(255,255,255,.07)",
          zIndex: 100,
          transition:
            "left .25s ease",
          padding: 22,
          boxSizing:
            "border-box",
          boxShadow:
            "20px 0 60px rgba(0,0,0,.35)",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            marginBottom: 35,
          }}
        >

          <div
            style={{
              fontSize: 21,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            Forever
            <span
              style={{
                color: "#ec4899",
              }}
            >
              Meet
            </span>
          </div>

          <button
            onClick={() =>
              setMobileMenu(false)
            }
            style={{
              background:
                "transparent",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            <FaTimes />
          </button>

        </div>


        <div
          style={{
            fontSize: 10,
            textTransform:
              "uppercase",
            letterSpacing: 1.5,
            color: "#475569",
            marginBottom: 10,
          }}
        >
          Administration
        </div>


        <SidebarButton
          active={
            activePage === "overview"
          }
          icon={<FaChartLine />}
          text="Overview"
          onClick={() => {
            setActivePage("overview");
            setMobileMenu(false);
          }}
        />

        <SidebarButton
          active={
            activePage === "users"
          }
          icon={<FaUsers />}
          text="Users"
          onClick={() => {
            setActivePage("users");
            setMobileMenu(false);
          }}
        />

        <SidebarButton
          active={
            activePage === "listings"
          }
          icon={<FaList />}
          text="Listings"
          onClick={() => {
            setActivePage("listings");
            setMobileMenu(false);
          }}
        />

      </aside>


      {/* ======================================================
          MAIN
      ====================================================== */}

      <main
        style={{
          minHeight:
            "100vh",
          width: "100%",
        }}
      >

        {/* TOP BAR */}

        <header
          style={{
            height: 72,
            borderBottom:
              "1px solid rgba(255,255,255,.06)",
            background:
              "rgba(7,11,20,.85)",
            backdropFilter:
              "blur(15px)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            padding:
              "0 24px",
            position:
              "sticky",
            top: 0,
            zIndex: 50,
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 14,
            }}
          >

            <button
              onClick={() =>
                setMobileMenu(true)
              }
              style={{
                border: "none",
                background:
                  "rgba(255,255,255,.05)",
                color: "#cbd5e1",
                width: 40,
                height: 40,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              <FaBars />
            </button>

            <div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Admin
                Dashboard
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  marginTop: 2,
                }}
              >
                Manage your ForeverMeet platform
              </div>

            </div>

          </div>


          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 10,
            }}
          >

            <button
              onClick={refreshAll}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border:
                  "1px solid rgba(255,255,255,.07)",
                background:
                  "rgba(255,255,255,.03)",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              <FaSync />
            </button>


            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 9,
                padding:
                  "6px 11px",
                borderRadius: 12,
                background:
                  "rgba(236,72,153,.08)",
                border:
                  "1px solid rgba(236,72,153,.15)",
              }}
            >

              <FaUserShield
                style={{
                  color: "#ec4899",
                }}
              />

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#f9a8d4",
                }}
              >
                Administrator
              </span>

            </div>

          </div>

        </header>


        <div
          style={{
            padding:
              "28px 24px 50px",
            maxWidth: 1450,
            margin: "0 auto",
          }}
        >

          {/* ERROR */}

          {error && (
            <div
              style={{
                background:
                  "rgba(239,68,68,.08)",
                border:
                  "1px solid rgba(239,68,68,.2)",
                color: "#fca5a5",
                padding:
                  "12px 15px",
                borderRadius: 12,
                marginBottom: 20,
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                fontSize: 13,
              }}
            >
              <span>
                {error}
              </span>

              <button
                onClick={() =>
                  setError("")
                }
                style={{
                  background:
                    "transparent",
                  border: "none",
                  color: "#fca5a5",
                  cursor: "pointer",
                }}
              >
                <FaTimes />
              </button>
            </div>
          )}


          {/* ==================================================
              OVERVIEW
          ================================================== */}

          {activePage === "overview" && (
            <>
              <PageHeader
                eyebrow="CONTROL CENTER"
                title="Platform Overview"
                description="Monitor users, listings and the credits system."
              />


              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(210px,1fr))",
                  gap: 15,
                  marginTop: 25,
                }}
              >

                <StatCard
                  icon={<FaUsers />}
                  title="Total Users"
                  value={
                    userStats.total || 0
                  }
                  subtitle={`${userStats.verified || 0} verified`}
                />

                <StatCard
                  icon={<FaList />}
                  title="Total Listings"
                  value={
                    listingStats.total || 0
                  }
                  subtitle={`${listingStats.approved || 0} approved`}
                />

                <StatCard
                  icon={<FaCoins />}
                  title="Credits"
                  value={
                    walletStats.totalCreditsRemaining || 0
                  }
                  subtitle="Currently remaining"
                />

                <StatCard
                  icon={<FaBan />}
                  title="Blocked Users"
                  value={
                    userStats.blocked || 0
                  }
                  subtitle="Account restrictions"
                />

                <StatCard
                  icon={<FaCrown />}
                  title="Premium"
                  value={
                    listingStats.premium || 0
                  }
                  subtitle="Premium listings"
                />

                <StatCard
                  icon={<FaFire />}
                  title="Trending"
                  value={
                    listingStats.trending || 0
                  }
                  subtitle="Trending listings"
                />

              </div>


              {/* LISTING STATUS */}

              <div
                style={{
                  marginTop: 25,
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(250px,1fr))",
                  gap: 15,
                }}
              >

                <InfoPanel
                  title="Listing Moderation"
                  icon={<FaShieldAlt />}
                >

                  <MiniStat
                    label="Pending"
                    value={
                      listingStats.pending || 0
                    }
                  />

                  <MiniStat
                    label="Approved"
                    value={
                      listingStats.approved || 0
                    }
                  />

                  <MiniStat
                    label="Rejected"
                    value={
                      listingStats.rejected || 0
                    }
                  />

                </InfoPanel>


                <InfoPanel
                  title="Visibility"
                  icon={<FaStar />}
                >

                  <MiniStat
                    label="Premium"
                    value={
                      listingStats.premium || 0
                    }
                  />

                  <MiniStat
                    label="Featured"
                    value={
                      listingStats.featured || 0
                    }
                  />

                  <MiniStat
                    label="Verified"
                    value={
                      listingStats.verified || 0
                    }
                  />

                </InfoPanel>


                <InfoPanel
                  title="Wallet"
                  icon={<FaCoins />}
                >

                  <MiniStat
                    label="Purchased"
                    value={
                      walletStats.totalCreditsPurchased || 0
                    }
                  />

                  <MiniStat
                    label="Spent"
                    value={
                      walletStats.totalCreditsSpent || 0
                    }
                  />

                  <MiniStat
                    label="Remaining"
                    value={
                      walletStats.totalCreditsRemaining || 0
                    }
                  />

                </InfoPanel>

              </div>


              {/* RECENT USERS */}

              <SectionBox
                title="Recent Users"
                action={() =>
                  setActivePage("users")
                }
              >

                <div
                  style={{
                    overflowX:
                      "auto",
                  }}
                >

                  <table
                    style={{
                      width:
                        "100%",
                      borderCollapse:
                        "collapse",
                      minWidth:
                        650,
                    }}
                  >

                    <thead>
                      <tr>
                        <TableHead>
                          User
                        </TableHead>

                        <TableHead>
                          Email
                        </TableHead>

                        <TableHead>
                          Role
                        </TableHead>

                        <TableHead>
                          Status
                        </TableHead>
                      </tr>
                    </thead>

                    <tbody>

                      {(
                        dashboard?.recentUsers ||
                        []
                      ).map((user) => (
                        <tr
                          key={
                            user._id
                          }
                        >

                          <TableCell>
                            <UserName
                              user={user}
                            />
                          </TableCell>

                          <TableCell>
                            {user.email}
                          </TableCell>

                          <TableCell>
                            <RoleBadge
                              role={
                                user.role
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <StatusBadge
                              blocked={
                                user.isBlocked
                              }
                            />
                          </TableCell>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              </SectionBox>


              {/* RECENT LISTINGS */}

              <SectionBox
                title="Recent Listings"
                action={() =>
                  setActivePage(
                    "listings"
                  )
                }
              >

                <div
                  style={{
                    overflowX:
                      "auto",
                  }}
                >

                  <table
                    style={{
                      width:
                        "100%",
                      borderCollapse:
                        "collapse",
                      minWidth:
                        750,
                    }}
                  >

                    <thead>

                      <tr>

                        <TableHead>
                          Listing
                        </TableHead>

                        <TableHead>
                          Owner
                        </TableHead>

                        <TableHead>
                          City
                        </TableHead>

                        <TableHead>
                          Status
                        </TableHead>

                        <TableHead>
                          Views
                        </TableHead>

                      </tr>

                    </thead>

                    <tbody>

                      {(
                        dashboard?.recentListings ||
                        []
                      ).map(
                        (listing) => (
                          <tr
                            key={
                              listing._id
                            }
                          >

                            <TableCell>
                              <div
                                style={{
                                  maxWidth:
                                    360,
                                  whiteSpace:
                                    "nowrap",
                                  overflow:
                                    "hidden",
                                  textOverflow:
                                    "ellipsis",
                                  color:
                                    "#e2e8f0",
                                  fontWeight:
                                    600,
                                }}
                              >
                                {
                                  listing.title
                                }
                              </div>

                              <div
                                style={{
                                  marginTop: 4,
                                  fontSize: 10,
                                  color:
                                    "#64748b",
                                }}
                              >
                                {
                                  listing.category
                                }
                              </div>
                            </TableCell>

                            <TableCell>
                              {
                                listing.user
                                  ?.name ||
                                "Unknown"
                              }
                            </TableCell>

                            <TableCell>
                              {
                                listing.city
                              }
                            </TableCell>

                            <TableCell>
                              <ListingStatus
                                status={
                                  listing.status
                                }
                              />
                            </TableCell>

                            <TableCell>
                              {
                                listing.views ||
                                0
                              }
                            </TableCell>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </SectionBox>

            </>
          )}


          {/* ==================================================
              USERS
          ================================================== */}

          {activePage === "users" && (
            <>
              <PageHeader
                eyebrow="USER MANAGEMENT"
                title="Manage Users"
                description="Block accounts and manage user credits."
              />


              <div
                style={{
                  marginTop: 25,
                  background:
                    "#0b101b",
                  border:
                    "1px solid rgba(255,255,255,.07)",
                  borderRadius: 16,
                  padding: 15,
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: 10,
                }}
              >

                <FaSearch
                  style={{
                    color:
                      "#64748b",
                  }}
                />

                <input
                  value={
                    searchUser
                  }
                  onChange={(e) =>
                    setSearchUser(
                      e.target.value
                    )
                  }
                  placeholder="Search users by name, email or city..."
                  style={{
                    width:
                      "100%",
                    border: "none",
                    outline:
                      "none",
                    background:
                      "transparent",
                    color:
                      "#fff",
                    fontSize: 13,
                  }}
                />

              </div>


              <SectionBox
                title={`${filteredUsers.length} Users`}
              >

                <div
                  style={{
                    overflowX:
                      "auto",
                  }}
                >

                  <table
                    style={{
                      width:
                        "100%",
                      borderCollapse:
                        "collapse",
                      minWidth:
                        950,
                    }}
                  >

                    <thead>

                      <tr>

                        <TableHead>
                          User
                        </TableHead>

                        <TableHead>
                          City
                        </TableHead>

                        <TableHead>
                          Role
                        </TableHead>

                        <TableHead>
                          Credits
                        </TableHead>

                        <TableHead>
                          Status
                        </TableHead>

                        <TableHead>
                          Actions
                        </TableHead>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredUsers.map(
                        (user) => (
                          <tr
                            key={
                              user._id
                            }
                          >

                            <TableCell>
                              <UserName
                                user={
                                  user
                                }
                              />
                            </TableCell>

                            <TableCell>
                              {
                                user.city ||
                                "—"
                              }
                            </TableCell>

                            <TableCell>
                              <RoleBadge
                                role={
                                  user.role
                                }
                              />
                            </TableCell>

                            <TableCell>

                              <div
                                style={{
                                  color:
                                    "#fbbf24",
                                  fontWeight:
                                    800,
                                }}
                              >
                                {Number(
                                  user.wallet
                                    ?.credits ||
                                  0
                                )}
                              </div>

                            </TableCell>

                            <TableCell>
                              <StatusBadge
                                blocked={
                                  user.isBlocked
                                }
                              />
                            </TableCell>

                            <TableCell>

                              <div
                                style={{
                                  display:
                                    "flex",
                                  gap: 7,
                                  flexWrap:
                                    "wrap",
                                }}
                              >

                                {user.role !==
                                  "admin" && (
                                  <>

                                    <ActionButton
                                      disabled={
                                        actionLoading ===
                                        user._id
                                      }
                                      icon={
                                        user.isBlocked
                                          ? <FaCheck />
                                          : <FaBan />
                                      }
                                      text={
                                        user.isBlocked
                                          ? "Unblock"
                                          : "Block"
                                      }
                                      danger={
                                        !user.isBlocked
                                      }
                                      onClick={() =>
                                        handleBlock(
                                          user
                                        )
                                      }
                                    />

                                    <ActionButton
                                      icon={
                                        <FaPlus />
                                      }
                                      text="Credits"
                                      onClick={() => {
                                        setCreditModal(
                                          user
                                        );
                                        setCreditAmount(
                                          ""
                                        );
                                      }}
                                    />

                                  </>
                                )}

                              </div>

                            </TableCell>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </SectionBox>

            </>
          )}


          {/* ==================================================
              LISTINGS
          ================================================== */}

          {activePage ===
            "listings" && (
            <>
              <PageHeader
                eyebrow="LISTING MANAGEMENT"
                title="Manage Listings"
                description="Review, approve and control listing visibility."
              />


              <div
                style={{
                  marginTop: 25,
                  background:
                    "#0b101b",
                  border:
                    "1px solid rgba(255,255,255,.07)",
                  borderRadius: 16,
                  padding: 15,
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: 10,
                }}
              >

                <FaSearch
                  style={{
                    color:
                      "#64748b",
                  }}
                />

                <input
                  value={
                    searchListing
                  }
                  onChange={(e) =>
                    setSearchListing(
                      e.target.value
                    )
                  }
                  placeholder="Search listings by title, category, city or owner..."
                  style={{
                    width:
                      "100%",
                    border: "none",
                    outline:
                      "none",
                    background:
                      "transparent",
                    color:
                      "#fff",
                    fontSize: 13,
                  }}
                />

              </div>


              <SectionBox
                title={`${filteredListings.length} Listings`}
              >

                <div
                  style={{
                    overflowX:
                      "auto",
                  }}
                >

                  <table
                    style={{
                      width:
                        "100%",
                      borderCollapse:
                        "collapse",
                      minWidth:
                        1250,
                    }}
                  >

                    <thead>

                      <tr>

                        <TableHead>
                          Listing
                        </TableHead>

                        <TableHead>
                          Owner
                        </TableHead>

                        <TableHead>
                          City
                        </TableHead>

                        <TableHead>
                          Status
                        </TableHead>

                        <TableHead>
                          Visibility
                        </TableHead>

                        <TableHead>
                          Actions
                        </TableHead>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredListings.map(
                        (listing) => (
                          <tr
                            key={
                              listing._id
                            }
                          >

                            <TableCell>

                              <div
                                style={{
                                  maxWidth:
                                    330,
                                }}
                              >

                                <div
                                  style={{
                                    fontWeight:
                                      700,
                                    color:
                                      "#f1f5f9",
                                    whiteSpace:
                                      "nowrap",
                                    overflow:
                                      "hidden",
                                    textOverflow:
                                      "ellipsis",
                                  }}
                                >
                                  {
                                    listing.title
                                  }
                                </div>

                                <div
                                  style={{
                                    marginTop: 5,
                                    fontSize: 10,
                                    color:
                                      "#64748b",
                                  }}
                                >
                                  {
                                    listing.category
                                  }
                                </div>

                              </div>

                            </TableCell>


                            <TableCell>

                              <div
                                style={{
                                  fontWeight:
                                    600,
                                  color:
                                    "#cbd5e1",
                                }}
                              >
                                {
                                  listing.user
                                    ?.name ||
                                  "Unknown"
                                }
                              </div>

                              <div
                                style={{
                                  fontSize:
                                    10,
                                  color:
                                    "#64748b",
                                  marginTop: 3,
                                }}
                              >
                                {
                                  listing.user
                                    ?.email ||
                                  ""
                                }
                              </div>

                            </TableCell>


                            <TableCell>
                              {
                                listing.city ||
                                "—"
                              }
                            </TableCell>


                            <TableCell>
                              <ListingStatus
                                status={
                                  listing.status
                                }
                              />
                            </TableCell>


                            <TableCell>

                              <div
                                style={{
                                  display:
                                    "flex",
                                  gap: 5,
                                  flexWrap:
                                    "wrap",
                                }}
                              >

                                {listing.isPremium && (
                                  <SmallBadge
                                    icon={
                                      <FaCrown />
                                    }
                                    text="Premium"
                                  />
                                )}

                                {listing.isFeatured && (
                                  <SmallBadge
                                    icon={
                                      <FaStar />
                                    }
                                    text="Featured"
                                  />
                                )}

                                {listing.isTrending && (
                                  <SmallBadge
                                    icon={
                                      <FaFire />
                                    }
                                    text="Trending"
                                  />
                                )}

                                {listing.isVerified && (
                                  <SmallBadge
                                    icon={
                                      <FaCheckCircle />
                                    }
                                    text="Verified"
                                  />
                                )}

                              </div>

                            </TableCell>


                            <TableCell>

                              <div
                                style={{
                                  display:
                                    "flex",
                                  gap: 6,
                                  flexWrap:
                                    "wrap",
                                  maxWidth:
                                    370,
                                }}
                              >

                                {listing.status !==
                                  "approved" && (
                                  <ActionButton
                                    disabled={
                                      actionLoading ===
                                      listing._id
                                    }
                                    icon={
                                      <FaCheck />
                                    }
                                    text="Approve"
                                    onClick={() =>
                                      listingAction(
                                        listing._id,
                                        "approve"
                                      )
                                    }
                                  />
                                )}


                                {listing.status !==
                                  "rejected" && (
                                  <ActionButton
                                    disabled={
                                      actionLoading ===
                                      listing._id
                                    }
                                    icon={
                                      <FaTimesCircle />
                                    }
                                    text="Reject"
                                    danger
                                    onClick={() =>
                                      listingAction(
                                        listing._id,
                                        "reject"
                                      )
                                    }
                                  />
                                )}


                                <ActionButton
                                  icon={
                                    <FaCrown />
                                  }
                                  text={
                                    listing.isPremium
                                      ? "Remove Premium"
                                      : "Premium"
                                  }
                                  onClick={() =>
                                    listingAction(
                                      listing._id,
                                      "premium"
                                    )
                                  }
                                />


                                <ActionButton
                                  icon={
                                    <FaStar />
                                  }
                                  text={
                                    listing.isFeatured
                                      ? "Remove Featured"
                                      : "Featured"
                                  }
                                  onClick={() =>
                                    listingAction(
                                      listing._id,
                                      "featured"
                                    )
                                  }
                                />


                                <ActionButton
                                  icon={
                                    <FaFire />
                                  }
                                  text={
                                    listing.isTrending
                                      ? "Remove Trending"
                                      : "Trending"
                                  }
                                  onClick={() =>
                                    listingAction(
                                      listing._id,
                                      "trending"
                                    )
                                  }
                                />


                                <ActionButton
                                  icon={
                                    <FaCheckCircle />
                                  }
                                  text={
                                    listing.isVerified
                                      ? "Unverify"
                                      : "Verify"
                                  }
                                  onClick={() =>
                                    listingAction(
                                      listing._id,
                                      "verify"
                                    )
                                  }
                                />

                              </div>

                            </TableCell>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </SectionBox>

            </>
          )}

        </div>

      </main>


      {/* ======================================================
          CREDIT MODAL
      ====================================================== */}

      {creditModal && (
        <div
          style={{
            position:
              "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,.72)",
            backdropFilter:
              "blur(8px)",
            zIndex: 200,
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding: 20,
          }}
        >

          <div
            style={{
              width:
                "100%",
              maxWidth: 430,
              background:
                "#0b101b",
              border:
                "1px solid rgba(255,255,255,.1)",
              borderRadius: 20,
              padding: 25,
              boxShadow:
                "0 30px 100px rgba(0,0,0,.55)",
            }}
          >

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
              }}
            >

              <div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color:
                      "#fff",
                  }}
                >
                  Add Credits
                </div>

                <div
                  style={{
                    marginTop: 5,
                    color:
                      "#64748b",
                    fontSize: 12,
                  }}
                >
                  Add credits to{" "}
                  <strong
                    style={{
                      color:
                        "#f9a8d4",
                    }}
                  >
                    {
                      creditModal.name
                    }
                  </strong>
                </div>

              </div>

              <button
                onClick={() =>
                  setCreditModal(null)
                }
                style={{
                  border: "none",
                  background:
                    "rgba(255,255,255,.05)",
                  color:
                    "#94a3b8",
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  cursor:
                    "pointer",
                }}
              >
                <FaTimes />
              </button>

            </div>


            <div
              style={{
                marginTop: 25,
              }}
            >

              <label
                style={{
                  display:
                    "block",
                  fontSize: 11,
                  color:
                    "#94a3b8",
                  marginBottom:
                    8,
                }}
              >
                Credits to add
              </label>

              <input
                type="number"
                min="1"
                step="1"
                value={
                  creditAmount
                }
                onChange={(e) =>
                  setCreditAmount(
                    e.target.value
                  )
                }
                placeholder="Enter credits"
                autoFocus
                style={{
                  width:
                    "100%",
                  boxSizing:
                    "border-box",
                  background:
                    "#070b14",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  color:
                    "#fff",
                  padding:
                    "13px 14px",
                  borderRadius:
                    11,
                  outline:
                    "none",
                  fontSize: 14,
                }}
              />

            </div>


            <div
              style={{
                marginTop: 20,
                display:
                  "flex",
                  gap: 10,
              }}
            >

              <button
                onClick={() =>
                  setCreditModal(null)
                }
                style={{
                  flex: 1,
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  background:
                    "rgba(255,255,255,.03)",
                  color:
                    "#94a3b8",
                  padding:
                    "12px",
                  borderRadius:
                    11,
                  cursor:
                    "pointer",
                  fontWeight:
                    700,
                }}
              >
                Cancel
              </button>


              <button
                onClick={
                  handleAddCredits
                }
                disabled={
                  actionLoading ===
                  creditModal._id
                }
                style={{
                  flex: 1,
                  border:
                    "none",
                  background:
                    "linear-gradient(135deg,#ec4899,#8b5cf6)",
                  color:
                    "#fff",
                  padding:
                    "12px",
                  borderRadius:
                    11,
                  cursor:
                    "pointer",
                  fontWeight:
                    800,
                }}
              >
                <FaPlus
                  style={{
                    marginRight:
                      7,
                  }}
                />
                Add Credits
              </button>

            </div>

          </div>

        </div>
      )}


      {/* MOBILE OVERLAY */}

      {mobileMenu && (
        <div
          onClick={() =>
            setMobileMenu(false)
          }
          style={{
            position:
              "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,.6)",
            zIndex: 90,
          }}
        />
      )}


      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @media (min-width: 1100px) {
            aside {
              left: 0 !important;
            }

            main {
              margin-left: 270px;
            }
          }

          @media (max-width: 700px) {
            main {
              margin-left: 0;
            }
          }
        `}
      </style>

    </div>
  );
}


/* ============================================================
   SIDEBAR BUTTON
============================================================ */

function SidebarButton({
  active,
  icon,
  text,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display:
          "flex",
        alignItems:
          "center",
        gap: 12,
        padding:
          "12px 13px",
        marginBottom: 5,
        border: "none",
        borderRadius: 11,
        background: active
          ? "linear-gradient(135deg,rgba(236,72,153,.18),rgba(139,92,246,.12))"
          : "transparent",
        color: active
          ? "#f9a8d4"
          : "#64748b",
        cursor:
          "pointer",
        textAlign:
          "left",
        fontWeight:
          active ? 800 : 600,
        fontSize: 12,
      }}
    >
      {icon}
      {text}
    </button>
  );
}


/* ============================================================
   PAGE HEADER
============================================================ */

function PageHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>
      <div
        style={{
          color:
            "#ec4899",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 1.5,
        }}
      >
        {eyebrow}
      </div>

      <h1
        style={{
          margin:
            "7px 0 0",
          color:
            "#fff",
          fontSize:
            "clamp(26px,4vw,38px)",
          fontWeight:
            900,
          letterSpacing:
            "-1px",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          margin:
            "8px 0 0",
          color:
            "#64748b",
          fontSize: 13,
        }}
      >
        {description}
      </p>
    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(145deg,#0d1320,#0a0f19)",
        border:
          "1px solid rgba(255,255,255,.07)",
        borderRadius: 16,
        padding: 18,
        position:
          "relative",
        overflow:
          "hidden",
      }}
    >

      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          background:
            "rgba(236,72,153,.09)",
          color:
            "#ec4899",
          marginBottom: 14,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color:
            "#64748b",
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color:
            "#fff",
          fontSize: 27,
          fontWeight: 900,
          marginTop: 4,
        }}
      >
        {value}
      </div>

      <div
        style={{
          color:
            "#475569",
          fontSize: 10,
          marginTop: 4,
        }}
      >
        {subtitle}
      </div>

    </div>
  );
}


/* ============================================================
   INFO PANEL
============================================================ */

function InfoPanel({
  title,
  icon,
  children,
}) {
  return (
    <div
      style={{
        background:
          "#0b101b",
        border:
          "1px solid rgba(255,255,255,.07)",
        borderRadius: 16,
        padding: 18,
      }}
    >

      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 9,
          color:
            "#fff",
          fontWeight:
            800,
          fontSize: 13,
          marginBottom:
            17,
        }}
      >
        <span
          style={{
            color:
              "#ec4899",
          }}
        >
          {icon}
        </span>

        {title}
      </div>

      {children}

    </div>
  );
}


/* ============================================================
   MINI STAT
============================================================ */

function MiniStat({
  label,
  value,
}) {
  return (
    <div
      style={{
        display:
          "flex",
        alignItems:
          "center",
        justifyContent:
          "space-between",
        padding:
          "10px 0",
        borderTop:
          "1px solid rgba(255,255,255,.05)",
      }}
    >

      <span
        style={{
          color:
            "#64748b",
          fontSize: 11,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color:
            "#e2e8f0",
          fontSize: 13,
        }}
      >
        {value}
      </strong>

    </div>
  );
}


/* ============================================================
   SECTION BOX
============================================================ */

function SectionBox({
  title,
  action,
  children,
}) {
  return (
    <div
      style={{
        marginTop: 25,
        background:
          "#0b101b",
        border:
          "1px solid rgba(255,255,255,.07)",
        borderRadius: 16,
        overflow:
          "hidden",
      }}
    >

      <div
        style={{
          padding:
            "17px 18px",
          borderBottom:
            "1px solid rgba(255,255,255,.06)",
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "space-between",
        }}
      >

        <div
          style={{
            color:
              "#fff",
            fontWeight:
              800,
            fontSize: 13,
          }}
        >
          {title}
        </div>

        {action && (
          <button
            onClick={action}
            style={{
              border:
                "none",
              background:
                "transparent",
              color:
                "#ec4899",
              fontSize:
                10,
              fontWeight:
                800,
              cursor:
                "pointer",
            }}
          >
            View All →
          </button>
        )}

      </div>

      <div
        style={{
          padding:
            "0 18px 18px",
        }}
      >
        {children}
      </div>

    </div>
  );
}


/* ============================================================
   TABLE
============================================================ */

function TableHead({
  children,
}) {
  return (
    <th
      style={{
        textAlign:
          "left",
        padding:
          "13px 10px",
        color:
          "#475569",
        fontSize: 9,
        textTransform:
          "uppercase",
        letterSpacing:
          ".8px",
        fontWeight:
          800,
        borderBottom:
          "1px solid rgba(255,255,255,.05)",
      }}
    >
      {children}
    </th>
  );
}


function TableCell({
  children,
}) {
  return (
    <td
      style={{
        padding:
          "14px 10px",
        color:
          "#94a3b8",
        fontSize: 11,
        borderBottom:
          "1px solid rgba(255,255,255,.04)",
        verticalAlign:
          "middle",
      }}
    >
      {children}
    </td>
  );
}


/* ============================================================
   USER NAME
============================================================ */

function UserName({
  user,
}) {
  return (
    <div
      style={{
        display:
          "flex",
        alignItems:
          "center",
        gap: 9,
      }}
    >

      <div
        style={{
          width: 32,
          height: 32,
          borderRadius:
            "50%",
          background:
            "linear-gradient(135deg,#ec4899,#8b5cf6)",
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color:
            "#fff",
          fontWeight:
            800,
          fontSize: 11,
          overflow:
            "hidden",
        }}
      >

        {user.profileImage
          ?.url ? (
          <img
            src={
              user
                .profileImage
                .url
            }
            alt=""
            style={{
              width:
                "100%",
              height:
                "100%",
              objectFit:
                "cover",
            }}
          />
        ) : (
          user.name
            ?.charAt(0)
            ?.toUpperCase()
        )}

      </div>

      <div>

        <div
          style={{
            color:
              "#e2e8f0",
            fontWeight:
              700,
          }}
        >
          {user.name}
        </div>

        <div
          style={{
            color:
              "#475569",
            fontSize: 9,
            marginTop:
              2,
          }}
        >
          {user.email}
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   ROLE BADGE
============================================================ */

function RoleBadge({
  role,
}) {
  const admin =
    role === "admin";

  return (
    <span
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        gap: 5,
        padding:
          "5px 8px",
        borderRadius: 7,
        background:
          admin
            ? "rgba(139,92,246,.1)"
            : "rgba(255,255,255,.04)",
        color:
          admin
            ? "#c4b5fd"
            : "#94a3b8",
        fontSize: 9,
        fontWeight: 800,
      }}
    >
      {admin && (
        <FaUserShield />
      )}

      {role}
    </span>
  );
}


/* ============================================================
   STATUS
============================================================ */

function StatusBadge({
  blocked,
}) {
  return (
    <span
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        gap: 5,
        padding:
          "5px 8px",
        borderRadius: 7,
        background:
          blocked
            ? "rgba(239,68,68,.1)"
            : "rgba(34,197,94,.08)",
        color:
          blocked
            ? "#fca5a5"
            : "#86efac",
        fontSize: 9,
        fontWeight: 800,
      }}
    >
      {blocked ? (
        <FaBan />
      ) : (
        <FaCheckCircle />
      )}

      {blocked
        ? "Blocked"
        : "Active"}
    </span>
  );
}


/* ============================================================
   LISTING STATUS
============================================================ */

function ListingStatus({
  status,
}) {
  let background =
    "rgba(255,255,255,.05)";

  let color =
    "#94a3b8";

  if (status === "approved") {
    background =
      "rgba(34,197,94,.1)";
    color =
      "#86efac";
  }

  if (status === "pending") {
    background =
      "rgba(234,179,8,.1)";
    color =
      "#fde047";
  }

  if (status === "rejected") {
    background =
      "rgba(239,68,68,.1)";
    color =
      "#fca5a5";
  }

  if (status === "expired") {
    background =
      "rgba(100,116,139,.1)";
    color =
      "#94a3b8";
  }

  return (
    <span
      style={{
        display:
          "inline-flex",
        padding:
          "5px 8px",
        borderRadius: 7,
        background,
        color,
        fontSize: 9,
        fontWeight: 800,
        textTransform:
          "capitalize",
      }}
    >
      {status || "unknown"}
    </span>
  );
}


/* ============================================================
   SMALL BADGE
============================================================ */

function SmallBadge({
  icon,
  text,
}) {
  return (
    <span
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        gap: 4,
        padding:
          "4px 6px",
        borderRadius: 6,
        background:
          "rgba(236,72,153,.08)",
        color:
          "#f9a8d4",
        fontSize: 8,
        fontWeight: 800,
      }}
    >
      {icon}
      {text}
    </span>
  );
}


/* ============================================================
   ACTION BUTTON
============================================================ */

function ActionButton({
  icon,
  text,
  onClick,
  danger = false,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        gap: 5,
        padding:
          "7px 9px",
        borderRadius: 8,
        border:
          "1px solid rgba(255,255,255,.07)",
        background:
          danger
            ? "rgba(239,68,68,.08)"
            : "rgba(255,255,255,.04)",
        color:
          danger
            ? "#fca5a5"
            : "#cbd5e1",
        cursor:
          disabled
            ? "not-allowed"
            : "pointer",
        opacity:
          disabled ? 0.5 : 1,
        fontSize: 9,
        fontWeight: 800,
      }}
    >
      {icon}
      {text}
    </button>
  );
}


export default AdminDashboard;