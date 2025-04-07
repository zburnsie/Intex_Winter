import { Link } from 'react-router-dom';
// import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In to CineNiche</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          {/* Replace with <Button> if using ShadCN */}
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Log In
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
