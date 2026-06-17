"use client";

import { useState, useEffect } from "react";
import { createProduct, getCategories } from "@/app/lib/api";
import { getStoredToken, isAdminUser } from "@/app/lib/auth";
import { X, Plus } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

export function ProductCRUD({
  onProductAdded,
}: {
  onProductAdded?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: "",
    category_id: "",
    material: [] as string[],
    featured_image: "",
    description: "",
    slug: "",
    quantity: "10",
  });

  const materials = ["Wood", "Fabric", "Metal", "Leather", "Glass", "Plastic"];

  useEffect(() => {
    setIsAdmin(isAdminUser());
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleMaterialChange = (material: string) => {
    setFormData((prev) => ({
      ...prev,
      material: prev.material.includes(material)
        ? prev.material.filter((m) => m !== material)
        : [...prev.material, material],
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = getStoredToken();
    if (!token) {
      setError("Please login to add products");
      setLoading(false);
      return;
    }

    try {
      const slug = formData.slug || generateSlug(formData.name);

      const productData = {
        name: formData.name,
        slug,
        price: parseFloat(formData.price),
        rating: formData.rating ? parseFloat(formData.rating) : 5,
        category_id: parseInt(formData.category_id),
        material: formData.material.join(", "),
        featured_image: formData.featured_image,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        is_active: true,
      };

      const response = await createProduct(token, productData);

      if (response.success) {
        setFormData({
          name: "",
          price: "",
          rating: "",
          category_id: "",
          material: [],
          featured_image: "",
          description: "",
          slug: "",
          quantity: "10",
        });
        setIsOpen(false);

        // Call callback to refresh products
        if (onProductAdded) {
          onProductAdded();
        }

        // Show success message
        alert("Product added successfully!");
      } else {
        setError(response.message || "Failed to add product");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      ) : (
        <div className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#222222]">
              Add New Product
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#666666] hover:text-black transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#222222]">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333]"
                placeholder="e.g., Modern Upholstered Armchair"
              />
            </div>

            {/* Price and Rating */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#222222]">
                  Price ($) *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333]"
                  placeholder="349.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#222222]">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333]"
                  placeholder="4.8"
                />
              </div>
            </div>

            {/* Category and Quantity */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#222222]">
                  Category *
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333]"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#222222]">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333]"
                  placeholder="10"
                />
              </div>
            </div>

            {/* Materials */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-[#222222]">
                Materials
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {materials.map((material) => (
                  <label
                    key={material}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.material.includes(material)}
                      onChange={() => handleMaterialChange(material)}
                      className="w-4 h-4 rounded border-[#E5E5E5] text-black focus:ring-black"
                    />
                    <span className="text-sm text-[#333333]">{material}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#222222]">
                Image URL
              </label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) =>
                  setFormData({ ...formData, featured_image: e.target.value })
                }
                className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333]"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-[#666666] mt-1">
                Tip: Use URLs from the /products/CategoryName/ folder
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#222222]">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-[#E5E5E5] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-[#333333]"
                placeholder="Product description..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50"
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-[#E5E5E5] text-[#222222] py-3 rounded-lg hover:bg-[#DDDDDD] transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
