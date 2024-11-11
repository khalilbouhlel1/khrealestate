import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRuler, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
const Listings = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    propertyType: '',
    transactionType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAllProperties({
        ...filters,
        search: searchTerm
      });
      setProperties(response.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const clearFilters = () => {
    setFilters({
      propertyType: '',
      transactionType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: ''
    });
    setSearchTerm('');
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Dream Property
          </h1>
          
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by location or property type..."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-0"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <FaFilter />
                Filters
              </button>
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-slideDown">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={clearFilters} className="text-orange-500 hover:text-orange-600">
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 p-2"
              >
                <option value="">Property Type</option>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="LAND">Land</option>
              </select>

              <select
                name="transactionType"
                value={filters.transactionType}
                onChange={handleFilterChange}
                className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 p-2"
              >
                <option value="">Transaction Type</option>
                <option value="FOR_SALE">For Sale</option>
                <option value="FOR_RENT">For Rent</option>
              </select>

              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 p-2"
              />

              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max Price"
                className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 p-2"
              />

              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 p-2"
              >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Properties
          </h2>
          <p className="text-gray-600">
            {properties.length} properties found
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                onClick={() => handlePropertyClick(property.id)}
                className="transform transition-all duration-300 hover:translate-y-[-5px]"
              >
                <PropertyCard property={property} />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No properties found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-orange-500 hover:text-orange-600"
              >
                Clear filters and try again
              </button>
            </div>

          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Listings;
