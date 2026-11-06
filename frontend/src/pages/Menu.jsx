// Menu page: search, filter and show items by category
import { useState } from "react"; // hook for state
import MenuCard from "../components/MenuCard.jsx"; // food card

const categories = ["Starters", "Mains", "Desserts", "Beverages"]; // menu sections

// props: menu (all items), addToCart (function)
function Menu({ menu, addToCart }) {
  // filter values (controlled inputs)
  const [search, setSearch] = useState(""); // search text
  const [category, setCategory] = useState("All"); // chosen category
  const [diet, setDiet] = useState("All"); // chosen diet
  const [maxPrice, setMaxPrice] = useState(25); // highest price allowed

  // keep only items that match all filters
  const filtered = menu.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()); // name has search text
    const matchCategory = category === "All" || item.category === category; // right category
    const matchDiet = diet === "All" || item.dietary.includes(diet); // right diet
    const matchPrice = item.price <= maxPrice; // cheap enough
    return matchSearch && matchCategory && matchDiet && matchPrice; // must match everything
  });

  return (
    <div className="page">
      <h1 className="page-title">OUR MENU</h1>

      {/* FILTER BAR */}
      <div className="filters">
        {/* search box */}
        <input
          type="text"
          placeholder="Search food..."
          value={search} // controlled input
          onChange={(e) => setSearch(e.target.value)} // update search
        />

        {/* category dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* diet dropdown */}
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="All">All Diets</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>

        {/* price slider */}
        <label className="price-filter">
          Max price: ${maxPrice}
          <input
            type="range"
            min="3"
            max="25"
            value={maxPrice} // controlled input
            onChange={(e) => setMaxPrice(Number(e.target.value))} // update price
          />
        </label>
      </div>

      {/* show a message if nothing matches (conditional rendering) */}
      {filtered.length === 0 && <p className="empty">No items match your search 😢</p>}

      {/* show each category with its items */}
      {categories.map((cat) => {
        const items = filtered.filter((item) => item.category === cat); // items in this category
        if (items.length === 0) return null; // skip empty categories
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

// share Menu with App.jsx
export default Menu;
