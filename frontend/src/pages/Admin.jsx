import { useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const emptyItem = {
  name: "",
  category: "Mains",
  description: "",
  ingredients: "",
  price: "",
  dietary: "",
  emoji: "🍽️",
};

export default function Admin({ user, menu, setMenu, orders, updateOrderStatus, reservations, updateReservation }) {
  const [tab, setTab] = useState("menu");
  const [form, setForm] = useState(emptyItem);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // Restrict access to admins only
  if (!user || user.role !== "admin") {
    return (
      <div className="page center">
        <h1 className="page-title">ADMINS ONLY 🔒</h1>
        <Link to="/login" className="btn">Login as Admin</Link>
      </div>
    );
  }

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update menu item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price) {
      setError("Name, description, and price are required.");
      return;
    }
    if (Number(form.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    const newItem = {
      ...form,
      price: Number(form.price),
      dietary: form.dietary ? form.dietary.split(",").map((d) => d.trim()) : [],
    };

    if (editId) {
      setMenu(menu.map((item) => (item.id === editId ? { ...item, ...newItem } : item)));
    } else {
      setMenu([...menu, { ...newItem, id: Date.now(), available: true }]);
    }

    setForm(emptyItem);
    setEditId(null);
    setError("");
  };

  // Load item data into form for editing
  const startEdit = (item) => {
    setForm({ ...item, dietary: item.dietary.join(", ") });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  // Delete menu item
  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenu(menu.filter((item) => item.id !== id));
    }
  };

  // Toggle item availability
  const toggleAvailable = (id) => {
    setMenu(menu.map((item) => (item.id === id ? { ...item, available: !item.available } : item)));
  };

  // Analytics calculations
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const today = new Date().toLocaleDateString();
  const ordersToday = orders.filter((order) => order.date.startsWith(today)).length;

  const itemCounts = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
    });
  });

  const popularItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCount = popularItems.length ? popularItems[0][1] : 1;

  return (
    <div className="page">
      <h1 className="page-title">ADMIN DASHBOARD</h1>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button className={tab === "menu" ? "active" : ""} onClick={() => setTab("menu")}>Menu</button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders ({orders.length})</button>
        <button className={tab === "reservations" ? "active" : ""} onClick={() => setTab("reservations")}>Reservations ({reservations.length})</button>
        <button className={tab === "analytics" ? "active" : ""} onClick={() => setTab("analytics")}>Analytics</button>
      </div>

      {/* Menu Tab */}
      {tab === "menu" && (
        <div>
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
              {editId && (
                <button type="button" className="btn btn-outline-dark" onClick={() => { setForm(emptyItem); setEditId(null); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item) => (
                  <tr key={item.id}>
                    <td>{item.emoji} {item.name}</td>
                    <td>{item.category}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <button className={item.available ? "pill on" : "pill off"} onClick={() => toggleAvailable(item.id)}>
                        {item.available ? "Yes" : "Sold out"}
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-small" onClick={() => startEdit(item)}>Edit</button>
                      <button className="btn btn-small btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <div>
          {orders.length === 0 && <p className="empty">No orders yet.</p>}
          {orders.map((order) => (
            <div key={order.id} className="order-box">
              <div className="order-top">
                <b>#{order.id} · {order.customer}</b>
                <span>{order.date}</span>
              </div>
              <p>{order.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</p>
              <p><b>${order.total.toFixed(2)}</b> · {order.type} {order.address && `· ${order.address}`}</p>
              
              <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                <option>Pending</option>
                <option>Preparing</option>
                <option>Ready</option>
                <option>Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Reservations Tab */}
      {tab === "reservations" && (
        <div>
          {reservations.length === 0 && <p className="empty">No reservations yet.</p>}
          {reservations.map((res) => (
            <div key={res.id} className="order-box">
              <div className="order-top">
                <b>{res.name} · {res.type} · {res.guests} guests</b>
                <span className={`status ${res.status}`}>{res.status}</span>
              </div>
              <p>📅 {res.date} at {res.time} · 📞 {res.phone}</p>
              {res.notes && <p>📝 {res.notes}</p>}
              
              {res.status === "Pending" && (
                <div className="row">
                  <button className="btn btn-small" onClick={() => updateReservation(res.id, "Approved")}>Approve</button>
                  <button className="btn btn-small btn-danger" onClick={() => updateReservation(res.id, "Cancelled")}>Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {tab === "analytics" && (
        <div>
          <div className="stats">
            <div className="stat"><span>{orders.length}</span>Total Orders</div>
            <div className="stat"><span>{ordersToday}</span>Orders Today</div>
            <div className="stat"><span>${totalSales.toFixed(2)}</span>Total Sales</div>
            <div className="stat"><span>{reservations.length}</span>Reservations</div>
          </div>

          <h2 className="category-title">POPULAR ITEMS</h2>
          {popularItems.length === 0 && <p className="empty">Place some orders to see the chart.</p>}
          {popularItems.map(([name, count]) => (
            <div key={name} className="bar-row">
              <span className="bar-label">{name}</span>
              <div className="bar" style={{ width: `${(count / maxCount) * 100}%` }}>{count}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}