# MUVEZ Site Map & Navigation Flow

## 🗺️ Complete Site Structure

```
MUVEZ - Luxury Footwear E-Commerce
│
├── HOME PAGE (/)
│   ├── Hero Section
│   ├── Category Tiles (6 categories)
│   │   ├── Premium Shoes
│   │   ├── Luxury Slippers
│   │   ├── Designer Clogs
│   │   ├── Luxury Sandals
│   │   ├── Fashion Sliders
│   │   └── Limited Edition
│   ├── Why Choose MUVEZ
│   ├── CTA Section (Survey)
│   └── Footer
│
├── PRODUCT LISTING PAGES (/products/[category])
│   ├── Premium Shoes (/products/premium-shoes)
│   │   └── 10 Products
│   ├── Luxury Slippers (/products/luxury-slippers)
│   │   └── 10 Products
│   ├── Designer Clogs (/products/designer-clogs)
│   │   └── 10 Products
│   ├── Luxury Sandals (/products/luxury-sandals)
│   │   └── 10 Products
│   ├── Fashion Sliders (/products/fashion-sliders)
│   │   └── 10 Products
│   └── Limited Edition (/products/limited-edition)
│       └── 10 Products
│
├── PRODUCT DETAIL PAGES (/product/[id])
│   └── Each Product
│       ├── Image Gallery
│       ├── Product Info
│       ├── Size Selector
│       ├── Color Selector
│       ├── Add to Cart
│       └── Wishlist
│
├── SHOPPING PAGES
│   ├── Cart (/cart)
│   │   ├── Cart Items
│   │   ├── Quantity Control
│   │   ├── Remove Items
│   │   └── Checkout Button
│   │
│   ├── Checkout (/checkout)
│   │   ├── Shipping Form
│   │   ├── Order Summary
│   │   └── Place Order Button
│   │
│   └── Order Success (/order-success)
│       ├── Confirmation
│       ├── Order ID
│       └── Next Steps
│
└── ADDITIONAL PAGES
    ├── Survey (/survey) - Existing
    └── API Routes
        └── Survey Submit (/api/survey-submit)
```

---

## 🔄 User Journey Flows

### Complete Shopping Journey
```
Home Page
    ↓
Click Category Tile
    ↓
Product Listing Page
    ↓
Click Product
    ↓
Product Detail Page
    ↓ (Select Size & Color)
Add to Cart
    ↓
Continue Shopping / Go to Cart
    ↓
Cart Page
    ↓ (Review Items)
Checkout
    ↓
Checkout Page
    ↓ (Enter Shipping)
Place Order
    ↓
Order Success Page
    ↓
Back to Home or Continue Shopping
```

### Quick Add Flow
```
Product Listing Page
    ↓ (Hover Over Product)
    ↓
Overlay Shows Size/Color Options
    ↓ (Select Options)
    ↓
Click "Add to Cart"
    ↓
Continue Browsing
```

### Wishlist Flow
```
Product Card / Detail Page
    ↓
Click Heart Icon
    ↓
Add to Wishlist
    ↓ (Can be removed)
Remove from Wishlist
```

---

## 📱 Navigation Components

### Header Navigation
```
LOGO/MUVEZ ─── HOME ─── SHOP ─── THEME TOGGLE ─── CART ICON (with count)
```

### Mobile Navigation
```
LOGO ─── CART ICON ─── THEME ─── MENU
         │
         └─ Cart Count Badge
```

### Breadcrumbs
- Home > Category > Product Detail
- Home > Cart
- Home > Checkout
- Home > Order Success

---

## 🏪 Product Listing Pages - Layouts

### Desktop (4 columns)
```
┌─────────┬─────────┬─────────┬─────────┐
│Product 1│Product 2│Product 3│Product 4│
├─────────┼─────────┼─────────┼─────────┤
│Product 5│Product 6│Product 7│Product 8│
├─────────┼─────────┼─────────┼─────────┤
│Product 9│Product10│Product11│Product12│
└─────────┴─────────┴─────────┴─────────┘
```

### Tablet (2 columns)
```
┌──────────────┬──────────────┐
│ Product 1    │ Product 2    │
├──────────────┼──────────────┤
│ Product 3    │ Product 4    │
├──────────────┼──────────────┤
│ Product 5    │ Product 6    │
└──────────────┴──────────────┘
```

### Mobile (1 column)
```
┌──────────────────┐
│ Product 1        │
├──────────────────┤
│ Product 2        │
├──────────────────┤
│ Product 3        │
└──────────────────┘
```

---

## 🛒 Cart & Checkout Layout

### Cart Page Structure
```
┌─────────────────────────────────────────┐
│ Shopping Cart                           │
├──────────────────────┬──────────────────┤
│                      │                  │
│  Cart Items          │  Order Summary   │
│  ├─ Item 1           │  ├─ Subtotal     │
│  ├─ Item 2           │  ├─ Shipping     │
│  └─ Item 3           │  ├─ Tax          │
│                      │  └─ TOTAL        │
│  [Qty Controls]      │                  │
│  [Remove Buttons]    │  [Checkout Btn]  │
│                      │  [Shop More Btn] │
└──────────────────────┴──────────────────┘
```

