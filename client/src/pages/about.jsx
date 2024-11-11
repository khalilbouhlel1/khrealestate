import React from 'react';
import { FaHome, FaHandshake, FaChartLine, FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About KH Real Estate
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Your trusted partner in finding the perfect property in Cambodia. We bring years of experience and dedication to help you make informed real estate decisions.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional real estate services that exceed our clients' expectations, 
                making property transactions seamless and rewarding while contributing to the 
                development of Cambodia's real estate market.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and innovative real estate platform in Cambodia, 
                setting new standards for property transactions and customer service in 
                the region.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHome className="text-2xl text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Extensive Portfolio</h3>
                <p className="text-gray-600">Wide range of properties to suit every need and budget</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHandshake className="text-2xl text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-gray-600">Professional support throughout your property journey</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChartLine className="text-2xl text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Market Insights</h3>
                <p className="text-gray-600">Up-to-date market analysis and property trends</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-2xl text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Customer Focus</h3>
                <p className="text-gray-600">Dedicated to providing exceptional service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              },
              {
                name: "Jane Smith",
                role: "Head of Sales",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              },
              {
                name: "Mike Johnson",
                role: "Senior Property Consultant",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;