// Admin dashboard: manage menu, orders, reservations, and see analytics
import { useState } from "react"; // hook for state
import { Link } from "react-router-dom"; // link to login
import "./Admin.css"; // admin styles

// empty menu form values
const emptyItem = {
  name: "", // item name
  category: "Mains", // section
  description: "", // short info
  ingredients: "", // what is inside
  price: "", // price
  dietary: "", // tags, comma separated (e.g. "Vegetarian, Gluten-Free")
  emoji: "🍽️", // picture
};

// props come from App
function Admin({ user, menu, setMenu, orders, updateOrderStatus, reservations, updateReservation }) {
  const [tab, setTab] = useState("menu"); // which tab is open
  const [form, setForm] = useState(emptyItem); // menu form data
  const [editId, setEditId] = useState(null); // id of item being edited (null = adding new)
  const [error, setError] = useState(""); // form error

  // ---------- PROTECT THE PAGE: only admins can see it ----------
  if (!user || user.role !== "admin") {
    return (
      <div className="page center">
        <h1 className="page-title">ADMINS ONLY 🔒</h1>
        <Link to="/login" className="btn">Login as Admin</Link>
      </div>
    );
  }

  // ---------- MENU: CREATE / UPDATE / DELETE ----------
  // update one form field
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value }); // change only this field
  }

  // save a new item or the edited item
  function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    if (!form.name || !form.description || !form.price) {
      setError("Name, description and price are required."); // missing fields
      return; // stop
    }
    if (Number(form.price) <= 0) {
      setError("Price must be more than 0."); // bad price
      return; // stop
    }
    // turn the form into a menu item
    const item = {
      ...form, // all form fields
      price: Number(form.price), // text to number
      dietary: form.dietary ? form.dietary.split(",").map((d) => d.trim()) : [], // text to list
    };
    if (editId) {
      // UPDATE: replace the old item
      setMenu(menu.map((m) => (m.id === editId ? { ...m, ...item } : m)));
    } else {
      // CREATE: add a new item
      setMenu([...menu, { ...item, id: Date.now(), available: true }]);
    }
    setForm(emptyItem); // clear form
    setEditId(null); // back to "add" mode
    setError(""); // clear error
  }

  // put an item in the form to edit it
  function startEdit(item) {
    setForm({ ...item, dietary: item.dietary.join(", ") }); // fill the form
    setEditId(item.id); // remember which one
    window.scrollTo(0, 0); // scroll up to the form
  }

  // DELETE an item
  function deleteItem(id) {
    if (window.confirm("Delete this item?")) {
      setMenu(menu.filter((m) => m.id !== id)); // keep all others
    }
  }

  // turn available on/off
  function toggleAvailable(id) {
    setMenu(menu.map((m) => (m.id === id ? { ...m, available: !m.available } : m))); // flip true/false
  }

  // ---------- ANALYTICS ----------
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0); // money from all orders
  const today = new Date().toLocaleDateString(); // today's date text
  const ordersToday = orders.filter((o) => o.date.startsWith(today)).length; // orders placed today

  // count how many times each item was ordered
  const counts = {}; // { "Chicken Alfredo": 5, ... }
  orders.forEach((o) => o.items.forEach((i) => (counts[i.name] = (counts[i.name] || 0) + i.qty)));
  const popular = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5); // top 5
  const maxCount = popular.length ? popular[0][1] : 1; // biggest number for the bars

  return (
    <div className="page">
      <h1 className="page-title">ADMIN DASHBOARD</h1>

      {/* TABS */}
      <div className="tabs">
        <button className={tab === "menu" ? "active" : ""} onClick={() => setTab("menu")}>Menu</button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders ({orders.length})</button>
        <button className={tab === "reservations" ? "active" : ""} onClick={() => setTab("reservations")}>Reservations ({reservations.length})</button>
        <button className={tab === "analytics" ? "active" : ""} onClick={() => setTab("analytics")}>Analytics</button>
      </div>

      {/* ---------- MENU TAB ---------- */}
      {tab === "menu" && (
        <div>
          {/* add / edit form */}
          <form className="form" onSubmit={handleSubmit}>
            <h2>{editId ? "Edit Item" : "Add New Item"}</h2>
            <div className="row">
              <input name="name" placeholder="Name *" value={form.name} onChange={handleChange} />
              <input name="emoji" placeholder="Emoji" value={form.emoji} onChange={handleChange} />
            </div>
            <div className="row">
              <select name="category" value={form.category} onChange={handleChange}>
                <option>Starters</option>
                <option>Mains</option>
                <option>Desserts</option>
                <option>Beverages</option>
              </select>
              <input name="price" type="number" step="0.01" placeholder="Price *" value={form.price} onChange={handleChange} />
            </div>
            <input name="description" placeholder="Description *" value={form.description} onChange={handleChange} />
            <input name="ingredients" placeholder="Ingredients" value={form.ingredients} onChange={handleChange} />
            <input name="dietary" placeholder="Diet tags (Vegetarian, Gluten-Free)" value={form.dietary} onChange={handleChange} />
            {error && <p className="error">{error}</p>}
            <div className="row">
              <button type="submit" className="btn">{editId ? "Save Changes" : "Add Item"}</button>
              {/* cancel only while editing */}
              {editId && (
                <button type="button" className="btn btn-outline-dark" onClick={() => { setForm(emptyItem); setEditId(null); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* menu table */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Item</th><th>Category</th><th>Price</th><th>Available</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {menu.map((m) => (
                  <tr key={m.id}>
                    <td>{m.emoji} {m.name}</td>
                    <td>{m.category}</td>
                    <td>${m.price.toFixed(2)}</td>
                    <td>
                      {/* click to switch available / sold out */}
                      <button className={m.available ? "pill on" : "pill off"} onClick={() => toggleAvailable(m.id)}>
                        {m.available ? "Yes" : "Sold out"}
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-small" onClick={() => startEdit(m)}>Edit</button>
                      <button className="btn btn-small btn-danger" onClick={() => deleteItem(m.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- ORDERS TAB ---------- */}
      {tab === "orders" && (
        <div>
          {orders.length === 0 && <p className="empty">No orders yet.</p>}
          {orders.map((o) => (
            <div key={o.id} className="order-box">
              <div className="order-top">
                <b>#{o.id} · {o.customer}</b>
                <span>{o.date}</span>
              </div>
              <p>{o.items.map((i) => i.qty + "× " + i.name).join(", ")}</p>
              <p><b>${o.total.toFixed(2)}</b> · {o.type} {o.address && "· " + o.address}</p>
              {/* admin picks the new status */}
              <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)}>
                <option>Pending</option>
                <option>Preparing</option>
                <option>Ready</option>
                <option>Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* ---------- RESERVATIONS TAB ---------- */}
      {tab === "reservations" && (
        <div>
          {reservations.length === 0 && <p className="empty">No reservations yet.</p>}
          {reservations.map((r) => (
            <div key={r.id} className="order-box">
              <div className="order-top">
                <b>{r.name} · {r.type} · {r.guests} guests</b>
                <span className={"status " + r.status}>{r.status}</span>
              </div>
              <p>📅 {r.date} at {r.time} · 📞 {r.phone}</p>
              {r.notes && <p>📝 {r.notes}</p>}
              {/* approve / cancel buttons only while pending */}
              {r.status === "Pending" && (
                <div className="row">
                  <button className="btn btn-small" onClick={() => updateReservation(r.id, "Approved")}>Approve</button>
                  <button className="btn btn-small btn-danger" onClick={() => updateReservation(r.id, "Cancelled")}>Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------- ANALYTICS TAB ---------- */}
      {tab === "analytics" && (
        <div>
          {/* number boxes */}
          <div className="stats">
            <div className="stat"><span>{orders.length}</span>Total Orders</div>
            <div className="stat"><span>{ordersToday}</span>Orders Today</div>
            <div className="stat"><span>${totalSales.toFixed(2)}</span>Total Sales</div>
            <div className="stat"><span>{reservations.length}</span>Reservations</div>
          </div>

          {/* popular items bar chart */}
          <h2 className="category-title">POPULAR ITEMS</h2>
          {popular.length === 0 && <p className="empty">Place some orders to see the chart.</p>}
          {popular.map(([name, count]) => (
            <div key={name} className="bar-row">
              <span className="bar-label">{name}</span>
              <div className="bar" style={{ width: (count / maxCount) * 100 + "%" }}>{count}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// share Admin with App.jsx
export default Admin;
