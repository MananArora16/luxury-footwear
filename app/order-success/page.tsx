"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { useAnalytics, trackEvent } from "@/hooks/use-analytics";
import { useEffect } from "react";
import { CheckCircle, Package, Truck, Home } from "lucide-react";

export default function OrderSuccessPage() {
  useAnalytics();

  useEffect(() => {
    trackEvent("page_view", {
      page_title: "Order Success",
      page_path: "/order-success",
      timestamp: new Date().toISOString(),
    });
    trackEvent("order_completed", {
      timestamp: new Date().toISOString(),
    });
  }, []);

  const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl" />
              <CheckCircle className="w-24 h-24 text-green-600 relative" />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-light text-foreground">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your order has been placed successfully. We're excited to get your luxury footwear to you.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Order ID</p>
              <p className="text-2xl font-semibold text-foreground font-mono">{orderId}</p>
            </div>

            <div className="border-t border-b border-border py-6 space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Order Confirmed</h3>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your inbox
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Your items are being carefully packaged
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Shipping Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive tracking information shortly
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-secondary/50 rounded p-4 space-y-2 text-left">
              <h4 className="font-semibold text-foreground">What's Next:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Check your email for order confirmation</li>
                <li>✓ Track your shipment with the provided tracking number</li>
                <li>✓ Enjoy your luxury MUVEZ footwear!</li>
              </ul>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground">Delivery Estimate</p>
              <p className="font-semibold text-foreground">5-7 Business Days</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground">FREE Return</p>
              <p className="font-semibold text-foreground">30-Day Guarantee</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border border-border rounded-sm hover:border-primary text-foreground transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support Section */}
          <div className="bg-secondary/30 rounded-lg p-6 space-y-2">
            <h3 className="font-semibold text-foreground">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our customer support team is here to help with any questions about your order.
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Email: </span>
              <a href="mailto:support@muvez.com" className="text-primary hover:underline">
                support@muvez.com
              </a>
            </p>
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
