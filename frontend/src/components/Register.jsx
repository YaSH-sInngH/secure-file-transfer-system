import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { name, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-2 border rounded" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
          <input className="w-full px-4 py-2 border rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full px-4 py-2 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
