"use client"

import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { useEffect, useState } from "react"

const products = [
  {
    id: 1,
    category: "Premium Shoes",
    name: "Milano Elegance",
    description: "Hand-crafted Italian leather shoes with superior comfort. Exquisite design meets timeless elegance.",
    image: "/luxury-premium-leather-shoes-elegant-design.jpg",
  },
  {
    id: 2,
    category: "Luxury Slippers",
    name: "Cloud Comfort",
    description: "Indulge in ultimate comfort with our silk-lined slippers. Perfect for moments of pure relaxation.",
    image: "/luxury-silk-slippers-comfortable-elegant.jpg",
  },
  {
    id: 3,
    category: "Designer Clogs",
    name: "Heritage Clog",
    description: "Timeless Scandinavian design meets contemporary luxury. A statement piece for the discerning.",
    image: "/luxury-designer-clogs-scandinavian-style.jpg",
  },
  {
    id: 4,
    category: "Luxury Sandals",
    name: "Aegean Breeze",
    description: "Mediterranean-inspired sandals crafted from premium materials. Comfort reimagined for summer.",
    image: "/luxury-designer-sandals-mediterranean-premium.jpg",
  },
  {
    id: 5,
    category: "Fashion Sliders",
    name: "Celestial Slides",
    description: "Sophisticated sliders with premium cushioning. Casual elegance for modern living.",
    image: "/luxury-fashion-sliders-premium-cushioned.jpg",
  },
  {
    id: 6,
    category: "Limited Edition",
    name: "Obsidian Essence",
    description: "Exclusive limited-edition piece. Where artistry meets craftsmanship in every stitch.",
    image: "/luxury-limited-edition-obsidian-exclusive-footwear.jpg",
  },
]

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-50" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div
            className="space-y-4"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY / 500),
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-balance text-foreground">
              Where Every Step <span className="font-semibold text-primary">Tells a Story</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Discover Muvez: the pinnacle of luxury footwear craftsmanship. Each design is a testament to elegance,
              comfort, and timeless sophistication.
            </p>
          </div>

          {/* Hero Section Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/survey"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-all duration-300 font-medium tracking-wide"
            >
              Take the Survey
            </Link>
          </div>
        </div>
      </section>

      {/* Products Showcase - Grid Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase">Our Collection</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground text-balance">
              Curated Excellence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each piece in our collection represents a perfect blend of aesthetics and comfort, designed for those who
              appreciate true luxury.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Muvez Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase">Why Choose Muvez</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground text-balance">
              Crafted Perfection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Materials",
                description:
                  "We source only the finest leather, silk, and sustainable materials from around the world.",
              },
              {
                title: "Artisan Craftsmanship",
                description: "Each piece is meticulously handcrafted by master artisans with decades of experience.",
              },
              {
                title: "Timeless Design",
                description:
                  "Our designs transcend trends, ensuring your investment remains stylish for years to come.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 border border-border rounded-lg hover:border-primary transition-colors duration-300 bg-card/50"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground text-balance">
            Ready to Discover Your Perfect Fit?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take our interactive survey to find the perfect Muvez footwear that matches your lifestyle and preferences.
          </p>
          <Link
            href="/survey"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-all duration-300 font-medium tracking-wide"
          >
            Start Survey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          {/* Footer Content */}
          <p className="text-sm text-muted-foreground">
            &copy; 2026 MUVEZ. All rights reserved. Crafted with luxury in mind.
          </p>
        </div>
      </footer>
    </div>
  )
}
