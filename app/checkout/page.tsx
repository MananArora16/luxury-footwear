"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useAnalytics, trackEvent } from "@/hooks/use-analytics";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useAnalytics();

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [items.length, router, orderPlaced]);

  useEffect(() => {
    trackEvent("page_view", {
      page_title: "Checkout",
      page_path: "/checkout",
      timestamp: new Date().toISOString(),
    });
    trackEvent("checkout_page_loaded", {
      items_count: items.length,
      total_value: total,
    });
  }, [items.length, total]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Track form field input
    trackEvent("form_field_filled", {
      field_name: name,
      field_type: (e.target as HTMLInputElement).type || "select",
    });
  };

  const validateForm = (): boolean => {
    const requiredFields: Array<keyof ShippingData> = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "zipCode",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Required Field",
          description: `${field.replace(/([A-Z])/g, " $1").trim()} is required.`,
          variant: "destructive",
        });
        trackEvent("checkout_validation_error", {
          field: field,
          error_type: "required_field",
        });
        return false;
      }
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      trackEvent("checkout_validation_error", {
        field: "email",
        error_type: "invalid_format",
      });
      return false;
    }

    return true;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track begin checkout event
    trackEvent("begin_checkout", {
      items_count: items.length,
      total_value: total,
    });

    if (!validateForm()) {
      trackEvent("checkout_validation_failed", {
        items_count: items.length,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      trackEvent("purchase", {
        transaction_id: `ORD-${Date.now()}`,
        affiliation: "MUVEZ",
        value: total * 1.08,
        currency: "USD",
        tax: (total * 0.08).toFixed(2),
        shipping: 0,
        items_count: items.length,
        customer_email: formData.email,
      });

      // Show success toast
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. Redirecting to order confirmation...",
      });

      // Show success and redirect
      setOrderPlaced(true);
      clearCart();

      // Redirect to success page
      setTimeout(() => {
        router.push("/order-success");
      }, 1500);
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Error",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center space-y-4">
          <div className="text-6xl">✓</div>
          <h1 className="text-2xl font-light text-foreground">Order Placed Successfully</h1>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-light text-foreground mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="border border-border rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Shipping Address
                </h2>

                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="123 Main Street"
                    />
                  </div>

                  {/* City, State, Zip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => {
                      trackEvent("button_clicked", {
                        button_name: "place_order",
                        items_count: items.length,
                        total_value: total,
                      });
                      trackEvent("place_order_clicked", {
                        items_count: items.length,
                        total_value: total,
                        timestamp: new Date().toISOString(),
                      });
                    }}
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border border-border rounded-lg p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex justify-between text-sm"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
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
                  <span>Tax (8%)</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-semibold text-foreground">
                <span>Total</span>
                <span className="text-primary">${(total * 1.08).toFixed(2)}</span>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
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
