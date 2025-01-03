import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Loader from '../components/common/Loader'
import { motion } from 'framer-motion'
import { FaChevronRight } from 'react-icons/fa'

function AllProducts() {
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.loading)
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = [
        "All",
        "Electronics",
        "Clothing",
        "Books",
        "Home & Kitchen",
        "Sports & Outdoors",
        "Beauty & Personal Care",
        "Toys & Games",
        "Health & Wellness",
        "Automotive",
        "Pet Supplies",
        "Jewelry",
        "Food & Beverages",
        "Office Products",
        "Musical Instruments",
        "Tools & Home Improvement"
    ]

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Parallax Effect */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold mb-6"
                    >
                        Our Products
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-blue-100 max-w-2xl mx-auto"
                    >
                        Discover our curated collection of premium products, 
                        crafted for quality and designed for excellence
                    </motion.p>
                </div>
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full opacity-20"></div>
                </div>
            </motion.div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Category Sidebar */}
                    <motion.div 
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="md:w-64 flex-shrink-0"
                    >
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <motion.button
                                        key={category}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium 
                                            flex items-center justify-between transition-all duration-200
                                            ${selectedCategory === category
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {category}
                                        {selectedCategory === category && (
                                            <FaChevronRight className="w-3 h-3" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <Loader />
                        ) : filteredProducts.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-gray-500 py-12"
                            >
                                <p className="text-xl">No products found in this category</p>
                                <p className="mt-2">Please try selecting a different category</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredProducts.map((product, index) => (
                                    product.quantity > 0 && (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    )
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts 