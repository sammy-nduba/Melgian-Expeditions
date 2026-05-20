"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/presentation/state/authStore";
import { apiClient } from "@/core/api/apiClient";
import {
  TrendingUp,
  Calendar,
  Users,
  Compass,
  FileText,
  LogOut,
  Shield,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  Phone,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Ban,
  X,
} from "lucide-react";

type DashboardData = {
  stats: {
    totalRevenue: number;
    totalBookings: number;
    pendingBookings: number;
    totalInquiries: number;
    activeInquiries: number;
    newsletterSubscribers: number;
    activeTours: number;
  };
  recentBookings: any[];
  recentInquiries: any[];
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { token, adminUser, isAuthenticated, logout } = useAuthStore();

  const [activeTab, setActiveTab] = useState<"overview" | "add-tour" | "manage-bookings" | "add-destination" | "add-blog">("overview");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add Tour Form States
  const [tourTitle, setTourTitle] = useState("");
  const [tourSubtitle, setTourSubtitle] = useState("");
  const [tourDescription, setTourDescription] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [durationDays, setDurationDays] = useState(1);
  const [priceFrom, setPriceFrom] = useState(1000);
  const [coverImage, setCoverImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [packageClass, setPackageClass] = useState("EXPLORER_SAFARIS");
  const [availability, setAvailability] = useState("AVAILABLE");
  const [isFeatured, setIsFeatured] = useState(false);

  // Dynamic lists states
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");
  const [included, setIncluded] = useState<string[]>([]);
  const [newIncluded, setNewIncluded] = useState("");
  const [excluded, setExcluded] = useState<string[]>([]);
  const [newExcluded, setNewExcluded] = useState("");

  // Dynamic itinerary days state
  const [itinerary, setItinerary] = useState<
    { day: number; title: string; description: string }[]
  >([{ day: 1, title: "", description: "" }]);

  // Form Feedback
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Manage Bookings Tab States
  type BookingItem = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    travelDate: string;
    adults: number;
    children: number;
    estimatedAmount: number | null;
    currency: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
    message?: string | null;
    createdAt: string;
    tour?: { title: string; slug: string } | null;
  };
  type BookingPagination = { total: number; page: number; limit: number; totalPages: number };
  const [bookingsList, setBookingsList] = useState<BookingItem[]>([]);
  const [bookingsPagination, setBookingsPagination] = useState<BookingPagination | null>(null);
  const [bookingsStatusFilter, setBookingsStatusFilter] = useState<string>("ALL");
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Add Destination Form States
  const [destName, setDestName] = useState("");
  const [destCountry, setDestCountry] = useState("");
  const [destDescription, setDestDescription] = useState("");
  const [destLongDescription, setDestLongDescription] = useState("");
  const [destCoverImage, setDestCoverImage] = useState("");
  const [destBestSeason, setDestBestSeason] = useState("");
  const [destClimate, setDestClimate] = useState("");
  const [destIsPopular, setDestIsPopular] = useState(false);
  const [destIsActive, setDestIsActive] = useState(true);
  
  const [destHighlights, setDestHighlights] = useState<string[]>([]);
  const [newDestHighlight, setNewDestHighlight] = useState("");
  const [destGallery, setDestGallery] = useState<string[]>([]);
  
  const [destUploadingCover, setDestUploadingCover] = useState(false);
  const [destUploadingGallery, setDestUploadingGallery] = useState(false);

  const [destFormSuccess, setDestFormSuccess] = useState(false);
  const [destFormError, setDestFormError] = useState("");
  const [destFormLoading, setDestFormLoading] = useState(false);

  // Add Blog Post States
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCoverImage, setBlogCoverImage] = useState("");
  const [blogCategory, setBlogCategory] = useState("SAFARI_PLANNING");
  const [blogAuthor, setBlogAuthor] = useState("Melgian Expeditions Team");
  const [blogStatus, setBlogStatus] = useState("DRAFT");
  const [blogReadingTime, setBlogReadingTime] = useState(5);
  const [blogSeoTitle, setBlogSeoTitle] = useState("");
  const [blogSeoDesc, setBlogSeoDesc] = useState("");
  const [blogIsFeatured, setBlogIsFeatured] = useState(false);
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [newBlogTag, setNewBlogTag] = useState("");
  const [blogUploadingCover, setBlogUploadingCover] = useState(false);
  const [blogFormSuccess, setBlogFormSuccess] = useState(false);
  const [blogFormError, setBlogFormError] = useState("");
  const [blogFormLoading, setBlogFormLoading] = useState(false);

  // Authenticate immediately
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Fetch Dashboard Stats
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    async function fetchStats() {
      try {
        setError("");
        setLoading(true);

        const data = await apiClient<DashboardData>("/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data) {
          setDashboardData(data);
        }
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
        setError(err instanceof Error ? err.message : "Unable to retrieve dashboard metrics.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [isAuthenticated, token]);

  // Fetch All Bookings (for manage-bookings tab)
  useEffect(() => {
    if (!isAuthenticated || !token || activeTab !== "manage-bookings") return;

    async function fetchAllBookings() {
      try {
        setBookingsLoading(true);
        setBookingsError("");

        const qs = new URLSearchParams({
          page: String(bookingsPage),
          limit: "15",
          ...(bookingsStatusFilter !== "ALL" && { status: bookingsStatusFilter }),
        });

        const data = await apiClient<{ bookings: any[]; pagination: any }>(
          `/admin/bookings?${qs.toString()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data) {
          setBookingsList(data.bookings ?? []);
          setBookingsPagination(data.pagination ?? null);
        }
      } catch (err) {
        setBookingsError(err instanceof Error ? err.message : "Failed to load bookings.");
      } finally {
        setBookingsLoading(false);
      }
    }

    fetchAllBookings();
  }, [isAuthenticated, token, activeTab, bookingsPage, bookingsStatusFilter]);

  async function handleUpdateStatus(
    bookingId: string,
    newStatus: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  ) {
    if (!token) return;
    try {
      setActionLoadingId(bookingId);
      await apiClient(`/admin/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      setBookingsList((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Status update failed.");
    } finally {
      setActionLoadingId(null);
    }
  }

  // Add Destination Handlers
  function addDestHighlight() {
    if (newDestHighlight.trim()) {
      setDestHighlights([...destHighlights, newDestHighlight.trim()]);
      setNewDestHighlight("");
    }
  }
  function removeDestHighlight(index: number) {
    setDestHighlights(destHighlights.filter((_, i) => i !== index));
  }
  
  async function handleDestCoverImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setDestUploadingCover(true);
      setDestFormError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to upload image.");
      }

      setDestCoverImage(result.url);
    } catch (err) {
      console.error("Local upload error:", err);
      setDestFormError(err instanceof Error ? err.message : "Failed to upload cover image.");
    } finally {
      setDestUploadingCover(false);
    }
  }

  async function handleDestGalleryImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setDestUploadingGallery(true);
      setDestFormError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to upload image.");
      }

      setDestGallery([...destGallery, result.url]);
    } catch (err) {
      console.error("Local upload error:", err);
      setDestFormError(err instanceof Error ? err.message : "Failed to upload gallery image.");
    } finally {
      setDestUploadingGallery(false);
    }
  }

  function removeDestGalleryUrl(index: number) {
    setDestGallery(destGallery.filter((_, i) => i !== index));
  }

  async function handleDestinationSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDestFormError("");
    setDestFormSuccess(false);

    if (!destName || !destCountry || !destDescription || !destCoverImage || !destBestSeason) {
      setDestFormError("Please fill out all required core fields.");
      return;
    }

    setDestFormLoading(true);
    try {
      const payload = {
        name: destName,
        country: destCountry,
        description: destDescription,
        longDescription: destLongDescription || undefined,
        coverImage: destCoverImage,
        bestSeason: destBestSeason,
        climate: destClimate || undefined,
        highlights: destHighlights,
        gallery: destGallery,
        isPopular: destIsPopular,
        isActive: destIsActive,
      };

      await apiClient("/admin/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      setDestFormSuccess(true);
      // Reset form
      setDestName("");
      setDestCountry("");
      setDestDescription("");
      setDestLongDescription("");
      setDestCoverImage("");
      setDestBestSeason("");
      setDestClimate("");
      setDestHighlights([]);
      setDestGallery([]);
      setDestIsPopular(false);
      setDestIsActive(true);
    } catch (err: any) {
      setDestFormError(err.message || "Failed to create destination. Please check the inputs.");
    } finally {
      setDestFormLoading(false);
    }
  }

  // Add Blog Post Handlers
  function addBlogTag() {
    if (newBlogTag.trim()) {
      setBlogTags([...blogTags, newBlogTag.trim()]);
      setNewBlogTag("");
    }
  }
  
  function removeBlogTag(index: number) {
    setBlogTags(blogTags.filter((_, i) => i !== index));
  }

  async function handleBlogCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setBlogUploadingCover(true);
      setBlogFormError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to upload image.");
      }

      setBlogCoverImage(result.url);
    } catch (err) {
      setBlogFormError(err instanceof Error ? err.message : "Failed to upload blog cover.");
    } finally {
      setBlogUploadingCover(false);
    }
  }

  async function handleBlogSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBlogFormError("");
    setBlogFormSuccess(false);

    if (!blogTitle || !blogExcerpt || !blogContent || !blogCoverImage) {
      setBlogFormError("Please fill out all required fields (title, excerpt, content, cover).");
      return;
    }

    setBlogFormLoading(true);
    try {
      const payload = {
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        coverImage: blogCoverImage,
        category: blogCategory,
        author: blogAuthor,
        status: blogStatus,
        readingTimeMinutes: Number(blogReadingTime),
        seoTitle: blogSeoTitle || undefined,
        seoDescription: blogSeoDesc || undefined,
        isFeatured: blogIsFeatured,
        tags: blogTags,
      };

      await apiClient("/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      setBlogFormSuccess(true);
      setBlogTitle("");
      setBlogExcerpt("");
      setBlogContent("");
      setBlogCoverImage("");
      setBlogCategory("SAFARI_PLANNING");
      setBlogStatus("DRAFT");
      setBlogReadingTime(5);
      setBlogSeoTitle("");
      setBlogSeoDesc("");
      setBlogIsFeatured(false);
      setBlogTags([]);
    } catch (err: any) {
      setBlogFormError(err.message || "Failed to create blog post.");
    } finally {
      setBlogFormLoading(false);
    }
  }

  if (!mounted || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal text-ivory">
        <Loader2 className="h-8 w-8 animate-spin text-savannah" />
      </div>
    );
  }

  // Highlights handlers
  function addHighlight() {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  }

  function removeHighlight(index: number) {
    setHighlights(highlights.filter((_, i) => i !== index));
  }

  // Inclusions handlers
  function addIncluded() {
    if (newIncluded.trim()) {
      setIncluded([...included, newIncluded.trim()]);
      setNewIncluded("");
    }
  }

  function removeIncluded(index: number) {
    setIncluded(included.filter((_, i) => i !== index));
  }

  // Exclusions handlers
  function addExcluded() {
    if (newExcluded.trim()) {
      setExcluded([...excluded, newExcluded.trim()]);
      setNewExcluded("");
    }
  }

  function removeExcluded(index: number) {
    setExcluded(excluded.filter((_, i) => i !== index));
  }

  // Itinerary handlers
  function addItineraryDay() {
    const nextDay = itinerary.length + 1;
    setItinerary([...itinerary, { day: nextDay, title: "", description: "" }]);
  }

  function removeItineraryDay(index: number) {
    if (itinerary.length > 1) {
      const updated = itinerary
        .filter((_, i) => i !== index)
        .map((day, idx) => ({ ...day, day: idx + 1 }));
      setItinerary(updated);
    }
  }

  function updateItineraryField(index: number, field: "title" | "description", value: string) {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  }

  // Handle Cover Image file upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setUploadError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to upload image.");
      }

      setCoverImage(result.url);
    } catch (err) {
      console.error("Local upload error:", err);
      setUploadError(err instanceof Error ? err.message : "Failed to upload cover image.");
    } finally {
      setUploadingImage(false);
    }
  }

  // Form Submit Handler
  async function handleCreateTour(e: React.FormEvent) {
    e.preventDefault();
    setFormSuccess(false);
    setFormError("");

    // Validation checks
    if (!tourTitle || !tourDescription || !destinationName || !coverImage) {
      setFormError("Please fill out all required fields, including uploading a cover image.");
      return;
    }

    // Verify at least 1 itinerary day has content
    const invalidItinerary = itinerary.some((day) => !day.title || !day.description);
    if (invalidItinerary) {
      setFormError("Please fill in both title and description for all itinerary days.");
      return;
    }

    try {
      setFormLoading(true);

      const payload = {
        title: tourTitle,
        subtitle: tourSubtitle || undefined,
        description: tourDescription,
        destinationName,
        durationDays: Number(durationDays),
        priceFrom: Number(priceFrom),
        currency: "USD",
        coverImage,
        gallery: [],
        difficulty,
        packageClass,
        availability,
        highlights,
        included,
        excluded,
        isFeatured,
        itinerary,
      };

      await apiClient("/admin/tours", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // Clear Form on Success
      setFormSuccess(true);
      setTourTitle("");
      setTourSubtitle("");
      setTourDescription("");
      setDestinationName("");
      setDurationDays(1);
      setPriceFrom(1000);
      setHighlights([]);
      setIncluded([]);
      setExcluded([]);
      setItinerary([{ day: 1, title: "", description: "" }]);
      setIsFeatured(false);

      // Re-fetch stats in background to update Tour count
      const updatedStats = await apiClient<DashboardData>("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (updatedStats) {
        setDashboardData(updatedStats);
      }
    } catch (err) {
      console.error("Upload tour error:", err);
      setFormError(err instanceof Error ? err.message : "Failed to create tour package.");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col font-body">
      {/* 🚀 Admin Header Panel */}
      <header className="border-b border-white/10 bg-white/[0.02] px-6 py-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-savannah/10 text-savannah border border-savannah/20">
            <Shield className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold tracking-tight text-white leading-none">
              Control Panel
            </h1>
            <p className="text-[10px] text-ivory/50 mt-1 uppercase tracking-widest font-semibold">
              Logged in as: {adminUser?.fullName || "Administrator"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/admin/login");
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 hover:border-red-500/30 bg-white/[0.04] hover:bg-red-500/10 px-4 py-2 text-xs font-semibold text-ivory/80 hover:text-red-300 transition-all cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </header>

      {/* 🧭 Tab Navigation */}
      <div className="bg-white/[0.01] border-b border-white/5 px-6 flex gap-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === "overview"
              ? "border-savannah text-savannah"
              : "border-transparent text-ivory/60 hover:text-white"
          }`}
        >
          Overview Dashboard
        </button>
        <button
          onClick={() => setActiveTab("add-tour")}
          className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === "add-tour"
              ? "border-savannah text-savannah"
              : "border-transparent text-ivory/60 hover:text-white"
          }`}
        >
          Add Tour Package
        </button>
        <button
          onClick={() => {
            setActiveTab("manage-bookings");
            setBookingsPage(1);
            setBookingsStatusFilter("ALL");
          }}
          className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === "manage-bookings"
              ? "border-savannah text-savannah"
              : "border-transparent text-ivory/60 hover:text-white"
          }`}
        >
          Manage Bookings
        </button>
        <button
          onClick={() => setActiveTab("add-destination")}
          className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === "add-destination"
              ? "border-savannah text-savannah"
              : "border-transparent text-ivory/60 hover:text-white"
          }`}
        >
          Add Destination
        </button>
        <button
          onClick={() => setActiveTab("add-blog")}
          className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
            activeTab === "add-blog"
              ? "border-savannah text-savannah"
              : "border-transparent text-ivory/60 hover:text-white"
          }`}
        >
          Add Blog Post
        </button>
      </div>


      {/* 🎨 Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {loading && activeTab === "overview" ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-savannah" />
            <p className="text-sm text-ivory/60 animate-pulse uppercase tracking-widest font-bold">
              Aggregating Metrics...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-premium bg-red-500/10 border border-red-500/35 p-6 text-center max-w-xl mx-auto my-12">
            <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-4" />
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Metrics Load Failure
            </h3>
            <p className="text-sm text-red-200/80 leading-relaxed mb-6">{error}</p>
            <button
              onClick={() => router.refresh()}
              className="px-6 py-2.5 rounded-full bg-red-500 text-white font-bold text-xs uppercase"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            {/* TAB 1: OVERVIEW METRICS */}
            {activeTab === "overview" && dashboardData && (
              <div className="space-y-8">
                {/* 📊 Stat Widgets Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Revenue Widget */}
                  <div className="rounded-premium border border-white/10 bg-white/[0.02] p-5 shadow-sm relative overflow-hidden group hover:border-savannah/35 transition-all">
                    <div className="absolute top-0 right-0 p-3 text-savannah/10 group-hover:text-savannah/20 transition-colors">
                      <TrendingUp size={64} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ivory/50">
                      Total Revenue
                    </p>
                    <h3 className="mt-2 font-heading text-3xl font-bold text-white">
                      ${dashboardData.stats.totalRevenue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h3>
                    <p className="text-[10px] text-savannah mt-2 font-semibold">
                      Confirmed & completed reservations
                    </p>
                  </div>

                  {/* Bookings Widget */}
                  <div className="rounded-premium border border-white/10 bg-white/[0.02] p-5 shadow-sm relative overflow-hidden group hover:border-savannah/35 transition-all">
                    <div className="absolute top-0 right-0 p-3 text-savannah/10 group-hover:text-savannah/20 transition-colors">
                      <Calendar size={64} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ivory/50">
                      Bookings Submitted
                    </p>
                    <h3 className="mt-2 font-heading text-3xl font-bold text-white">
                      {dashboardData.stats.totalBookings}
                    </h3>
                    <p className="text-[10px] text-ivory/55 mt-2 font-semibold flex items-center gap-1.5">
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                      {dashboardData.stats.pendingBookings} Booking inquiries pending review
                    </p>
                  </div>

                  {/* Subscribers Widget */}
                  <div className="rounded-premium border border-white/10 bg-white/[0.02] p-5 shadow-sm relative overflow-hidden group hover:border-savannah/35 transition-all">
                    <div className="absolute top-0 right-0 p-3 text-savannah/10 group-hover:text-savannah/20 transition-colors">
                      <Users size={64} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ivory/50">
                      Subscribers
                    </p>
                    <h3 className="mt-2 font-heading text-3xl font-bold text-white">
                      {dashboardData.stats.newsletterSubscribers}
                    </h3>
                    <p className="text-[10px] text-emerald-400 mt-2 font-semibold">
                      Active newsletter emails registered
                    </p>
                  </div>

                  {/* Active Tours Widget */}
                  <div className="rounded-premium border border-white/10 bg-white/[0.02] p-5 shadow-sm relative overflow-hidden group hover:border-savannah/35 transition-all">
                    <div className="absolute top-0 right-0 p-3 text-savannah/10 group-hover:text-savannah/20 transition-colors">
                      <Compass size={64} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ivory/50">
                      Active Tour Packages
                    </p>
                    <h3 className="mt-2 font-heading text-3xl font-bold text-white">
                      {dashboardData.stats.activeTours}
                    </h3>
                    <p className="text-[10px] text-ivory/55 mt-2 font-semibold">
                      Live Serengeti tour collections
                    </p>
                  </div>
                </div>

                {/* 📝 Lists Section */}
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Recent Bookings List */}
                  <div className="rounded-premium border border-white/10 bg-white/[0.02] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                      <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                        <Calendar size={18} className="text-savannah" />
                        Recent Booking Inquiries
                      </h3>
                      <span className="text-[10px] font-bold text-savannah bg-savannah/10 border border-savannah/20 px-2 py-0.5 rounded">
                        Latest
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      {dashboardData.recentBookings.length === 0 ? (
                        <p className="text-sm text-ivory/40 text-center py-12">
                          No booking submissions recorded yet.
                        </p>
                      ) : (
                        dashboardData.recentBookings.map((b) => (
                          <div
                            key={b.id}
                            className="rounded-xl border border-white/5 bg-white/[0.01] p-4 flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-white truncate">
                                {b.fullName}
                              </h4>
                              <p className="text-xs text-ivory/55 truncate mt-1">
                                {b.tour?.title || "Bespoke Journey Planning"}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-[10px] text-ivory/45 font-semibold">
                                <span>Date: {new Date(b.travelDate).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Travelers: {b.adults + b.children}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-heading font-bold text-sm text-white block">
                                ${Number(b.estimatedAmount ?? 0).toLocaleString(undefined, {
                                  minimumFractionDigits: 0,
                                })}
                              </span>
                              <span
                                className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded mt-1.5 tracking-wider ${
                                  b.status === "PENDING"
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                }`}
                              >
                                {b.status}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Recent Inquiries List */}
                  <div className="rounded-premium border border-white/10 bg-white/[0.02] p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                      <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                        <FileText size={18} className="text-savannah" />
                        Recent Contact Messages
                      </h3>
                      <span className="text-[10px] font-bold text-savannah bg-savannah/10 border border-savannah/20 px-2 py-0.5 rounded">
                        Inbox
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      {dashboardData.recentInquiries.length === 0 ? (
                        <p className="text-sm text-ivory/40 text-center py-12">
                          No messages in your admin inbox.
                        </p>
                      ) : (
                        dashboardData.recentInquiries.map((inq) => (
                          <div
                            key={inq.id}
                            className="rounded-xl border border-white/5 bg-white/[0.01] p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h4 className="font-semibold text-sm text-white truncate">
                                  {inq.subject}
                                </h4>
                                <p className="text-xs text-savannah mt-0.5 font-medium">
                                  From: {inq.fullName} ({inq.email})
                                </p>
                              </div>
                              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                {inq.status}
                              </span>
                            </div>
                            <p className="mt-3 text-xs text-ivory/65 leading-relaxed bg-white/[0.01] p-2.5 rounded-lg border border-white/5 italic">
                              &ldquo;{inq.message}&rdquo;
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: UPLOAD TOUR PACKAGE FORM */}
            {activeTab === "add-tour" && (
              <div className="max-w-4xl mx-auto rounded-premium border border-white/10 bg-white/[0.02] p-8 shadow-sm">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    Upload Luxury Tour Package
                  </h3>
                  <p className="text-xs text-ivory/55 mt-1 leading-relaxed">
                    Populate your active tour inventory catalog. Submissions directly synchronize to the live web catalog database.
                  </p>
                </div>

                {formSuccess && (
                  <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/35 px-4 py-3.5 text-xs text-emerald-300 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Tour Created Successfully!</h4>
                      <p className="text-[11px] text-emerald-300/80">
                        The safari package and its itinerary days are now published to the public database catalog.
                      </p>
                    </div>
                  </div>
                )}

                {formError && (
                  <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/35 px-4 py-3.5 text-xs text-red-300 flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5">Upload Failed</h4>
                      <p className="text-[11px] text-red-300/80 leading-relaxed">{formError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleCreateTour} className="space-y-6">
                  {/* Basic Details Section */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Tour Title *
                      </label>
                      <input
                        type="text"
                        value={tourTitle}
                        onChange={(e) => setTourTitle(e.target.value)}
                        placeholder="e.g. Serengeti Luxury Migration Safari"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Subtitle / Short Tagline
                      </label>
                      <input
                        type="text"
                        value={tourSubtitle}
                        onChange={(e) => setTourSubtitle(e.target.value)}
                        placeholder="e.g. 5-Star Lodge & Big Cat Photographic Safari"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                      Main Description Summary *
                    </label>
                    <textarea
                      value={tourDescription}
                      onChange={(e) => setTourDescription(e.target.value)}
                      rows={4}
                      placeholder="Detail the experience, lodging standard, wildlife encounters, and target profile..."
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Pricing, Duration, Destination */}
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Destination Name *
                      </label>
                      <input
                        type="text"
                        value={destinationName}
                        onChange={(e) => setDestinationName(e.target.value)}
                        placeholder="e.g. Serengeti National Park"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Duration (Days) *
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Price From (USD) *
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Cover Image, Classes, Settings */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Cover Image *
                      </label>
                      
                      {coverImage ? (
                        <div className="relative h-[46px] w-full rounded-xl overflow-hidden border border-white/10 group flex items-center bg-white/[0.02] px-3 justify-between">
                          <span className="text-xs text-emerald-400 font-semibold truncate max-w-[70%]">
                            ✓ {coverImage.split("/").pop()}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCoverImage("")}
                            className="p-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete and re-upload"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="hidden"
                            id="coverImageUpload"
                          />
                          <label
                            htmlFor="coverImageUpload"
                            className={`flex items-center justify-between border border-dashed border-white/20 hover:border-savannah/50 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl px-4 py-3 cursor-pointer transition-all ${
                              uploadingImage ? "pointer-events-none opacity-50" : ""
                            }`}
                          >
                            {uploadingImage ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-savannah" />
                                <span className="text-xs text-savannah font-semibold animate-pulse uppercase tracking-wider">
                                  Uploading...
                                </span>
                              </div>
                            ) : (
                              <>
                                <span className="text-xs font-semibold text-ivory/70 uppercase tracking-wider truncate">
                                  Choose Image File
                                </span>
                                <Plus size={15} className="text-savannah shrink-0" />
                              </>
                            )}
                          </label>
                        </div>
                      )}
                      
                      {uploadError && (
                        <p className="mt-2 text-[10px] text-red-300 font-semibold flex items-center gap-1.5">
                          <AlertCircle size={12} />
                          {uploadError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all cursor-pointer"
                      >
                        <option value="EASY">Easy</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="ADVENTUROUS">Adventurous</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Availability
                      </label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all cursor-pointer"
                      >
                        <option value="AVAILABLE">Available</option>
                        <option value="LIMITED">Limited</option>
                        <option value="SOLD_OUT">Sold Out</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ivory/80 mb-2">
                        Safari Package Class
                      </label>
                      <select
                        value={packageClass}
                        onChange={(e) => setPackageClass(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-charcoal px-4 py-3 text-white focus:border-savannah focus:outline-none focus:ring-1 focus:ring-savannah/40 text-sm transition-all cursor-pointer"
                      >
                        <option value="ADVENTURE_TRAILS">Adventure Trails</option>
                        <option value="EXPLORER_SAFARIS">Explorer Safaris</option>
                        <option value="SIGNATURE_ELITE_SAFARIS">Signature Elite Safaris</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3.5 pt-8">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="h-4.5 w-4.5 rounded border-white/10 bg-white/[0.04] text-savannah focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <label
                        htmlFor="isFeatured"
                        className="text-xs font-bold uppercase tracking-wider text-white select-none cursor-pointer"
                      >
                        Highlight as Featured Tour Package
                      </label>
                    </div>
                  </div>

                  {/* Dynamic String Lists (Highlights, Inclusions, Exclusions) */}
                  <div className="border-t border-white/15 pt-6 grid gap-6 md:grid-cols-3">
                    {/* Highlights Builder */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-savannah">
                        Highlights List
                      </h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newHighlight}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          placeholder="e.g. Serengeti migration"
                          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-white text-xs focus:border-savannah focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addHighlight}
                          className="px-3 rounded-xl bg-savannah text-charcoal text-xs font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="space-y-2 max-h-32 overflow-y-auto pr-1">
                        {highlights.length === 0 ? (
                          <p className="text-[10px] text-ivory/35 italic">No highlights added yet.</p>
                        ) : (
                          highlights.map((h, i) => (
                            <li
                              key={i}
                              className="text-xs flex items-center justify-between gap-2 p-2 bg-white/[0.01] border border-white/5 rounded-lg"
                            >
                              <span className="truncate">{h}</span>
                              <button
                                type="button"
                                onClick={() => removeHighlight(i)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 size={13} />
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>

                    {/* Inclusions Builder */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-savannah">
                        Included Services
                      </h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newIncluded}
                          onChange={(e) => setNewIncluded(e.target.value)}
                          placeholder="e.g. Luxury lodges"
                          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-white text-xs focus:border-savannah focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addIncluded}
                          className="px-3 rounded-xl bg-savannah text-charcoal text-xs font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="space-y-2 max-h-32 overflow-y-auto pr-1">
                        {included.length === 0 ? (
                          <p className="text-[10px] text-ivory/35 italic">No inclusions added yet.</p>
                        ) : (
                          included.map((inc, i) => (
                            <li
                              key={i}
                              className="text-xs flex items-center justify-between gap-2 p-2 bg-white/[0.01] border border-white/5 rounded-lg"
                            >
                              <span className="truncate">{inc}</span>
                              <button
                                type="button"
                                onClick={() => removeIncluded(i)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 size={13} />
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>

                    {/* Exclusions Builder */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-savannah">
                        Excluded Costs
                      </h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newExcluded}
                          onChange={(e) => setNewExcluded(e.target.value)}
                          placeholder="e.g. International flights"
                          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-white text-xs focus:border-savannah focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addExcluded}
                          className="px-3 rounded-xl bg-savannah text-charcoal text-xs font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="space-y-2 max-h-32 overflow-y-auto pr-1">
                        {excluded.length === 0 ? (
                          <p className="text-[10px] text-ivory/35 italic">No exclusions added yet.</p>
                        ) : (
                          excluded.map((exc, i) => (
                            <li
                              key={i}
                              className="text-xs flex items-center justify-between gap-2 p-2 bg-white/[0.01] border border-white/5 rounded-lg"
                            >
                              <span className="truncate">{exc}</span>
                              <button
                                type="button"
                                onClick={() => removeExcluded(i)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 size={13} />
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* 🗺️ Dynamic Itinerary Days Builder Section */}
                  <div className="border-t border-white/15 pt-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-savannah">
                          Tour Itinerary Builder *
                        </h4>
                        <p className="text-[10px] text-ivory/50 mt-1">
                          Configure multi-day adventure travel routes.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={addItineraryDay}
                        className="inline-flex items-center gap-1.5 rounded-full border border-savannah/20 hover:border-savannah bg-savannah/5 hover:bg-savannah/10 px-3.5 py-1.5 text-xs font-bold text-savannah transition-all cursor-pointer"
                      >
                        <Plus size={13} />
                        Add Next Day
                      </button>
                    </div>

                    <div className="space-y-5">
                      {itinerary.map((day, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-white/5 bg-white/[0.01] p-5 relative space-y-4"
                        >
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="font-heading font-bold text-sm text-savannah">
                              Day {day.day} Itinerary Schedule
                            </span>
                            {itinerary.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItineraryDay(index)}
                                className="text-red-400 hover:text-red-300 text-xs inline-flex items-center gap-1"
                              >
                                <Trash2 size={13} />
                                Remove Day
                              </button>
                            )}
                          </div>

                          <div className="grid gap-4 sm:grid-cols-4">
                            <div className="sm:col-span-1">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/70 mb-1.5">
                                Schedule Day
                              </label>
                              <input
                                type="number"
                                value={day.day}
                                disabled
                                className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2 text-ivory/50 text-xs"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/80 mb-1.5">
                                Day Title / Theme *
                              </label>
                              <input
                                type="text"
                                value={day.title}
                                onChange={(e) =>
                                  updateItineraryField(index, "title", e.target.value)
                                }
                                placeholder="e.g. Serengeti Plains & Big Cats Game Drive"
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-white text-xs focus:border-savannah focus:outline-none"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory/80 mb-1.5">
                              Activity Description *
                            </label>
                            <textarea
                              value={day.description}
                              onChange={(e) =>
                                updateItineraryField(index, "description", e.target.value)
                              }
                              rows={2}
                              placeholder="Detail safari route, lodges visited, meals provided, and species encountered..."
                              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-white text-xs focus:border-savannah focus:outline-none resize-none"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-white/15 pt-6 text-right">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-savannah hover:bg-white text-charcoal hover:shadow-lg hover:shadow-white/5 active:scale-[0.98] px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin text-charcoal" />
                          Publishing Package...
                        </>
                      ) : (
                        "Publish Tour Package"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: MANAGE BOOKINGS */}
            {activeTab === "manage-bookings" && (
              <div className="space-y-6">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">Booking Inquiries</h3>
                    {bookingsPagination && (
                      <p className="text-xs text-ivory/50 mt-1">
                        {bookingsPagination.total} total •{" "}
                        Page {bookingsPagination.page} of {bookingsPagination.totalPages}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => { setBookingsPage(1); setBookingsStatusFilter("ALL"); }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-ivory/60 hover:text-white hover:border-savannah/40 transition-all cursor-pointer"
                  >
                    <RefreshCw size={13} />
                    Refresh
                  </button>
                </div>

                {/* Status Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  {["ALL", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setBookingsStatusFilter(s); setBookingsPage(1); }}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                        bookingsStatusFilter === s
                          ? "bg-savannah text-charcoal border-savannah"
                          : "bg-white/[0.03] text-ivory/60 border-white/10 hover:border-savannah/40 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Loading state */}
                {bookingsLoading && (
                  <div className="flex h-48 items-center justify-center gap-3 text-ivory/50">
                    <Loader2 className="h-5 w-5 animate-spin text-savannah" />
                    <span className="text-xs font-semibold uppercase tracking-widest animate-pulse">
                      Loading bookings...
                    </span>
                  </div>
                )}

                {/* Error state */}
                {!bookingsLoading && bookingsError && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-5 text-center">
                    <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                    <p className="text-xs text-red-300">{bookingsError}</p>
                  </div>
                )}

                {/* Empty state */}
                {!bookingsLoading && !bookingsError && bookingsList.length === 0 && (
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-12 text-center text-ivory/40">
                    <Calendar className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No bookings found for this filter.</p>
                  </div>
                )}

                {/* Bookings list */}
                {!bookingsLoading && !bookingsError && bookingsList.length > 0 && (
                  <div className="space-y-3">
                    {bookingsList.map((booking) => {
                      const isActioning = actionLoadingId === booking.id;
                      const statusColors: Record<string, string> = {
                        PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                        CONFIRMED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                        CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
                        COMPLETED: "bg-sky-500/10 text-sky-400 border-sky-500/20",
                      };

                      return (
                        <div
                          key={booking.id}
                          className="rounded-xl border border-white/8 bg-white/[0.02] p-5 hover:border-white/15 transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-start gap-4">
                            {/* Left: traveler info */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-sm text-white">
                                  {booking.fullName}
                                </h4>
                                <span
                                  className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border tracking-wider ${statusColors[booking.status] ?? ""}`}
                                >
                                  {booking.status}
                                </span>
                              </div>
                              <p className="text-xs text-ivory/55">{booking.email}</p>
                              <div className="flex items-center gap-1 text-xs text-ivory/45">
                                <Phone size={10} />
                                {booking.phone}
                              </div>
                              {booking.tour && (
                                <p className="text-xs text-savannah font-medium">
                                  {booking.tour.title}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-3 text-[10px] text-ivory/40 font-semibold pt-1">
                                <span>
                                  📅 {new Date(booking.travelDate).toLocaleDateString(undefined, { dateStyle: "medium" })}
                                </span>
                                <span>
                                  👥 {booking.adults} Adult{booking.adults !== 1 ? "s" : ""}
                                  {booking.children > 0 ? `, ${booking.children} Child${booking.children !== 1 ? "ren" : ""}` : ""}
                                </span>
                                {booking.estimatedAmount && (
                                  <span className="text-savannah font-bold">
                                    ${Number(booking.estimatedAmount).toLocaleString()}
                                  </span>
                                )}
                              </div>
                              {booking.message && (
                                <p className="text-[11px] italic text-ivory/40 mt-2 bg-white/[0.01] px-3 py-2 rounded-lg border border-white/5 max-w-xl">
                                  &ldquo;{booking.message}&rdquo;
                                </p>
                              )}
                            </div>

                            {/* Right: status actions */}
                            <div className="flex flex-col gap-2 shrink-0 min-w-[140px]">
                              {booking.status !== "CONFIRMED" && booking.status !== "COMPLETED" && (
                                <button
                                  onClick={() => handleUpdateStatus(booking.id, "CONFIRMED")}
                                  disabled={isActioning}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                                >
                                  {isActioning ? <Loader2 size={11} className="animate-spin" /> : <CheckCircle size={11} />}
                                  Confirm
                                </button>
                              )}
                              {booking.status === "CONFIRMED" && (
                                <button
                                  onClick={() => handleUpdateStatus(booking.id, "COMPLETED")}
                                  disabled={isActioning}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                                >
                                  {isActioning ? <Loader2 size={11} className="animate-spin" /> : <Eye size={11} />}
                                  Mark Complete
                                </button>
                              )}
                              {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                                <button
                                  onClick={() => handleUpdateStatus(booking.id, "CANCELLED")}
                                  disabled={isActioning}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                                >
                                  {isActioning ? <Loader2 size={11} className="animate-spin" /> : <Ban size={11} />}
                                  Cancel
                                </button>
                              )}
                              {(booking.status === "CANCELLED" || booking.status === "COMPLETED") && (
                                <button
                                  onClick={() => handleUpdateStatus(booking.id, "PENDING")}
                                  disabled={isActioning}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-ivory/60 hover:text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                                >
                                  {isActioning ? <Loader2 size={11} className="animate-spin" /> : <X size={11} />}
                                  Reopen
                                </button>
                              )}
                              <p className="text-[9px] text-ivory/25 text-center mt-1">
                                {new Date(booking.createdAt).toLocaleDateString(undefined, { dateStyle: "short" })}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {bookingsPagination && bookingsPagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setBookingsPage((p) => Math.max(1, p - 1))}
                      disabled={bookingsPage <= 1 || bookingsLoading}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-savannah/40 bg-white/[0.03] hover:bg-white/[0.06] text-ivory/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <span className="text-xs font-semibold text-ivory/60">
                      {bookingsPagination.page} / {bookingsPagination.totalPages}
                    </span>
                    <button
                      onClick={() => setBookingsPage((p) => Math.min(bookingsPagination.totalPages, p + 1))}
                      disabled={bookingsPage >= bookingsPagination.totalPages || bookingsLoading}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-savannah/40 bg-white/[0.03] hover:bg-white/[0.06] text-ivory/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* 🌍 ADD DESTINATION TAB */}
        {activeTab === "add-destination" && (
          <div className="max-w-4xl mx-auto py-4">
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              Create New Destination
            </h2>

            {destFormSuccess && (
              <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-400 flex items-center gap-3">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">Destination successfully created.</p>
              </div>
            )}
            {destFormError && (
              <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400 flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <p className="font-medium">{destFormError}</p>
              </div>
            )}

            <form onSubmit={handleDestinationSubmit} className="space-y-10">
              {/* Basic Info */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 lg:p-8">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-savannah/20 text-savannah text-xs">1</span>
                  Basic Details
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/60">Destination Name <span className="text-red-400">*</span></label>
                    <input type="text" required value={destName} onChange={(e) => setDestName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-savannah focus:outline-none" placeholder="e.g. Serengeti National Park" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/60">Country <span className="text-red-400">*</span></label>
                    <input type="text" required value={destCountry} onChange={(e) => setDestCountry(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-savannah focus:outline-none" placeholder="e.g. Tanzania" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/60">Short Description <span className="text-red-400">*</span></label>
                    <textarea required rows={2} value={destDescription} onChange={(e) => setDestDescription(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-savannah focus:outline-none" placeholder="Brief summary of the destination..." />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/60">Long Description</label>
                    <textarea rows={4} value={destLongDescription} onChange={(e) => setDestLongDescription(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-savannah focus:outline-none" placeholder="Detailed description..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/60">Best Season <span className="text-red-400">*</span></label>
                    <input type="text" required value={destBestSeason} onChange={(e) => setDestBestSeason(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-savannah focus:outline-none" placeholder="e.g. June to October" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/60">Climate</label>
                    <input type="text" value={destClimate} onChange={(e) => setDestClimate(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-savannah focus:outline-none" placeholder="e.g. Warm days, cool nights" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/60">Cover Image <span className="text-red-400">*</span></label>
                    {destCoverImage ? (
                      <div className="relative h-[46px] w-full rounded-xl overflow-hidden border border-white/10 group flex items-center bg-white/[0.02] px-3 justify-between">
                        <span className="text-xs text-emerald-400 font-semibold truncate max-w-[70%]">
                          ✓ {destCoverImage.split("/").pop()}
                        </span>
                        <button type="button" onClick={() => setDestCoverImage("")} className="p-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer" title="Delete and re-upload">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input type="file" accept="image/*" onChange={handleDestCoverImageUpload} disabled={destUploadingCover} className="hidden" id="destCoverImageUpload" />
                        <label htmlFor="destCoverImageUpload" className={`flex items-center justify-between border border-dashed border-white/20 hover:border-savannah/50 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl px-4 py-3 cursor-pointer transition-all ${destUploadingCover ? "pointer-events-none opacity-50" : ""}`}>
                          {destUploadingCover ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin text-savannah" />
                              <span className="text-xs text-savannah font-semibold animate-pulse uppercase tracking-wider">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <span className="text-xs text-ivory/60 font-medium">Click to upload image</span>
                              <span className="rounded-md bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">Browse</span>
                            </>
                          )}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="destIsPopular" checked={destIsPopular} onChange={(e) => setDestIsPopular(e.target.checked)} className="h-4 w-4 accent-savannah" />
                    <label htmlFor="destIsPopular" className="text-sm font-semibold text-ivory">Mark as Popular</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="destIsActive" checked={destIsActive} onChange={(e) => setDestIsActive(e.target.checked)} className="h-4 w-4 accent-savannah" />
                    <label htmlFor="destIsActive" className="text-sm font-semibold text-ivory">Active</label>
                  </div>
                </div>
              </div>

              {/* Dynamic Lists */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 lg:p-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-savannah/20 text-savannah text-xs">2</span>
                    Highlights
                  </h3>
                  <div className="flex gap-2">
                    <input type="text" value={newDestHighlight} onChange={(e) => setNewDestHighlight(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDestHighlight())} className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white focus:border-savannah focus:outline-none" placeholder="e.g. Big cat sightings" />
                    <button type="button" onClick={addDestHighlight} className="rounded-lg bg-white/10 px-4 font-bold text-white hover:bg-white/20 transition-colors">Add</button>
                  </div>
                  <ul className="space-y-2">
                    {destHighlights.map((h, i) => (
                      <li key={i} className="flex items-center justify-between rounded bg-white/5 px-3 py-2 text-sm text-ivory/80">
                        {h}
                        <button type="button" onClick={() => removeDestHighlight(i)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-savannah/20 text-savannah text-xs">3</span>
                    Gallery Images
                  </h3>
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleDestGalleryImageUpload} disabled={destUploadingGallery} className="hidden" id="destGalleryUpload" />
                    <label htmlFor="destGalleryUpload" className={`flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/[0.03] px-4 py-3 cursor-pointer hover:border-savannah/50 hover:bg-white/[0.05] transition-all ${destUploadingGallery ? "pointer-events-none opacity-50" : ""}`}>
                      {destUploadingGallery ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-savannah" />
                          <span className="text-xs font-semibold text-savannah uppercase tracking-wider animate-pulse">Uploading...</span>
                        </>
                      ) : (
                        <span className="text-xs font-bold uppercase tracking-wider text-white">+ Upload Image</span>
                      )}
                    </label>
                  </div>
                  <ul className="space-y-2">
                    {destGallery.map((url, i) => (
                      <li key={i} className="flex items-center justify-between rounded bg-white/5 px-3 py-2 text-sm text-ivory/80">
                        <span className="truncate max-w-[200px]">{url}</span>
                        <button type="button" onClick={() => removeDestGalleryUrl(i)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={destFormLoading} className="inline-flex items-center gap-2 rounded-lg bg-savannah px-8 py-4 font-bold text-charcoal hover:bg-savannah/90 transition-colors disabled:opacity-50">
                  {destFormLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {destFormLoading ? "Creating..." : "Create Destination"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: ADD BLOG POST */}
        {activeTab === "add-blog" && (
          <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white">Create Blog Post</h2>
              <p className="mt-2 text-sm text-ivory/60">
                Publish new travel guides, safari tips, and wildlife articles.
              </p>
            </div>

            {blogFormError && (
              <div className="rounded-lg bg-red-500/10 p-4 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                <AlertCircle className="shrink-0 mt-0.5" size={16} />
                <p>{blogFormError}</p>
              </div>
            )}
            
            {blogFormSuccess && (
              <div className="rounded-lg bg-emerald-500/10 p-4 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-3">
                <CheckCircle className="shrink-0 mt-0.5" size={16} />
                <p>Blog post successfully created!</p>
              </div>
            )}

            <form onSubmit={handleBlogSubmit} className="space-y-10">
              <div className="rounded-premium border border-white/10 bg-white/[0.02] p-8 shadow-sm space-y-6">
                <h3 className="font-heading text-xl font-semibold text-white border-b border-white/10 pb-4">
                  Core Details
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. Best Time to Visit the Serengeti"
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-ivory/30 focus:border-savannah focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">
                      Category *
                    </label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-savannah focus:outline-none appearance-none"
                    >
                      <option value="SAFARI_PLANNING">Safari Planning</option>
                      <option value="TRAVEL_TIPS">Travel Tips</option>
                      <option value="WILDLIFE">Wildlife</option>
                      <option value="CONSERVATION">Conservation</option>
                      <option value="DESTINATIONS">Destinations</option>
                      <option value="LUXURY_TRAVEL">Luxury Travel</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">
                    Excerpt (Short Summary) *
                  </label>
                  <textarea
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    placeholder="A brief summary for the blog card..."
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-ivory/30 focus:border-savannah focus:outline-none min-h-[80px] resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">
                    Full Content *
                  </label>
                  <textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="The main article content..."
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-ivory/30 focus:border-savannah focus:outline-none min-h-[200px] resize-y font-mono text-sm leading-relaxed"
                  />
                </div>
              </div>

              <div className="rounded-premium border border-white/10 bg-white/[0.02] p-8 shadow-sm space-y-6">
                <h3 className="font-heading text-xl font-semibold text-white border-b border-white/10 pb-4">
                  Media & Metadata
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/70 block">
                      Cover Image *
                    </label>
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${blogCoverImage ? 'border-savannah/50 bg-savannah/5' : 'border-white/10 bg-black/20 hover:border-savannah/50'}`}>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBlogCoverUpload}
                        disabled={blogUploadingCover}
                      />
                      {blogUploadingCover ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-6 w-6 animate-spin text-savannah" />
                          <span className="text-xs text-ivory/50">Uploading...</span>
                        </div>
                      ) : blogCoverImage ? (
                        <div className="flex flex-col items-center gap-2 text-savannah">
                          <CheckCircle className="h-6 w-6" />
                          <span className="text-xs font-medium truncate max-w-[200px]">{blogCoverImage}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-ivory/40">
                          <Plus className="h-6 w-6" />
                          <span className="text-xs font-medium">Click to upload</span>
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">Author</label>
                      <input
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-ivory/30 focus:border-savannah focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">Reading Time (mins)</label>
                      <input
                        type="number"
                        min="1"
                        value={blogReadingTime}
                        onChange={(e) => setBlogReadingTime(Number(e.target.value))}
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-savannah focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">SEO Title</label>
                    <input
                      type="text"
                      value={blogSeoTitle}
                      onChange={(e) => setBlogSeoTitle(e.target.value)}
                      placeholder="Optional SEO Title"
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-ivory/30 focus:border-savannah focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">SEO Description</label>
                    <input
                      type="text"
                      value={blogSeoDesc}
                      onChange={(e) => setBlogSeoDesc(e.target.value)}
                      placeholder="Optional SEO Description"
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-ivory/30 focus:border-savannah focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-premium border border-white/10 bg-white/[0.02] p-8 shadow-sm space-y-6">
                <h3 className="font-heading text-xl font-semibold text-white border-b border-white/10 pb-4">
                  Publishing & Tags
                </h3>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-white/5 bg-black/10 hover:bg-black/20 transition-colors">
                      <input
                        type="checkbox"
                        checked={blogStatus === "PUBLISHED"}
                        onChange={(e) => setBlogStatus(e.target.checked ? "PUBLISHED" : "DRAFT")}
                        className="h-5 w-5 rounded border-white/20 bg-black/50 text-savannah focus:ring-savannah focus:ring-offset-0"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">Publish Immediately</div>
                        <div className="text-xs text-ivory/60 mt-0.5">If unchecked, saves as Draft.</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-white/5 bg-black/10 hover:bg-black/20 transition-colors">
                      <input
                        type="checkbox"
                        checked={blogIsFeatured}
                        onChange={(e) => setBlogIsFeatured(e.target.checked)}
                        className="h-5 w-5 rounded border-white/20 bg-black/50 text-savannah focus:ring-savannah focus:ring-offset-0"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">Featured Post</div>
                        <div className="text-xs text-ivory/60 mt-0.5">Show on homepage or featured sections.</div>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-ivory/70">Tags</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newBlogTag}
                        onChange={(e) => setNewBlogTag(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBlogTag())}
                        placeholder="e.g. migration, photography..."
                        className="flex-1 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-ivory/30 focus:border-savannah focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addBlogTag}
                        className="rounded-lg bg-white/10 px-4 text-white hover:bg-white/20 transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    {blogTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blogTags.map((tag, idx) => (
                          <span key={idx} className="flex items-center gap-1.5 rounded-full bg-savannah/10 px-3 py-1 text-xs text-savannah border border-savannah/20">
                            #{tag}
                            <button type="button" onClick={() => removeBlogTag(idx)} className="hover:text-white"><X size={12} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={blogFormLoading} className="inline-flex items-center gap-2 rounded-lg bg-savannah px-8 py-4 font-bold text-charcoal hover:bg-savannah/90 transition-colors disabled:opacity-50">
                  {blogFormLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {blogFormLoading ? "Saving..." : "Save Blog Post"}
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
