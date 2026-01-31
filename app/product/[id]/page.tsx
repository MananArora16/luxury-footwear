"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { categories } from "@/lib/constants";
import { useCart } from "@/context/cart-context";
import { useAnalytics, trackEvent } from "@/hooks/use-analytics";
import { useToast } from "@/hooks/use-toast";
import { Heart, Share2, Truck, ShieldCheck, RotateCw } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = categories.find((p) => p.id.toString() === productId);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useAnalytics();

  useEffect(() => {
    trackEvent("page_view", {
      page_title: "Product Detail",
      page_path: `/product/${productId}`,
      timestamp: new Date().toISOString(),
    });
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      trackEvent("pdp_visited", {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
      });
      trackEvent("view_item", {
        product_id: product.id,
        product_name: product.name,
        value: product.price,
        currency: "USD",
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Missing Selection",
        description: "Please select both size and color",
        variant: "destructive",
      });
      return;
    }

    addItem({
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    });

    trackEvent("add_to_cart", {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    // Show success toast
    toast({
      title: "Added to Cart",
      description: `${product.name} (Size ${selectedSize}, ${selectedColor}) x${quantity} has been added.`,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    trackEvent(isWishlisted ? "remove_from_wishlist" : "add_to_wishlist", {
      product_id: product.id,
      product_name: product.name,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden bg-muted rounded-lg aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-2">
                    {product.category}
                  </p>
                  <h1 className="text-4xl font-light text-foreground">{product.name}</h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-lg text-yellow-500">★★★★★</span>
                    <span className="text-sm font-medium ml-2">{product.rating}/5.0</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Based on {product.reviews} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="text-4xl font-semibold text-primary">${product.price}</div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Options */}
              <div className="space-y-6">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          trackEvent("button_clicked", {
                            button_name: "select_color",
                            value: color,
                            product_id: product.id,
                          });
                          trackEvent("product_color_selected", {
                            product_id: product.id,
                            product_name: product.name,
                            color: color,
                          });
                        }}
                        className={`py-3 rounded border transition-all font-medium ${
                          selectedColor === color
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-foreground hover:border-primary"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          trackEvent("button_clicked", {
                            button_name: "select_size",
                            value: size,
                            product_id: product.id,
                          });
                          trackEvent("product_size_selected", {
                            product_id: product.id,
                            product_name: product.name,
                            size: size,
                          });
                        }}
                        className={`py-3 rounded border transition-all font-medium ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-foreground hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        const newQuantity = Math.max(1, quantity - 1);
                        setQuantity(newQuantity);
                        trackEvent("button_clicked", {
                          button_name: "decrease_quantity",
                          product_id: product.id,
                        });
                        trackEvent("quantity_changed", {
                          product_id: product.id,
                          quantity: newQuantity,
                          action: "decrease",
                        });
                      }}
                      className="px-4 py-2 border border-border rounded hover:border-primary transition-all"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => {
                        const newQuantity = quantity + 1;
                        setQuantity(newQuantity);
                        trackEvent("button_clicked", {
                          button_name: "increase_quantity",
                          product_id: product.id,
                        });
                        trackEvent("quantity_changed", {
                          product_id: product.id,
                          quantity: newQuantity,
                          action: "increase",
                        });
                      }}
                      className="px-4 py-2 border border-border rounded hover:border-primary transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    trackEvent("button_clicked", {
                      button_name: "add_to_cart",
                      product_id: product.id,
                      product_name: product.name,
                      product_price: product.price,
                    });
                    trackEvent("add_to_cart_placed", {
                      product_id: product.id,
                      product_name: product.name,
                      quantity: quantity,
                      size: selectedSize,
                      color: selectedColor,
                      price: product.price,
                    });
                    handleAddToCart();
                  }}
                  className={`flex-1 px-6 py-4 rounded-sm font-medium transition-all text-lg ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : "bg-primary text-primary-foreground hover:bg-accent"
                  }`}
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() => {
                    trackEvent("button_clicked", {
                      button_name: "toggle_wishlist",
                      product_id: product.id,
                      is_wishlisted: !isWishlisted,
                    });
                    toggleWishlist();
                  }}
                  className={`px-6 py-4 rounded-sm border transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-300 text-red-600"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex gap-3">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">On orders over $100</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">2 Year Warranty</h4>
                    <p className="text-sm text-muted-foreground">On all products</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCw className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Easy Returns</h4>
                    <p className="text-sm text-muted-foreground">30-day guarantee</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Material</p>
                    <p className="font-semibold text-foreground">{product.material}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Care Instructions</p>
                    <p className="font-semibold text-foreground">{product.care}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-background mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 MUVEZ. All rights reserved. Crafted with luxury in mind.
          </p>
        </div>
      </footer>
    </div>
  );
}
