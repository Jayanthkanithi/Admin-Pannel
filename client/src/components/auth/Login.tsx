// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// function Login({ setAuth, notify }) {
//   const [formData, setFormData] = useState({
//     user_email: "",
//     user_password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       // Send request to the backend with the FULL URL
//       const response = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         const errMsg = await response.text();
//         throw new Error(errMsg || "Login failed");
//       }
//       const data = await response.json();
//       // Store the token with consistent key
//       localStorage.setItem("jwt_token", data.token);
//       setAuth(true);
//       notify("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message || "Login failed");
//       notify("Login failed", "error");
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//       <h2 className="text-center mb-4">Login</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={onSubmit}>
//         <input
//           type="email"
//           name="user_email"
//           placeholder="Email"
//           value={formData.user_email}
//           onChange={onChange}
//           className="form-control mb-3"
//           required
//         />
//         <input
//           type="password"
//           name="user_password"
//           placeholder="Password"
//           value={formData.user_password}
//           onChange={onChange}
//           className="form-control mb-3"
//           required
//         />
//         <button type="submit" className="btn btn-primary w-100">
//           Login
//         </button>
//       </form>
//       <div className="mt-3 text-center">
//         <p>
//           Don't have an account? <Link to="/register">Register here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setAuth, notify }) {
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Login failed");
      }

      const data = await response.json();

      if (!data.token) throw new Error("Token missing in response");

      // ✅ Save token and update auth
      localStorage.setItem("jwt_token", data.token);
      setAuth(true);
      notify("Login successful!");

      // ✅ Navigate after a tiny delay to ensure state sync
      setTimeout(() => navigate("/agencies", { replace: true }), 200);
    } catch (err) {
      setError(err.message || "Login failed");
      notify("Login failed", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={formData.user_email}
          onChange={onChange}
          className="form-control mb-3"
          required
        />
        <input
          type="password"
          name="user_password"
          placeholder="Password"
          value={formData.user_password}
          onChange={onChange}
          className="form-control mb-3"
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
