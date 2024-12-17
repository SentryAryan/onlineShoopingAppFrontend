import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from '../store/slices/products'
import ProductCard from './ProductCard'
import { setLoading } from '../store/slices/loadingSlice'
import Loader from './common/Loader'

function AllProducts() {
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             dispatch(setLoading(true))
    //             const response = await axios.get('http://localhost:8081/api/products')
    //             dispatch(setProducts(response.data))
    //         } catch (error) {
    //             console.error('Error fetching products:', error)
    //         } finally {
    //             dispatch(setLoading(false))
    //         }
    //     }
    //     fetchProducts()
    // }, [dispatch])

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-8 sm:px-12 lg:px-16">
            <div className="max-w-[1600px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Products
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our collection of high-quality products
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 mx-auto">
                    {loading ? <Loader /> :
                        products.map(product => (
                            product.quantity > 0 && (
                                <ProductCard key={product.id} product={product} />
                            )
                        ))}
                </div>
            </div>
        </div>
    )
}

export default AllProducts
