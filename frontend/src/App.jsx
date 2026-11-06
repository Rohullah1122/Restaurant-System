// Main component: keeps all the data (state) and shows the pages (routes)
import { useState, useEffect } from "react"; // React hooks
import { Routes, Route } from "react-router-dom"; // for pages
import Navbar from "./components/Navbar.jsx"; // top menu
import Footer from "./components/Footer.jsx"; // bottom info
import ChatBot from "./components/ChatBot.jsx"; // AI chat box
import Home from "./pages/Home.jsx"; // home page
import Menu from "./pages/Menu.jsx"; // menu page
import Cart from "./pages/Cart.jsx"; // cart page
import Orders from "./pages/Orders.jsx"; // my orders page
import Reservation from "./pages/Reservation.jsx"; // booking page
import Login from "./pages/Login.jsx"; // login / register page
import Admin from "./pages/Admin.jsx"; // admin dashboard
import NotFound from "./pages/NotFound.jsx"; // wrong address page
import menuData from "./data/menuData.js"; // starting menu
import userData from "./data/users.js"; // starting accounts

// read saved data from the browser, or use the default value
function load(key, defaultValue) {
  const saved = localStorage.getItem(key); // get saved text
  return saved ? JSON.parse(saved) : defaultValue; // turn text back into data
}

function App() {
  // ---------- STATE (data that can change) ----------
  const [menu, setMenu] = useState(() => load("menu", menuData)); // all menu items
  const [cart, setCart] = useState(() => load("cart", [])); // items in the cart
  const [orders, setOrders] = useState(() => load("orders", [])); // placed orders
  const [reservations, setReservations] = useState(() => load("reservations", [])); // bookings
  const [accounts, setAccounts] = useState(() => load("accounts", userData)); // all users
  const [user, setUser] = useState(() => load("user", null)); // logged in user (null = guest)

  // ---------- SAVE to the browser every time data changes ----------
  useEffect(() => localStorage.setItem("menu", JSON.stringify(menu)), [menu]); // save menu
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]); // save cart
  useEffect(() => localStorage.setItem("orders", JSON.stringify(orders)), [orders]); // save orders
  useEffect(() => localStorage.setItem("reservations", JSON.stringify(reservations)), [reservations]); // save bookings
  useEffect(() => localStorage.setItem("accounts", JSON.stringify(accounts)), [accounts]); // save users
  useEffect(() => localStorage.setItem("user", JSON.stringify(user)), [user]); // save login

  // ---------- CART FUNCTIONS ----------
  // add one item to the cart
  function addToCart(item) {
    const found = cart.find((c) => c.id === item.id); // is it already in the cart?
    if (found) {
      // yes: add 1 to its quantity
      setCart(cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      // no: put it in the cart with quantity 1
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }

  // change quantity by +1 or -1
  function changeQty(id, amount) {
    const updated = cart.map((c) => (c.id === id ? { ...c, qty: c.qty + amount } : c)); // new quantity
    setCart(updated.filter((c) => c.qty > 0)); // remove item if quantity is 0
  }

  // remove an item from the cart
  function removeFromCart(id) {
    setCart(cart.filter((c) => c.id !== id)); // keep all items except this one
  }

  // ---------- ORDER FUNCTIONS ----------
  // turn the cart into an order
  function placeOrder(type, address) {
    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0); // add up prices
    const newOrder = {
      id: Date.now(), // simple unique id
      items: cart, // what was ordered
      total: total, // total price
      type: type, // "Delivery" or "Pickup"
      address: address, // only for delivery
      status: "Pending", // first status
      date: new Date().toLocaleString(), // when it was ordered
      customer: user ? user.email : "guest", // who ordered
    };
    setOrders([newOrder, ...orders]); // add new order at the top
    setCart([]); // empty the cart
    return newOrder; // give the order back to show a confirmation
  }

  // admin changes an order status
  function updateOrderStatus(id, status) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: status } : o))); // change only this order
  }

  // ---------- RESERVATION FUNCTIONS ----------
  // add a new booking
  function addReservation(booking) {
    const newBooking = {
      ...booking, // form data (name, date, time...)
      id: Date.now(), // simple unique id
      status: "Pending", // admin approves later
      customer: user ? user.email : "guest", // who booked
    };
    setReservations([newBooking, ...reservations]); // add at the top
  }

  // change a booking status (Approved / Cancelled)
  function updateReservation(id, status) {
    setReservations(reservations.map((r) => (r.id === id ? { ...r, status: status } : r))); // change only this one
  }

  // ---------- LOGIN FUNCTIONS ----------
  // check email and password
  function login(email, password) {
    const found = accounts.find((a) => a.email === email && a.password === password); // find matching account
    if (found) setUser(found); // log in
    return found; // tell the page if it worked
  }

  // create a new customer account
  function register(name, email, password) {
    const exists = accounts.find((a) => a.email === email); // email already used?
    if (exists) return false; // stop if used
    const newUser = { name, email, password, role: "customer" }; // new customer
    setAccounts([...accounts, newUser]); // save the account
    setUser(newUser); // log them in
    return true; // it worked
  }

  // log out
  function logout() {
    setUser(null); // back to guest
  }

  // number of items in the cart (shown on the navbar)
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  // ---------- WHAT WE SHOW ----------
  return (
    <div className="app">
      {/* top menu on every page */}
      <Navbar user={user} cartCount={cartCount} logout={logout} />

      {/* the page changes based on the address */}
      <main>
        <Routes>
          <Route path="/" element={<Home menu={menu} addToCart={addToCart} />} />
          <Route path="/menu" element={<Menu menu={menu} addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} changeQty={changeQty} removeFromCart={removeFromCart} placeOrder={placeOrder} />}
          />
          <Route path="/orders" element={<Orders orders={orders} user={user} />} />
          <Route
            path="/reserve"
            element={<Reservation reservations={reservations} addReservation={addReservation} updateReservation={updateReservation} user={user} />}
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
          {/* any other address shows "page not found" */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* bottom info on every page */}
      <Footer />

      {/* AI chat button on every page */}
      <ChatBot orders={orders} user={user} />
    </div>
  );
}

// share App with main.jsx
export default App;
