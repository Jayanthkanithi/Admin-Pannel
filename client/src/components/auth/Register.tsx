import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register({ setAuth, notify }) {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      localStorage.setItem("jwt_token", data.token);
      setAuth(true);
      notify("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
      notify("Registration failed", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <input
          name="user_name"
          placeholder="Name"
          value={formData.user_name}
          onChange={onChange}
          className="form-control mb-3"
          required
        />
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
          Register
        </button>
      </form>
      <div className="mt-3 text-center">
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
