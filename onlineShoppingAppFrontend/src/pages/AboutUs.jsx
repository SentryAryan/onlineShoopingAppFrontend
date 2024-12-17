import React from 'react';
import { FaShoppingCart, FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa';

export default function AboutUs() {
  const features = [
    {
      icon: <FaShoppingCart className="text-4xl text-blue-600" />,
      title: "Wide Selection",
      description: "Browse through thousands of products from trusted sellers and brands."
    },
    {
      icon: <FaTruck className="text-4xl text-blue-600" />,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and securely to your doorstep."
    },
    {
      icon: <FaHeadset className="text-4xl text-blue-600" />,
      title: "24/7 Support",
      description: "Our customer service team is always here to help you with any questions."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Secure Shopping",
      description: "Shop with confidence knowing your data and transactions are protected."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Online Store
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your one-stop destination for all your shopping needs. We're committed to providing 
          the best shopping experience with quality products and excellent service.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              To provide our customers with a seamless and enjoyable shopping experience, 
              offering high-quality products at competitive prices while maintaining 
              exceptional customer service and satisfaction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Quality</h4>
                <p className="text-gray-600">We ensure all products meet our high standards</p>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Value</h4>
                <p className="text-gray-600">Competitive prices without compromising quality</p>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Service</h4>
                <p className="text-gray-600">Customer satisfaction is our top priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg opacity-90">
              We're more than just an online store - we're your shopping partner
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
              <p className="opacity-90">Join our growing community of satisfied customers</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="opacity-90">Hassle-free return policy for your peace of mind</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="opacity-90">Multiple secure payment options available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
