'use client';

import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // TODO: Paste the Access Key you get from web3forms.com right here
    formData.append("access_key", "e7cbc038-595a-494c-9029-9a199c4e8323"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully to seungvannet8@gmail.com!");
        e.currentTarget.reset(); // Clears form fields
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-center text-[#222222]">Get in Touch</h1>
        <p className="text-[#666666] text-center text-lg mb-16">
          Have a question? We'd love to hear from you.
        </p>

        {/* Info Cards Row */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Clickable Phone Card */}
          <a 
            href="tel:+85581508898" 
            className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5] block hover:border-black transition duration-300"
          >
            <Phone className="w-8 h-8 mb-4 text-[#222222]" />
            <h3 className="text-xl font-bold mb-2 text-[#222222]">Phone</h3>
            <p className="text-[#333333] mb-2 hover:underline">+855 81508898</p>
            <p className="text-sm text-[#666666]">Mon-Fri: 7am - 7pm EST</p>
          </a>

          {/* Clickable Email Card */}
          <a 
            href="mailto:support@furnhaus.com" 
            className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5] block hover:border-black transition duration-300"
          >
            <Mail className="w-8 h-8 mb-4 text-[#222222]" />
            <h3 className="text-xl font-bold mb-2 text-[#222222]">Email</h3>
            <p className="text-[#333333] mb-2 hover:underline">support@furnhaus.com</p>
            <p className="text-sm text-[#666666]">We respond within 24 hours</p>
          </a>

          {/* Clickable Map Card */}
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Chamkar+Doung+Street+217+Phnom+Penh+Cambodia" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5] block hover:border-black transition duration-300"
          >
            <MapPin className="w-8 h-8 mb-4 text-[#222222]" />
            <h3 className="text-xl font-bold mb-2 text-[#222222]">Visit Us</h3>
            <p className="text-[#333333] text-sm hover:underline">
              Chamkar Doung Street (217)<br/>
              Phnom Penh, Cambodia
            </p>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#222222]">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#222222]">First Name</label>
                  <input
                    type="text"
                    name="First Name"
                    placeholder="John"
                    required
                    className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333] placeholder-[#999999]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#222222]">Last Name</label>
                  <input
                    type="text"
                    name="Last Name"
                    placeholder="Doe"
                    required
                    className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333] placeholder-[#999999]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#222222]">Email</label>
                <input
                  type="email"
                  name="Email Address"
                  placeholder="john@example.com"
                  required
                  className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333] placeholder-[#999999]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#222222]">Subject</label>
                <input
                  type="text"
                  name="Subject"
                  placeholder="How can we help?"
                  required
                  className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333] placeholder-[#999999]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#222222]">Message</label>
                <textarea
                  name="Message"
                  placeholder="Tell us more..."
                  rows={6}
                  required
                  className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none text-[#333333] placeholder-[#999999]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Information & Map */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#222222]">Customer Support</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 flex-shrink-0 mt-1 text-[#222222]" />
                <div>
                  <h3 className="font-bold mb-2 text-[#222222]">Business Hours</h3>
                  <p className="text-[#666666] text-sm">
                    Monday - Friday: 7:00 AM - 7:00 PM EST<br/>
                    Saturday: 7:00 AM - 3:00 PM EST<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="w-full h-64 rounded-lg overflow-hidden border border-[#E5E5E5]">
                <iframe
                  title="Furnhaus Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.5245842813133!2d104.887208!3d11.514167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310950fc1b01df9d%3A0xc3fde5bc6325be91!2sSt%20217%2C%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1710000000000!5m2!1sen!2skh"
                  className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="bg-[#F8F8F8] p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="font-bold mb-4 text-[#222222]">FAQ</h3>
                <ul className="space-y-3 text-sm text-[#666666]">
                  <li>
                    <a href="#" className="hover:text-black transition">
                      • Shipping and Delivery
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition">
                      • Returns and Exchanges
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition">
                      • Warranty Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition">
                      • Payment Methods
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition">
                      • Assembly Services
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-[#222222]">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { name: 'Facebook', url: 'https://www.facebook.com/share/18cruQ3yEH/?mibextid=wwXIfr' },
                    { name: 'Instagram', url: 'https://www.instagram.com/seungvannet?igsh=MW5tOWoweXZmYWFjYw%3D%3D&utm_source=qr' },
                    { name: 'Telegram', url: 'https://t.me/Seungvannet' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black font-semibold text-sm transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}