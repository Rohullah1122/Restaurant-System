// Food emojis that float up the screen like bubbles (our "flying pigs")
const foods = ["🍕", "🍔", "🧁", "🥤", "🍝", "🍩", "🌮", "🍟", "🍰", "🍗", "🥗", "🍦"]; // food pictures

function FloatingFood() {
  return (
    <div className="floating-food">
      {/* make one floating item for each food, list rendering with map */}
      {foods.map((food, index) => (
        <span
          key={index} // React needs a unique key in lists
          className="food" // CSS animation is in index.css
          style={{
            left: (index * 8.3) % 100 + "%", // spread across the screen
            animationDuration: 9 + (index % 5) * 2 + "s", // different speeds
            animationDelay: index * 0.8 + "s", // start at different times
            fontSize: 30 + (index % 4) * 12 + "px", // different sizes
          }}
        >
          {food}
        </span>
      ))}
    </div>
  );
}

// share FloatingFood with other files
export default FloatingFood;
