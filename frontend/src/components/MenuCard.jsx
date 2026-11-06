// One menu item card (used on Home and Menu pages)
// props: item (the food), addToCart (function)
function MenuCard({ item, addToCart }) {
  return (
    <div className={item.available ? "card" : "card sold-out"}>
      {/* big food picture */}
      <div className="card-emoji">{item.emoji}</div>

      {/* name and price */}
      <div className="card-top">
        <h3>{item.name}</h3>
        <span className="price">${item.price.toFixed(2)}</span>
      </div>

      {/* description and ingredients */}
      <p>{item.description}</p>
      <p className="ingredients">
        <b>Ingredients:</b> {item.ingredients}
      </p>

      {/* diet tags, list rendering */}
      <div className="tags">
        {item.dietary.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* button only works if the item is available (conditional rendering) */}
      {item.available ? (
        <button className="btn" onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      ) : (
        <button className="btn" disabled>
          Sold Out
        </button>
      )}
    </div>
  );
}

// share MenuCard with other files
export default MenuCard;
