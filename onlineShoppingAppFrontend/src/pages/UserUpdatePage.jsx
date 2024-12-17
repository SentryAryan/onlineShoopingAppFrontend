import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setLoading } from '../store/slices/loadingSlice';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../store/slices/authSlice';

function UserUpdatePage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.auth.loggedInUser);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/login');
            return;
        }
        // Pre-fill form with current user data
        setValue('name', loggedInUser.name);
        setValue('email', loggedInUser.email);
        setValue('newPassword', loggedInUser.password);
    }, [loggedInUser, navigate, setValue]);

    const onSubmit = async (data) => {
        try {
            const updateData = {
                name: data.name,
                email: data.email,
                password: data.newPassword,
                role: loggedInUser.role
            };
            dispatch(setLoading(true));
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/users/${loggedInUser.id}`, updateData);
            dispatch(setLoggedInUser(response.data));
            toast.success('Profile updated successfully!');
            if(loggedInUser.role === 'admin'){
                navigate('/admin/adminPage');
            }else{
                navigate('/profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response.data);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Update Profile</h1>
                    <p className="text-gray-600 mt-1">Update your account details</p>
                    <div className="mt-2 text-lg text-blue-600">
                        Welcome, {loggedInUser?.name}
                    </div>
                </div>

                {/* Current Details Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Current Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm font-medium text-gray-500">Name:</span>
                            <p className="text-gray-700">{loggedInUser?.name}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Email:</span>
                            <p className="text-gray-700">{loggedInUser?.email}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Role:</span>
                            <p className="text-gray-700 capitalize">{loggedInUser?.role}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">Password:</span>
                            <p className="text-gray-700">{loggedInUser?.password}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                New Name
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter new name"
                            />
                            {errors.name && 
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name.message}
                                </p>
                            }
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                New Email
                            </label>
                            <input
                                type="email"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter new email"
                            />
                            {errors.email && 
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            }
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("newPassword", {
                                    required: "Password is required"
                                })}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                        {errors.newPassword && 
                            <p className="text-red-500 text-xs mt-1">
                                {errors.newPassword.message}
                            </p>
                        }
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Update Profile
                        </button>
                        <button
                            type="button"
                            onClick={() => loggedInUser.role === 'admin' ? navigate('/admin/adminPage') : navigate('/profile')}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserUpdatePage;