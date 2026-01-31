"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useAnalytics, trackEvent } from "@/hooks/use-analytics";
import { useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  useAnalytics();

  useEffect(() => {
    trackEvent("page_view", {
      page_title: "Shopping Cart",
      page_path: "/cart",
      timestamp: new Date().toISOString(),
    });
    trackEvent("view_cart", {
      items_count: items.length,
      total_value: total,
    });
  }, [items.length, total]);

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    removeItem(productId, size, color);
    trackEvent("button_clicked", {
      button_name: "remove_from_cart",
      product_id: productId,
    });
    trackEvent("remove_from_cart", {
      product_id: productId,
    });
  };

  const handleQuantityChange = (
    productId: string,
    size: string,
    color: string,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) return;
    updateQuantity(productId, size, color, newQuantity);
    trackEvent("button_clicked", {
      button_name: "change_quantity",
      product_id: productId,
      new_quantity: newQuantity,
    });
    trackEvent("change_cart_quantity", {
      product_id: productId,
      new_quantity: newQuantity,
    });
  };

  const handleCheckout = () => {
    trackEvent("button_clicked", {
      button_name: "proceed_to_checkout",
      items_count: items.length,
      total_value: total,
    });
    trackEvent("begin_checkout", {
      items_count: items.length,
      total_value: total,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-light text-foreground mb-8">Shopping Cart</h1>

            <div className="text-center py-16 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-light text-foreground">Your cart is empty</h2>
                <p className="text-muted-foreground">
                  Start shopping to add items to your cart
                </p>
              </div>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 border-b border-border pb-6">
            <h1 className="text-3xl font-light text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="border border-border rounded-lg p-4 sm:p-6 flex gap-4 sm:gap-6 hover:border-primary/50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <Link
                        href={`/product/${item.productId}`}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        <p>Size: <span className="font-medium text-foreground">{item.size}</span></p>
                        <p>Color: <span className="font-medium text-foreground">{item.color}</span></p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col justify-between items-end">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">${item.price}</p>
                      <p className="text-xl font-semibold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveItem(item.productId, item.size, item.color)
                      }
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border border-border rounded-lg p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-semibold text-foreground mb-6">
                <span>Total</span>
                <span className="text-primary">${(total * 1.08).toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={handleCheckout}
                className="w-full block px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors text-center font-medium mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="w-full block px-6 py-3 border border-border rounded-sm hover:border-primary text-center font-medium transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
