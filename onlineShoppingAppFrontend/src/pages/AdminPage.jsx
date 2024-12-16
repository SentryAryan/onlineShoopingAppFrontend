import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaUserTag } from 'react-icons/fa';

export default function AdminPage() {
    const loggedInUser = useSelector(state => state.auth.loggedInUser);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-white py-20 px-24 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="w-full max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scaleIn">
                    {/* Profile Header */}
                    <div className="bg-blue-600 px-6 py-8">
                        <div className="flex items-center justify-center">
                            <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <span className="text-6xl text-blue-600">
                                    {loggedInUser.name[0].toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-white text-center flex justify-center items-center mt-4 text-3xl font-bold">
                            {loggedInUser.name}
                        </h1>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 py-8">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4 hover:shadow-md transform hover:scale-[1.02] transition-all duration-300">
                                <FaUser className="text-2xl text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {loggedInUser.name}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4 hover:shadow-md transform hover:scale-[1.02] transition-all duration-300">
                                <FaEnvelope className="text-2xl text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {loggedInUser.email}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4 hover:shadow-md transform hover:scale-[1.02] transition-all duration-300">
                                <FaUserTag className="text-2xl text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <p className="text-lg font-semibold text-gray-800 capitalize">
                                        {loggedInUser.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold 
                            hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98] 
                            transition-all duration-300">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
