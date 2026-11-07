// App.jsx: holds all the data and decides which page to show
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import Reservation from "./pages/Reservation.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";

import menuData from "./data/menuData.js";
import userData from "./data/users.js";

// Get saved data from the browser, or use the default
function load(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

function App() {
  // --- Data ---
  const [menu, setMenu] = useState(() => load("menu", menuData));
  const [cart, setCart] = useState(() => load("cart", []));
  const [orders, setOrders] = useState(() => load("orders", []));
  const [reservations, setReservations] = useState(() => load("reservations", []));
  const [accounts, setAccounts] = useState(() => load("accounts", userData));
  const [user, setUser] = useState(() => load("user", null)); // null = not logged in

  // Save to the browser whenever something changes
  useEffect(() => localStorage.setItem("menu", JSON.stringify(menu)), [menu]);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("reservations", JSON.stringify(reservations)), [reservations]);
  useEffect(() => localStorage.setItem("accounts", JSON.stringify(accounts)), [accounts]);
  useEffect(() => localStorage.setItem("user", JSON.stringify(user)), [user]);

  // --- Cart ---
  function addToCart(item) {
    const inCart = cart.find((c) => c.id === item.id);

    if (inCart) {
      // already there: add one more
      setCart(cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }

  // amount is +1 or -1; items that reach 0 are removed
  function changeQty(id, amount) {
    const updated = cart.map((c) => (c.id === id ? { ...c, qty: c.qty + amount } : c));
    setCart(updated.filter((c) => c.qty > 0));
  }

  function removeFromCart(id) {
    setCart(cart.filter((c) => c.id !== id));
  }

  // --- Orders ---
  function placeOrder(type, address) {
    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      type, // "Delivery" or "Pickup"
      address,
      status: "Pending",
      date: new Date().toLocaleString(),
      customer: user ? user.email : "guest",
    };

    setOrders([newOrder, ...orders]); // newest first
    setCart([]);
    return newOrder;
  }

  function updateOrderStatus(id, status) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  // --- Reservations ---
  function addReservation(booking) {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: "Pending", // admin approves it later
      customer: user ? user.email : "guest",
    };

    setReservations([newBooking, ...reservations]);
  }

  function updateReservation(id, status) {
    setReservations(reservations.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  // --- Login ---
  function login(email, password) {
    const found = accounts.find((a) => a.email === email && a.password === password);
    if (found) setUser(found);
    return found; // undefined if wrong email or password
  }

  function register(name, email, password) {
    if (accounts.find((a) => a.email === email)) return false; // email already used

    const newUser = { name, email, password, role: "customer" };
    setAccounts([...accounts, newUser]);
    setUser(newUser);
    return true;
  }

  function logout() {
    setUser(null);
  }

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  // --- Pages ---
  return (
    <div className="app">
      <Navbar user={user} cartCount={cartCount} logout={logout} />

      <main>
        <Routes>
          <Route path="/" element={<Home menu={menu} addToCart={addToCart} />} />
          <Route path="/menu" element={<Menu menu={menu} addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQty={changeQty}
                removeFromCart={removeFromCart}
                placeOrder={placeOrder}
              />
            }
          />
          <Route path="/orders" element={<Orders orders={orders} user={user} />} />
          <Route
            path="/reserve"
            element={
              <Reservation
                reservations={reservations}
                addReservation={addReservation}
                updateReservation={updateReservation}
                user={user}
              />
            }
          />
          <Route path="/login" element={<Login login={login} register={register} />} />
          <Route
            path="/admin"
            element={
              <Admin
                user={user}
                menu={menu}
                setMenu={setMenu}
                orders={orders}
                updateOrderStatus={updateOrderStatus}
                reservations={reservations}
                updateReservation={updateReservation}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ChatBot orders={orders} user={user} />
    </div>
  );
}

export default App;