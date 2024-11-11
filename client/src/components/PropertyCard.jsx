import PropTypes from 'prop-types';
import { FaBed, FaBath, FaRuler } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
      <img
        src={property.images[0] || '/placeholder-property.jpg'}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p className="text-orange-600 font-semibold mb-4">
          {property.price.toLocaleString()}dt
        </p>
        <div className="flex justify-between text-gray-500">
          <span className="flex items-center">
            <FaBed className="mr-1" /> {property.bedrooms}
          </span>
          <span className="flex items-center">
            <FaBath className="mr-1" /> {property.bathrooms}
          </span>
          <span className="flex items-center">
            <FaRuler className="mr-1" /> {property.size} m²
          </span>
        </div>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PropertyCard;