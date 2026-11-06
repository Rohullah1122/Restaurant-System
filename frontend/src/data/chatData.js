// Simulated AI dataset (option 2 in the assignment)
// each item has keywords to look for, and the answer to give
const chatData = [
  {
    question: "What are today's specials?", // example question
    keywords: ["special", "today"], // words that match this question
    answer: "Today's special is Chicken Alfredo for $18.99.", // AI reply
  },
  {
    question: "What vegetarian meals do you have?",
    keywords: ["vegetarian", "veggie", "vegan"],
    answer: "We offer Vegetable Pasta, Margherita Pizza, and Garden Salad.",
  },
  {
    question: "What do you recommend?",
    keywords: ["recommend", "suggest", "best"],
    answer: "Based on popular orders, we recommend our Chicken Alfredo.",
  },
  {
    question: "Do you have gluten-free options?",
    keywords: ["gluten"],
    answer: "Yes. We offer gluten-free pasta and selected salads.",
  },
  {
    question: "What is the most popular dessert?",
    keywords: ["dessert", "sweet", "cake"],
    answer: "Our Chocolate Lava Cake is our most popular dessert.",
  },
  {
    question: "What did I order last time?",
    keywords: ["last time", "last order", "previous", "ordered"],
    answer: "Your previous order was Chicken Alfredo and Chocolate Lava Cake.",
  },
];

// share the dataset with other files
export default chatData;
