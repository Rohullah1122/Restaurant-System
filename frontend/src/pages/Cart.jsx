// Cart page: change quantities, choose delivery or pickup, place the order
import { useState } from "react"; // hook for state
import { Link } from "react-router-dom"; // links to other pages

// props: cart, changeQty, removeFromCart, placeOrder (all from App)
function Cart({ cart, changeQty, removeFromCart, placeOrder }) {
  const [type, setType] = useState("Pickup"); // Delivery or Pickup
  const [address, setAddress] = useState(""); // address for delivery
  const [error, setError] = useState(""); // error message
  const [confirmed, setConfirmed] = useState(null); // order after placing it

  // total price of everything in the cart
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  // when the user clicks "Place Order"
  function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    if (type === "Delivery" && address.trim() === "") {
      setError("Please enter your delivery address."); // address is required for delivery
      return; // stop here
    }
    setError(""); // clear old error
    const order = placeOrder(type, address); // save the order in App
    setConfirmed(order); // show the confirmation
  }

  // CONFIRMATION screen after ordering
  if (confirmed) {
    return (
      <div className="page center">
        <h1 className="page-title">ORDER CONFIRMED! 🎉</h1>
        <p>Order number: <b>#{confirmed.id}</b></p>
        <p>Total: <b>${confirmed.total.toFixed(2)}</b> ({confirmed.type})</p>
        <p>Status: <span className="status Pending">{confirmed.status}</span></p>
        <Link to="/orders" className="btn">Track My Order</Link>
      </div>
    );
  }

  // EMPTY cart message
  if (cart.length === 0) {
    return (
      <div className="page center">
        <h1 className="page-title">YOUR CART IS EMPTY</h1>
        <Link to="/menu" className="btn">Go to Menu</Link>
      </div>
    );
  }

  // CART with items
  return (
    <div className="page">
      <h1 className="page-title">YOUR CART</h1>

      {/* list of cart items */}
      <div className="cart-list">
        {cart.map((c) => (
          <div key={c.id} className="cart-item">
            <span className="cart-emoji">{c.emoji}</span>
            <div className="cart-name">
              <b>{c.name}</b>
              <p>${c.price.toFixed(2)} each</p>
            </div>

            {/* quantity buttons */}
            <div className="qty">
              <button onClick={() => changeQty(c.id, -1)}>−</button>
              <span>{c.qty}</span>
              <button onClick={() => changeQty(c.id, 1)}>+</button>
            </div>

            {/* price for this line */}
            <b>${(c.price * c.qty).toFixed(2)}</b>

            {/* remove button */}
            <button className="remove" onClick={() => removeFromCart(c.id)}>✕</button>
          </div>
        ))}
      </div>

      {/* ORDER FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <h2>Total: ${total.toFixed(2)}</h2>

        {/* delivery or pickup choice */}
        <div className="radio-row">
          <label>
            <input type="radio" value="Pickup" checked={type === "Pickup"} onChange={(e) => setType(e.target.value)} />
            Pickup
          </label>
          <label>
            <input type="radio" value="Delivery" checked={type === "Delivery"} onChange={(e) => setType(e.target.value)} />
            Delivery
          </label>
        </div>

        {/* address box only for delivery (conditional rendering) */}
        {type === "Delivery" && (
          <input
            type="text"
            placeholder="Delivery address"
            value={address} // controlled input
            onChange={(e) => setAddress(e.target.value)} // update address
          />
        )}

        {/* error message if there is one */}
        {error && <p className="error">{error}</p>}

        {/* payment is simulated in this project */}
        <p className="note">💳 Payment is simulated (pay on {type === "Delivery" ? "delivery" : "pickup"}).</p>

        <button type="submit" className="btn">Place Order</button>
      </form>
    </div>
  );
}

// share Cart with App.jsx
export default Cart;
