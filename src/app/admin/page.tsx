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

  const [activeTab, setActiveTab] = useState<"overview" | "add-tour">("overview");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (!isAuthenticated) {
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
          </>
        )}
      </main>
    </div>
  );
}
