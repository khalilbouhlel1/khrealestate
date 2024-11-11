import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { propertyAPI } from '../services/api';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await propertyAPI.getWishlist();
      setWishlistItems(response.wishlist);
    } catch (error) {
      toast.error('Error fetching wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (propertyId) => {
    try {
      await propertyAPI.toggleWishlist(propertyId);
      setWishlistItems(wishlistItems.filter(item => item.id !== propertyId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Error removing from wishlist');
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
        <p className="text-gray-500">No properties in your wishlist yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={property.images[0] || '/placeholder-property.jpg'}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
              <p className="text-orange-600 font-semibold mb-2">
                {property.price.toLocaleString()} dt
                {property.transactionType === 'FOR_RENT' && '/month'}
              </p>
              <p className="text-gray-600 mb-4">{property.location}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/property/${property.id}`}
                  className="text-orange-600 hover:text-orange-700"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(property.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;