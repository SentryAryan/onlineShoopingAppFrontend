import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/slices/loadingSlice'

function ContactUs() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        try {
            dispatch(setLoading(true))
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact/send`, data);
            console.log(response.data);
            reset(); // Clear form after successful submission
            toast.success('Message sent successfully!');
        } catch (error) {
            console.error('Contact submission error:', error);
            toast.error('Failed to send message');
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="w-full flex justify-center items-center min-h-screen px-4 py-10">
            <div className="w-[90%] flex flex-col max-w-screen-lg  p-8 bg-white rounded-xl shadow-lg">
                <div className="mb-10 text-center w-full">
                    <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
                    <p className="text-gray-600 mt-2">We'd love to hear from you</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
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
                            Subject
                        </label>
                        <input
                            type="text"
                            {...register("subject", { required: "Subject is required" })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter message subject"
                        />
                        {errors.subject &&
                            <p className="text-red-500 text-sm mt-1">
                                {errors.subject.message}
                            </p>
                        }
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            {...register("message", {
                                required: "Message is required",
                                minLength: {
                                    value: 10,
                                    message: "Message must be at least 10 characters"
                                }
                            })}
                            rows="4"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your message"
                        />
                        {errors.message &&
                            <p className="text-red-500 text-sm mt-1">
                                {errors.message.message}
                            </p>
                        }
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs
