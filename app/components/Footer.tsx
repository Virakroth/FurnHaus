import Link from 'next/link';
import { MessageCircle, Share2, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FurnHaus</h3>
            <p className="text-[#B0B0B0]">Premium furniture collections for modern living.</p>
            <div className="flex gap-4 mt-4 text-[#B0B0B0]">
              {/* Telegram Button */}
              <a 
                href="https://t.me/Seungvannet" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Contact on Telegram"
                className="hover:text-white transition"
              >
                <MessageCircle className="w-5 h-5 cursor-pointer" />
              </a>

              {/* Share Button (e.g., Twitter/X or a generic share link) */}
              <a 
                href="https://www.facebook.com/share/18cruQ3yEH/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="hover:text-white transition"
              >
                <Share2 className="w-5 h-5 cursor-pointer" />
              </a>

              {/* Gmail Button */}
              <a 
                href="mailto:seungvannet8@gmail.com" 
                aria-label="Send an Email"
                className="hover:text-white transition"
              >
                <Send className="w-5 h-5 cursor-pointer" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/shop" className="text-[#B0B0B0] hover:text-white transition">All Products</Link>
              <Link href="/shop" className="text-[#B0B0B0] hover:text-white transition">New Arrivals</Link>
              <Link href="/shop" className="text-[#B0B0B0] hover:text-white transition">Best Sellers</Link>
              <Link href="/shop" className="text-[#B0B0B0] hover:text-white transition">Sale</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="text-[#B0B0B0] hover:text-white transition">About Us</Link>
              <Link href="/blog" className="text-[#B0B0B0] hover:text-white transition">Blog</Link>
              <Link href="/contact" className="text-[#B0B0B0] hover:text-white transition">Contact</Link>
              <a href="#" className="text-[#B0B0B0] hover:text-white transition">Careers</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a href="mailto:support@furnhaus.com" className="block text-[#B0B0B0] hover:text-white transition">
                support@furnhaus.com
              </a>
              {/* Turned phone number into a clickable link too! */}
              <a href="tel:+85581508898" className="block text-[#B0B0B0] hover:text-white transition">
                +855 81508898
              </a>
              {/* Clickable Map Link */}
              <a 
                href="https://maps.app.goo.gl/4r1iPuLEdfL993ZJA?g_st=ic" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-[#B0B0B0] hover:text-white transition cursor-pointer"
              >
                Chamkar Doung Street (217)<br/>Phnom Penh, Cambodia
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333333] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-[#888888] text-sm">
            <p>&copy; 2026 FurnHaus. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
