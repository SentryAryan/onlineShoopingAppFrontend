import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from '../store/slices/products'
import ProductCard from './ProductCard'

function AllProducts() {
    const products = useSelector(state => state.products.products)
    const dispatch = useDispatch()

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8081/api/products')
        dispatch(setProducts(response.data))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Our Products
            </h1>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-center gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllProducts
