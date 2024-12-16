import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function SignupForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8081/api/users', data)
            console.log(response.data);
            navigate('/login')
        } catch (error) {
            console.error('Signup error:', error)
        }
    }

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                <p className="text-gray-600 mt-2">Sign up to get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                    />
                    {errors.name && 
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    }
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Email Address
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                    />
                    {errors.email && 
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    }
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", { 
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Create a password"
                    />
                    {errors.password && 
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    }
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        {...register("role", { required: "Role is required" })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select your role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && 
                        <p className="text-red-500 text-sm mt-1">
                            {errors.role.message}
                        </p>
                    }
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    Create Account
                </button>

                <div className="text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link 
                        to="/login" 
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignupForm 