export interface Category {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  material: string;
  care: string;
  sizes: string[];
  colors: string[];
}

export const categories: Category[] = [
  {
    id: 1,
    category: "Premium Shoes",
    name: "Milano Elegance",
    description:
      "Hand-crafted Italian leather shoes with superior comfort. Exquisite design meets timeless elegance.",
    image: "/luxury-premium-leather-shoes-elegant-design.jpg",
    price: 450,
    rating: 4.8,
    reviews: 156,
    material: "Premium Italian Leather",
    care: "Professional leather cleaning recommended",
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
    colors: ["Black", "Brown", "Tan"],
  },
  {
    id: 2,
    category: "Luxury Slippers",
    name: "Cloud Comfort",
    description:
      "Indulge in ultimate comfort with our silk-lined slippers. Perfect for moments of pure relaxation.",
    image: "/luxury-silk-slippers-comfortable-elegant.jpg",
    price: 280,
    rating: 4.9,
    reviews: 203,
    material: "Silk Lining with Memory Foam",
    care: "Hand wash recommended",
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    colors: ["Cream", "Grey", "Navy"],
  },
  {
    id: 3,
    category: "Designer Clogs",
    name: "Heritage Clog",
    description:
      "Timeless Scandinavian design meets contemporary luxury. A statement piece for the discerning.",
    image: "/luxury-designer-clogs-scandinavian-style.jpg",
    price: 320,
    rating: 4.7,
    reviews: 128,
    material: "Premium Birch Wood & Leather",
    care: "Oil treatment seasonally",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["Natural", "Dark Brown", "Black"],
  },
  {
    id: 4,
    category: "Luxury Sandals",
    name: "Aegean Breeze",
    description:
      "Mediterranean-inspired sandals crafted from premium materials. Comfort reimagined for summer.",
    image: "/luxury-designer-sandals-mediterranean-premium.jpg",
    price: 380,
    rating: 4.6,
    reviews: 187,
    material: "Premium Leather & Cork",
    care: "Waterproof treatment included",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["Gold", "Silver", "Bronze"],
  },
  {
    id: 5,
    category: "Fashion Sliders",
    name: "Celestial Slides",
    description:
      "Sophisticated sliders with premium cushioning. Casual elegance for modern living.",
    image: "/luxury-fashion-sliders-premium-cushioned.jpg",
    price: 220,
    rating: 4.8,
    reviews: 241,
    material: "Premium EVA with Leather Strap",
    care: "Machine washable",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Beige"],
  },
  {
    id: 6,
    category: "Limited Edition",
    name: "Obsidian Essence",
    description:
      "Exclusive limited-edition piece. Where artistry meets craftsmanship in every stitch.",
    image: "/luxury-limited-edition-obsidian-exclusive-footwear.jpg",
    price: 650,
    rating: 5.0,
    reviews: 89,
    material: "Exotic Leather & Precious Materials",
    care: "White glove service recommended",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black"],
  },
];
