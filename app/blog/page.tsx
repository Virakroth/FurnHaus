"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { blogPosts } from "@/app/lib/mock-data";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-[#222222]">Our Blog</h1>
        <p className="text-[#666666] text-lg mb-16">
          Tips, trends, and inspiration for creating your perfect space
        </p>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#ECECEC] h-96 rounded-lg overflow-hidden relative">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 text-sm text-[#666666] mb-4">
                <span className="bg-black text-white px-3 py-1 rounded text-xs font-semibold">
                  {blogPosts[0].category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {blogPosts[0].date}
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-[#222222]">
                {blogPosts[0].title}
              </h2>
              <p className="text-[#333333] text-lg mb-6">
                {blogPosts[0].excerpt}
              </p>
              <Link
                href="#"
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-[#222222]">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href="#">
                <article className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer border border-[#E5E5E5]">
                  <div className="bg-[#ECECEC] h-56 overflow-hidden relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-[#666666] mb-3">
                      <span className="text-xs font-semibold text-[#666666]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 text-[#222222]">
                      {post.title}
                    </h3>
                    <p className="text-[#666666] text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-black font-semibold hover:underline">
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16 bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5]">
          <h2 className="text-2xl font-bold mb-6 text-[#222222]">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "All",
              "Design Tips",
              "Furniture Guide",
              "Trends",
              "DIY",
              "Interviews",
              "News",
            ].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 border border-[#E5E5E5] rounded-full text-[#333333] hover:bg-black hover:text-white hover:border-black transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-black text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8">
            Get the latest design tips, product releases, and exclusive offers
            delivered to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded bg-transparent border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
            <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
