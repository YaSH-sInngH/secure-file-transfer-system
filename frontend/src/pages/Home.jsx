import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Secure File Transfer System</h1>
      <p className="text-lg text-gray-300 mb-6">Securely upload, share, and manage files with encryption.</p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg">Login</Link>
        <Link to="/register" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg">Register</Link>
      </div>
    </div>
  );
};

export default Home;
