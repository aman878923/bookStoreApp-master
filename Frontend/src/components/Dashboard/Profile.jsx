import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Profile</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image Section */}
        <div className="md:w-1/3">
          <div className="aspect-square w-full max-w-[250px] mx-auto bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <img
              src={user.profileImage || 'https://via.placeholder.com/200'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            Change Photo
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="md:w-2/3 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={user.fullname || ''}
              className="w-full px-4 py-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email || ''}
              className="w-full px-4 py-2 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
              readOnly
            />
          </div>
          <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
