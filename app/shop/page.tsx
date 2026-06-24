"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductCRUD } from "@/app/components/ProductCRUD";
import { getProducts, resolveProductImageUrl } from "@/app/lib/api";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Shop() {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products...");
      const response = await getProducts({ per_page: 50 });
      console.log("Products response:", response);

      if (response.success && response.data) {
        console.log("Mapping products, count:", response.data.length);
        // Map API response to Product interface
        const mappedProducts = response.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          originalPrice: product.original_price
            ? parseFloat(product.original_price)
            : undefined,
          image: resolveProductImageUrl(product.featured_image),
          category: product.category_id,
          material: product.material || "N/A",
          color: product.color || "N/A",
          rating: parseFloat(product.rating) || 0,
          reviews: product.reviews_count || 0,
          inStock: product.stock_status === "in_stock",
          description: product.description,
        }));
        console.log("Mapped products count:", mappedProducts.length);
        setAllProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
        applyFiltersAndSort(mappedProducts);
      } else {
        console.warn("Response missing success or data:", response);
        // Fallback to empty state
        setAllProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to empty state on error
      setAllProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const applyFiltersAndSort = (products: any[]) => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      const categoryMap: { [key: string]: number } = {
        Chairs: 1, Sofas: 2, Tables: 3, Storage: 5, Desks: 6, Bedroom: 4,
      };
      filtered = filtered.filter((p) =>
        selectedCategories.some((cat) => categoryMap[cat] === p.category)
      );
    }

    // Apply price range filter
    if (selectedPriceRange.length > 0) {
      filtered = filtered.filter((p) => {
        const price = p.price;
        return selectedPriceRange.some((range) => {
          if (range === "$0 - $200") return price <= 200;
          if (range === "$200 - $500") return price > 200 && price <= 500;
          if (range === "$500 - $1000") return price > 500 && price <= 1000;
          if (range === "$1000+") return price > 1000;
          return true;
        });
      });
    }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((p) =>
        selectedMaterials.some((mat) => p.material.includes(mat))
      );
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.reverse();
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFiltersAndSort(allProducts);
  }, [selectedCategories, selectedPriceRange, selectedMaterials, sortBy, allProducts]);

  const categories = [
    "All",
    "Chairs",
    "Sofas",
    "Tables",
    "Storage",
    "Desks",
    "Bedroom",
  ];
  const materials = ["Wood", "Fabric", "Metal", "Leather"];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#222222]">Shop</h1>

        {/* Admin CRUD Section */}
        <ProductCRUD onProductAdded={fetchProducts} />

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="md:col-span-1">
            <div className="bg-[#F8F8F8] p-6 rounded-lg">
              <h3 className="font-bold mb-4 text-lg text-[#222222]">
                Categories
              </h3>
              <div className="space-y-2 mb-8">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedCategories.includes(cat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, cat]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== cat)
                          );
                        }
                      }}
                    />
                    <span className="text-sm text-[#333333]">{cat}</span>
                  </label>
                ))}
              </div>

              <h3 className="font-bold mb-4 text-lg text-[#222222]">
                Price Range
              </h3>
              <div className="space-y-2 mb-8">
                {["$0 - $200", "$200 - $500", "$500 - $1000", "$1000+"].map(
                  (range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedPriceRange.includes(range)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPriceRange([...selectedPriceRange, range]);
                          } else {
                            setSelectedPriceRange(
                              selectedPriceRange.filter((r) => r !== range)
                            );
                          }
                        }}
                      />
                      <span className="text-sm text-[#333333]">{range}</span>
                    </label>
                  ),
                )}
              </div>

              <h3 className="font-bold mb-4 text-lg text-[#222222]">
                Material
              </h3>
              <div className="space-y-2">
                {materials.map((mat) => (
                  <label
                    key={mat}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedMaterials.includes(mat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMaterials([...selectedMaterials, mat]);
                        } else {
                          setSelectedMaterials(
                            selectedMaterials.filter((m) => m !== mat)
                          );
                        }
                      }}
                    />
                    <span className="text-sm text-[#333333]">{mat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Sort */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-[#666666]">
                Showing {filteredProducts.length} products
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-[#E5E5E5] px-4 py-2 pr-8 rounded cursor-pointer text-[#333333]"
                >
                  <option value="popular">Sort by: Popularity</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 w-5 h-5 pointer-events-none text-[#666666]" />
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded-lg h-64 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
