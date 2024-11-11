const AddProperty = ({
    propertyData,
    setPropertyData,
    handleSubmit,
    isLoading
  }) => {
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setPropertyData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    };
  
    const handleAmenityChange = (amenity) => {
      setPropertyData(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    };
  
    const handleNumberInput = (e, field) => {
      const value = e.target.value === '' ? '0' : e.target.value;
      setPropertyData({...propertyData, [field]: value});
    };
  
    const validateForm = (e) => {
      e.preventDefault();
      if (!propertyData.title || !propertyData.price || !propertyData.location) {
        toast.error('Please fill in all required fields');
        return;
      }
      handleSubmit(e);
    };
  
    return (
      <form onSubmit={validateForm} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={propertyData.title}
              onChange={(e) => setPropertyData({...propertyData, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={propertyData.price}
              onChange={(e) => handleNumberInput(e, 'price')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={propertyData.description}
              onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={propertyData.location}
              onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          {/* Latitude and Longitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              step="any"
              value={propertyData.latitude}
              onChange={(e) => setPropertyData({...propertyData, latitude: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              step="any"
              value={propertyData.longitude}
              onChange={(e) => setPropertyData({...propertyData, longitude: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <select
              value={propertyData.propertyType}
              onChange={(e) => setPropertyData({...propertyData, propertyType: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            >
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="LAND">Land</option>
            </select>
          </div>
  
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
            <select
              value={propertyData.transactionType}
              onChange={(e) => setPropertyData({...propertyData, transactionType: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            >
              <option value="FOR_SALE">For Sale</option>
              <option value="FOR_RENT">For Rent</option>
            </select>
          </div>
  
          {/* Bedrooms and Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
            <input
              type="number"
              min="0"
              value={propertyData.bedrooms}
              onChange={(e) => handleNumberInput(e, 'bedrooms')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
            <input
              type="number"
              min="0"
              value={propertyData.bathrooms}
              onChange={(e) => handleNumberInput(e, 'bathrooms')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Size (sq ft)</label>
            <input
              type="number"
              min="0"
              value={propertyData.size}
              onChange={(e) => handleNumberInput(e, 'size')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
  
          {/* Year Built */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year Built</label>
            <input
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              value={propertyData.yearBuilt}
              onChange={(e) => handleNumberInput(e, 'yearBuilt')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
  
          {/* Furnished */}
          <div className="md:col-span-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={propertyData.furnished}
                onChange={(e) => setPropertyData({...propertyData, furnished: e.target.checked})}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-700">Furnished</span>
            </label>
          </div>
  
          {/* Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full"
            />
          </div>
  
          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Amenities</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {['Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Elevator', 'Balcony', 'Storage'].map(amenity => (
                <label key={amenity} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={propertyData.amenities.includes(amenity.toLowerCase())}
                    onChange={() => handleAmenityChange(amenity.toLowerCase())}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
  
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-400"
        >
          {isLoading ? 'Adding Property...' : 'Add Property'}
        </button>
      </form>
    );
  };
  
  export default AddProperty;