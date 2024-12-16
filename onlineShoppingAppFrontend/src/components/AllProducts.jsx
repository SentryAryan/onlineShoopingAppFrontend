import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts } from '../store/slices/products'
import { setCart } from '../store/slices/cartSlice'
import { setQuantity } from '../store/slices/quantitySlice'
import ProductCard from './ProductCard'

function AllProducts() {
    const products = useSelector(state => state.products.products)
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.auth.loggedInUser)
    const isLogin = useSelector(state => state.isLogin)

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/products')
            dispatch(setProducts(response.data))
            
            if(loggedInUser) {
                // Fetch cart data
                const cartResponse = await axios.get(`http://localhost:8081/api/users/cart/${loggedInUser.id}`);
                const cart = cartResponse.data;
                dispatch(setCart(cart));
                
                // Set quantities from cart data
                cart.forEach(item => {
                    dispatch(setQuantity({
                        productId: item.product.id,
                        quantity: item.quantity
                    }));
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [isLogin, loggedInUser])

    return (
        <div className="w-full min-h-screen bg-gray-100 py-8 px-4">
            <h1 className="w-full flex justify-center items-center text-3xl font-bold text-gray-800 mb-8">
                Our Products
            </h1>
            <div className="w-full max-w-7xl mx-auto">
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
