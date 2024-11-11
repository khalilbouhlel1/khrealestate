import { useState, useEffect, useRef } from 'react';
import { Tab } from '@headlessui/react';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import { authAPI, propertyAPI } from '../services/api';
import ProfileSettings from '../components/ProfileSettings';
import AddProperty from '../components/AddProperty';
import UserProperties from '../components/UserProperties';
import { useNavigate } from 'react-router-dom';
import Wishlist from '../components/Wishlist';
const Profile = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  const [imagePreview, setImagePreview] = useState(currentUser?.avatar || null);
  const fileInputRef = useRef(null);
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    latitude: '',
    longitude: '',
    propertyType: 'HOUSE',
    transactionType: 'FOR_SALE',
    bedrooms: '0',
    bathrooms: '0',
    size: '',
    furnished: false,
    yearBuilt: '',
    amenities: [],
    images: []
  });
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({...prev, avatar: file}));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authAPI.logout();
      setCurrentUser(null);
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach(key => {
        if (profileData[key]) {
          formData.append(key, profileData[key]);
        }
      });
      
      const response = await authAPI.updateProfile(formData);
      setCurrentUser(response.user);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
            formData.append('images', image);
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

      const response = await propertyAPI.createProperty(formData);
      console.log('Property created:', response);
      toast.success('Property added successfully');
      
      // Reset form
      setPropertyData({
        title: '',
        description: '',
        price: '',
        location: '',
        latitude: '',
        longitude: '',
        propertyType: 'HOUSE',
        transactionType: 'FOR_SALE',
        bedrooms: '0',
        bathrooms: '0',
        size: '',
        furnished: false,
        yearBuilt: '',
        amenities: [],
        images: []
      });
    } catch (error) {
      console.error('Add property error:', error);
      toast.error(error.response?.data?.message || error.message || 'Error adding property');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow mb-8">
            {['Profile Settings', 'Add Property', 'My Properties','Wishlist'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                   ${selected 
                     ? 'bg-orange-500 text-white shadow'
                     : 'text-gray-700 hover:bg-gray-100'
                   }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="bg-white rounded-xl p-6 shadow">
              <ProfileSettings
                profileData={profileData}
                setProfileData={setProfileData}
                handleSubmit={handleSubmit}
                fileInputRef={fileInputRef}
                imagePreview={imagePreview}
                currentUser={currentUser}
                isLoading={isLoading}
                handleFileChange={handleFileChange}
              />
              <div className="flex justify-center mt-4">
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`w-full px-4 py-2 rounded-md transition-colors
                    ${isLoggingOut 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-red-500 hover:bg-red-600'} 
                    text-white font-medium flex items-center justify-center gap-2`}
                >
                  {isLoggingOut ? (
                    <>
                      <span className="animate-spin">↻</span>
                      Logging out...
                    </>
                  ) : (
                    'Logout'
                  )}
                </button>
              </div>
            </Tab.Panel>
            <Tab.Panel className="bg-white rounded-xl p-6 shadow">
              <AddProperty
                propertyData={propertyData}
                setPropertyData={setPropertyData}
                handleSubmit={handleAddProperty}
                isLoading={isLoading}
              />
            </Tab.Panel>
            <Tab.Panel>
              <UserProperties />
            </Tab.Panel>
            <Tab.Panel>
              <Wishlist />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Profile;