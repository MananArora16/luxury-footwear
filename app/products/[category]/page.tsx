"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getProductsByCategory } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { useAnalytics, trackEvent } from "@/hooks/use-analytics";
import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductsPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  // Convert slug back to proper category name with title case
  const categoryName = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const products = getProductsByCategory(categoryName);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useAnalytics();

  useEffect(() => {
    trackEvent("view_product_list", {
      category: categoryName,
      product_count: products.length,
    });
  }, [categoryName, products.length]);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = selectedSizes[product.id] || product.sizes[0];

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size,
      color: product.colors[0],
      image: product.image,
    });

    trackEvent("add_to_cart", {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      size,
    });

    // Show success toast
    toast({
      title: "Added to Cart",
      description: `${product.name} (Size ${size}) has been added to your cart.`,
    });

    // Reset selections
    setSelectedSizes((prev) => ({ ...prev, [product.id]: "" }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        trackEvent("remove_from_wishlist", { product_id: productId });
      } else {
        newWishlist.add(productId);
        trackEvent("add_to_wishlist", { product_id: productId });
      }
      return newWishlist;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb & Header */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{categoryName}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground mb-4">
            {categoryName}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover our curated selection of {categoryName.toLowerCase()} featuring premium materials, exceptional craftsmanship, and timeless design.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {products.length} products available
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-muted rounded-lg mb-4 h-64 sm:h-72">
                  <Link href={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all z-10"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        wishlist.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  {/* Overlay on Hover */}
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 p-4 z-20" onClick={(e) => e.stopPropagation()}>
                      {/* Size Selection */}
                      <div className="w-full">
                        <label className="text-xs text-white/80 block mb-2">Size</label>
                        <select
                          value={selectedSizes[product.id] || ""}
                          onChange={(e) => {
                            e.stopPropagation();
                            setSelectedSizes((prev) => ({
                              ...prev,
                              [product.id]: e.target.value,
                            }));
                            // Track size selection
                            trackEvent("product_size_selected", {
                              product_id: product.id,
                              product_name: product.name,
                              size: e.target.value,
                            });
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="w-full px-3 py-2 bg-white/20 text-white placeholder-white/50 border border-white/30 rounded text-sm"
                        >
                          <option value="">Select Size</option>
                          {product.sizes.map((size) => (
                            <option key={size} value={size} className="text-black">
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors font-medium text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-primary tracking-widest uppercase">
                    {product.category}
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg sm:text-xl font-light text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-yellow-500">★</span>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-primary">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 MUVEZ. All rights reserved. Crafted with luxury in mind.
          </p>
        </div>
      </footer>
    </div>
  );
}
