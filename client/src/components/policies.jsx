import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserLock, FaHandshake, FaFileContract } from 'react-icons/fa';

const Policies = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Policies</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to transparency and protecting your rights. Please read our policies carefully.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: FaShieldAlt, title: 'Terms of Service', href: '#terms' },
            { icon: FaUserLock, title: 'Privacy Policy', href: '#privacy' },
            { icon: FaHandshake, title: 'User Agreement', href: '#agreement' },
            { icon: FaFileContract, title: 'Listing Policy', href: '#listing' }
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <item.icon className="text-orange-500 text-3xl mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
            </a>
          ))}
        </div>

        {/* Terms of Service */}
        <section id="terms" className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
          <div className="prose max-w-none text-gray-600">
            <h3 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h3>
            <p className="mb-4">
              By accessing and using KHledia Estate, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h3 className="text-xl font-semibold mb-4">2. User Responsibilities</h3>
            <p className="mb-4">
              Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.
            </p>

            <h3 className="text-xl font-semibold mb-4">3. Property Listings</h3>
            <p className="mb-4">
              All property listings must be accurate and comply with local real estate laws and regulations.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy" className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
          <div className="prose max-w-none text-gray-600">
            <h3 className="text-xl font-semibold mb-4">1. Information Collection</h3>
            <p className="mb-4">
              We collect information that you provide directly to us, including but not limited to your name, email address, and property details.
            </p>

            <h3 className="text-xl font-semibold mb-4">2. Use of Information</h3>
            <p className="mb-4">
              We use collected information to provide and improve our services, communicate with you, and ensure platform security.
            </p>

            <h3 className="text-xl font-semibold mb-4">3. Data Protection</h3>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access or disclosure.
            </p>
          </div>
        </section>

        {/* User Agreement */}
        <section id="agreement" className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">User Agreement</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              This User Agreement outlines the terms between you and KHledia Estate regarding the use of our platform and services.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Users must be at least 18 years old</li>
              <li>Users must provide accurate information</li>
              <li>Users must not engage in fraudulent activities</li>
              <li>Users must respect intellectual property rights</li>
            </ul>
          </div>
        </section>

        {/* Listing Policy */}
        <section id="listing" className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Listing Policy</h2>
          <div className="prose max-w-none text-gray-600">
            <h3 className="text-xl font-semibold mb-4">Property Listing Guidelines</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>All listings must be for real properties</li>
              <li>Images must be actual photos of the property</li>
              <li>Pricing must be accurate and current</li>
              <li>Property details must be truthful and complete</li>
            </ul>
          </div>
        </section>

        {/* Contact Information */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Have questions about our policies? {' '}
            <Link to="/contact" className="text-orange-500 hover:text-orange-600">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policies;