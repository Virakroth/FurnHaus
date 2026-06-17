"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";
import { Lightbulb, Users, Globe } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-5xl font-bold mb-4 text-white">About FurnHaus</h1>
          <p className="text-xl text-white/95">
            Crafting beautiful spaces since 2015
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#222222]">
                Our Mission
              </h2>
              <p className="text-[#333333] text-lg mb-4">
                At FurnHaus, we believe that quality furniture should be
                accessible to everyone. Our mission is to provide beautifully
                designed, durable furniture that transforms spaces and enhances
                lives.
              </p>
              <p className="text-[#333333] text-lg">
                We're committed to sustainability, ethical sourcing, and
                exceptional customer service in everything we do.
              </p>
            </div>
            
            {/* Replaced placeholder with an actual image */}
            <div className="h-96 rounded-lg overflow-hidden border border-[#E5E5E5]">
              <img 
                src="/products/store.png" 
                alt="FurnHaus modern living room design" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#222222]">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5]">
              <Lightbulb className="w-12 h-12 mb-4 text-[#222222]" />
              <h3 className="text-2xl font-bold mb-4 text-[#222222]">
                Innovation
              </h3>
              <p className="text-[#333333]">
                We constantly push the boundaries of design and functionality to
                create furniture that exceeds expectations.
              </p>
            </div>
            <div className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5]">
              <Users className="w-12 h-12 mb-4 text-[#222222]" />
              <h3 className="text-2xl font-bold mb-4 text-[#222222]">
                Community
              </h3>
              <p className="text-[#333333]">
                Our customers are at the heart of everything we do. We listen,
                learn, and continuously improve based on your feedback.
              </p>
            </div>
            <div className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5]">
              <Globe className="w-12 h-12 mb-4 text-[#222222]" />
              <h3 className="text-2xl font-bold mb-4 text-[#222222]">
                Sustainability
              </h3>
              <p className="text-[#333333]">
                We're dedicated to minimizing our environmental impact through
                eco-friendly practices and sustainable materials.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mb-16 bg-[#F8F8F8] p-12 rounded-lg border border-[#E5E5E5]">
          <h2 className="text-4xl font-bold mb-8 text-[#222222]">Our Story</h2>
          <div className="space-y-6 text-[#333333] text-lg">
            <p>
              FurnHaus was founded in 2015 by a group of furniture designers and
              entrepreneurs who shared a common vision: to make premium
              furniture accessible to everyone.
            </p>
            <p>
              What started as a small showroom in Brooklyn has grown into a
              thriving online and offline furniture destination serving
              customers across the country.
            </p>
            <p>
              Today, we partner with talented designers and craftspeople to
              curate a collection of furniture that balances style, comfort, and
              durability. Each piece tells a story and is designed to be enjoyed
              for years to come.
            </p>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-4xl font-bold mb-12 text-center text-[#222222]">
            Meet Our Founders
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-[#ECECEC] h-80 rounded-lg mb-6 overflow-hidden relative">
                <Image
                  src="/products/Members/Sum Virakroth.jpg"
                  alt="Sum Virakroth"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#222222]">
                Sum Virakroth
              </h3>
              <p className="text-[#666666] font-semibold mb-3">Founder</p>
              <p className="text-[#333333]">
                Creative visionary leading design and innovation at FurnHaus
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#ECECEC] h-80 rounded-lg mb-6 overflow-hidden relative">
                <Image
                  src="/products/Members/Seung Vannet.jpg"
                  alt="Seung Vannet"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#222222]">
                Seung Vannet
              </h3>
              <p className="text-[#666666] font-semibold mb-3">Founder</p>
              <p className="text-[#333333]">
                Business strategist driving growth and customer excellence
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
