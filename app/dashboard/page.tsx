"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";
import { products } from "@/app/lib/mock-data";
import { User, LogOut, ShoppingBag, Heart, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/api";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        router.push("/login");
      }
    } else {
      // No user logged in, redirect to login
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Call logout API
        await logoutUser(token);
      }

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Clear local data anyway
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-[#666666]">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const orders = [
    {
      id: "FH1001",
      date: "May 10, 2024",
      status: "Delivered",
      total: "$1,234.50",
      items: 3,
    },
    {
      id: "FH1002",
      date: "Apr 28, 2024",
      status: "Delivered",
      total: "$567.00",
      items: 2,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#222222]">
          Welcome back, {user.first_name}! 👋
        </h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#F8F8F8] p-6 rounded-lg border border-[#E5E5E5]">
            <p className="text-[#666666] text-sm mb-2">Orders</p>
            <p className="text-3xl font-bold text-[#222222]">12</p>
          </div>
          <div className="bg-[#F8F8F8] p-6 rounded-lg border border-[#E5E5E5]">
            <p className="text-[#666666] text-sm mb-2">Wishlist Items</p>
            <p className="text-3xl font-bold text-[#222222]">8</p>
          </div>
          <div className="bg-[#F8F8F8] p-6 rounded-lg border border-[#E5E5E5]">
            <p className="text-[#666666] text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-[#222222]">$8,490</p>
          </div>
          <div className="bg-[#F8F8F8] p-6 rounded-lg border border-[#E5E5E5]">
            <p className="text-[#666666] text-sm mb-2">Addresses</p>
            <p className="text-3xl font-bold text-[#222222]">2</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-[#F8F8F8] rounded-lg p-6 mb-6 border border-[#E5E5E5]">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E5E5E5]">
                <div className="w-12 h-12 bg-[#ECECEC] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#666666]" />
                </div>
                <div>
                  <p className="font-semibold text-[#222222]">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-[#666666]">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                    activeTab === "orders"
                      ? "bg-black text-white"
                      : "text-[#333333] hover:bg-[#FFFFFF]"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                    activeTab === "wishlist"
                      ? "bg-black text-white"
                      : "text-[#333333] hover:bg-[#FFFFFF]"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                    activeTab === "settings"
                      ? "bg-black text-white"
                      : "text-[#333333] hover:bg-[#FFFFFF]"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Account Settings
                </button>
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[#222222]">
                  My Orders
                </h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#E5E5E5] rounded-lg p-6 hover:shadow-md transition"
                    >
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-[#666666]">Order ID</p>
                          <p className="font-semibold text-[#222222]">
                            {order.id}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#666666]">Date</p>
                          <p className="font-semibold text-[#222222]">
                            {order.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#666666]">Status</p>
                          <p className="font-semibold text-green-600">
                            {order.status}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#666666]">Total</p>
                          <p className="font-semibold text-[#222222]">
                            {order.total}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-[#E5E5E5]">
                        <p className="text-sm text-[#666666]">
                          {order.items} item(s)
                        </p>
                        <button className="text-black hover:underline font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[#222222]">
                  My Wishlist
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="border border-[#E5E5E5] rounded-lg overflow-hidden hover:shadow-md transition"
                    >
                      <div className="bg-[#ECECEC] h-48 relative overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 text-[#222222] line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-lg font-bold mb-4 text-[#222222]">
                          ${parseFloat(product.price as string).toFixed(2)}
                        </p>
                        <button className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition font-semibold">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[#222222]">
                  Account Settings
                </h2>
                <div className="space-y-8">
                  <div className="border border-[#E5E5E5] rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-[#222222]">
                      Personal Information
                    </h3>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-[#222222]">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user.first_name}
                            className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-[#222222]">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user.last_name}
                            className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#222222]">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>

                  <div className="border border-[#E5E5E5] rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-[#222222]">
                      Change Password
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#222222]">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#222222]">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-[#222222]">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
