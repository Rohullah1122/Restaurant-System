// Login and Register page (one page, two modes)
import { useState } from "react"; // hook for state
import { useNavigate } from "react-router-dom"; // to change page after login

// props: login, register (functions from App)
function Login({ login, register }) {
  const [isLogin, setIsLogin] = useState(true); // true = login form, false = register form
  const [name, setName] = useState(""); // name (register only)
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [error, setError] = useState(""); // error message
  const navigate = useNavigate(); // lets us go to another page

  // when the form is sent
  function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    // check required fields
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields."); // show error
      return; // stop
    }

    if (isLogin) {
      // LOGIN
      const user = login(email, password); // try to log in
      if (!user) {
        setError("Wrong email or password."); // failed
        return; // stop
      }
      navigate(user.role === "admin" ? "/admin" : "/menu"); // admin goes to dashboard
    } else {
      // REGISTER
      if (password.length < 6) {
        setError("Password must be at least 6 characters."); // too short
        return; // stop
      }
      const ok = register(name, email, password); // try to create account
      if (!ok) {
        setError("This email is already registered."); // email used
        return; // stop
      }
      navigate("/menu"); // go to menu
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">{isLogin ? "LOGIN" : "CREATE ACCOUNT"}</h1>

      <form className="form small-form" onSubmit={handleSubmit}>
        {/* name only shows when registering */}
        {!isLogin && <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {/* error message */}
        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">{isLogin ? "Login" : "Register"}</button>

        {/* switch between login and register */}
        <button type="button" className="link-btn dark" onClick={() => { setIsLogin(!isLogin); setError(""); }}>
          {isLogin ? "No account? Register here" : "Have an account? Login here"}
        </button>

        {/* demo accounts for the teacher */}
        <p className="note">Demo admin: admin@hussainis.com / admin123</p>
        <p className="note">Demo customer: ali@gmail.com / ali123</p>
      </form>
    </div>
  );
}

// share Login with App.jsx
export default Login;