### Checkout Page Structure
```
┌─────────────────────────────────────────┐
│ Checkout                                │
├──────────────────────┬──────────────────┤
│                      │                  │
│  Shipping Form       │  Order Summary   │
│  ├─ Name             │  ├─ Items List   │
│  ├─ Email            │  ├─ Subtotal     │
│  ├─ Phone            │  ├─ Tax          │
│  ├─ Address          │  └─ TOTAL        │
│  ├─ City             │                  │
│  ├─ State            │  Trust Badges    │
│  ├─ ZIP              │  ├─ Secure       │
│  └─ Country          │  ├─ Returns      │
│                      │  └─ Warranty     │
│  [Place Order Btn]   │                  │
└──────────────────────┴──────────────────┘
```

---

## 📊 Category Pages

### Premium Shoes
- **Path**: `/products/premium-shoes`
- **Products**: 10 luxury dress shoes
- **Price Range**: $380-$550
- **Main Colors**: Black, Brown, Tan

### Luxury Slippers
- **Path**: `/products/luxury-slippers`
- **Products**: 10 comfort slippers
- **Price Range**: $155-$280
- **Main Colors**: Cream, Gray, Pink

### Designer Clogs
- **Path**: `/products/designer-clogs`
- **Products**: 10 Scandinavian clogs
- **Price Range**: $285-$380
- **Main Colors**: Natural, Dark Brown

### Luxury Sandals
- **Path**: `/products/luxury-sandals`
- **Products**: 10 summer sandals
- **Price Range**: $240-$340
- **Main Colors**: Bronze, Gold, Silver

### Fashion Sliders
- **Path**: `/products/fashion-sliders`
- **Products**: 10 casual sliders
- **Price Range**: $120-$190
- **Main Colors**: Black, White, Gray

### Limited Edition
- **Path**: `/products/limited-edition`
- **Products**: 10 exclusive pieces
- **Price Range**: $580-$820
- **Main Colors**: Specialty/Metallic

---

## 🔗 Inter-Page Navigation

### From Home
```
Home ──┬─→ Premium Shoes Listing
       ├─→ Luxury Slippers Listing
       ├─→ Designer Clogs Listing
       ├─→ Luxury Sandals Listing
       ├─→ Fashion Sliders Listing
       ├─→ Limited Edition Listing
       └─→ Survey Page
```

### From Listing Page
```
Listing ──┬─→ Back to Home (link)
          ├─→ Product Detail (click card)
          └─→ Cart (icon in navbar)
```

### From Product Detail
```
Detail ──┬─→ Listing Page (breadcrumb)
         ├─→ Home (breadcrumb)
         ├─→ Cart (icon in navbar)
         └─→ Back to Listing (back button)
```

### From Cart
```
Cart ──┬─→ Continue Shopping (back to listing)
       ├─→ Checkout (button)
       └─→ Home (logo click)
```

### From Checkout
```
Checkout ──┬─→ Review Cart (back)
           └─→ Place Order
                ↓
           Order Success ──┬─→ Home
                           └─→ Continue Shopping
```

---

## 📲 Responsive Behavior

### Navigation Bar
| Device | Logo | Links | Cart | Theme |
|--------|------|-------|------|-------|
| Mobile | ✓ | Hidden (Menu) | ✓ | ✓ |
| Tablet | ✓ | Visible | ✓ | ✓ |
| Desktop | ✓ | Visible | ✓ | ✓ |

### Product Grid
| Device | Columns |
|--------|---------|
| Mobile | 1 |
| Tablet | 2 |
| Desktop | 3-4 |

### Forms
| Device | Width |
|--------|-------|
| Mobile | Full | 
| Tablet | ~80% |
| Desktop | ~50% |

---

## 🎯 Key Pages at a Glance

| Page | URL | Purpose | Key Features |
|------|-----|---------|--------------|
| Home | / | Browse categories | 6 category tiles, features |
| Product Listing | /products/[cat] | View products | Grid, filters, add to cart |
| Product Detail | /product/[id] | View full details | Gallery, specs, options |
| Cart | /cart | Review items | Qty control, summary |
| Checkout | /checkout | Enter shipping | Form, validation |
| Success | /order-success | Order confirmation | Order ID, next steps |

---

## 🔐 Protected Routes

All routes are publicly accessible (no authentication required).

Cart data is stored locally in browser localStorage.

---

## 📈 Analytics Tracking Points

```
Home Page
├─→ Category Click → Track event
│
Product Listing
├─→ Page Load → View product list
├─→ Product Click → View item
└─→ Add to Cart → Track event

Product Detail
├─→ Page Load → View item
├─→ Add to Cart → Track event
└─→ Wishlist Toggle → Track event

Cart
├─→ Page Load → View cart
├─→ Qty Change → Track event
└─→ Remove Item → Track event

Checkout
├─→ Page Load → Begin checkout
└─→ Place Order → Track purchase

Order Success
└─→ Page Load → Order completion
```

---

## 🎨 Theme Switching

Available on every page via:
- **Desktop**: Top right (Sun/Moon icon)
- **Mobile**: Top right (Sun/Moon icon)

Preference saved in localStorage

---

**Complete navigation and structure for a fully functional luxury footwear e-commerce platform**
