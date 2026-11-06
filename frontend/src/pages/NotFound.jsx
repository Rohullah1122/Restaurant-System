// Page shown when the address does not exist
import { Link } from "react-router-dom"; // link back home

function NotFound() {
  return (
    <div className="page center">
      <h1 className="page-title">404 · PAGE NOT FOUND 🍕</h1>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  );
}

// share NotFound with App.jsx
export default NotFound;
