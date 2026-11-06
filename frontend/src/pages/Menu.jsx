import { useState } from "react";
import MenuCard from "../components/MenuCard.jsx";

const categories = ["Starters", "Mains", "Desserts", "Beverages"];

export default function Menu({ menu, addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [diet, setDiet] = useState("All");
  const [maxPrice, setMaxPrice] = useState(25);

  const filtered = menu.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.category === category;
    const matchDiet = diet === "All" || item.dietary.includes(diet);
    const matchPrice = item.price <= maxPrice;
    return matchSearch && matchCategory && matchDiet && matchPrice;
  });

  return (
    <div className="page">
      <h1 className="page-title">OUR MENU</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="All">All Diets</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>

        <label className="price-filter">
          Max price: ${maxPrice}
          <input
            type="range"
            min="3"
            max="25"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      {filtered.length === 0 && <p className="empty">No items match your search 😢</p>}

      {categories.map((cat) => {
        const items = filtered.filter((item) => item.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat}>
            <h2 className="category-title">{cat.toUpperCase()}</h2>
            <div className="grid">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}