export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string; 
  image: string;
  description: string;
  inStock: boolean;
  discount: number,
  
};

export const products: Product[] = [
  // 💄 Cosmetics
  {
    id: 1,
    name: "Matte Lipstick Set",
    slug: "matte-lipstick-set",
    price: 499,
    discount: 50,
    category: "cosmetics",
    image: "/images/products/lipstick.jpg",
    description: "Long-lasting matte lipstick available in 6 rich shades.",
    inStock: true,
  },
    {
    id: 13,
    name: "Matte Lipstick Set",
    slug: "matte-lipstick-set",
    price: 499,
    discount: 50,
    category: "cosmetics",
    image: "/images/products/lipstick.jpg",
    description: "Long-lasting matte lipstick available in 6 rich shades.",
    inStock: true,
  },
    {
    id: 14,
    name: "Matte Lipstick Set",
    slug: "matte-lipstick-set",
    price: 499,
    discount: 50,
    category: "cosmetics",
    image: "/images/products/lipstick.jpg",
    description: "Long-lasting matte lipstick available in 6 rich shades.",
    inStock: true,
  },
    {
    id: 15,
    name: "Matte Lipstick Set",
    slug: "matte-lipstick-set",
    price: 499,
    discount: 50,
    category: "cosmetics",
    image: "/images/products/lipstick.jpg",
    description: "Long-lasting matte lipstick available in 6 rich shades.",
    inStock: true,
  },
    {
    id: 16,
    name: "Matte Lipstick Set",
    slug: "matte-lipstick-set",
    price: 499,
    discount: 50,
    category: "cosmetics",
    image: "/images/products/lipstick.jpg",
    description: "Long-lasting matte lipstick available in 6 rich shades.",
    inStock: true,
  },
  {
    id: 2,
    name: "Herbal Face Cream",
    slug: "herbal-face-cream",
    discount: 50,
    price: 349,
    category: "cosmetics",
    image: "/images/products/face-cream.jpg",
    description: "Natural moisturizing cream for daily glow.",
    inStock: true,
  },

  // 🕉️ Agarbatti & Dhoop
  {
    id: 3,
    name: "Sandalwood Agarbatti",
    slug: "sandalwood-agarbatti",
    price: 120,
    discount: 50,
    category: "incense",
    image: "/images/products/agarbatti.jpg",
    description: "Premium sandalwood incense sticks for a calm and aromatic atmosphere.",
    inStock: true,
  },
  {
    id: 4,
    name: "Rose Dhoop Cones",
    slug: "rose-dhoop-cones",
    discount: 50,
    price: 99,
    category: "incense",
    image: "/images/products/dhoop.jpg",
    description: "Handmade rose-scented dhoop cones for daily puja and meditation.",
    inStock: true,
  },

  // 💍 Jewelry
  {
    id: 5,
    name: "Gold-Plated Earrings",
    slug: "gold-plated-earrings",
    discount: 50,
    price: 699,
    category: "jewelry",
    image: "/images/products/earrings.jpg",
    description: "Elegant gold-plated earrings perfect for festive wear.",
    inStock: true,
  },
  {
    id: 6,
    name: "Pearl Necklace Set",
    slug: "pearl-necklace-set",
    discount: 50,
    price: 1199,
    category: "jewelry",
    image: "/images/products/necklace.jpg",
    description: "Classic pearl necklace with matching earrings.",
    inStock: false,
  },

  // 👗 Clothing
  {
    id: 7,
    name: "Cotton Kurti",
    slug: "cotton-kurti",
    price: 899,
    discount: 50,
    category: "clothing",
    image: "/images/products/kurti.jpg",
    description: "Comfortable and stylish cotton kurti for everyday wear.",
    inStock: true,
  },
  {
    id: 8,
    name: "Designer Saree",
    slug: "designer-saree",
    price: 2499,
    discount: 50,
    category: "clothing",
    image: "/images/products/saree.jpg",
    description: "Beautiful silk saree with intricate embroidery.",
    inStock: true,
  },

  // 👜 Accessories
  {
    id: 9,
    name: "Handcrafted Jute Bag",
    slug: "handcrafted-jute-bag",
    price: 599,
    discount: 50,
    category: "accessories",
    image: "/images/products/jute-bag.jpg",
    description: "Eco-friendly jute handbag with a stylish modern look.",
    inStock: true,
  },
  {
    id: 10,
    name: "Hair Clip Set",
    slug: "hair-clip-set",
    price: 149,
    discount: 50,
    category: "accessories",
    image: "/images/products/hair-clips.jpg",
    description: "Pack of 6 colorful hair clips perfect for casual styling.",
    inStock: true,
  },

  // 🕯️ Home Fragrance
  {
    id: 11,
    name: "Lavender Scented Candle",
    slug: "lavender-scented-candle",
    price: 299,
    discount: 50,
    category: "home-fragrance",
    image: "/images/products/candle.jpg",
    description: "Relaxing lavender candle for peaceful evenings.",
    inStock: true,
  },
  {
    id: 12,
    name: "Reed Diffuser Set",
    slug: "reed-diffuser-set",
    price: 899,
    discount: 50,
    category: "home-fragrance",
    image: "/images/products/diffuser.jpg",
    description: "Stylish reed diffuser set with jasmine aroma oil.",
    inStock: true,
  },
];
