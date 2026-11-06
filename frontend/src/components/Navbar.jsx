import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ user, cartCount, logout }) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={close}>
        HUSSAINI'S
      </Link>

      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>

      <div className={open ? "nav-links open" : "nav-links"}>
        <NavLink to="/menu" onClick={close}>Menu</NavLink>
        <NavLink to="/reserve" onClick={close}>Reserve</NavLink>
        <NavLink to="/orders" onClick={close}>My Orders</NavLink>

        {user && user.role === "admin" && (
          <NavLink to="/admin" onClick={close}>Admin</NavLink>
        )}

        <NavLink to="/cart" onClick={close} className="cart-link">
          Cart 🛒 <span className="badge">{cartCount}</span>
        </NavLink>

        {user ? (
          <button className="link-btn" onClick={() => { logout(); close(); }}>
            Logout ({user.name})
          </button>
        ) : (
          <NavLink to="/login" onClick={close}>Login</NavLink>
        )}
      </div>
    </nav>
  );
}