import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';

const Header = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authAPI.register(formData);
      
      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      setCurrentUser(data.user);
      toast.success('Signup successful!');
      setShowSignUpModal(false);
      setFormData({ username: '', email: '', password: '' }); // Reset form
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await authAPI.login(signInData);
      
      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      setCurrentUser(data.user);
      toast.success('Signed in successfully!');
      setShowSignInModal(false);
      setSignInData({ email: '', password: '' }); // Reset form
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <header className="bg-white shadow-md py-3 px-5">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-slate-700">
          <span className="text-orange-500 font-semibold">KHledia</span>.estate
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-700 hover:text-slate-900">Home</Link>
          <Link to="/listings" className="text-slate-700 hover:text-slate-900">Listings</Link>
          <Link to="/about" className="text-slate-700 hover:text-slate-900">About Us</Link>
          <Link to="/contact" className="text-slate-700 hover:text-slate-900">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-2">
                <span className="text-slate-700">{currentUser.username}</span>
                <img 
                  src={currentUser.avatar || '/default-avatar.png'} 
                  alt="profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowSignInModal(true)}
                className="text-slate-700 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowSignUpModal(true)}
                className="bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <button
                onClick={() => setShowSignInModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            {/* Add your sign in form here */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                type="submit"
                className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Sign Up</h2>
              <button
                onClick={() => setShowSignUpModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            {/* Add your sign up form here */}
            <form  onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button
                type="submit"
                className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;