import { FaCamera } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProfileSettings = ({
  profileData,
  setProfileData,
  handleSubmit,
  fileInputRef,
  imagePreview,
  currentUser = {},
  isLoading,
  handleFileChange
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <img
            src={imagePreview || currentUser?.avatar || '/default-avatar.png'}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div 
            onClick={() => fileInputRef.current.click()}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
          >
            <FaCamera className="text-white text-3xl" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <p className="text-sm text-gray-500">Click to change profile picture</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={profileData.username}
            onChange={(e) => setProfileData({...profileData, username: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={profileData.password}
            onChange={(e) => setProfileData({...profileData, password: e.target.value})}
            placeholder="Leave blank to keep current password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-400"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

ProfileSettings.propTypes = {
  profileData: PropTypes.object.isRequired,
  setProfileData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  imagePreview: PropTypes.string,
  currentUser: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  handleFileChange: PropTypes.func.isRequired
};

export default ProfileSettings; 