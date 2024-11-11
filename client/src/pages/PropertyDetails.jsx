import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaEnvelope, FaBed, FaBath, FaRuler, FaCheck, FaCalendar, FaHome } from 'react-icons/fa';
import { propertyAPI } from '../services/api';
import { toast } from 'react-toastify';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await propertyAPI.getPropertyById(id);
      setProperty(response.property);
    } catch (error) {
      toast.error('Error fetching property details');
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    try {
      await propertyAPI.toggleWishlist(id);
      toast.success('Wishlist updated successfully');
    } catch (error) {
      toast.error('Error updating wishlist');
    }
  };

  const handleShowInterest = async () => {
    try {
      await propertyAPI.showInterest(id);
      toast.success('Interest shown successfully');
    } catch (error) {
      toast.error('Error showing interest');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-60 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-xl text-orange-600 font-semibold mb-2">
                {property.price.toLocaleString()} dt
                {property.transactionType === 'FOR_RENT' && '/month'}
              </p>
              <p className="text-gray-600 text-lg">{property.location}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleWishlist}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              >
                <FaHeart />
                Add to Wishlist
              </button>
              <button
                onClick={handleShowInterest}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                <FaEnvelope />
                Contact Owner
              </button>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <FaBed className="text-orange-500 text-xl" />
              <span className="text-gray-700">{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBath className="text-orange-500 text-xl" />
              <span className="text-gray-700">{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRuler className="text-orange-500 text-xl" />
              <span className="text-gray-700">{property.size} m²</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHome className="text-orange-500 text-xl" />
              <span className="text-gray-700">{property.propertyType}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <FaCalendar className="text-orange-500" />
                  <span className="text-gray-700">Year Built: {property.yearBuilt}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaHome className="text-orange-500" />
                  <span className="text-gray-700">Type: {property.propertyType}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheck className="text-orange-500" />
                  <span className="text-gray-700">Furnished: {property.furnished ? 'Yes' : 'No'}</span>
                </li>
              </ul>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck className="text-orange-500" />
                    <span className="text-gray-700 capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;