import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { propertyAPI } from '../services/api';
import { toast } from 'react-toastify';

const UserProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProperties();
  }, []);

  const fetchUserProperties = async () => {
    try {
      const response = await propertyAPI.getUserProperties();
      setProperties(response.properties);
    } catch (error) {
      toast.error('Error fetching your properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyAPI.deleteProperty(id);
        setProperties(properties.filter(p => p.id !== id));
        toast.success('Property deleted successfully');
      } catch (error) {
        toast.error('Error deleting property');
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">My Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={property.images[0] || '/placeholder-property.jpg'}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
              <p className="text-gray-600 mb-2">{property.location}</p>
              <p className="text-orange-600 font-semibold mb-4">
                ${property.price.toLocaleString()}
              </p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  property.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                  property.status === 'SOLD' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status}
                </span>
                <div className="flex gap-2">
                  <Link
                    to={`/edit-property/${property.id}`}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProperties; 