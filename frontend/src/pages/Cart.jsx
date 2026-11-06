import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, changeQty, removeFromCart, placeOrder }) {
  const [type, setType] = useState("Pickup");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "Delivery" && !address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }
    setError("");
    const order = placeOrder(type, address);
    setConfirmed(order);
  };

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

  if (cart.length === 0) {
    return (
      <div className="page center">
        <h1 className="page-title">YOUR CART IS EMPTY</h1>
        <Link to="/menu" className="btn">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">YOUR CART</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="cart-emoji">{item.emoji}</span>
            <div className="cart-name">
              <b>{item.name}</b>
              <p>${item.price.toFixed(2)} each</p>
            </div>

            <div className="qty">
              <button onClick={() => changeQty(item.id, -1)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => changeQty(item.id, 1)}>+</button>
            </div>

            <b>${(item.price * item.qty).toFixed(2)}</b>

            <button className="remove" onClick={() => removeFromCart(item.id)}>✕</button>
          </div>
        ))}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <h2>Total: ${total.toFixed(2)}</h2>

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

        {type === "Delivery" && (
          <input
            type="text"
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        )}

        {error && <p className="error">{error}</p>}

        <p className="note">💳 Payment is simulated (pay on {type === "Delivery" ? "delivery" : "pickup"}).</p>

        <button type="submit" className="btn">Place Order</button>
      </form>
    </div>
  );
}