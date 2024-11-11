import React, { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const Latestupdates = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await propertyAPI.getAllProperties();
        
        if (response.success) {
          const latestProperties = response.properties
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 8);
          
          setProperties(latestProperties);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-light mb-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Latest Properties
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Discover our newest real estate listings, featuring prime locations and exceptional properties
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Link 
              key={property._id} 
              to={`/property/${property._id}`}
              className="group relative block overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={Array.isArray(property.images) ? property.images[0] : property.images}
                  alt={property.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                <button 
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add wishlist toggle functionality here
                  }}
                >
                  <FaHeart className="h-4 w-4 text-orange-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors duration-300">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <FaMapMarkerAlt className="text-orange-600 h-4 w-4" />
                  <p className="text-sm text-gray-500 truncate">{property.location}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-medium text-orange-600">
                    {property.price.toLocaleString()} dt
                  </p>
                  <span className="text-sm text-gray-500">
                    {property.propertyType}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">No properties available.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/listings"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white text-sm rounded-full 
                     font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Latestupdates;