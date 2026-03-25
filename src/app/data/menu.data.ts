import { Product } from '../core/models/product.model';

export const MENU_ITEMS: Product[] = [

  // ── PIZZAS ──────────────────────────────────────────
  {
    id: 1,
    name: 'Stone-Fired Margherita',
    description: 'Classic San Marzano tomato, fresh mozzarella, hand-torn basil',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    category: 'pizza',
    isBestSeller: true,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Inferno BBQ Chicken',
    description: 'Smoky BBQ base, grilled chicken, caramelized onions, jalapeños',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    category: 'pizza',
    isPopular: true,
    badge: 'Spicy 🔥'
  },
  {
    id: 3,
    name: 'Meat Volcano',
    description: 'Beef pepperoni, chicken tikka, beef mince, four cheese blend',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    category: 'pizza',
    badge: 'Loaded'
  },
  {
    id: 4,
    name: 'Garden Stone',
    description: 'Roasted peppers, mushrooms, olives, sun-dried tomatoes, pesto',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80',
    category: 'pizza'
  },

  // ── BURGERS ─────────────────────────────────────────
  {
    id: 5,
    name: 'The Stone Stack',
    description: 'Double smash patty, cheddar, secret sauce, brioche bun',
    price: 799,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    category: 'burger',
    isBestSeller: true,
    badge: 'Best Seller'
  },
  {
    id: 6,
    name: 'Crispy Fire Chicken',
    description: 'Fried chicken thigh, sriracha mayo, coleslaw, pickles',
    price: 699,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
    category: 'burger',
    isPopular: true
  },
  {
    id: 7,
    name: 'Mushroom Meltdown',
    description: 'Beef patty, sautéed mushrooms, Swiss cheese, truffle mayo',
    price: 849,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80',
    category: 'burger'
  },

  // ── SIDES ────────────────────────────────────────────
  {
    id: 8,
    name: 'Volcano Fries',
    description: 'Thick-cut fries, cheese sauce, jalapeños, crispy onions',
    price: 449,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
    category: 'sides',
    isPopular: true,
    badge: 'Fan Fav'
  },
  {
    id: 9,
    name: 'Chicken Wings (6pc)',
    description: 'Tossed in buffalo or honey-garlic glaze, ranch dip',
    price: 649,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80',
    category: 'sides'
  },
  {
    id: 10,
    name: 'Garlic Bread',
    description: 'Stone-baked, herb butter, mozzarella pull',
    price: 349,
    image: 'https://images.unsplash.com/photo-1619531040576-f9416740661e?w=600&q=80',
    category: 'sides'
  },

  // ── DRINKS ───────────────────────────────────────────
  {
    id: 11,
    name: 'Lava Lemonade',
    description: 'Fresh lemon, hint of chili, mint, soda',
    price: 249,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    category: 'drinks'
  },
  {
    id: 12,
    name: 'Cold Brew Float',
    description: 'Cold brew coffee, vanilla ice cream, chocolate drizzle',
    price: 349,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    category: 'drinks',
    isPopular: true
  },

  // ── DEALS ────────────────────────────────────────────
  {
    id: 13,
    name: 'Family Feast',
    description: '2 Large Pizzas + 6 Wings + 2 Garlic Breads + 4 Drinks',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=600&q=80',
    category: 'deals',
    badge: 'Save Rs.800',
    isBestSeller: true
  },
  {
    id: 14,
    name: 'Date Night Duo',
    description: '1 Large Pizza + 2 Burgers + Volcano Fries + 2 Drinks',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    category: 'deals',
    badge: 'Save Rs.400',
    isPopular: true
  },
  {
    id: 15,
    name: 'Solo Saver',
    description: '1 Medium Pizza + Garlic Bread + 1 Drink',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=600&q=80',
    category: 'deals',
    badge: 'Save Rs.200'
  }
];