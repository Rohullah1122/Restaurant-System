import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ login, register }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (isLogin) {
      const user = login(email, password);
      if (!user) {
        setError("Wrong email or password.");
        return;
      }
      navigate(user.role === "admin" ? "/admin" : "/menu");
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      const ok = register(name, email, password);
      if (!ok) {
        setError("This email is already registered.");
        return;
      }
      navigate("/menu");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">{isLogin ? "LOGIN" : "CREATE ACCOUNT"}</h1>

      <form className="form small-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        )}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">{isLogin ? "Login" : "Register"}</button>

        <button 
          type="button" 
          className="link-btn dark" 
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
        >
          {isLogin ? "No account? Register here" : "Have an account? Login here"}
        </button>

        <p className="note">Demo admin: admin@hussainis.com / admin123</p>
        <p className="note">Demo customer: ali@gmail.com / ali123</p>
      </form>
    </div>
  );
}