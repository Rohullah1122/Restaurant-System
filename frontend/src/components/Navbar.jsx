// Top menu bar shown on every page
import { useState } from "react"; // hook for the phone menu
import { NavLink, Link } from "react-router-dom"; // links between pages

// props: user (who is logged in), cartCount (items in cart), logout (function)
function Navbar({ user, cartCount, logout }) {
  const [open, setOpen] = useState(false); // is the phone menu open?

  // close the phone menu after clicking a link
  function close() {
    setOpen(false); // hide menu
  }

  return (
    <nav className="navbar">
      {/* logo goes back to home */}
      <Link to="/" className="logo" onClick={close}>
        HUSSAINI'S
      </Link>

      {/* ☰ button only shows on small screens */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>

      {/* links (add "open" class on phones when menu is open) */}
      <div className={open ? "nav-links open" : "nav-links"}>
        <NavLink to="/menu" onClick={close}>Menu</NavLink>
        <NavLink to="/reserve" onClick={close}>Reserve</NavLink>
        <NavLink to="/orders" onClick={close}>My Orders</NavLink>

        {/* only admins see the Admin link */}
        {user && user.role === "admin" && (
          <NavLink to="/admin" onClick={close}>Admin</NavLink>
        )}

        {/* cart link with the number of items */}
        <NavLink to="/cart" onClick={close} className="cart-link">
          Cart 🛒 <span className="badge">{cartCount}</span>
        </NavLink>

        {/* show Logout if logged in, otherwise Login */}
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

// share Navbar with App.jsx
export default Navbar;
