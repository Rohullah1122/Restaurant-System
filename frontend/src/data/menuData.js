// Starting menu items (fake data for Assignment 1, no backend yet)
const menuData = [
  // ---------- STARTERS ----------
  {
    id: 1, // unique number for each item
    name: "Garden Salad", // item name
    category: "Starters", // menu section
    description: "Fresh greens with cherry tomatoes and lemon dressing.", // short info
    ingredients: "Lettuce, tomato, cucumber, carrot, lemon dressing", // what is inside
    price: 8.99, // price in dollars
    dietary: ["Vegetarian", "Gluten-Free"], // diet tags
    emoji: "🥗", // picture for the card
    available: true, // admin can turn this off
  },
  {
    id: 2,
    name: "Garlic Bread",
    category: "Starters",
    description: "Toasted bread with garlic butter and herbs.",
    ingredients: "Bread, butter, garlic, parsley",
    price: 6.49,
    dietary: ["Vegetarian"],
    emoji: "🥖",
    available: true,
  },
  {
    id: 3,
    name: "Chicken Wings",
    category: "Starters",
    description: "Crispy wings tossed in spicy red sauce.",
    ingredients: "Chicken wings, chili sauce, garlic, honey",
    price: 11.99,
    dietary: ["Gluten-Free"],
    emoji: "🍗",
    available: true,
  },
  // ---------- MAINS ----------
  {
    id: 4,
    name: "Chicken Alfredo",
    category: "Mains",
    description: "Creamy alfredo pasta with grilled chicken. Today's special!",
    ingredients: "Fettuccine, chicken, cream, parmesan, garlic",
    price: 18.99,
    dietary: [],
    emoji: "🍝",
    available: true,
  },
  {
    id: 5,
    name: "Vegetable Pasta",
    category: "Mains",
    description: "Pasta with roasted vegetables in tomato sauce.",
    ingredients: "Pasta, zucchini, peppers, tomato sauce, basil",
    price: 15.99,
    dietary: ["Vegetarian"],
    emoji: "🍲",
    available: true,
  },
  {
    id: 6,
    name: "Margherita Pizza",
    category: "Mains",
    description: "Classic pizza with tomato, mozzarella and basil.",
    ingredients: "Dough, tomato sauce, mozzarella, basil",
    price: 16.49,
    dietary: ["Vegetarian"],
    emoji: "🍕",
    available: true,
  },
  {
    id: 7,
    name: "Hussaini Burger",
    category: "Mains",
    description: "Beef burger with cheese, lettuce and our house sauce.",
    ingredients: "Beef patty, bun, cheddar, lettuce, tomato, house sauce",
    price: 17.99,
    dietary: [],
    emoji: "🍔",
    available: true,
  },
  {
    id: 8,
    name: "Gluten-Free Pasta",
    category: "Mains",
    description: "Gluten-free penne with tomato and basil.",
    ingredients: "Gluten-free penne, tomato sauce, basil, olive oil",
    price: 16.99,
    dietary: ["Vegetarian", "Gluten-Free"],
    emoji: "🍜",
    available: true,
  },
  // ---------- DESSERTS ----------
  {
    id: 9,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    description: "Warm chocolate cake with a melting middle. Our most popular dessert!",
    ingredients: "Chocolate, butter, eggs, sugar, flour",
    price: 9.49,
    dietary: ["Vegetarian"],
    emoji: "🍫",
    available: true,
  },
  {
    id: 10,
    name: "Strawberry Cupcake",
    category: "Desserts",
    description: "Soft cupcake with strawberry cream on top.",
    ingredients: "Flour, sugar, eggs, strawberries, cream",
    price: 5.99,
    dietary: ["Vegetarian"],
    emoji: "🧁",
    available: true,
  },
  {
    id: 11,
    name: "Ice Cream Bowl",
    category: "Desserts",
    description: "Three scoops: vanilla, chocolate and mango.",
    ingredients: "Milk, cream, sugar, mango, cocoa",
    price: 7.49,
    dietary: ["Vegetarian", "Gluten-Free"],
    emoji: "🍨",
    available: true,
  },
  // ---------- BEVERAGES ----------
  {
    id: 12,
    name: "Mango Lassi",
    category: "Beverages",
    description: "Cold mango yogurt drink.",
    ingredients: "Mango, yogurt, milk, sugar",
    price: 5.49,
    dietary: ["Vegetarian", "Gluten-Free"],
    emoji: "🥭",
    available: true,
  },
  {
    id: 13,
    name: "Fresh Lemonade",
    category: "Beverages",
    description: "Homemade lemonade with mint.",
    ingredients: "Lemon, water, sugar, mint",
    price: 4.49,
    dietary: ["Vegetarian", "Gluten-Free"],
    emoji: "🍋",
    available: true,
  },
  {
    id: 14,
    name: "Soft Drink",
    category: "Beverages",
    description: "Cola, orange or lemon-lime.",
    ingredients: "Carbonated water, sugar, flavor",
    price: 2.99,
    dietary: ["Vegetarian", "Gluten-Free"],
    emoji: "🥤",
    available: true,
  },
];

// share the menu with other files
export default menuData;
