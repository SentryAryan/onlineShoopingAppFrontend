import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../store/slices/isLoginSlice';
import { setLoggedInUser } from '../store/slices/authSlice';

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:8081/api/users/login?email=${data.email}&password=${data.password}`
            );
            console.log(response);
            dispatch(setLoggedInUser(response.data));
            dispatch(setIsLogin(true));
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            dispatch(setIsLogin(false));
            dispatch(setLoggedInUser(null));
        }
    }

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                <p className="text-gray-600 mt-2">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
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
                        {...register("password", { required: "Password is required" })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                    />
                    {errors.password && 
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    }
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    Sign In
                </button>

                <div className="text-center text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link 
                        to="/signup" 
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm 