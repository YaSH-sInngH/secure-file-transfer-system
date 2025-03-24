import FileUpload from "../components/FileUpload";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between bg-blue-600 p-4 text-white">
        <h1 className="text-xl font-bold">Secure File Transfer</h1>
        <div>
          <span className="mr-4">{user?.name}</span>
          <button className="bg-red-500 px-4 py-2 rounded" onClick={() => { logout(); navigate("/"); }}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
        <FileUpload />
      </div>
    </div>
  );
};

export default Dashboard;
