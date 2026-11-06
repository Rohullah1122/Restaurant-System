// My Orders page: order history and status
import { Link } from "react-router-dom"; // links to other pages

const steps = ["Pending", "Preparing", "Ready", "Delivered"]; // order status steps

// props: orders (all orders), user (who is logged in)
function Orders({ orders, user }) {
  // show only my orders (guests see guest orders)
  const myOrders = orders.filter((o) => o.customer === (user ? user.email : "guest"));

  // message if there are no orders yet
  if (myOrders.length === 0) {
    return (
      <div className="page center">
        <h1 className="page-title">NO ORDERS YET</h1>
        <Link to="/menu" className="btn">Order Something Tasty</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">MY ORDERS</h1>

      {/* one box per order */}
      {myOrders.map((o) => (
        <div key={o.id} className="order-box">
          <div className="order-top">
            <b>Order #{o.id}</b>
            <span>{o.date}</span>
          </div>

          {/* items in this order */}
          <p>{o.items.map((i) => i.qty + "× " + i.name).join(", ")}</p>
          <p>
            <b>${o.total.toFixed(2)}</b> · {o.type} {o.address && "· " + o.address}
          </p>

          {/* progress bar for the status */}
          <div className="progress">
            {steps.map((s) => (
              <span key={s} className={steps.indexOf(s) <= steps.indexOf(o.status) ? "step done" : "step"}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// share Orders with App.jsx
export default Orders;
