
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>
          
          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-3 mt-4 rounded-md hover:bg-primary-dark focus:outline-none"
          >
            Log In
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="w-full btn btn-outline btn-primary">Login with Google</button>
          {/* You can replace Google button with GitHub or both */}
          {/* <button className="w-full btn btn-outline btn-secondary">Login with GitHub</button> */}
        </div>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
