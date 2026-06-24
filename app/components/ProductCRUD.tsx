"use client";

import { useState, useEffect } from "react";
import { createProduct, updateProduct, getCategories, getAdminProducts, deleteProduct, uploadProductImage } from "@/app/lib/api";
import { getStoredToken, isAdminUser } from "@/app/lib/auth";
import { X, Plus, Upload, Trash2, Edit } from "lucide-react";

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
  const [showProductsList, setShowProductsList] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

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

  const fetchProducts = async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        setError("Please login to view products");
        return;
      }
      const response = await getAdminProducts(token);
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(response.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to fetch products");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = getStoredToken();
      if (!token) {
        setError("Please login to delete products");
        return;
      }

      const response = await deleteProduct(token, productId);
      if (response.success) {
        setSuccess("Product deleted successfully!");
        setTimeout(() => setSuccess(""), 2000);
        fetchProducts();
      } else {
        setError(response.message || "Failed to delete product");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the product");
      console.error("Delete error:", err);
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    
    if (file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Please select an image smaller than 5 MB");
        setSelectedImageFile(null);
        setIsDragging(false);
        return;
      }

      setError("");
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
      setIsDragging(false);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const token = getStoredToken();
    if (!token) {
      setError("Please login to add products");
      setLoading(false);
      return;
    }

    if (!formData.name || !formData.price || !formData.category_id) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const slug = formData.slug || generateSlug(formData.name);
      let featuredImage = formData.featured_image || "/products/placeholder.jpg";

      if (selectedImageFile) {
        const uploadResponse = await uploadProductImage(token, selectedImageFile);
        if (!uploadResponse.success || !uploadResponse.data?.path) {
          setError(uploadResponse.message || "Failed to upload product image");
          setLoading(false);
          return;
        }
        featuredImage = uploadResponse.data.path;
      }

      const productData = {
        name: formData.name,
        slug,
        price: parseFloat(formData.price),
        rating: formData.rating ? parseFloat(formData.rating) : 5,
        category_id: parseInt(formData.category_id),
        material: formData.material.join(", ") || "N/A",
        featured_image: featuredImage,
        description: formData.description || "",
        quantity: parseInt(formData.quantity),
        is_active: true,
      };

      console.log(isEditMode ? "Updating product with data:" : "Creating product with data:", productData);
      
      let response;
      if (isEditMode && editingProductId) {
        response = await updateProduct(token, editingProductId, productData);
      } else {
        response = await createProduct(token, productData);
      }

      if (response.success) {
        setSuccess(isEditMode ? "Product updated successfully!" : "Product added successfully!");
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
        setImagePreview("");
        setSelectedImageFile(null);
        setIsEditMode(false);
        setEditingProductId(null);
        
        setTimeout(() => {
          setIsOpen(false);
          setSuccess("");
          fetchProducts();
        }, 2000);

        // Call callback to refresh products
        if (onProductAdded) {
          onProductAdded();
        }
      } else {
        setError(response.message || (isEditMode ? "Failed to update product" : "Failed to add product"));
        console.error(isEditMode ? "Product update error:" : "Product creation error:", response);
      }
    } catch (err: any) {
      setError(err.message || (isEditMode ? "An error occurred while updating the product" : "An error occurred while adding the product"));
      console.error("Exception:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: any) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      rating: product.rating?.toString() || "",
      category_id: product.category_id.toString(),
      material: product.material ? product.material.split(", ") : [],
      featured_image: product.featured_image || "",
      description: product.description || "",
      slug: product.slug || "",
      quantity: product.quantity?.toString() || "10",
    });
    setImagePreview(product.featured_image || "");
    setSelectedImageFile(null);
    setIsEditMode(true);
    setEditingProductId(product.id);
    setIsOpen(true);
    setShowProductsList(false);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="mb-8">
      {!isOpen && !showProductsList ? (
        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
          <button
            onClick={() => {
              setShowProductsList(true);
              fetchProducts();
            }}
            className="flex items-center gap-2 bg-[#333333] text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
          >
            <Trash2 className="w-5 h-5" />
            Manage Products
          </button>
        </div>
      ) : showProductsList ? (
        <div className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#222222]">Manage Products</h2>
            <button
              onClick={() => setShowProductsList(false)}
              className="text-[#666666] hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">{success}</div>
          )}

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-[#666666]">No products found</p>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#E5E5E5]"
                >
                  <div>
                    <h3 className="font-semibold text-[#222222]">{product.name}</h3>
                    <p className="text-sm text-[#666666]">${product.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => setShowProductsList(false)}
            className="mt-6 w-full bg-[#E5E5E5] text-[#222222] py-3 rounded-lg hover:bg-[#DDDDDD] transition font-semibold"
          >
            Close
          </button>
        </div>
      ) : isOpen ? (
        <div className="bg-[#F8F8F8] p-8 rounded-lg border border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#222222]">
              Add New Product
            </h2>
            <button
              onClick={() => {
                setIsOpen(false);
                setError("");
                setSuccess("");
                setSelectedImageFile(null);
                setImagePreview("");
              }}
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

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#222222]">
                {isEditMode ? "Edit Product Name" : "Product Name"} *
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
                  min="0"
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
                  min="0"
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

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#222222]">
                Product Image
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                  isDragging
                    ? "border-black bg-[#ECECEC]"
                    : "border-[#CCCCCC] hover:border-black"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer block">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-[#666666]" />
                  <p className="text-sm font-semibold text-[#333333]">
                    Drag and drop your image here
                  </p>
                  <p className="text-xs text-[#666666] mt-1">or click to select a file</p>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#222222] mb-2">Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <p className="text-xs text-[#666666] mt-2">
                Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-black text-white py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50"
              >
                {loading ? isEditMode ? "Updating..." : "Adding..." : isEditMode ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                  setSuccess("");
                  setIsEditMode(false);
                  setEditingProductId(null);
                  setSelectedImageFile(null);
                  setImagePreview("");
                }}
                className="flex-1 bg-[#E5E5E5] text-[#222222] py-3 rounded-lg hover:bg-[#DDDDDD] transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
