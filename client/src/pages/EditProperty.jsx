import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { propertyAPI } from '../services/api';
import AddProperty from '../components/AddProperty';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await propertyAPI.getPropertyById(id);
      setPropertyData(response.property);
    } catch (error) {
      toast.error('Error fetching property details');
      navigate('/profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Validate required fields
      if (!propertyData.title || !propertyData.price || !propertyData.location) {
        throw new Error('Please fill in all required fields');
      }

      // Format data before sending
      Object.keys(propertyData).forEach(key => {
        if (key === 'images') {
          propertyData.images.forEach(image => {
            if (image instanceof File) {
              formData.append('images', image);
            }
          });
        } else if (key === 'amenities') {
          formData.append('amenities', JSON.stringify(propertyData.amenities));
        } else if (key === 'price') {
          formData.append('price', parseFloat(propertyData.price));
        } else if (key === 'bedrooms' || key === 'bathrooms') {
          formData.append(key, parseInt(propertyData[key]));
        } else if (key === 'size') {
          formData.append(key, parseFloat(propertyData.size));
        } else {
          formData.append(key, propertyData[key]);
        }
      });

      await propertyAPI.updateProperty(id, formData);
      toast.success('Property updated successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Update property error:', error);
      toast.error(error.response?.data?.message || error.message || 'Error updating property');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!propertyData) return <div>Property not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Edit Property</h2>
      <AddProperty
        propertyData={propertyData}
        setPropertyData={setPropertyData}
        handleSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
};

export default EditProperty; 